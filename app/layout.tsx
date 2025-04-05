import type { Metadata } from 'next'

import { Inter } from 'next/font/google'

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
    </html>
  )
}
