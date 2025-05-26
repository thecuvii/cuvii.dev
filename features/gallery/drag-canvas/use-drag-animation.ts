import type { DragRefs, DragState } from './types'
import { useCallback, useEffect, useRef } from 'react'
import { ANIMATION_SETTINGS } from './constants'

export function useDragAnimation(
  dragRefs: DragRefs,
  dragState: DragState,
  setTranslateX: (x: number) => void,
  setTranslateY: (y: number) => void,
) {
  const animate = useCallback(() => {
    const ease = ANIMATION_SETTINGS.dragEase
    dragRefs.currentX.current += (dragRefs.targetX.current - dragRefs.currentX.current) * ease
    dragRefs.currentY.current += (dragRefs.targetY.current - dragRefs.currentY.current) * ease

    const nextTranslateX = Math.round(dragRefs.currentX.current * 100) / 100
    const nextTranslateY = Math.round(dragRefs.currentY.current * 100) / 100

    setTranslateX(nextTranslateX)
    setTranslateY(nextTranslateY)

    const deltaX = Math.abs(dragRefs.targetX.current - dragRefs.currentX.current)
    const deltaY = Math.abs(dragRefs.targetY.current - dragRefs.currentY.current)

    if (
      dragState.isDragging ||
      deltaX > ANIMATION_SETTINGS.stopThreshold ||
      deltaY > ANIMATION_SETTINGS.stopThreshold
    ) {
      dragRefs.animationFrameId.current = requestAnimationFrame(animate)
    } else {
      setTranslateX(dragRefs.targetX.current)
      setTranslateY(dragRefs.targetY.current)
      dragRefs.currentX.current = dragRefs.targetX.current
      dragRefs.currentY.current = dragRefs.targetY.current
      dragRefs.animationFrameId.current = null
    }
  }, [dragRefs, dragState.isDragging, setTranslateX, setTranslateY])

  useEffect(() => {
    const needsAnimating =
      dragState.isDragging ||
      Math.abs(dragRefs.targetX.current - dragRefs.currentX.current) > ANIMATION_SETTINGS.stopThreshold ||
      Math.abs(dragRefs.targetY.current - dragRefs.currentY.current) > ANIMATION_SETTINGS.stopThreshold

    if (needsAnimating && !dragRefs.animationFrameId.current) {
      dragRefs.animationFrameId.current = requestAnimationFrame(animate)
    }

    return () => {
      if (dragRefs.animationFrameId.current) {
        cancelAnimationFrame(dragRefs.animationFrameId.current)
        dragRefs.animationFrameId.current = null
      }
    }
  }, [animate, dragState.isDragging, dragState.translateX, dragState.translateY, dragRefs])

  return animate
}
