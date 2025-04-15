'use client'

import Image from 'next/image'
import { Masonry } from 'react-plock'
import { cloudflareImageLoader } from './cf-image-loader'
import { GALLERY_IMAGES } from './datasource'

export function Gallery() {
  return (
    <main className='container mx-auto'>
      {GALLERY_IMAGES.map((item) => (
        <Masonry
          key={item.title}
          items={item.images}
          config={{
            columns: [1, 2, 3, 4],
            gap: [6, 6, 6, 6],
            media: [640, 768, 1024, 1280],
            useBalancedLayout: false,
          }}
          render={(image) => (
            <div className='relative h-[320px]'>
              <Image
                loader={cloudflareImageLoader}
                src={image}
                alt={item.title}
                className='select-none'
                sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw'
                placeholder='empty'
                fill
              />
            </div>
          )}
        />
      ))}
    </main>
  )
}
