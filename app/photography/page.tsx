import type { _Object } from '@aws-sdk/client-s3'
import type { Metadata } from 'next'
import { Buffer } from 'node:buffer'
import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3'
import { IMAGE_HOST } from '~/constants'
import { Gallery } from '~/features/gallery'
import { generateCloudflareImageUrl } from '~/features/gallery/cf-image-loader'

const R2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

async function getImages() {
  const allKeys: string[] = []
  let isTruncated = true
  let continuationToken: string | undefined

  while (isTruncated) {
    const command = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME!,
      ContinuationToken: continuationToken,
    })
    const list = await R2.send(command)

    if (list.Contents) {
      allKeys.push(...list.Contents.map((item: _Object) => item.Key!))
    }

    isTruncated = !!list.IsTruncated
    continuationToken = list.NextContinuationToken
  }

  return Promise.all(
    allKeys.map(async (key) => {
      const url = `${IMAGE_HOST}/${key}`
      const blurUrl = generateCloudflareImageUrl({
        src: url,
        width: 50,
        blur: 10,
      })

      const response = await fetch(blurUrl)
      if (!response.ok) {
        console.error(`Failed to fetch blur image for ${key}: ${response.statusText}`)
        return { url, key, blurDataUrl: null }
      }
      const buffer = await response.arrayBuffer()
      const base64 = Buffer.from(buffer).toString('base64')
      const mimeType = response.headers.get('content-type') || 'image/webp'
      const blurDataUrl = `data:${mimeType};base64,${base64}`

      return { url, key, blurDataUrl }
    }),
  )
}

export const metadata: Metadata = {
  title: 'Photography',
  description: 'Photography',
}

export default async function PhotographyPage() {
  'use cache'
  const images = await getImages()

  return (
    <main className='p-2'>
      <Gallery images={images} />
    </main>
  )
}
