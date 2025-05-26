import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    // useCache: true,
    // dynamicIO: true,
    // ppr: true,
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
      // {
      //   source: '/',
      //   headers: [
      //     {
      //       key: 'Cache-Control',
      //       value: 'public, max-age=0, s-maxage=604800, stale-while-revalidate=600, stale-if-error=86400',
      //     },
      //   ],
      // },
    ]
  },
}

export default nextConfig
