'use client'

import { atom } from 'jotai'
import { animate } from 'motion'
import { motion, useMotionValue } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { GalleryImage } from './gallery-image'

export type GalleryImageItem = {
  url: string
  aspectRatio: number
  blurDataUrl: string
}

export const activeImageAtom = atom<GalleryImageItem | null>(null)
export function Gallery({ images }: { images: GalleryImageItem[] }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const [isDragging, setIsDragging] = useState(false)
  const lastMousePosition = useRef({ x: 0, y: 0 })
  const motionDivRef = useRef<HTMLDivElement>(null)

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true)
    lastMousePosition.current = { x: event.clientX, y: event.clientY }

    if (motionDivRef.current) {
      motionDivRef.current.style.cursor = 'grabbing'
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    event.preventDefault()
  }, [])

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      if (!isDragging) 
return

      const dx = event.clientX - lastMousePosition.current.x
      const dy = event.clientY - lastMousePosition.current.y

      x.set(x.get() + dx)
      y.set(y.get() + dy)

      lastMousePosition.current = { x: event.clientX, y: event.clientY }
    },
    [isDragging, x, y],
  )

  const handlePointerUp = useCallback(
    (_event: PointerEvent) => {
      if (!isDragging) 
return

      setIsDragging(false)

      if (motionDivRef.current) {
        motionDivRef.current.style.cursor = 'grab'
      }
    },
    [isDragging],
  )

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove)
      window.addEventListener('pointerup', handlePointerUp)
      window.addEventListener('pointercancel', handlePointerUp)
      return () => {
        window.removeEventListener('pointermove', handlePointerMove)
        window.removeEventListener('pointerup', handlePointerUp)
        window.removeEventListener('pointercancel', handlePointerUp)
      }
    }
  }, [isDragging, handlePointerMove, handlePointerUp])

  if (!images || images.length === 0) {
    return null
  }

  return (
    <motion.div
      ref={motionDivRef}
      onPointerDown={handlePointerDown}
      className='will-change-transform inline-flex flex-wrap gap-16 cursor-grab'
      style={{
        x,
        y,
        touchAction: 'none',
      }}
    >
      {images.map((img) => {
        const width = img.aspectRatio < 1 ? '220px' : '400px'
        return (
          <GalleryImage
            key={img.url}
            style={{
              width,
              aspectRatio: img.aspectRatio,
            }}
            image={img}
          />
        )
      })}
    </motion.div>
  )
}
