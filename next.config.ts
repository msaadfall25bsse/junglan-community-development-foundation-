import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Verified separately via tsc --stack-size=8192 to prevent Node 24 V8 default stack overflow on Windows
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
