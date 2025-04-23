import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    useCache: true,
    dynamicIO: true,
    ppr: true,
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'photography.cuvii.dev',
      },
    ],
  },
}

export default nextConfig
