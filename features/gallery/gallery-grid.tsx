'use client'

import type { GalleryImageItem } from './gallery'
import { GalleryImage } from './gallery-image'

export type ProcessedImage = {
  image: GalleryImageItem
  width: number
  height: number
}

export function GalleryGrid({
  processedImages,
  gridCols,
  cellSize,
  spacing,
}: {
  processedImages: ProcessedImage[]
  gridCols: number
  cellSize: number
  spacing: number
}) {
  return (
    <div
      className='grid '
      style={{
        gridTemplateColumns: `repeat(${gridCols}, ${cellSize}px)`,
        gap: `${spacing}px`,
        padding: `${spacing}px`,
      }}
    >
      {processedImages.map(({ image, width, height }) => (
        <div
          key={image.url}
          className='grid place-items-center '
          style={{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
          }}
        >
          <GalleryImage
            style={{
              width: `${width}px`,
              height: `${height}px`,
            }}
            image={image}
          />
        </div>
      ))}
    </div>
  )
}
