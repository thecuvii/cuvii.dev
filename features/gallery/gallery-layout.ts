import type { GalleryImageItem } from './gallery'

export type GalleryLayoutResult = {
  images: Array<{
    image: GalleryImageItem
    width: number
    height: number
  }>
  gridCols: number
  cellSize: number
  spacing: number
}

export type GalleryConfig = {
  spacing: number
  portraitWidth: number
  landscapeWidth: number
  cellSize: number
}

export const DEFAULT_CONFIG: GalleryConfig = {
  spacing: 66,
  portraitWidth: 320,
  landscapeWidth: 480,
  cellSize: 520,
}

function getImageSize(aspectRatio: number, config: GalleryConfig) {
  const width = aspectRatio < 1 ? config.portraitWidth : config.landscapeWidth
  return { width, height: width / aspectRatio }
}

export function calculateGalleryLayout(images: GalleryImageItem[], config: GalleryConfig): GalleryLayoutResult {
  const gridCols = Math.max(1, Math.round(Math.sqrt(images.length)))

  const processedImages = images.map((image) => ({
    image,
    ...getImageSize(image.aspectRatio, config),
  }))

  return {
    images: processedImages,
    gridCols,
    cellSize: config.cellSize,
    spacing: config.spacing,
  }
}
