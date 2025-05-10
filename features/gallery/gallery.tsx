'use client'

import { atom } from 'jotai'
import { motion } from 'motion/react'
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

  return (
    <motion.div
      drag
      className='will-change-transform inline-grid gap-16 -translate-x-1/2 -translate-y-1/2'
      style={{
        gridTemplateColumns: `repeat(${numCols}, 440px)`,
      }}
    >
      {images.map((img) => {
        const width = img.aspectRatio < 1 ? '260px' : '440px'
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
    </motion.div>
  )
}
