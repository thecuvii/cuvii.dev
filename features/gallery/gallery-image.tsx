'use client'

import type { GalleryImageItem } from './gallery'
import { clsxm } from '@zolplay/clsxm'
import { useAtomValue, useSetAtom } from 'jotai'
import { selectAtom } from 'jotai/utils'
import { motion } from 'motion/react'
import Image from 'next/image'
import { useMemo } from 'react'
import { activeImageAtom } from './atom'
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
  const setActiveImage = useSetAtom(activeImageAtom)
  const isActive = useAtomValue(
    useMemo(() => selectAtom(activeImageAtom, (activeImage) => activeImage?.url === image.url), [image.url]),
  )

  return (
    <div className={clsxm('', className)} style={style} onClick={() => !isActive && setActiveImage(image)}>
      <div className='group relative overflow-hidden'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.blurDataUrl}
          alt=''
          className={clsxm('w-full h-auto grayscale-100')}
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
            'grayscale-100 group-hover:grayscale-0',
          )}
          sizes='(min-width: 768px) min(33vw, 440px), (min-width: 640px) min(50vw, 440px), min(100vw, 440px)'
          draggable={false}
          width={0}
          height={0}
          quality={75}
        />
        {/* <div className='absolute inset-0 bg-stone-900 opacity-0 group-hover:opacity-25 transition-opacity duration-150' /> */}
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
