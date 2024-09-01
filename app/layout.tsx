import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  description: 'Cuvii.dev',
  title: 'Cuvii.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${GeistSans.variable} antialiased`}>{children}</body>
    </html>
  )
}
