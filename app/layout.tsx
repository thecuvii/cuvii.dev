import type { Metadata } from 'next'
import { IBM_Plex_Mono, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata: Metadata = {
  title: `Cuvii`,
  description: 'Personal website of Cuvii',
  openGraph: {
    siteName: `Cuvii`,
    url: 'https://cuvii.dev',
  },
  metadataBase: new URL('https://cuvii.dev'),
  alternates: {
    canonical: 'https://cuvii.dev',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <Script defer src='https://umami.cuvii.dev/script.js' data-website-id='c479f499-a6dd-4027-98b7-758b5fa9c704' />
      <body className={`${inter.variable} ${ibmPlexMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
