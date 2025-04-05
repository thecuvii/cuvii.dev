'use client'
import Image from 'next/image'
import { GALLERY_IMAGES } from './datasource'

export function Gallery() {
  return (
    <div className='max-w-5xl mx-auto py-20 px-8 bg-stone-50'>
      <h1 className='text-4xl font-serif mb-20 text-center tracking-wide text-stone-800'>Photo Gallery</h1>

      <div className='space-y-32'>
        {GALLERY_IMAGES.map((item, index) => {
          // StaticImageData has width and height properties we can use directly
          const isLandscape = item.image.width > item.image.height

          return (
            <div key={index} className='bg-white border border-stone-200 overflow-hidden p-6 md:p-10'>
              {isLandscape ? (
                // Landscape layout (image on top, info on bottom)
                <div className='flex flex-col max-w-4xl mx-auto'>
                  <div className='relative w-full h-[450px] mb-8 overflow-hidden border border-stone-100'>
                    <Image
                      src={item.image}
                      alt={item.description}
                      fill
                      sizes='(min-width: 1024px) 70vw, 90vw'
                      className='object-cover'
                      priority={index === 0}
                    />
                  </div>
                  <div className='px-4 py-6'>
                    <h2 className='text-2xl font-serif mb-8 text-stone-800'>{item.description}</h2>
                    <div className='grid grid-cols-2 gap-10 text-stone-700'>
                      <div>
                        <p className='font-medium text-xs uppercase tracking-widest text-stone-500'>Location</p>
                        <p className='mt-2 font-serif'>{item.location}</p>
                      </div>
                      <div>
                        <p className='font-medium text-xs uppercase tracking-widest text-stone-500'>Date</p>
                        <p className='mt-2 font-serif'>{item.date}</p>
                      </div>
                      <div>
                        <p className='font-medium text-xs uppercase tracking-widest text-stone-500'>Camera</p>
                        <p className='mt-2 font-serif'>{item.camera}</p>
                      </div>
                      <div>
                        <p className='font-medium text-xs uppercase tracking-widest text-stone-500'>Lens</p>
                        <p className='mt-2 font-serif'>{item.lens}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Portrait layout (image on left/right, info on other side)
                <div
                  className={`flex flex-col md:flex-row ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} gap-10 md:gap-16 items-center`}
                >
                  <div className='relative w-full md:w-2/5 h-[500px] overflow-hidden border border-stone-100'>
                    <Image
                      src={item.image}
                      alt={item.description}
                      fill
                      sizes='(min-width: 768px) 40vw, 90vw'
                      className='object-cover'
                      priority={index === 0}
                    />
                  </div>
                  <div className='w-full md:w-3/5 py-6 md:py-0 flex items-center'>
                    <div className='w-full'>
                      <h2 className='text-2xl font-serif mb-12 text-stone-800'>{item.description}</h2>
                      <div className='space-y-8 text-stone-700'>
                        <div>
                          <p className='font-medium text-xs uppercase tracking-widest text-stone-500'>Location</p>
                          <p className='mt-2 text-lg font-serif'>{item.location}</p>
                        </div>
                        <div>
                          <p className='font-medium text-xs uppercase tracking-widest text-stone-500'>Date</p>
                          <p className='mt-2 text-lg font-serif'>{item.date}</p>
                        </div>
                        <div>
                          <p className='font-medium text-xs uppercase tracking-widest text-stone-500'>Camera</p>
                          <p className='mt-2 text-lg font-serif'>{item.camera}</p>
                        </div>
                        <div>
                          <p className='font-medium text-xs uppercase tracking-widest text-stone-500'>Lens</p>
                          <p className='mt-2 text-lg font-serif'>{item.lens}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
