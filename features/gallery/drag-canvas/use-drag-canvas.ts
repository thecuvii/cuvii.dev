import type { DragHandlers, DragState } from './types'
import { animate, useMotionValue } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

export function useDragCanvas(canDrag: boolean, width: number | undefined, height: number | undefined) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isInitialized, setIsInitialized] = useState(false)

  // Consolidated drag state with velocity tracking
  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    touchId: null as number | null,
    lastTime: 0,
    lastX: 0,
    lastY: 0,
    velocityX: 0,
    velocityY: 0,
  })

  // Initialize canvas position
  useEffect(() => {
    if (!containerRef.current || isInitialized || !width || !height) return

    const centerX = (window.innerWidth - width) / 2
    const centerY = (window.innerHeight - height) / 2

    x.set(centerX)
    y.set(centerY)
    setIsInitialized(true)
  }, [width, height, isInitialized, x, y])

  // Cleanup function for event listeners
  const cleanupListeners = useRef<(() => void) | null>(null)

  // Start drag
  const startDrag = useCallback(
    (clientX: number, clientY: number, touchId?: number) => {
      if (!canDrag) return

      const state = dragStateRef.current
      const now = Date.now()

      state.isDragging = true
      state.startX = clientX - x.get()
      state.startY = clientY - y.get()
      state.touchId = touchId ?? null
      state.lastTime = now
      state.lastX = clientX
      state.lastY = clientY
      state.velocityX = 0
      state.velocityY = 0
    },
    [canDrag, x, y],
  )

  // Update drag with velocity tracking
  const updateDrag = useCallback(
    (clientX: number, clientY: number) => {
      const state = dragStateRef.current
      if (!state.isDragging) return

      const now = Date.now()
      const deltaTime = now - state.lastTime

      if (deltaTime > 0) {
        const deltaX = clientX - state.lastX
        const deltaY = clientY - state.lastY

        // Calculate velocity (pixels per millisecond)
        state.velocityX = deltaX / deltaTime
        state.velocityY = deltaY / deltaTime

        state.lastTime = now
        state.lastX = clientX
        state.lastY = clientY
      }

      x.set(clientX - state.startX)
      y.set(clientY - state.startY)
    },
    [x, y],
  )

  // End drag with momentum
  const endDrag = useCallback(() => {
    const state = dragStateRef.current
    if (!state.isDragging) return

    state.isDragging = false

    // Apply momentum if velocity is significant
    const velocityThreshold = 0.3 // pixels per millisecond
    const momentumFactor = 100 // multiplier for momentum distance

    if (Math.abs(state.velocityX) > velocityThreshold || Math.abs(state.velocityY) > velocityThreshold) {
      const currentX = x.get()
      const currentY = y.get()

      const momentumX = state.velocityX * momentumFactor
      const momentumY = state.velocityY * momentumFactor

      // Animate to final position with deceleration
      animate(x, currentX + momentumX, {
        type: 'spring',
        damping: 15,
        stiffness: 100,
        mass: 0.8,
      })

      animate(y, currentY + momentumY, {
        type: 'spring',
        damping: 15,
        stiffness: 100,
        mass: 0.8,
      })
    }

    state.touchId = null

    if (cleanupListeners.current) {
      cleanupListeners.current()
      cleanupListeners.current = null
    }
  }, [x, y])

  // Mouse handlers
  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (!canDrag || dragStateRef.current.isDragging) return

      event.preventDefault()
      startDrag(event.clientX, event.clientY)

      const handleMouseMove = (e: MouseEvent) => {
        updateDrag(e.clientX, e.clientY)
      }

      const handleMouseUp = () => {
        endDrag()
      }

      document.addEventListener('mousemove', handleMouseMove, { passive: true })
      document.addEventListener('mouseup', handleMouseUp, { passive: true })

      cleanupListeners.current = () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    },
    [startDrag, updateDrag, endDrag, canDrag],
  )

  // Touch handlers
  const handleTouchStart = useCallback(
    (event: React.TouchEvent) => {
      if (!canDrag || dragStateRef.current.isDragging) return

      event.preventDefault()
      const touch = event.touches[0]
      if (!touch) return

      startDrag(touch.clientX, touch.clientY, touch.identifier)

      const handleTouchMove = (e: TouchEvent) => {
        const state = dragStateRef.current
        const touch = Array.from(e.touches).find((t) => t.identifier === state.touchId)
        if (!touch) return
        updateDrag(touch.clientX, touch.clientY)
      }

      const handleTouchEnd = (e: TouchEvent) => {
        const state = dragStateRef.current
        const hasTouch = Array.from(e.touches).some((t) => t.identifier === state.touchId)
        if (!hasTouch) {
          endDrag()
        }
      }

      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd, { passive: false })
      document.addEventListener('touchcancel', handleTouchEnd, { passive: false })

      cleanupListeners.current = () => {
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
        document.removeEventListener('touchcancel', handleTouchEnd)
      }
    },
    [canDrag, startDrag, updateDrag, endDrag],
  )

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cleanupListeners.current) {
        cleanupListeners.current()
      }
    }
  }, [])

  // Utility functions for external control
  const resetPosition = useCallback(() => {
    if (!width || !height) return

    const centerX = (window.innerWidth - width) / 2
    const centerY = (window.innerHeight - height) / 2

    x.set(centerX)
    y.set(centerY)
  }, [width, height, x, y])

  const randomPosition = useCallback(() => {
    if (!width || !height) return

    const maxX = window.innerWidth - width / 2
    const maxY = window.innerHeight - height / 2
    const minX = -width / 2
    const minY = -height / 2

    const randomX = Math.random() * (maxX - minX) + minX
    const randomY = Math.random() * (maxY - minY) + minY

    x.set(randomX)
    y.set(randomY)
  }, [width, height, x, y])

  const dragState: DragState = {
    isDragging: dragStateRef.current.isDragging,
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
    resetPosition,
    randomPosition,
  }
}
