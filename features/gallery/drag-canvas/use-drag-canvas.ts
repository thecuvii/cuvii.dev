import type { DragRefs, DragState } from './types'
import { useRef, useState } from 'react'
import { useCanvasInitialization } from './use-canvas-initialization'
import { useDragAnimation } from './use-drag-animation'
import { useDragEvents } from './use-drag-events'
import { useDragHandlers } from './use-drag-handlers'

export function useDragCanvas(canDrag: boolean, width: number | undefined, height: number | undefined) {
  const galleryRef = useRef<HTMLDivElement>(null)

  const dragRefs: DragRefs = {
    currentX: useRef(0),
    currentY: useRef(0),
    targetX: useRef(0),
    targetY: useRef(0),
    dragStartX: useRef(0),
    dragStartY: useRef(0),
    lastDragTime: useRef(0),
    dragVelocityX: useRef(0),
    dragVelocityY: useRef(0),
    animationFrameId: useRef<number | null>(null),
    touchIdentifier: useRef<number | null>(null),
  }

  const [isDragging, setIsDragging] = useState(false)
  const [translateX, setTranslateX] = useState(0)
  const [translateY, setTranslateY] = useState(0)
  const [isInitialized, setIsInitialized] = useState(false)

  const dragState: DragState = {
    isDragging,
    translateX,
    translateY,
    isInitialized,
  }

  const animate = useDragAnimation(dragRefs, dragState, setTranslateX, setTranslateY)

  useCanvasInitialization(
    galleryRef,
    width,
    height,
    isInitialized,
    dragRefs,
    setTranslateX,
    setTranslateY,
    setIsInitialized,
  )

  const { startDrag, updateDrag, endDrag } = useDragHandlers(
    canDrag,
    galleryRef,
    dragRefs,
    isDragging,
    setIsDragging,
    animate,
  )

  const { handleMouseDown, handleTouchStart } = useDragEvents(
    canDrag,
    isDragging,
    dragRefs,
    startDrag,
    updateDrag,
    endDrag,
  )

  return {
    galleryRef,
    dragState,
    handleMouseDown,
    handleTouchStart,
  }
}
