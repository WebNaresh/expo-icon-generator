import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration for Expo Icon Generator
  experimental: {
    optimizePackageImports: ['sharp', 'jszip'],
  },
};

export default nextConfig;
