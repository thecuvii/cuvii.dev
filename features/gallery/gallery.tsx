'use client'

import { Suspense } from 'react'
import { DragCanvas } from './drag-canvas'
import { GalleryImage } from './gallery-image'
import { GalleryToolbar } from './gallery-toolbar'

export type GalleryImageItem = {
  url: string
  aspectRatio: number
  blurDataUrl: string
}

type PositionedImage = {
  image: GalleryImageItem
  top: number
  left: number
  width: number
  height: number
  cellWidth: number
  cellHeight: number
}

type GalleryConfig = {
  spacing: number
  portraitWidth: number
  landscapeWidth: number
  cellWidth: number
  cellHeight: number
}

const DEFAULT_CONFIG: GalleryConfig = {
  spacing: 66,
  portraitWidth: 320,
  landscapeWidth: 480,
  cellWidth: 520,
  cellHeight: 520,
}

function calculateImageDimensions(aspectRatio: number, config: GalleryConfig) {
  const width = aspectRatio < 1 ? config.portraitWidth : config.landscapeWidth
  const height = width / aspectRatio
  return { width, height }
}

function calculateImagesPerRow(totalImages: number): number {
  return Math.max(1, Math.round(Math.sqrt(totalImages)))
}

function positionImages(images: GalleryImageItem[], config: GalleryConfig): PositionedImage[] {
  const imagesPerRow = calculateImagesPerRow(images.length)
  const positionedImages: PositionedImage[] = []

  for (let i = 0; i < images.length; i++) {
    const image = images[i]
    const rowIndex = Math.floor(i / imagesPerRow)
    const colIndex = i % imagesPerRow

    const { width, height } = calculateImageDimensions(image.aspectRatio, config)

    // Calculate cell position (top-left corner of the cell)
    const cellTop = config.spacing + rowIndex * (config.cellHeight + config.spacing)
    const cellLeft = config.spacing + colIndex * (config.cellWidth + config.spacing)

    // Calculate image position within the cell (centered)
    const imageTop = cellTop + (config.cellHeight - height) / 2
    const imageLeft = cellLeft + (config.cellWidth - width) / 2

    positionedImages.push({
      image,
      top: imageTop,
      left: imageLeft,
      width,
      height,
      cellWidth: config.cellWidth,
      cellHeight: config.cellHeight,
    })
  }

  return positionedImages
}

function calculateCanvasDimensions(positionedImages: PositionedImage[], config: GalleryConfig) {
  if (positionedImages.length === 0) {
    return { width: 0, height: 0 }
  }

  const imagesPerRow = calculateImagesPerRow(positionedImages.length)
  const totalRows = Math.ceil(positionedImages.length / imagesPerRow)

  const width = config.spacing + imagesPerRow * config.cellWidth + (imagesPerRow - 1) * config.spacing + config.spacing
  const height = config.spacing + totalRows * config.cellHeight + (totalRows - 1) * config.spacing + config.spacing

  return { width, height }
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
  const positionedImages = positionImages(images, galleryConfig)
  const { width: canvasWidth, height: canvasHeight } = calculateCanvasDimensions(positionedImages, galleryConfig)

  return (
    <Suspense>
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
    </Suspense>
  )
}
