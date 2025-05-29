'use client'

import type { CSSProperties, ReactNode } from 'react'
import { clsxm } from '@zolplay/clsxm'
import { TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch'

export type ZoomPanCanvasControls = {
  resetTransform: () => void
  centerView: () => void
  zoomIn: () => void
  zoomOut: () => void
  setTransform: (x: number, y: number, scale: number) => void
}

export type ZoomPanCanvasProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  minScale?: number
  maxScale?: number
  initialScale?: number
  initialX?: number
  initialY?: number
  wheel?: {
    disabled?: boolean
    step?: number
  }
  pan?: {
    disabled?: boolean
    velocity?: boolean
  }
  onTransformChange?: (transform: { x: number; y: number; scale: number }) => void
  onControlsReady?: (controls: ZoomPanCanvasControls) => void
}

export function ZoomPanCanvas({
  children,
  className,
  style,
  minScale = 0.5,
  maxScale = 3,
  initialScale = 1,
  initialX = 0,
  initialY = 0,
  wheel = {},
  pan = {},
  onTransformChange,
  onControlsReady,
}: ZoomPanCanvasProps) {
  return (
    <TransformWrapper
      initialScale={initialScale}
      initialPositionX={initialX}
      initialPositionY={initialY}
      minScale={minScale}
      maxScale={maxScale}
      wheel={{
        disabled: wheel.disabled ?? false,
        step: wheel.step ?? 0.1,
      }}
      panning={{
        disabled: pan.disabled ?? false,
        velocityDisabled: !(pan.velocity ?? true),
      }}
      doubleClick={{
        disabled: false,
        step: 0.7,
      }}
      onTransformed={(ref, state) => {
        onTransformChange?.({
          x: state.positionX,
          y: state.positionY,
          scale: state.scale,
        })
      }}
    >
      {({ zoomIn, zoomOut, resetTransform, centerView, setTransform }) => {
        // Expose controls through callback
        if (onControlsReady) {
          onControlsReady({
            resetTransform,
            centerView,
            zoomIn,
            zoomOut,
            setTransform,
          })
        }

        return (
          <TransformComponent
            wrapperClass={clsxm('w-full h-full', className)}
            contentClass='w-full h-full'
            wrapperStyle={style}
          >
            {children}
          </TransformComponent>
        )
      }}
    </TransformWrapper>
  )
}
