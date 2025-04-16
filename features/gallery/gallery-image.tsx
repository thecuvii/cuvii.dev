'use client'

import type { GalleryImageItem } from './gallery'
import * as Portal from '@radix-ui/react-portal'
import { clsxm } from '@zolplay/clsxm'
import { useAtomValue, useSetAtom } from 'jotai'
import { selectAtom } from 'jotai/utils'
import { motion } from 'motion/react'
import Image from 'next/image'
import { useMemo } from 'react'
import { MDiv } from '~/lib/motion'
import { generateCloudflareImageUrl } from './cf-image-loader'
import { activeImageAtom } from './gallery'

const MotionImage = motion.create(Image)

export function GalleryImage({ image }: { image: GalleryImageItem }) {
  const setActiveImage = useSetAtom(activeImageAtom)
  const isActive = useAtomValue(
    useMemo(() => selectAtom(activeImageAtom, (activeImage) => activeImage?.url === image.url), [image.url]),
  )

  return (
    <div onClick={() => !isActive && setActiveImage(image)}>
      <MotionImage
        src={image.blurDataUrl}
        alt=''
        className={clsxm(
          image.aspectRatio && `aspect-[${image.aspectRatio}]`,
          'min-w-[100dvw] sm:min-w-[50dvw] md:min-w-[33dvw]',
        )}
        draggable={false}
        width={0}
        height={0}
      />

      <MotionImage
        loader={generateCloudflareImageUrl}
        src={image.url}
        alt=''
        className={clsxm('absolute inset-0 w-full h-auto', isActive && 'opacity-50')}
        sizes='(min-width: 768px) 33dvw, (min-width: 640px) 50dvw, 100dvw'
        draggable={false}
        width={0}
        height={0}
        quality={75}
      />
      {isActive && (
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
      )}
    </div>
  )
}
