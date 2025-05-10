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
        display: 'inline-grid',
        gridTemplateColumns: `repeat(${numCols}, 440px)`,
        gap,
      }}
    >
      {images.map((img) => {
        const width = img.aspectRatio < 1 ? '320px' : '440px'
        return (
          <GalleryImage
            key={img.url}
            style={{
              width,
              aspectRatio: img.aspectRatio,
            }}
            image={img}
          />
        )
      })}
    </div>
  )
}
