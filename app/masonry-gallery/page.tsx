import type { Metadata } from 'next'
import { cacheLife } from 'next/dist/server/use-cache/cache-life'
import potpack from 'potpack'
import { GalleryCanvas } from '~/features/gallery/canvas'
import { GalleryImage } from '~/features/gallery/gallery-image'
import imageCache from '~/features/gallery/image-cache.json'
import { queryImageKeys } from '~/features/gallery/query-image-keys'

export const metadata: Metadata = {
  title: 'Masonry Gallery',
  description: 'Masonry Gallery',
}

async function getImagesDatasource() {
  'use cache'
  cacheLife('max')
  const imageKeys = await queryImageKeys()
  const images = imageKeys
    .sort((a, b) => b.key.localeCompare(a.key))
    .map((imageKey) => {
      const cache = imageCache[imageKey.key as keyof typeof imageCache]
      const width = cache.aspectRatio < 1 ? 360 : 480
      return {
        url: imageKey.url,
        aspectRatio: cache.aspectRatio,
        blurDataUrl: cache.blurDataUrl,
        width,
        height: width / cache.aspectRatio,
      }
    })
  return images
}

type ImageWithPosition = {
  url: string
  aspectRatio: number
  blurDataUrl: string
  width: number
  height: number
  left: number
  top: number
}

type Box = {
  w: number
  h: number
  x?: number
  y?: number
  originalImage: {
    url: string
    aspectRatio: number
    blurDataUrl: string
    width: number
    height: number
  }
}

function createPotpackLayout(
  images: Array<{
    url: string
    aspectRatio: number
    blurDataUrl: string
    width: number
    height: number
  }>,
  gap: number = 16,
  containerWidth: number = 1200,
  scale: number = 1,
): { result: ImageWithPosition[]; layout: ReturnType<typeof potpack> } {
  // Create boxes for potpack with normalized dimensions
  const boxes: Box[] = images.map((image) => {
    // Scale dimensions to maintain proportions while optimizing layout
    const w = Math.round(image.width * scale)
    const h = Math.round(image.height * scale)

    return {
      w,
      h,
      originalImage: image,
    }
  })

  // Run potpack algorithm
  const packed = potpack(boxes)

  // Get max width from boxes to determine the actual container width
  const maxX = Math.max(...boxes.map((box) => (box.x || 0) + box.w))

  // Scale container width to match desired width if needed
  const scaleFactor = containerWidth / maxX

  // Create result with adjustments for gap
  const result: ImageWithPosition[] = []

  // Process images and apply gaps
  boxes.forEach((box) => {
    // Calculate positions with proportional scaling
    const left = (box.x || 0) * scaleFactor
    const top = (box.y || 0) * scaleFactor

    // Calculate dimensions with proportional scaling
    const width = box.w * scaleFactor
    const height = box.h * scaleFactor

    // Add each image with calculated position to result
    result.push({
      ...box.originalImage,
      width: width - gap, // Reduce width to create horizontal gap
      height: height - gap, // Reduce height to create vertical gap
      left: left + gap / 2, // Center in the allocated space
      top: top + gap / 2, // Center in the allocated space
    })
  })

  return {
    result,
    layout: packed,
  }
}

export default async function GalleryPage() {
  const images = await getImagesDatasource()
  const { result: layoutImages, layout } = createPotpackLayout(images, 16)

  return (
    <main className='bg-black w-screen h-screen overflow-hidden'>
      <GalleryCanvas style={{ width: layout.w, height: layout.h }}>
        {layoutImages.map((image) => (
          <GalleryImage
            key={image.url}
            image={image}
            className='absolute'
            style={{
              width: image.width,
              height: image.height,
              left: image.left,
              top: image.top,
            }}
          />
        ))}
      </GalleryCanvas>
    </main>
  )
}
