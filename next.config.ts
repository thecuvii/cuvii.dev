import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'photography.cuvii.dev',
      },
    ],
    deviceSizes: [],
    imageSizes: [640, 960],
  },
}

export default nextConfig
