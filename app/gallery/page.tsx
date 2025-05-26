import type { Metadata } from 'next'
import { Gallery } from '~/features/gallery'
import imageCache from '~/features/gallery/image-cache.json'
import { queryImageKeys } from '~/features/gallery/query-image-keys'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Gallery',
}

async function getImagesDatasource() {
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
    <main className='bg-[#FDFDFC] w-screen h-screen grid place-items-center overflow-hidden relative'>
      {/* <div className='absolute inset-0 pointer-events-none z-50 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.15)_100%)]' /> */}
      <Gallery images={images} />
    </main>
  )
}
