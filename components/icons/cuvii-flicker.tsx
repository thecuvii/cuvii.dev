'use client'

import type React from 'react'
import { clsxm } from '@zolplay/clsxm'

import { useEffect, useMemo, useRef, useState } from 'react'

type FlickeringGridProps = {
  squareSize?: number
  gridGap?: number
  flickerChance?: number
  color?: string
  width?: number
  height?: number
  className?: string
  maxOpacity?: number
  startImmediately?: boolean
} & React.HTMLAttributes<HTMLDivElement>

const FlickeringGrid = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = 'rgb(0, 0, 0)',
  width,
  height,
  className,
  maxOpacity = 0.3,
  startImmediately = false,
  ...props
}: FlickeringGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(startImmediately)

  const gridStateRef = useRef<{
    squares: Float32Array
    cols: number
    rows: number
    dpr: number
    lastMaxOpacity: number
  }>({
    squares: new Float32Array(0),
    cols: 0,
    rows: 0,
    dpr: 1,
    lastMaxOpacity: maxOpacity,
  })

  const memoizedColor = useMemo(() => {
    const toRGBA = (colorValue: string) => {
      if (typeof window === 'undefined') return `rgba(0,0,0,`
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = tempCanvas.height = 1
      const ctx = tempCanvas.getContext('2d')
      if (!ctx) return `rgba(0,0,0,`
      ctx.fillStyle = colorValue
      ctx.fillRect(0, 0, 1, 1)
      const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data)
      return `rgba(${r},${g},${b},`
    }
    return toRGBA(color)
  }, [color])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const dpr = window.devicePixelRatio || 1
    gridStateRef.current.dpr = dpr

    const updateGridStructure = () => {
      const currentWidth = width || container.clientWidth
      const currentHeight = height || container.clientHeight

      if (canvas.width !== currentWidth * dpr || canvas.height !== currentHeight * dpr) {
        canvas.width = currentWidth * dpr
        canvas.height = currentHeight * dpr
        canvas.style.width = `${currentWidth}px`
        canvas.style.height = `${currentHeight}px`
      }

      const newCols = Math.ceil(currentWidth / (squareSize + gridGap))
      const newRows = Math.ceil(currentHeight / (squareSize + gridGap))

      if (
        newCols !== gridStateRef.current.cols ||
        newRows !== gridStateRef.current.rows ||
        maxOpacity !== gridStateRef.current.lastMaxOpacity
      ) {
        gridStateRef.current.cols = newCols
        gridStateRef.current.rows = newRows
        gridStateRef.current.squares = new Float32Array(newCols * newRows)
        for (let i = 0; i < gridStateRef.current.squares.length; i++) {
          gridStateRef.current.squares[i] = Math.random() * maxOpacity
        }
        gridStateRef.current.lastMaxOpacity = maxOpacity
      }
    }

    updateGridStructure()
    const resizeObserver = new ResizeObserver(updateGridStructure)
    resizeObserver.observe(container)
    return () => resizeObserver.disconnect()
  }, [width, height, squareSize, gridGap, maxOpacity])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isInView) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let lastTime = performance.now()

    const animate = (time: number) => {
      const deltaTime = (time - lastTime) / 1000
      lastTime = time
      const { squares, cols, rows, dpr } = gridStateRef.current

      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity
        }
        squares[i] = Math.min(squares[i], maxOpacity)
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const index = i * rows + j
          if (index < squares.length) {
            const currentOpacity = squares[index]
            ctx.fillStyle = `${memoizedColor}${currentOpacity})`
            ctx.fillRect(
              i * (squareSize + gridGap) * dpr,
              j * (squareSize + gridGap) * dpr,
              squareSize * dpr,
              squareSize * dpr,
            )
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate)
    }
    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isInView, memoizedColor, flickerChance, maxOpacity, squareSize, gridGap])

  useEffect(() => {
    if (startImmediately) {
      if (!isInView) setIsInView(true)
      return
    }
    const canvas = canvasRef.current
    if (!canvas) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setIsInView(entry.isIntersecting)
      },
      { threshold: 0.01 },
    )
    observer.observe(canvas)
    return () => {
      observer.disconnect()
    }
  }, [startImmediately, isInView])

  return (
    <div ref={containerRef} className={clsxm('h-full w-full', className)} {...props}>
      <canvas ref={canvasRef} className='pointer-events-none' />
    </div>
  )
}

type GeneratedGridSettings = {
  color: string
  maxOpacity: number
  flickerChance: number
  squareSize: number
  gridGap: number
}

const svgDataUrlForEffect: string | null =
  `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNzEyIDE2OTUuNDgiPgogIDxkZWZzPgogICAgPHN0eWxlPgogICAgICAuY2xzLTEgewogICAgICAgIGZpbGw6ICMwMjAyMDI7CiAgICAgICAgZmlsbC1ydWxlOiBldmVub2RkOwogICAgICB9CiAgICA8L3N0eWxlPgogIDwvZGVmcz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik00MzIsMTQ0aDE2djMyaDE2di0xNmgxNnYxNmgzMnYtMzJoMTZ2LTE2aDE2di0xNmgzMnYtMTZoMzJ2LTE2aDQ4di0xNmgxNnYxNmgtMTZ2MTZoLTE2djE2aDE2djE2aDQ4di0xNmg2NHYtMTZoNjR2MTZoNjR2MTZoNjR2MTZoMTZ2LTE2aDQ4di0xNmgzMnYtMzJoLTQ4djE2aC00OHYtMTZoLTQ4di0xNmgtODB2LTE2aC02NHYtMTZoMTZ2LTE2aC0xNlYwaC00OHYxNmgtNjR2MTZoLTQ4djE2aC0zMnYxNmgtMzJ2MTZoLTMydjE2aC0xNnYxNmgtMTZ2MTZoLTE2di0xNmgtMTZ2LTE2aC0xNnYxNmgtMTZ2MTZoMTZ2MTZaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTA1NiwxNDR2MTZoLTE2djE2aDE2djE2aDE2djE2aDMydjE2aDE2djMyaDE2djE2aDE2djE2aDE2djE2aDMydjMyaDE2djMyaDE2di0xNmg0OHYtMTZoMTZ2LTE2aC0zMnYtMTZoLTQ4di0zMmgtMTZ2LTMyaDE2di00OGgtMzJ2LTE2aC0xNnYtMTZoLTQ4di0xNmgtNjRaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNDAwLDIyNGgxNnYtMzJoLTMydi0xNmgtMTZ2LTE2aC0zMnY2NGgxNnYxNmg0OHYtMTZaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTc2LDQzMmgzMnYtMTZoMTZ2LTE2aDE2di0xNmgxNnYtMTZoMTZ2LTE2aDE2di0xNmgzMnYtMzJoLTE2di0zMmgzMnYtMTZoMTZ2LTE2aC0zMnYxNmgtNDh2MTZoLTMydjE2aC0zMnY0OGgxNnYxNmgtMTZ2MTZoLTE2djE2aC0xNnYxNmgtMTZ2MTZoMTZ2MTZaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTEyMCwzMjBoLTE2djE2aDE2di0xNloiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xMDg4LDM1MmgxNnYtMTZoLTE2djE2WiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTQxNiwzNTJoLTE2djE2aDE2di0xNloiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik00MDAsMzY4aC0zMnYxNmgzMnYtMTZaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTAwOCwzODR2LTE2aC0xNnYxNmgxNloiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xMDQwLDQwMGgxNnYtMTZoLTE2djE2WiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTEyNDgsMzg0djE2aDE2di0xNmgtMTZaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjU2LDQwMHYxNmgxNnYtMTZoLTE2WiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTMyMCw0MTZ2LTE2aC0xNnYxNmgxNloiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xMDg4LDQxNmgzMnYtMTZoLTMydjE2WiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTEyNjQsNDAwdjE2aDE2di0xNmgtMTZaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjg4LDQxNmgtMTZ2MTZoMTZ2LTE2WiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTg5Niw0MzJoMzJ2LTE2aC0zMnYxNloiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xMTM2LDQxNnYxNmgzMnYtMTZoLTMyWiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTI3Miw0MzJoLTMydjE2aDMydi0xNloiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik02NDAsNDQ4di0xNmgtMTZ2MTZoMTZaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNODgwLDQ2NHYtMzJoLTE2djMyaDE2WiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTExNjgsNDMydjE2aDQ4di0xNmgtNDhaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTkyLDQ0OHYxNmgxNnYtMTZoLTE2WiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTI0MCw0NDhoLTE2djE2aDE2di0xNloiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0zMDQsNDQ4aC0xNnYxNmgxNnYtMTZaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNOTkyLDQ4MGgxNnYtMTZoMzJ2LTE2aC04MHYxNmgzMnYxNloiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0yMjQsNDgwdi0xNmgtMTZ2MTZoMTZaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNOTYwLDQ2NGgtMTZ2MTZoMTZ2LTE2WiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTEwNzIsNDgwdjE2aDY0djE2aDQ4di0xNmgtMzJ2LTE2aC02NHYtMTZoLTQ4djE2aDMyWiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTE5Miw0ODBoLTE2djE2aDE2di0xNloiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0zMDQsODY0di0zMmgxNnY5NmgxNnYtNjRoMTZ2LTE2aC0xNnYtMTZoMTZ2LTQ4aDMydjE2aDE2djE2aDE2djY0aDE2di0xNmg0OHYxNmgtMTZ2MTI4aDE2djE2aDE2di04MGgxNnYtNDhoLTE2di0zMmg2NHYzMmgzMnYtNjRoLTE2di0xNmgtMTZ2MTZoLTY0di00OGgtMTZ2MTZoLTE2djE2aDE2djE2aC00OHYtNDhoLTMydi0xNmgtMTZ2LTE2aC00OHYtMzJoMzJ2MTZoMzJ2MTZoMTZ2LTMyaDE2di0xNmgtMTZ2LTE2aC0xNnYtMTZoLTY0di0xNmgzMnYtMTZoMTZ2LTE2aC0xNnYtNDhoLTE2di0xNmgtMTZ2LTE2aDE2djE2aDE2di0zMmgtMTZ2LTE2aC02NHYtMTZoLTE2di0xNmgtMTZ2MTZoLTE2djE2aC0xNnYxNmgtMTZ2MzJoMTZ2MTZoMzJ2LTE2aDE2djQ4aC0xNnY0OGgtMTZ2MzJoMTZ2MTZoMTZ2NDhoMTZ2MzJoMTZ2MTZoLTE2djMyaC0xNnY0OGgxNnYtMTZoMTZaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNjA4LDQ5NnYtMTZoLTE2djE2aDE2WiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTkyOCw0ODB2MTZoMTZ2LTE2aC0xNloiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xNjAsNDk2aC0xNnYxNmgxNnYtMTZaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNDk2LDYyNHYtNDhoLTE2di02NGgtMTZ2LTE2aC0xNnY4MGgtMTZ2MTZoMTZ2MTZoMTZ2MTZoMzJaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNOTkyLDUyOGgxNnYtMzJoLTE2djE2aC0xNnYtMTZoLTMydjMyaDMydjE2aDE2di0xNloiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik04OTYsNjQwaC0xNnYtMTZoMTZ2LTE2aC04MHYtMTZoMTZ2LTMyaC0xNnYxNmgtMTZ2LTE2aDE2di0xNmgtNDh2MTZoLTE2djE2aC0xNnYtMTZoLTMydi0xNmgtMTZ2LTE2aC00OHYtMTZoLTMydjE2aDE2djE2aDMydjE2aDMydjE2aDE2djE2aDE2djE2aDMydjE2aDY0djE2aDMydjMyaDE2djE2aDQ4di0zMmgtMTZ2LTE2WiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTg0OCw1MTJoLTE2djE2aDE2di0xNloiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik05MTIsNTEyaC0xNnYxNmgxNnYtMTZaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTIwMCw1Mjh2LTE2aC0xNnYxNmgxNloiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik04NjQsNTI4djMyaDE2di0xNmgxNnYtMTZoLTMyWiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTExNjgsNTYwaDMydi0xNmgtMTZ2LTE2aC0xNnYzMloiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik01NDQsNTkydjE2aDQ4di0xNmgtMTZ2LTMyaC0xNnYxNmgtMTZ2LTE2aC0xNnYtMTZoLTE2djMyaDE2djE2aDE2WiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTQwMCw1NzZ2LTE2aC0xNnYxNmgxNloiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik00MTYsNTYwdjE2aDE2di0xNmgtMTZaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTIzMiw1NjB2MTZoMzJ2LTE2aC0zMloiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0yMDgsNTc2aC0xNnYxNmgxNnYtMTZaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNODY0LDU3NmgtMTZ2MTZoMTZ2LTE2WiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTY4OCw2NTZ2MTZoLTEyOHY0OGgtMTZ2MTZoNDh2LTE2aDk2di0xNmgxMjh2LTE2aDE2di0xNmgtMTZ2LTE2aC05NnYxNmgtMTZ2LTE2aC0xNloiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xMTIwLDg2NHYtMTZoMzJ2LTMyaC0zMnYxNmgtMzJ2MzJoMzJaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNDMyLDk2MGgxNnYtODBoLTE2djE2aC0xNnY2NGgtMTZ2MzJoMzJ2LTMyWiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTc1Miw4ODBoLTE2djE2aDE2di0xNloiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0zODQsOTEyaC0xNnYxNmgxNnYtMTZaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMzY4LDkyOGgtMTZ2MTZoMTZ2LTE2WiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTcwNCw5NDRoLTE2djE2aDE2di0xNloiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik02NDAsOTYwaC0xNnYxNmgxNnYtMTZaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNzY4LDEyODBoMTZ2LTE2aC0xNnYxNloiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik03NTIsMTMxMmgxNnYtMTZoLTE2djE2WiIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTcyMCwxMzQ0aDE2di0xNmgtMTZ2MTZaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNzA0LDEzOTJoMTZ2LTE2aC0xNnYxNloiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xNzEyLDE2OTUuNDh2LTE1LjQ4aC00OHYtMzJoLTE2di0xNmgtMTZ2LTE2aC0xNnYtMTZoLTMydi0xNmgtMTZ2LTE2aC0zMnYtMTZoLTMydi0xNmgtMTZ2LTE2aC0zMnYtMTZoLTMydi0xNmgtMzJ2LTE2aC0zMnYtMTZoLTE2di0xNmgtMzJ2LTE2aC0zMnYtMTZoLTE2di0xNmgtNDh2LTE2aC0zMnYtMTZoLTE2di0xNmgtMzJ2LTE2aC0zMnYxNmgtMTZ2LTE2aC0xNnYtMTZoLTE2di00OGgtMTZ2LTMyaDE2di02NGgtMTZ2LTExMmgxNnYtNjRoMTZ2MTZoMTZ2LTE2aDQ4di0xNmgxNnYtMTZoMTZ2LTE2aDE2di0zMmgxNnYtMzJoMTZ2LTgwaDE2djMyaDE2djE2aDQ4di0zMmgtMzJ2LTE2aC0xNnYtMTZoMzJ2LTMyaDE2di0xMTJoMTZ2MTZoMTZ2LTE2aDE2di02NGgtMTZ2LTMyaC0xNnYtMzJoMTZ2LTE2aDE2di0zMmgtMTZ2LTE2aC0xNnYtMTZoLTE2di0xNmgtMTZ2MzJoLTY0djE2aDE2djMyaDE2djE2aDE2djE2aC00OHYxNmg2NHYxNmgxNnYxNmgtMzJ2MTZoLTE2djE2aC0xNnYtMTZoLTE2djE2aC0zMnYtMTZoMzJ2LTE2aC00OHYxNmgtMTZ2LTE2aC0xNnYtMzJoLTE2djE2aC0zMnYtMTZoLTE2di0xNmgtMzJ2LTE2aC0xNnYxNmgtMTZ2MTZoMzJ2MzJoMzJ2MTZoLTMydi0xNmgtMTZ2LTE2aC00OHYtMTZoLTgwdjE2aDMydjE2aDE2djE2aDE2di0xNmgxNnYzMmgtMzJ2LTE2aC0xNnYtMTZoLTMydjMyaDE2djE2aC0xNnYxNmgxNnYxNmgxNnYzMmgzMnYxNmgtMzJ2MzJoMTZ2NjRoLTE2MHYtMTZoLTE2di0xNmgtMTZ2LTE2aC00OHYtMTZoLTQ4djE2aC0zMnYxNmgtMTZ2MTZoLTE2djQ4aDE2di0zMmgzMnYtMTZoMTZ2LTE2aDE2djE2aDY0djE2aDE2djMyaDE2djMyaDE2djk2aC0xNnYxNmgtMTZ2MzJoLTE2djE2aC05NnYtMTZoLTE2di0zMmgtMTZ2LTMyaC0xNnYtMTZoLTE2di0xNmgtMTZ2MzJoMTZ2NDhoMzJ2MTZoLTE2djE2aDE2djE2aDE2djE2aDEyOHYtMTZoMTZ2LTE2aDE2di0xNmgxNnYtMzJoMTZ2LTEyOGgtMTZ2LTE2aDE2MHY4MGg0OHYtMzJoMzJ2LTE2aDE2di0xNmgxNnYtMTZoMTZ2LTE2aDMydi0xNmgzMnYtMTZoMTZ2MTZoMTZ2NjRoLTE2djMyaC0xNnYxNmgtMTZ2MTZoLTE2djE2aC0xNnYxNmgtNjR2MTZoLTE2djgwaC0xNnYzMmgtMTZ2MTZoLTE2djE2aC0xNnYxNmgtMTZ2MTZoLTE2djE2aC0xNnYxNmgzMnYtMTZoMzJ2LTE2aDMydjE2MGgxNnY2NGgtMTZ2MTZoLTE2djE2aC0xNnYxNmgtNDh2MTZoLTE2djE2aC02NHYxNmgtNDh2MTZoLTY0djE2aC0xNjB2LTE2aC0zMnYtMTZoMTZ2LTE2aDMydi0xNmgxNnYtMTZoMTZ2LTE2aDE2djE2aDE2di0zMmgzMnYtMzJoLTE2djE2aC00OHYtMTZoMTZ2LTE2aDMydi0xNmgxNnYxNmgxNnYtMzJoLTE2di0xNmgxNnYxNmgxNnYtMzJoMzJ2LTMyaDMydi0xNmgxNnYtMTZoMTZ2LTE2aDE2di0xNmgtMzJ2MTZoLTMydjE2aC00OHYxNmgtNDh2MTZoLTEyOHYtMTZoLTY0di0zMmgtMzJ2LTE2aC0xNnYtMTZoLTE2di0xNmgtMTZ2LTE2aC0xNnYtMTZoLTE2di0zMmgtMTZ2LTQ4aDQ4di0xNmgxNnYtMTZoLTE2di0xNmgtMTZ2MzJoLTMydi0zMmgtMTZ2LTMyaDE2di0xNmgtMzJ2MzJoLTE2di00OGgtMTZ2LTE2aDE2di0zMmgtMTZ2MTZoLTE2djY0aDE2djMyaDE2djMyaDE2djgwaDE2djMyaDE2djMyaDE2djE2aDE2djE2aDE2djE2aDE2djE2aDMydjE2aDE2djE2aDQ4djE2aDY0djExMmgtMTZ2MTZoLTMydjE2aC0zMnYxNmgtMTZ2LTE2aC0zMnYxNmgxNnYxNmgtNjR2MTZoLTMydjE2aC0zMnYxNmgtNDh2MTZoLTMydjE2aC0zMnYxNmgtMTZ2MTZoLTMydjE2aC0zMnYxNmgtMzJ2MTZoLTE2djE2aC0xNnYxNmgtNDh2MzJIMHYxNS40OGgxNzEyWk0xMjE2LDY0MGgxNnYzMmgtMTZ2LTMyWk05NjAsNjU2aC0xNnYtMTZoLTE2di0xNmgxNnYxNmgxNnYxNlpNOTkyLDY1NmgtMTZ2LTE2aDE2djE2Wk0xMDI0LDcwNGgtMTZ2LTE2aDE2djE2Wk0xMDU2LDYyNGgtMzJ2LTE2aC0zMnYtMTZoMzJ2MTZoMzJ2MTZaTTEwODgsNzg0aC0xNnYtMTZoMTZ2MTZaTTExMDQsNjcyaC0xNnYtMTZoMTZ2MTZaTTExMDQsNjA4aC0xNnYtMTZoMTZ2MTZaTTExMjAsNjQwdi0xNmgzMnYtMTZoMTZ2MTZoMTZ2MTZoLTE2djE2aC0xNnYtMTZoLTMyWk0xMTY4LDcyMHYtMTZoLTE2di0xNmgxNnYxNmgxNnYxNmgtMTZaIi8+Cjwvc3ZnPg==`
const svgMaskGridSettingsForEffect: GeneratedGridSettings = {
  color: '#FF5F1F',
  maxOpacity: 0.75,
  flickerChance: 0.18,
  squareSize: 3,
  gridGap: 4,
}
const backgroundGridSettingsForEffect: GeneratedGridSettings = {
  color: '#848282',
  maxOpacity: 0.4,
  flickerChance: 0.45,
  squareSize: 3,
  gridGap: 4,
}

export const CuviiFlicker = () => {
  const maskStyle: React.CSSProperties | undefined = svgDataUrlForEffect
    ? {
        WebkitMaskImage: `url('${svgDataUrlForEffect}')`,
        WebkitMaskSize: 'contain',
        WebkitMaskPosition: 'center',
        WebkitMaskRepeat: 'no-repeat',
        maskImage: `url('${svgDataUrlForEffect}')`,
        maskSize: 'contain',
        maskPosition: 'center',
        maskRepeat: 'no-repeat',
      }
    : undefined

  return (
    <div className='relative w-full h-screen bg-black overflow-hidden px-8'>
      <FlickeringGrid className='absolute inset-0 z-0' {...backgroundGridSettingsForEffect} startImmediately={true} />
      {maskStyle && (
        <div className='absolute inset-0 z-10' style={maskStyle}>
          <FlickeringGrid {...svgMaskGridSettingsForEffect} startImmediately={true} />
        </div>
      )}
    </div>
  )
}
