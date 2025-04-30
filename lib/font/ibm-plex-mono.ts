import { IBM_Plex_Mono } from 'next/font/google'

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-ibm-plex-mono',
})
