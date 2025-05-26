'use client'

import { GalleryCanvas } from './canvas'
import { GalleryImage } from './gallery-image'

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
}

type GalleryConfig = {
  spacing: number
  portraitWidth: number
  landscapeWidth: number
}

const DEFAULT_CONFIG: GalleryConfig = {
  spacing: 66,
  portraitWidth: 320,
  landscapeWidth: 480,
}

function calculateImageDimensions(aspectRatio: number, config: GalleryConfig) {
  const width = aspectRatio < 1 ? config.portraitWidth : config.landscapeWidth
  const height = width / aspectRatio
  return { width, height }
}

function calculateImagesPerRow(totalImages: number): number {
  return Math.max(1, Math.round(Math.sqrt(totalImages)))
}

function getRowBounds(images: GalleryImageItem[], rowStartIndex: number, imagesPerRow: number, config: GalleryConfig) {
  const rowEndIndex = Math.min(rowStartIndex + imagesPerRow, images.length) - 1
  let maxHeight = 0

  for (let i = rowStartIndex; i <= rowEndIndex; i++) {
    const { height } = calculateImageDimensions(images[i].aspectRatio, config)
    maxHeight = Math.max(maxHeight, height)
  }

  return { maxHeight }
}

function positionImages(images: GalleryImageItem[], config: GalleryConfig): PositionedImage[] {
  const imagesPerRow = calculateImagesPerRow(images.length)
  const positionedImages: PositionedImage[] = []

  for (let i = 0; i < images.length; i++) {
    const image = images[i]
    const rowIndex = Math.floor(i / imagesPerRow)
    const colIndex = i % imagesPerRow

    const { width, height } = calculateImageDimensions(image.aspectRatio, config)

    // Calculate vertical position
    let top = config.spacing
    if (rowIndex > 0) {
      const prevRowStartIndex = (rowIndex - 1) * imagesPerRow
      const { maxHeight: prevRowHeight } = getRowBounds(images, prevRowStartIndex, imagesPerRow, config)
      top = positionedImages[prevRowStartIndex].top + prevRowHeight + config.spacing
    }

    // Calculate horizontal position
    let left = config.spacing
    if (colIndex > 0) {
      const prevImage = positionedImages[i - 1]
      left = prevImage.left + prevImage.width + config.spacing
    }

    positionedImages.push({
      image,
      top,
      left,
      width,
      height,
    })
  }

  return positionedImages
}

function calculateCanvasDimensions(positionedImages: PositionedImage[], config: GalleryConfig) {
  if (positionedImages.length === 0) {
    return { width: 0, height: 0 }
  }

  const maxRight = Math.max(...positionedImages.map(({ left, width }) => left + width)) + config.spacing

  const maxBottom = Math.max(...positionedImages.map(({ top, height }) => top + height)) + config.spacing

  return { width: maxRight, height: maxBottom }
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
    <GalleryCanvas
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
    </GalleryCanvas>
  )
}
