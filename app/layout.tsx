import type { Metadata } from 'next'

import { Inter } from 'next/font/google'

import Script from 'next/script'
import './globals.css'

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cuvii.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={inter.className}>
      <body className='antialiased'>{children}</body>

      <Script defer src='https://umami.cuvii.dev/script.js' data-website-id='a0d975d8-176f-47a3-9e87-abd06eb581e3' />
    </html>
  )
}
