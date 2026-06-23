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
  // Désactive le cache filesystem webpack en production : évite de générer
  // les gros fichiers .next/cache/webpack/*.pack (> 25 MiB) refusés par
  // Cloudflare Pages.
  webpack: (config, { dev }) => {
    if (!dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
