import type { Metadata } from 'next'
import { Gallery } from '~/features/gallery'

export const metadata: Metadata = {
  title: 'Photography',
  description: 'Photography',
}

export default async function PhotographyPage() {
  return (
    <main className='p-2'>
      <Gallery />
    </main>
  )
}
