import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@srd/ui', '@srd/db', '@srd/shared'],
  images: {
    // Loader Cloudflare configuré à une étape ultérieure (next/image)
    remotePatterns: [
      { protocol: 'https', hostname: 'media.srd.ch' },
      { protocol: 'https', hostname: 'srd.ch' },
    ],
  },
};

export default nextConfig;
