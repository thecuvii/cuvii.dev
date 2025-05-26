import type { DragRefs } from './types'
import { useLayoutEffect } from 'react'

export function useCanvasInitialization(
  galleryRef: React.RefObject<HTMLDivElement | null>,
  width: number | undefined,
  height: number | undefined,
  isInitialized: boolean,
  dragRefs: DragRefs,
  setTranslateX: (x: number) => void,
  setTranslateY: (y: number) => void,
  setIsInitialized: (initialized: boolean) => void,
) {
  useLayoutEffect(() => {
    if (!galleryRef.current || !width || !height || isInitialized) return

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    const centerX = (viewportWidth - width) / 2
    const centerY = (viewportHeight - height) / 2

    dragRefs.targetX.current = centerX
    dragRefs.targetY.current = centerY
    dragRefs.currentX.current = centerX
    dragRefs.currentY.current = centerY
    setTranslateX(centerX)
    setTranslateY(centerY)
    setIsInitialized(true)
  }, [width, height, isInitialized, galleryRef, dragRefs, setTranslateX, setTranslateY, setIsInitialized])
}
