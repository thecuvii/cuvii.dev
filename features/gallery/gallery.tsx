import Image from 'next/image'
import { GALLERY_IMAGES } from './datasource'

export function Gallery() {
  return (
    <ul className='grid gap-2 grid-cols-[repeat(auto-fit,minmax(440px,1fr))]'>
      {GALLERY_IMAGES.map((item) => (
        <li key={item.image.src} className='h-[700px] inline-block relative outline-0 md:w-full md:min-w-[unset]'>
          <Image
            src={item.image}
            alt={item.description}
            className='absolute size-full inset-0 select-none object-cover'
            placeholder='blur'
            sizes=' (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw '
          />
        </li>
      ))}
    </ul>
  )
}
