import type { Metadata } from 'next'
import { Gallery } from '~/features/gallery'

export const metadata: Metadata = {
  title: 'Photography',
  description: 'Photography',
}

export default async function PhotographyPage() {
  'use cache'

  return (
    <main className='p-2'>
      <Gallery images={[]} />
    </main>
  )
}
