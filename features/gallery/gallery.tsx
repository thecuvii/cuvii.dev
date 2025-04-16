'use client'

import Image from 'next/image'
import { Masonry } from 'react-plock'
import { generateCloudflareImageUrl } from './cf-image-loader'

export function Gallery({ images }: { images: { url: string }[] }) {
  return (
    <main className='container mx-auto'>
      <Masonry
        items={images.map((image) => image.url)}
        config={{
          columns: [1, 2, 3, 4],
          gap: [6, 6, 6, 6],
          media: [640, 768, 1024, 1280],
          useBalancedLayout: false,
        }}
        render={(image) => (
          <div className='relative'>
            <Image
              loader={generateCloudflareImageUrl}
              src={image}
              alt=''
              className='select-none w-full h-auto'
              sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw'
              placeholder='empty'
              width={0}
              height={0}
            />
          </div>
        )}
      />
    </main>
  )
}
