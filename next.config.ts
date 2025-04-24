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
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=3000, stale-while-revalidate=14400, stale-if-error=14400',
          },
        ],
      },
    ]
  },
}

export default nextConfig
