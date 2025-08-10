import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
    browserDebugInfoInTerminal: true,
    devtoolNewPanelUI: true,
    clientSegmentCache: true,
  },
  turbopack: {},
};

export default nextConfig;
