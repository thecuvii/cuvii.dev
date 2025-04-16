import type { _Object } from '@aws-sdk/client-s3'
import { Buffer } from 'node:buffer'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3'
import { imageSize } from 'image-size'
import pLimit from 'p-limit'
import { IMAGE_HOST } from '~/constants'
import { generateCloudflareImageUrl } from '~/features/gallery/cf-image-loader'

// --- Configuration ---
const R2_ENDPOINT = process.env.R2_ENDPOINT!
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!
const CACHE_FILE_PATH = path.resolve(__dirname, '../features/gallery/image-cache.json')
const CONCURRENCY = 10

// --- Types ---
type ImageMeta = {
  blurDataUrl: string | null
  aspectRatio: number | null
}

type ImageCache = Record<string, ImageMeta>

// --- R2 Client ---
const R2 = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
})

async function readCache(): Promise<ImageCache> {
  try {
    const data = await fs.readFile(CACHE_FILE_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.log('Cache file not found, starting fresh.')
      return {}
    }
    console.error('Error reading cache file:', error)
    throw error
  }
}

async function writeCache(cache: ImageCache): Promise<void> {
  try {
    await fs.writeFile(CACHE_FILE_PATH, JSON.stringify(cache, null, 2))
    console.log(`Cache updated successfully at ${CACHE_FILE_PATH}`)
  } catch (error) {
    console.error('Error writing cache file:', error)
    throw error
  }
}

async function listAllR2Keys(): Promise<string[]> {
  const allKeys: string[] = []
  let isTruncated = true
  let continuationToken: string | undefined

  console.log('Listing objects in R2 bucket:', R2_BUCKET_NAME)
  while (isTruncated) {
    try {
      const command = new ListObjectsV2Command({
        Bucket: R2_BUCKET_NAME,
        ContinuationToken: continuationToken,
      })
      const list = await R2.send(command)

      if (list.Contents) {
        const imageKeys = list.Contents.map((item: _Object) => item.Key!).filter((key) =>
          /\.(?:jpg|jpeg|png|gif|webp)$/i.test(key),
        )
        allKeys.push(...imageKeys)
      }

      isTruncated = !!list.IsTruncated
      continuationToken = list.NextContinuationToken
    } catch (error) {
      console.error('Error listing R2 objects:', error)
      throw error
    }
  }
  console.log(`Found ${allKeys.length} images in R2.`)
  return allKeys
}

async function fetchBlurDataUrl(key: string): Promise<ImageMeta | null> {
  const url = `${IMAGE_HOST}/${key}`
  const blurUrl = generateCloudflareImageUrl({
    src: url,
    width: 50,
    blur: 10,
  })

  try {
    const response = await fetch(blurUrl)
    if (!response.ok) {
      console.error(`Failed to fetch blur image for ${key}: ${response.status} ${response.statusText}`)
      return { blurDataUrl: null, aspectRatio: null }
    }
    const buffer = await response.arrayBuffer()
    const size = imageSize(new Uint8Array(buffer))
    const aspectRatio = size.width / size.height
    const base64 = Buffer.from(buffer).toString('base64')
    const mimeType = response.headers.get('content-type') || 'image/webp'
    const blurDataUrl = `data:${mimeType};base64,${base64}`
    return { blurDataUrl, aspectRatio }
  } catch (error) {
    console.error(`Network error fetching blur image for ${key}:`, error)
    return { blurDataUrl: null, aspectRatio: null }
  }
}

// --- Main Execution ---
async function updateImageCache() {
  console.log('Starting image metadata fetch...')

  if (!R2_ENDPOINT || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
    console.error(
      'Missing required environment variables (R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME).',
    )
    process.exit(1)
  }

  const cache = await readCache()
  const r2Keys = await listAllR2Keys()

  const existingKeys = new Set(Object.keys(cache))
  const newKeys = r2Keys.filter((key) => !existingKeys.has(key))

  if (newKeys.length === 0) {
    console.log('No new images found in R2 bucket. Cache is up-to-date.')
    return
  }

  console.log(`Found ${newKeys.length} new images to process.`)

  const limit = pLimit(CONCURRENCY)
  const fetchPromises = newKeys.map((key) => {
    return limit(async () => {
      console.log(`Fetching metadata for: ${key}`)
      const meta = await fetchBlurDataUrl(key)
      if (meta) {
        cache[key] = meta
      } else {
        console.warn(`Skipping cache update for ${key} due to fetch error.`)
      }
    })
  })

  await Promise.all(fetchPromises)

  console.log('Finished fetching metadata for new images.')
  await writeCache(cache)
}

updateImageCache().catch((error) => {
  console.error('Script failed:', error)
  process.exit(1)
})
