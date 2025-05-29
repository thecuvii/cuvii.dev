'use client'

import type { DragCanvasProps } from './types'
import { clsxm } from '@zolplay/clsxm'
import { motion } from 'motion/react'
import { useDragCanvas } from './use-drag-canvas'

export function DragCanvas({ children, canDrag = true, className, style, width, height }: DragCanvasProps) {
  const { containerRef, dragState, dragHandlers, motionValues } = useDragCanvas(canDrag, width, height)

  return (
    <motion.div
      ref={containerRef}
      className={clsxm('will-change-transform origin-center', className)}
      style={{
        x: motionValues.x,
        y: motionValues.y,
        cursor: canDrag ? (dragState.isDragging ? 'grabbing' : 'grab') : 'default',
        touchAction: 'none',
        opacity: dragState.isInitialized ? 1 : 0,
        transition: dragState.isInitialized ? 'none' : 'opacity 0.2s ease-in-out',
        ...style,
      }}
      onMouseDown={canDrag ? dragHandlers.onMouseDown : undefined}
      onTouchStart={canDrag ? dragHandlers.onTouchStart : undefined}
      onDragStart={(e) => e.preventDefault()}
    >
      {children}
    </motion.div>
  )
}
