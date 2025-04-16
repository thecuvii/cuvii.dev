import type { Metadata } from 'next'
import { Gallery } from '~/features/gallery'
import imageCache from '~/features/gallery/image-cache.json'
import { queryImageKeys } from '~/features/gallery/query-image-keys'

export const metadata: Metadata = {
  title: 'Photography',
  description: 'Photography',
}

export default async function PhotographyPage() {
  'use cache'

  const imageKeys = await queryImageKeys()
  const images = imageKeys
    .sort((a, b) => b.key.localeCompare(a.key))
    .map((imageKey) => {
      const cache = imageCache[imageKey.key as keyof typeof imageCache]
      return {
        url: imageKey.url,
        aspectRatio: cache.aspectRatio,
        blurDataUrl: cache.blurDataUrl,
      }
    })

  return (
    <main>
      <Gallery images={images} />
    </main>
  )
}
