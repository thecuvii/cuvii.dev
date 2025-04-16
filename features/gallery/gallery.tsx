'use client'

import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid'
import { atom } from 'jotai'
import { GalleryImage } from './gallery-image'

export type GalleryImageItem = {
  url: string
  aspectRatio: number
  blurDataUrl: string
}

export const activeImageAtom = atom<GalleryImageItem | null>(null)
export function Gallery({ images }: { images: GalleryImageItem[] }) {
  return (
    <MasonryInfiniteGrid gap={0} align='center' useRoundedSize={false} percentage useResizeObserver>
      {images.map((image) => (
        <GalleryImage key={image.url} image={image} />
      ))}
    </MasonryInfiniteGrid>
  )
}
