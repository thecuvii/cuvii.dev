'use client'

import { atom } from 'jotai'
import React, { useCallback, useEffect, useRef, useState } from 'react'

// Assuming GalleryImage component is defined elsewhere, e.g.:
// const GalleryImage = ({ image, style }: { image: GalleryImageItem; style: React.CSSProperties }) => (
//   <div style={{ ...style, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//     <img src={image.blurDataUrl} alt="Gallery item" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//     {/* In a real scenario, you'd use a proper image component with placeholder/blurDataUrl */}
//     {/* <p style={{position: 'absolute'}}>{image.url.slice(-10)}</p> */}
//   </div>
// );

import { GalleryCanvas } from './canvas'
// Make sure GalleryImage is imported or defined
import { GalleryImage } from './gallery-image'

export type GalleryImageItem = {
  url: string
  aspectRatio: number
  blurDataUrl: string
}

export const activeImageAtom = atom<GalleryImageItem | null>(null)

export function Gallery({ images }: { images: GalleryImageItem[] }) {
  if (!images || images.length === 0) {
    return null
  }

  return (
    <GalleryCanvas>
      {images.map((img) => {
        const width = img.aspectRatio < 1 ? '220px' : '400px'
        return (
          <GalleryImage
            key={img.url}
            style={{
              width,
              aspectRatio: String(img.aspectRatio), // CSS aspectRatio needs to be a string
            }}
            image={img}
          />
        )
      })}
    </GalleryCanvas>
  )
}
