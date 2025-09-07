import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // remove console
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    // optimizePackageImports: ['sharp', 'jszip'],

  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
