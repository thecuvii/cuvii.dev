'use client'

import type { CSSProperties, ReactNode } from 'react'
import { clsxm } from '@zolplay/clsxm'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

export type DragCanvasControls = {
  resetPosition: () => void
  randomPosition: () => void
  resetZoom: () => void
  zoomIn: () => void
  zoomOut: () => void
}

export type DragCanvasProps = {
  children: ReactNode
  canDrag?: boolean
  canZoom?: boolean
  className?: string
  style?: CSSProperties
  width?: number
  height?: number
  minZoom?: number
  maxZoom?: number
  zoomStep?: number
  onControlsReady?: (controls: DragCanvasControls) => void
}

export function DragCanvas({
  children,
  canDrag = true,
  canZoom = true,
  className,
  style,
  width,
  height,
  minZoom = 0.5,
  maxZoom = 3,
  zoomStep = 0.1,
  onControlsReady,
}: DragCanvasProps) {
  return (
    <TransformWrapper
      initialScale={1}
      minScale={minZoom}
      maxScale={maxZoom}
      wheel={{
        disabled: !canZoom,
        step: zoomStep,
      }}
      panning={{
        disabled: !canDrag,
        velocityDisabled: false,
      }}
      doubleClick={{
        disabled: !canZoom,
        step: zoomStep * 2,
      }}
      limitToBounds={false}
      centerOnInit={true}
    >
      {({ zoomIn, zoomOut, centerView, setTransform }) => {
        // Expose controls through callback
        if (onControlsReady) {
          onControlsReady({
            resetPosition: () => centerView(),
            randomPosition: () => {
              if (!width || !height) return
              const randomX = (Math.random() - 0.5) * 200
              const randomY = (Math.random() - 0.5) * 200
              setTransform(randomX, randomY, 1)
            },
            resetZoom: () => setTransform(0, 0, 1),
            zoomIn,
            zoomOut,
          })
        }

        return (
          <TransformComponent
            wrapperClass={clsxm('will-change-transform origin-center absolute w-full h-full', className)}
            contentClass='w-full h-full'
            wrapperStyle={{
              cursor: canDrag ? 'grab' : 'default',
              touchAction: 'none',
              ...style,
            }}
          >
            {children}
          </TransformComponent>
        )
      }}
    </TransformWrapper>
  )
}
