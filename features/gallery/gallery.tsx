'use client'

import { atom } from 'jotai'
import { GalleryImage } from './gallery-image'

export type GalleryImageItem = {
  url: string
  aspectRatio: number
  blurDataUrl: string
}

export const activeImageAtom = atom<GalleryImageItem | null>(null)
export function Gallery({ images }: { images: GalleryImageItem[] }) {
  if (!images || images.length === 0) {
    return null
  }

  const numCols = Math.max(1, Math.ceil(Math.sqrt(images.length)))
  const gap = '64px'

  return (
    <div
      className='will-change-transform'
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`,
        gap,
      }}
    >
      {images.map((imageItem) => (
        <GalleryImage
          key={imageItem.url}
          className='w-[440px]'
          style={{
            aspectRatio: imageItem.aspectRatio,
          }}
          image={imageItem}
        />
      ))}
    </div>
  )
}
