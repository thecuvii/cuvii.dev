import type { DragHandlers, DragState } from './types'
import { useMotionValue } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

export function useDragCanvas(canDrag: boolean, width: number | undefined, height: number | undefined) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Drag state references
  const dragStateRef = useRef({ isDragging: false })
  const dragStartRef = useRef({ x: 0, y: 0 })
  const touchIdRef = useRef<number | null>(null)

  // Initialize canvas position
  useEffect(() => {
    if (!containerRef.current || isInitialized) return

    // Center the canvas
    const centerX = width ? (window.innerWidth - width) / 2 : 0
    const centerY = height ? (window.innerHeight - height) / 2 : 0

    x.set(centerX)
    y.set(centerY)
    setIsInitialized(true)
  }, [width, height, isInitialized, x, y])

  // Start drag
  const startDrag = useCallback(
    (clientX: number, clientY: number, touchId?: number) => {
      if (!canDrag) return

      dragStateRef.current.isDragging = true
      setIsDragging(true)
      dragStartRef.current = { x: clientX - x.get(), y: clientY - y.get() }

      if (touchId !== undefined) {
        touchIdRef.current = touchId
      }
    },
    [canDrag, x, y],
  )

  // Update drag
  const updateDrag = useCallback(
    (clientX: number, clientY: number) => {
      if (!dragStateRef.current.isDragging) return

      const newX = clientX - dragStartRef.current.x
      const newY = clientY - dragStartRef.current.y

      x.set(newX)
      y.set(newY)
    },
    [x, y],
  )

  // End drag
  const endDrag = useCallback(() => {
    dragStateRef.current.isDragging = false
    setIsDragging(false)
    touchIdRef.current = null
  }, [])

  // Mouse handlers
  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (!canDrag) return

      event.preventDefault()
      startDrag(event.clientX, event.clientY)

      const handleMouseMove = (e: MouseEvent) => {
        updateDrag(e.clientX, e.clientY)
      }

      const handleMouseUp = () => {
        endDrag()
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    },
    [startDrag, updateDrag, endDrag, canDrag],
  )

  // Touch handlers
  const handleTouchStart = useCallback(
    (event: React.TouchEvent) => {
      if (!canDrag) return

      event.preventDefault()
      const touch = event.touches[0]
      if (!touch) return

      startDrag(touch.clientX, touch.clientY, touch.identifier)

      const handleTouchMove = (e: TouchEvent) => {
        const touch = Array.from(e.touches).find((t) => t.identifier === touchIdRef.current)
        if (!touch) return
        updateDrag(touch.clientX, touch.clientY)
      }

      const handleTouchEnd = (e: TouchEvent) => {
        const hasTouch = Array.from(e.touches).some((t) => t.identifier === touchIdRef.current)
        if (!hasTouch) {
          endDrag()
          document.removeEventListener('touchmove', handleTouchMove)
          document.removeEventListener('touchend', handleTouchEnd)
          document.removeEventListener('touchcancel', handleTouchEnd)
        }
      }

      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd, { passive: false })
      document.addEventListener('touchcancel', handleTouchEnd, { passive: false })
    },
    [canDrag, startDrag, updateDrag, endDrag],
  )

  const dragState: DragState = {
    isDragging,
    isInitialized,
  }

  const dragHandlers: DragHandlers = {
    onMouseDown: handleMouseDown,
    onTouchStart: handleTouchStart,
  }

  return {
    containerRef,
    dragState,
    dragHandlers,
    motionValues: { x, y },
  }
}
