'use client'

import type { DragCanvasProps } from './types'
import { clsxm } from '@zolplay/clsxm'
import { useDragCanvas } from './use-drag-canvas'

export function DragCanvas({ children, canDrag = true, className, style, width, height }: DragCanvasProps) {
  const { galleryRef, dragState, handleMouseDown, handleTouchStart } = useDragCanvas(canDrag, width, height)

  return (
    <div
      ref={galleryRef}
      className={clsxm('will-change-transform origin-center', className)}
      style={{
        transform: `translate(${dragState.translateX}px, ${dragState.translateY}px)`,
        cursor: canDrag ? (dragState.isDragging ? 'grabbing' : 'grab') : 'default',
        touchAction: 'none',
        opacity: dragState.isInitialized ? 1 : 0,
        transition: dragState.isInitialized ? 'none' : 'opacity 0.2s ease-in-out',
        ...style,
      }}
      onMouseDown={canDrag ? handleMouseDown : undefined}
      onTouchStart={canDrag ? handleTouchStart : undefined}
      onDragStart={(e) => e.preventDefault()}
    >
      {children}
    </div>
  )
}
