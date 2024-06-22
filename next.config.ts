import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer";

const nextConfig = {
  experimental: {
    ppr: true,
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
} satisfies NextConfig;

export default withContentlayer(nextConfig);
