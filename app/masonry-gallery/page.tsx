import type { Metadata } from 'next'

import { cacheLife } from 'next/dist/server/use-cache/cache-life'
import { JustifiedGallery } from '~/features/gallery'
import imageCache from '~/features/gallery/image-cache.json'
import { queryImageKeys } from '~/features/gallery/query-image-keys'

export const metadata: Metadata = {
  title: 'Masonry Gallery',
  description: 'Masonry Gallery',
}

export async function getImagesDatasource() {
  'use cache'
  cacheLife('max')
  const imageKeys = await queryImageKeys()

  return imageKeys
    .sort((a, b) => b.key.localeCompare(a.key))
    .map((imageKey) => {
      const cache = imageCache[imageKey.key as keyof typeof imageCache]
      const width = cache.aspectRatio < 1 ? 360 : 480
      return {
        url: imageKey.url,
        aspectRatio: cache.aspectRatio,
        blurDataUrl: cache.blurDataUrl,
        width,
        height: width / cache.aspectRatio,
      }
    })
}

export default async function GalleryPage() {
  const images = await getImagesDatasource()

  return <JustifiedGallery images={images} />
}
