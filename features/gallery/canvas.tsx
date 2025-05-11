import type { CSSProperties, ReactNode } from 'react'
import { clsxm } from '@zolplay/clsxm'
import { useCallback, useEffect, useRef, useState } from 'react'

const ANIMATION_SETTINGS = {
  dragEase: 0.075, // Easing factor for the drag animation
  momentumFactor: 150, // Multiplier for momentum after releasing drag
  stopThreshold: 0.1, // If movement is less than this, stop animation
}

export function GalleryCanvas({
  children,
  canDrag = true,
  className,
  style,
  width,
  height,
}: {
  children: ReactNode
  canDrag?: boolean
  className?: string
  style?: CSSProperties
  width?: number
  height?: number
}) {
  const galleryRef = useRef<HTMLDivElement>(null)

  // Refs for animation values that don't directly trigger re-renders
  const currentX = useRef(width ? width / 2 : 0)
  const currentY = useRef(height ? height / 2 : 0)
  const targetX = useRef(0)
  const targetY = useRef(0)

  const dragStartX = useRef(0)
  const dragStartY = useRef(0)
  const lastDragTime = useRef(0)
  const dragVelocityX = useRef(0)
  const dragVelocityY = useRef(0)
  const animationFrameId = useRef<number | null>(null)
  // const mouseHasMoved = useRef(false); // To distinguish click from drag if needed

  // State for dragging status and transform values (to trigger re-renders)
  const [isDragging, setIsDragging] = useState(false)
  const [translateX, setTranslateX] = useState(0)
  const [translateY, setTranslateY] = useState(0)

  const animate = useCallback(() => {
    const ease = ANIMATION_SETTINGS.dragEase
    currentX.current += (targetX.current - currentX.current) * ease
    currentY.current += (targetY.current - currentY.current) * ease

    // Update state to apply transform
    // Rounding to avoid sub-pixel jitter and tiny unnecessary updates
    const nextTranslateX = Math.round(currentX.current * 100) / 100
    const nextTranslateY = Math.round(currentY.current * 100) / 100

    setTranslateX(nextTranslateX)
    setTranslateY(nextTranslateY)

    const deltaX = Math.abs(targetX.current - currentX.current)
    const deltaY = Math.abs(targetY.current - currentY.current)

    // Continue animation if still moving significantly or actively dragging
    if (isDragging || deltaX > ANIMATION_SETTINGS.stopThreshold || deltaY > ANIMATION_SETTINGS.stopThreshold) {
      animationFrameId.current = requestAnimationFrame(animate)
    } else {
      // Snap to final target when animation is considered stopped
      setTranslateX(targetX.current)
      setTranslateY(targetY.current)
      currentX.current = targetX.current // Sync refs
      currentY.current = targetY.current
      animationFrameId.current = null // Clear animation ID
    }
    // The `updateVisibleItems` logic from the original code is for optimization.
    // In React, this would typically be handled by virtualization libraries
    // if performance with many items becomes an issue. For now, we omit it.
  }, [isDragging]) // isDragging is a dependency

  // Effect to start/stop animation loop
  useEffect(() => {
    // If dragging, or if current position is not target, and no animation is running, start one.
    const needsAnimating =
      isDragging ||
      Math.abs(targetX.current - currentX.current) > ANIMATION_SETTINGS.stopThreshold ||
      Math.abs(targetY.current - currentY.current) > ANIMATION_SETTINGS.stopThreshold

    if (needsAnimating && !animationFrameId.current) {
      animationFrameId.current = requestAnimationFrame(animate)
    }

    // Cleanup on unmount or if animate/isDragging changes in a way that should stop the loop
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
        animationFrameId.current = null
      }
    }
  }, [animate, isDragging, translateX, translateY]) // translateX/Y are included to re-evaluate if the animation should stop or start
  // e.g. when snapping to target.

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canDrag || !galleryRef.current) return

      e.preventDefault() // Prevent default text selection or image drag
      setIsDragging(true)
      // mouseHasMoved.current = false;

      // Stop any existing momentum by setting target to current
      targetX.current = currentX.current
      targetY.current = currentY.current

      dragStartX.current = e.clientX
      dragStartY.current = e.clientY
      lastDragTime.current = Date.now()
      dragVelocityX.current = 0
      dragVelocityY.current = 0

      galleryRef.current.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none' // Prevent text selection globally

      // Ensure animation loop starts/continues
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current)
      animationFrameId.current = requestAnimationFrame(animate)
    },
    [canDrag, animate],
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !canDrag) return

      const dx = e.clientX - dragStartX.current
      const dy = e.clientY - dragStartY.current

      // if (!mouseHasMoved.current && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
      //   mouseHasMoved.current = true;
      // }

      const now = Date.now()
      const dt = Math.max(10, now - lastDragTime.current) // Ensure dt is not 0 or too small
      lastDragTime.current = now

      dragVelocityX.current = dx / dt
      dragVelocityY.current = dy / dt

      targetX.current += dx
      targetY.current += dy

      dragStartX.current = e.clientX // Update start for next delta
      dragStartY.current = e.clientY

      // The animation loop is already running if isDragging is true.
      // The `animate` function will pick up the new targetX/Y.
    },
    [isDragging, canDrag],
  )

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)

    document.body.style.userSelect = '' // Re-enable text selection

    if (galleryRef.current) {
      galleryRef.current.style.cursor = 'grab'
    }

    if (canDrag) {
      if (Math.abs(dragVelocityX.current) > 0.05 || Math.abs(dragVelocityY.current) > 0.05) {
        const momentum = ANIMATION_SETTINGS.momentumFactor
        targetX.current += dragVelocityX.current * momentum
        targetY.current += dragVelocityY.current * momentum
      }
    }
    // The animate() loop will continue due to momentum (targetX/Y changed)
    // and isDragging becoming false. It will run until currentX/Y reach targetX/Y.
    // We need to ensure it's running if it somehow stopped.
    if (!animationFrameId.current) {
      animationFrameId.current = requestAnimationFrame(animate)
    }
  }, [isDragging, canDrag, animate])

  // Effect for global event listeners
  useEffect(() => {
    if (!canDrag) return // Don't add listeners if not draggable

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    // Consider adding 'mouseleave' on document.body to handle mouse leaving the window
    const handleMouseLeaveWindow = (e: MouseEvent) => {
      // Check if mouse truly left the document body, not just an element within it
      if (isDragging && e.target === document.body && !e.relatedTarget) {
        handleMouseUp()
      }
    }
    document.body.addEventListener('mouseleave', handleMouseLeaveWindow)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      document.body.removeEventListener('mouseleave', handleMouseLeaveWindow)
      document.body.style.userSelect = '' // Ensure cleanup
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [handleMouseMove, handleMouseUp, canDrag, isDragging]) // isDragging added for handleMouseLeaveWindow logic

  return (
    <div
      ref={galleryRef}
      className={clsxm('will-change-transform origin-center', className)}
      style={{
        transform: `translate(${translateX}px, ${translateY}px)`,
        cursor: canDrag ? (isDragging ? 'grabbing' : 'grab') : 'default',
        touchAction: 'none', // Useful for preventing default touch behaviors on touch devices
        ...style,
      }}
      onMouseDown={canDrag ? handleMouseDown : undefined}
      // Prevent browser's default image drag behavior
      onDragStart={(e) => e.preventDefault()}
    >
      {children}
    </div>
  )
}
