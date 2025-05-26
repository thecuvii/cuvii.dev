export type DragCanvasProps = {
  children: React.ReactNode
  canDrag?: boolean
  className?: string
  style?: React.CSSProperties
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
  currentX: React.MutableRefObject<number>
  currentY: React.MutableRefObject<number>
  targetX: React.MutableRefObject<number>
  targetY: React.MutableRefObject<number>
  dragStartX: React.MutableRefObject<number>
  dragStartY: React.MutableRefObject<number>
  lastDragTime: React.MutableRefObject<number>
  dragVelocityX: React.MutableRefObject<number>
  dragVelocityY: React.MutableRefObject<number>
  animationFrameId: React.MutableRefObject<number | null>
  touchIdentifier: React.MutableRefObject<number | null>
}

export type AnimationConfig = {
  dragEase: number
  momentumFactor: number
  stopThreshold: number
}
