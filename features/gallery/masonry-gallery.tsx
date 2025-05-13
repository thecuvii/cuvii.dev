'use client'

import { GalleryCanvas } from './canvas'
import { GalleryImage } from './gallery-image'

export function MasonryGallery({
  images,
}: {
  images: { url: string; aspectRatio: number; blurDataUrl: string; width: number; height: number }[]
}) {
  return (
    <GalleryCanvas>
      {images.map((image) => {
        const width = image.aspectRatio < 1 ? 360 : 480
        return <GalleryImage key={image.url} image={image} style={{ width }} />
      })}
    </GalleryCanvas>
  )
}
