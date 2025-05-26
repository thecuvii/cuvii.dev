import type { DragRefs } from './types'
import { useCallback, useEffect } from 'react'

export function useDragEvents(
  canDrag: boolean,
  isDragging: boolean,
  dragRefs: DragRefs,
  startDrag: (clientX: number, clientY: number, touchId?: number) => void,
  updateDrag: (clientX: number, clientY: number) => void,
  endDrag: () => void,
) {
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canDrag) return
      e.preventDefault()
      startDrag(e.clientX, e.clientY)
    },
    [canDrag, startDrag],
  )

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!canDrag || e.touches.length !== 1) return
      e.preventDefault()
      const touch = e.touches[0]
      startDrag(touch.clientX, touch.clientY, touch.identifier)
    },
    [canDrag, startDrag],
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      updateDrag(e.clientX, e.clientY)
    },
    [updateDrag],
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !canDrag || dragRefs.touchIdentifier.current === null) return

      const touch = Array.from(e.touches).find((t) => t.identifier === dragRefs.touchIdentifier.current)
      if (!touch) return

      e.preventDefault()
      updateDrag(touch.clientX, touch.clientY)
    },
    [isDragging, canDrag, dragRefs.touchIdentifier, updateDrag],
  )

  const handleMouseUp = useCallback(() => {
    endDrag()
  }, [endDrag])

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || dragRefs.touchIdentifier.current === null) return

      const hasActiveTouches = Array.from(e.touches).some((t) => t.identifier === dragRefs.touchIdentifier.current)
      if (!hasActiveTouches) {
        endDrag()
      }
    },
    [isDragging, dragRefs.touchIdentifier, endDrag],
  )

  useEffect(() => {
    if (!canDrag) return

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('touchcancel', handleTouchEnd)

    const handleMouseLeaveWindow = (e: MouseEvent) => {
      if (isDragging && e.target === document.body && !e.relatedTarget) {
        handleMouseUp()
      }
    }
    document.body.addEventListener('mouseleave', handleMouseLeaveWindow)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('touchcancel', handleTouchEnd)
      document.body.removeEventListener('mouseleave', handleMouseLeaveWindow)
      document.body.style.userSelect = ''
      if (dragRefs.animationFrameId.current) {
        cancelAnimationFrame(dragRefs.animationFrameId.current)
      }
    }
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd, canDrag, isDragging, dragRefs.animationFrameId])

  return {
    handleMouseDown,
    handleTouchStart,
  }
}
