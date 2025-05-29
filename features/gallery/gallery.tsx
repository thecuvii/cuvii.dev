'use client'

import type { GalleryConfig } from './gallery-layout'
import { DragCanvas } from './drag-canvas'
import { GalleryImage } from './gallery-image'
import { calculateGalleryLayout, DEFAULT_CONFIG } from './gallery-layout'
import { GalleryToolbar } from './gallery-toolbar'

export type GalleryImageItem = {
  url: string
  aspectRatio: number
  blurDataUrl: string
}

export function Gallery({
  images,
  config = DEFAULT_CONFIG,
}: {
  images: GalleryImageItem[]
  config?: Partial<GalleryConfig>
}) {
  if (!images?.length) {
    return null
  }

  const galleryConfig = { ...DEFAULT_CONFIG, ...config }
  const { positionedImages, canvasWidth, canvasHeight } = calculateGalleryLayout(images, galleryConfig)

  return (
    <>
      <DragCanvas
        style={{ width: `${canvasWidth}px`, height: `${canvasHeight}px` }}
        width={canvasWidth}
        height={canvasHeight}
      >
        {positionedImages.map(({ image, top, left, width, height }) => (
          <GalleryImage
            key={image.url}
            className='absolute'
            style={{
              width: `${width}px`,
              height: `${height}px`,
              top: `${top}px`,
              left: `${left}px`,
            }}
            image={image}
          />
        ))}
      </DragCanvas>
      <GalleryToolbar />
    </>
  )
}
