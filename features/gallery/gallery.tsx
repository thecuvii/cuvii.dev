'use client'

import type { GalleryConfig } from './gallery-layout'
import { DragCanvas } from './drag-canvas'
import { GalleryGrid } from './gallery-grid'
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
  const { images: processedImages, gridCols, cellSize, spacing } = calculateGalleryLayout(images, galleryConfig)

  // Calculate total canvas size for DragCanvas
  const rows = Math.ceil(images.length / gridCols)
  const canvasWidth = gridCols * cellSize + (gridCols + 1) * spacing
  const canvasHeight = rows * cellSize + (rows + 1) * spacing

  return (
    <>
      <DragCanvas
        width={canvasWidth}
        height={canvasHeight}
        style={{ width: `${canvasWidth}px`, height: `${canvasHeight}px` }}
      >
        <GalleryGrid processedImages={processedImages} gridCols={gridCols} cellSize={cellSize} spacing={spacing} />
      </DragCanvas>
      <GalleryToolbar />
    </>
  )
}
