import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    useCache: true,
    dynamicIO: true,
    ppr: true,
  },
}

export default nextConfig
