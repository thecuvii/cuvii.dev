import type { CSSProperties, ReactNode, RefObject } from 'react'

export type DragCanvasProps = {
  children: ReactNode
  canDrag?: boolean
  className?: string
  style?: CSSProperties
  width?: number
  height?: number
}

export type DragState = {
  isDragging: boolean
  translateX: number
  translateY: number
  isInitialized: boolean
}

export type DragRefs = {
  currentX: RefObject<number>
  currentY: RefObject<number>
  targetX: RefObject<number>
  targetY: RefObject<number>
  dragStartX: RefObject<number>
  dragStartY: RefObject<number>
  lastDragTime: RefObject<number>
  dragVelocityX: RefObject<number>
  dragVelocityY: RefObject<number>
  animationFrameId: RefObject<number | null>
  touchIdentifier: RefObject<number | null>
}

export type AnimationConfig = {
  dragEase: number
  momentumFactor: number
  stopThreshold: number
}
