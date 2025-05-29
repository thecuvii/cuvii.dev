'use client'

import { clsxm } from '@zolplay/clsxm'
import { motion } from 'motion/react'
import { MLink } from '~/lib/motion'

type GalleryToolbarProps = {
  onReset?: () => void
  onRandom?: () => void
  onZoomIn?: () => void
  onZoomOut?: () => void
  onResetZoom?: () => void
}

export function GalleryToolbar({ onReset, onRandom, onZoomIn, onZoomOut, onResetZoom }: GalleryToolbarProps) {
  return (
    <motion.div
      initial={{ y: 150, opacity: 0, rotateX: 150, scale: 0.6 }}
      animate={{ y: 0, opacity: 1, rotateX: 0, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 60,
        damping: 15,
        duration: 1.0,
      }}
      className='fixed bottom-5 left-1/2 z-50 -translate-x-1/2 will-change-auto'
      style={{ transformOrigin: 'bottom center', perspective: 1500 }}
    >
      <nav
        className={clsxm(
          'flex items-center space-x-1',
          'px-2 py-1.5 rounded-3xl',
          'border border-[#1D1F21] bg-[#1D1F21]',
          'backdrop-blur-sm',
        )}
      >
        <ToolbarItem onClick={onRandom || (() => {})} label='Random Position'>
          <span className='text-sm'>🎲</span>
          <span className='text-xs font-mono'>Random</span>
        </ToolbarItem>
        <ToolbarItem onClick={onReset || (() => {})} label='Reset Position'>
          <span className='text-sm'>🎯</span>
          <span className='text-xs font-mono'>Reset</span>
        </ToolbarItem>
        <ToolbarItem onClick={onZoomIn || (() => {})} label='Zoom In'>
          <span className='text-sm'>🔍</span>
          <span className='text-xs font-mono'>Zoom+</span>
        </ToolbarItem>
        <ToolbarItem onClick={onZoomOut || (() => {})} label='Zoom Out'>
          <span className='text-sm'>🔎</span>
          <span className='text-xs font-mono'>Zoom-</span>
        </ToolbarItem>
        <ToolbarItem onClick={onResetZoom || (() => {})} label='Reset Zoom'>
          <span className='text-sm'>📐</span>
          <span className='text-xs font-mono'>1:1</span>
        </ToolbarItem>
        <ToolbarItem href='/' label='Home'>
          <span className='text-sm'>🏠</span>
          <span className='text-xs font-mono'>Home</span>
        </ToolbarItem>
      </nav>
    </motion.div>
  )
}

type ToolbarItemProps = {
  label: string
  children: React.ReactNode
} & (
  | {
      href: string
      onClick?: never
    }
  | {
      href?: never
      onClick: () => void
    }
)

function ToolbarItem({ label, children, href, onClick }: ToolbarItemProps) {
  const commonProps = {
    'aria-label': label,
    whileHover: { scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' },
    whileTap: { scale: 0.95 },
    className: clsxm(
      'cursor-pointer rounded-full transition-colors',
      'px-3 py-1',
      'text-xs font-medium',
      'text-white',
      'flex items-center gap-1',
    ),
    style: { backgroundColor: 'transparent' },
    children,
  }

  if (href) {
    return <MLink href={href} {...commonProps} />
  }

  return <motion.button onClick={onClick} {...commonProps} />
}
