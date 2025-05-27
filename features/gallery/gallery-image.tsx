'use client'

import type { GalleryImageItem } from './gallery'
import { clsxm } from '@zolplay/clsxm'
import { motion } from 'motion/react'
import Image from 'next/image'
import { parseAsBoolean, useQueryState } from 'nuqs'
import { useMemo } from 'react'
import { generateCloudflareImageUrl } from './cf-image-loader'

const MotionImage = motion.create(Image)

export function GalleryImage({
  image,
  className,
  style,
}: {
  image: GalleryImageItem
  className?: string
  style?: React.CSSProperties
}) {
  const [isGrayscale] = useQueryState('grayscale', parseAsBoolean.withDefault(false))

  // const setActiveImage = useSetAtom(activeImageAtom)
  // const isActive = useAtomValue(
  //   useMemo(() => selectAtom(activeImageAtom, (activeImage) => activeImage?.url === image.url), [image.url]),
  // )

  // Generate optimized sizes based on style.width
  const optimizedSizes = useMemo(() => {
    if (style?.width) {
      const width = typeof style.width === 'number' ? `${style.width}px` : style.width
      return width
    }
    // Fallback to responsive sizes if no specific width is provided
    return '(min-width: 768px) min(33vw, 440px), (min-width: 640px) min(50vw, 440px), min(100vw, 440px)'
  }, [style?.width])

  return (
    <div className={className} style={style}>
      <div className='group relative overflow-hidden'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.blurDataUrl}
          alt=''
          className={clsxm('w-full h-auto', isGrayscale ? 'grayscale-100' : 'grayscale-0')}
          style={{ aspectRatio: image.aspectRatio }}
          draggable={false}
          width={0}
          height={0}
        />

        <MotionImage
          loader={generateCloudflareImageUrl}
          src={image.url}
          alt=''
          className={clsxm(
            'absolute inset-0 w-full h-auto',
            'group-hover:scale-[103%] transition-transform duration-400',
            isGrayscale ? 'grayscale-100 group-hover:grayscale-0' : 'grayscale-0',
          )}
          sizes={optimizedSizes}
          draggable={false}
          width={0}
          height={0}
          quality={75}
          loading='lazy'
        />
        <div className='font-good-monolith text-stone-200 text-xs absolute bottom-2 left-2'># 0001</div>
      </div>
      {/* {isActive && (
        <Portal.Root>
          <MDiv className='fixed inset-0 bg-stone-900 p-4'>
            <div className='size-full inline-grid place-items-center'>
              <div className='relative h-full'>
                <MotionImage
                  src={image.blurDataUrl}
                  alt=''
                  className={clsxm('object-contain', image.aspectRatio > 0 ? 'h-full w-auto' : 'w-full h-auto')}
                  draggable={false}
                  width={0}
                  height={0}
                />

                <MotionImage
                  className={clsxm('absolute inset-0 size-full')}
                  alt=''
                  src={image.url}
                  draggable={false}
                  loader={generateCloudflareImageUrl}
                  quality={75}
                  width={0}
                  height={0}
                  sizes='(max-width: 1920px) 100vw, 1920px'
                  loading='eager'
                  onClick={() => {
                    setActiveImage(null)
                  }}
                />
              </div>
            </div>
          </MDiv>
        </Portal.Root>
      )} */}
    </div>
  )
}
