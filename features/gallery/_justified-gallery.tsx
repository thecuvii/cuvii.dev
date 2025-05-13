'use client'

import type { getImagesDatasource } from '~/app/masonry-gallery/page'
// @ts-expect-error no types
import JustifiedLayout from 'better-justified-layout'
import { GalleryCanvas } from './canvas'
import { GalleryImage } from './gallery-image'

function createJustifiedLayout(images: Awaited<ReturnType<typeof getImagesDatasource>>): {
  containerHeight: number
  widowCount: number
  boxes: Array<{
    aspectRatio: number
    top: number
    width: number
    height: number
    left: number
    row: number
  }>
} {
  return new JustifiedLayout(
    images.map((image) => ({ width: image.width, height: image.height })),
    {
      containerWidth: window.innerWidth * 2.5,
      boxSpacing: 16,
      forceAspectRatio: false,
      fullWidthBreakoutRowCadence: false,
    },
  )
}

export function JustifiedGallery({ images }: { images: Awaited<ReturnType<typeof getImagesDatasource>> }) {
  const layout = createJustifiedLayout(images)

  return (
    <main className='bg-black w-screen h-screen overflow-hidden'>
      <GalleryCanvas style={{ height: layout.containerHeight }}>
        {layout.boxes.map((box, idx) => {
          const img = images[idx]
          return (
            <GalleryImage
              key={img.id}
              image={img}
              className='absolute'
              style={{
                width: box.width,
                height: box.height,
                left: box.left,
                top: box.top,
              }}
            />
          )
        })}
      </GalleryCanvas>
    </main>
  )
}
