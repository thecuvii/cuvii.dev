import type { GalleryImageItem } from './gallery'

export type PositionedImage = {
  image: GalleryImageItem
  top: number
  left: number
  width: number
  height: number
}

export type GalleryConfig = {
  spacing: number
  portraitWidth: number
  landscapeWidth: number
  cellWidth: number
  cellHeight: number
}

export const DEFAULT_CONFIG: GalleryConfig = {
  spacing: 66,
  portraitWidth: 320,
  landscapeWidth: 480,
  cellWidth: 520,
  cellHeight: 520,
}

function getImageSize(aspectRatio: number, config: GalleryConfig) {
  const width = aspectRatio < 1 ? config.portraitWidth : config.landscapeWidth
  return { width, height: width / aspectRatio }
}

function getGridLayout(totalImages: number) {
  const cols = Math.max(1, Math.round(Math.sqrt(totalImages)))
  const rows = Math.ceil(totalImages / cols)
  return { cols, rows }
}

function getCellPosition(index: number, cols: number, config: GalleryConfig) {
  const row = Math.floor(index / cols)
  const col = index % cols

  return {
    top: config.spacing + row * (config.cellHeight + config.spacing),
    left: config.spacing + col * (config.cellWidth + config.spacing),
  }
}

function centerImageInCell(
  imageSize: { width: number; height: number },
  cellPos: { top: number; left: number },
  config: GalleryConfig,
) {
  return {
    top: cellPos.top + (config.cellHeight - imageSize.height) / 2,
    left: cellPos.left + (config.cellWidth - imageSize.width) / 2,
  }
}

export function calculateGalleryLayout(images: GalleryImageItem[], config: GalleryConfig) {
  const { cols, rows } = getGridLayout(images.length)

  const positionedImages: PositionedImage[] = images.map((image, index) => {
    const imageSize = getImageSize(image.aspectRatio, config)
    const cellPos = getCellPosition(index, cols, config)
    const imagePos = centerImageInCell(imageSize, cellPos, config)

    return {
      image,
      ...imagePos,
      ...imageSize,
    }
  })

  const canvasWidth = config.spacing + cols * config.cellWidth + (cols - 1) * config.spacing + config.spacing
  const canvasHeight = config.spacing + rows * config.cellHeight + (rows - 1) * config.spacing + config.spacing

  return {
    positionedImages,
    canvasWidth,
    canvasHeight,
  }
}
