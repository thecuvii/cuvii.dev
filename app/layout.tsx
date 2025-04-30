import type { Metadata } from 'next'

import Script from 'next/script'
import { ibmPlexMono } from '~/lib/font/ibm-plex-mono'
import { inter } from '~/lib/font/inter'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cuvii.dev',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={`${inter.variable} ${ibmPlexMono.variable} antialiased`}>
      <body>{children}</body>

      <Script defer src='https://umami.cuvii.dev/script.js' data-website-id='a0d975d8-176f-47a3-9e87-abd06eb581e3' />
    </html>
  )
}
