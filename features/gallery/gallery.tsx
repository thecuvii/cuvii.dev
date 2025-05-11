'use client'

import { GalleryCanvas } from './canvas'
import { GalleryImage } from './gallery-image'

export type GalleryImageItem = {
  url: string
  aspectRatio: number
  blurDataUrl: string
}

export function Gallery({ images }: { images: GalleryImageItem[] }) {
  if (!images || images.length === 0) {
    return null
  }

  const SPACING = 48

  // Calculate images per row based on square root of total count
  const imagesPerRow = Math.round(Math.sqrt(images.length))

  // Create positioned images array
  const positionedImages = []
  let maxRight = 0
  let maxBottom = 0

  for (let i = 0; i < images.length; i++) {
    const image = images[i]
    const rowIndex = Math.floor(i / imagesPerRow)
    const colIndex = i % imagesPerRow

    const width = image.aspectRatio < 1 ? 220 : 400
    const height = width / image.aspectRatio

    // Calculate position
    let top = rowIndex === 0 ? SPACING : 0
    let left = colIndex === 0 ? SPACING : 0

    // Add up previous items' heights/widths plus spacing
    if (rowIndex > 0) {
      // Find max height of previous row
      const prevRowStartIndex = (rowIndex - 1) * imagesPerRow
      const prevRowEndIndex = Math.min(prevRowStartIndex + imagesPerRow, images.length) - 1

      let maxPrevRowHeight = 0
      for (let j = prevRowStartIndex; j <= prevRowEndIndex; j++) {
        const prevImg = images[j]
        const prevWidth = prevImg.aspectRatio < 1 ? 220 : 400
        const prevHeight = prevWidth / prevImg.aspectRatio
        maxPrevRowHeight = Math.max(maxPrevRowHeight, prevHeight)
      }

      top = positionedImages[prevRowStartIndex].top + maxPrevRowHeight + SPACING
    }

    if (colIndex > 0) {
      const prevImg = positionedImages[i - 1]
      left = prevImg.left + prevImg.width + SPACING
    }

    // Keep track of max dimensions
    const right = left + width
    const bottom = top + height
    maxRight = Math.max(maxRight, right + SPACING)
    maxBottom = Math.max(maxBottom, bottom + SPACING)

    positionedImages.push({
      image,
      top,
      left,
      width,
      height,
    })
  }

  return (
    <GalleryCanvas style={{ width: `${maxRight}px`, height: `${maxBottom}px` }} width={maxRight} height={maxBottom}>
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
