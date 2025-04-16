'use client'

import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid'
import { clsxm } from '@zolplay/clsxm'
import Image from 'next/image'
import { generateCloudflareImageUrl } from './cf-image-loader'

export function Gallery({ images }: { images: { url: string; aspectRatio: number; blurDataUrl: string }[] }) {
  return (
    <MasonryInfiniteGrid gap={4} align='center' useRoundedSize={false} percentage useResizeObserver>
      {images.map((image) => (
        <div key={image.url}>
          <Image
            src={image.blurDataUrl}
            alt=''
            className={clsxm(
              'select-none w-full h-auto',
              image.aspectRatio && `aspect-[${image.aspectRatio}]`,
              'min-w-[100vw] sm:min-w-[50vw] md:min-w-[33vw] lg:min-w-[25vw] xl:min-w-[20vw] 2xl:min-w-[17vw] ',
            )}
            width={0}
            height={0}
          />

          <Image
            loader={generateCloudflareImageUrl}
            src={image.url}
            alt=''
            loading='lazy'
            className='absolute inset-0 select-none w-full h-auto'
            sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw'
            width={0}
            height={0}
          />
        </div>
      ))}
    </MasonryInfiniteGrid>
  )
}
