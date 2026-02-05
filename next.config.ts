import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
    browserDebugInfoInTerminal: true,
  },
  typedRoutes: true,
  turbopack: {},
}

export default nextConfig
