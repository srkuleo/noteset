import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
    browserDebugInfoInTerminal: true,
    clientSegmentCache: true,
  },
  typedRoutes: true,
  turbopack: {},
}

export default nextConfig
