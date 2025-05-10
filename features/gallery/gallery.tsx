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

  return (
    <motion.div
      drag
      transition={{ ease: 'easeInOut' }}
      className='will-change-transform inline-flex flex-wrap gap-16 -translate-x-1/2 -translate-y-1/2'
    >
      {images.map((img) => {
        const width = img.aspectRatio < 1 ? '220px' : '400px'
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
