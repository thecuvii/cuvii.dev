import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    useCache: true,
    useLightningcss: true,
  },
}

export default nextConfig
