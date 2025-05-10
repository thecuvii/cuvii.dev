import type { Metadata } from 'next'
import { cacheLife } from 'next/dist/server/use-cache/cache-life'
import { Gallery } from '~/features/gallery'
import imageCache from '~/features/gallery/image-cache.json'
import { queryImageKeys } from '~/features/gallery/query-image-keys'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Gallery',
}

async function getImagesDatasource() {
  'use cache'
  cacheLife('max')
  const imageKeys = await queryImageKeys()
  return imageKeys
    .sort((a, b) => b.key.localeCompare(a.key))
    .map((imageKey) => {
      const cache = imageCache[imageKey.key as keyof typeof imageCache]
      return {
        url: imageKey.url,
        aspectRatio: cache.aspectRatio,
        blurDataUrl: cache.blurDataUrl,
      }
    })
}

export default async function GalleryPage() {
  const images = await getImagesDatasource()

  return (
    <main className='bg-black w-screen h-screen grid place-items-center overflow-hidden'>
      <Gallery images={images} />
    </main>
  )
}
