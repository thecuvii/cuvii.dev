import type { DragRefs } from './types'
import { useCallback } from 'react'
import { ANIMATION_SETTINGS } from './constants'

export function useDragHandlers(
  canDrag: boolean,
  galleryRef: React.RefObject<HTMLDivElement | null>,
  dragRefs: DragRefs,
  isDragging: boolean,
  setIsDragging: (dragging: boolean) => void,
  animate: () => void,
) {
  const startDrag = useCallback(
    (clientX: number, clientY: number, touchId?: number) => {
      if (!canDrag || !galleryRef.current) return

      setIsDragging(true)
      dragRefs.touchIdentifier.current = touchId ?? null

      dragRefs.targetX.current = dragRefs.currentX.current
      dragRefs.targetY.current = dragRefs.currentY.current

      dragRefs.dragStartX.current = clientX
      dragRefs.dragStartY.current = clientY
      dragRefs.lastDragTime.current = Date.now()
      dragRefs.dragVelocityX.current = 0
      dragRefs.dragVelocityY.current = 0

      galleryRef.current.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'

      if (dragRefs.animationFrameId.current) cancelAnimationFrame(dragRefs.animationFrameId.current)
      dragRefs.animationFrameId.current = requestAnimationFrame(animate)
    },
    [canDrag, galleryRef, dragRefs, setIsDragging, animate],
  )

  const updateDrag = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDragging || !canDrag) return

      const dx = clientX - dragRefs.dragStartX.current
      const dy = clientY - dragRefs.dragStartY.current

      const now = Date.now()
      const dt = Math.max(10, now - dragRefs.lastDragTime.current)
      dragRefs.lastDragTime.current = now

      dragRefs.dragVelocityX.current = dx / dt
      dragRefs.dragVelocityY.current = dy / dt

      dragRefs.targetX.current += dx
      dragRefs.targetY.current += dy

      dragRefs.dragStartX.current = clientX
      dragRefs.dragStartY.current = clientY
    },
    [isDragging, canDrag, dragRefs],
  )

  const endDrag = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)
    dragRefs.touchIdentifier.current = null

    document.body.style.userSelect = ''

    if (galleryRef.current) {
      galleryRef.current.style.cursor = 'grab'
    }

    if (canDrag) {
      if (Math.abs(dragRefs.dragVelocityX.current) > 0.05 || Math.abs(dragRefs.dragVelocityY.current) > 0.05) {
        const momentum = ANIMATION_SETTINGS.momentumFactor
        dragRefs.targetX.current += dragRefs.dragVelocityX.current * momentum
        dragRefs.targetY.current += dragRefs.dragVelocityY.current * momentum
      }
    }

    if (!dragRefs.animationFrameId.current) {
      dragRefs.animationFrameId.current = requestAnimationFrame(animate)
    }
  }, [isDragging, canDrag, galleryRef, dragRefs, setIsDragging, animate])

  return {
    startDrag,
    updateDrag,
    endDrag,
  }
}
