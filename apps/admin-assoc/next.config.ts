import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@srd/ui', '@srd/db', '@srd/shared'],
  // Désactive le cache filesystem webpack en production : évite les gros
  // fichiers .next/cache/webpack/*.pack (> 25 MiB) refusés par Cloudflare Pages.
  webpack: (config, { dev }) => {
    if (!dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
