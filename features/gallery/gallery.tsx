'use client'

import Image from 'next/image'
import { Masonry } from 'react-plock'
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
          render={(image) => <Image src={image} alt={item.title} className='select-none' placeholder='blur' />}
        />
      ))}
    </main>
  )
}
