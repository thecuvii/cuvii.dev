import type { CSSProperties, ReactNode } from 'react'

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
  isInitialized: boolean
}

export type DragHandlers = {
  onMouseDown: (event: React.MouseEvent) => void
  onTouchStart: (event: React.TouchEvent) => void
}

export type DragVelocity = {
  x: number
  y: number
}
