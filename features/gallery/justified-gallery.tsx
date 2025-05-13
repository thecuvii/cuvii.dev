'use client'
import dynamic from 'next/dynamic'

export const JustifiedGallery = dynamic(() => import('./_justified-gallery').then((mod) => mod.MasonryGallery), {
  ssr: false,
})
