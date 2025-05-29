'use client'

import type { GalleryImageItem } from './gallery'
import { clsxm } from '@zolplay/clsxm'
import { motion } from 'motion/react'
import Image from 'next/image'
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
  const optimizedSizes = useMemo(() => {
    if (style?.width) {
      const width = typeof style.width === 'number' ? `${style.width}px` : style.width
      return width
    }
    return '(min-width: 768px) min(33vw, 440px), (min-width: 640px) min(50vw, 440px), min(100vw, 440px)'
  }, [style?.width])

  return (
    <div className={clsxm('group relative overflow-hidden', className)} style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.blurDataUrl}
        alt=''
        className={clsxm('w-full h-auto')}
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
  )
}
