'use client'

import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid'
import { clsxm } from '@zolplay/clsxm'
import Image from 'next/image'
import { Masonry } from 'react-plock'
import { generateCloudflareImageUrl } from './cf-image-loader'

export function Gallery({ images }: { images: { url: string; aspectRatio: number; blurDataUrl: string }[] }) {
  return (
    <main className=''>
      <MasonryInfiniteGrid>
        {images.map((image) => (
          <div className='relative' key={image.url}>
            <Image
              src={image.blurDataUrl}
              alt=''
              className={clsxm(
                'select-none w-full h-auto',
                image.aspectRatio && `aspect-[${image.aspectRatio}]`,
                'min-w-[200px] sm:min-w-[300px] md:min-w-[400px] lg:min-w-[500px]',
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
    </main>
  )
}
