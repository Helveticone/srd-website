import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@srd/ui', '@srd/db', '@srd/shared'],
};

export default nextConfig;
