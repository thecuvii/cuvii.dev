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
      <Script src='https://rybbit.cuvii.dev/api/script.js' data-site-id='1' defer />
    </html>
  )
}
