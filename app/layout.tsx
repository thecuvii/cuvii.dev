import type { Metadata } from 'next'

import { clsxm } from '@zolplay/clsxm'
import Script from 'next/script'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ibmPlexMono } from '~/lib/font/ibm-plex-mono'
import './globals.css'

export const metadata: Metadata = {
  title: `Cuvii's site`,
  description: 'Personal website and portfolio of Cuvii',
  openGraph: {
    siteName: `Cuvii's site`,
    url: 'https://cuvii.dev',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={clsxm(ibmPlexMono.variable, 'antialiased')}>
      <body>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
      <Script src='https://rybbit.cuvii.dev/api/script.js' data-site-id='1' defer />
    </html>
  )
}
