import type { DragHandlers, DragState, DragVelocity } from './types'
import { useMotionValue } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

export function useDragCanvas(canDrag: boolean, width: number | undefined, height: number | undefined) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Drag state references
  const dragStartRef = useRef({ x: 0, y: 0 })
  const lastPositionRef = useRef({ x: 0, y: 0 })
  const lastTimeRef = useRef(0)
  const velocityRef = useRef<DragVelocity>({ x: 0, y: 0 })
  const touchIdRef = useRef<number | null>(null)
  const rafIdRef = useRef<number | null>(null)

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

  // Momentum animation
  const animateMomentum = useCallback(() => {
    const velocity = velocityRef.current
    const threshold = 0.1

    if (Math.abs(velocity.x) < threshold && Math.abs(velocity.y) < threshold) {
      rafIdRef.current = null
      return
    }

    const currentX = x.get()
    const currentY = y.get()

    x.set(currentX + velocity.x * 16) // 60fps assumption
    y.set(currentY + velocity.y * 16)

    // Apply friction
    velocity.x *= 0.95
    velocity.y *= 0.95

    rafIdRef.current = requestAnimationFrame(animateMomentum)
  }, [x, y])

  // Start drag
  const startDrag = useCallback(
    (clientX: number, clientY: number, touchId?: number) => {
      if (!canDrag) return

      setIsDragging(true)
      dragStartRef.current = { x: clientX - x.get(), y: clientY - y.get() }
      lastPositionRef.current = { x: clientX, y: clientY }
      lastTimeRef.current = Date.now()
      velocityRef.current = { x: 0, y: 0 }

      if (touchId !== undefined) {
        touchIdRef.current = touchId
      }

      // Cancel any ongoing momentum animation
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
    },
    [canDrag, x, y],
  )

  // Update drag
  const updateDrag = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDragging) return

      const newX = clientX - dragStartRef.current.x
      const newY = clientY - dragStartRef.current.y

      x.set(newX)
      y.set(newY)

      // Calculate velocity for momentum
      const now = Date.now()
      const deltaTime = now - lastTimeRef.current

      if (deltaTime > 0) {
        velocityRef.current = {
          x: ((clientX - lastPositionRef.current.x) / deltaTime) * 16, // Scale for 60fps
          y: ((clientY - lastPositionRef.current.y) / deltaTime) * 16,
        }
      }

      lastPositionRef.current = { x: clientX, y: clientY }
      lastTimeRef.current = now
    },
    [isDragging, x, y],
  )

  // End drag
  const endDrag = useCallback(() => {
    setIsDragging(false)
    touchIdRef.current = null

    // Start momentum animation if velocity is significant
    const velocity = velocityRef.current
    if (Math.abs(velocity.x) > 0.5 || Math.abs(velocity.y) > 0.5) {
      animateMomentum()
    }
  }, [animateMomentum])

  // Mouse handlers
  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
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
    [startDrag, updateDrag, endDrag],
  )

  // Touch handlers
  const handleTouchStart = useCallback(
    (event: React.TouchEvent) => {
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
        }
      }

      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
    },
    [startDrag, updateDrag, endDrag],
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
