import { Buffer } from 'node:buffer'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { imageSize } from 'image-size'
import pLimit from 'p-limit'
import { IMAGE_HOST } from '~/constants'
import { generateCloudflareImageUrl } from '~/features/gallery/cf-image-loader'
import { queryImageKeys } from '~/features/gallery/query-images'

// --- Configuration ---
const CACHE_FILE_PATH = path.resolve(__dirname, '../features/gallery/image-cache.json')
const CONCURRENCY = 10

// --- Types ---
type ImageMeta = {
  blurDataUrl: string | null
  aspectRatio: number | null
}

type ImageCache = Record<string, ImageMeta>

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

  const cache = await readCache()
  const r2Keys = await queryImageKeys()

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
