'use client'

import { clsxm } from '@zolplay/clsxm'
import { motion } from 'motion/react'
import { HouseGrinIcon } from '~/components/icons'
import { PhotoAlbum } from '~/components/icons/photo-album'
import { MLink } from '~/lib/motion'

export default function PlaygroundToolbar() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className='fixed bottom-5 left-1/2 z-50 -translate-x-1/2 will-change-auto'
    >
      <nav
        className={clsxm(
          'flex items-center space-x-1',
          'px-2 py-1.5 rounded-3xl',
          'border border-[#1D1F21] bg-[#1D1F21]',
          'backdrop-blur-sm',
          'shadow-[0px_1px_5px_-2px_#e6e6e6]',
        )}
      >
        <ToolbarItem href='/' label='Home'>
          <HouseGrinIcon />
        </ToolbarItem>
        <ToolbarItem href='/blog' label='Blog'>
          <PhotoAlbum />
        </ToolbarItem>
      </nav>
    </motion.div>
  )
}

type ToolbarItemProps = {
  href: string
  label: string
  children: React.ReactNode
}

function ToolbarItem({ href, label, children }: ToolbarItemProps) {
  return (
    <MLink
      href={href}
      aria-label={label}
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      whileTap={{ scale: 0.95 }}
      className={clsxm(
        'cursor-pointer rounded-full transition-colors',
        'px-3 py-1',
        'text-xs font-medium',
        'text-white',
      )}
      style={{ backgroundColor: 'transparent' }}
    >
      {children}
    </MLink>
  )
}
