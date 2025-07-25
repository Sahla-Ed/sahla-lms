import type { NextConfig } from 'next';
import { env } from './lib/env';
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin');

const nextConfig: NextConfig = {
  experimental: {
    devtoolSegmentExplorer: true,
  },
  images: {
    domains: [
      'dummy_url.com',
      'img.daisyui.com',
      'images.unsplash.com',
      'test_image_bucket.fly.storage.tigris.dev',
      'iam.storage.dev',
      'pub-c2c0ea10c9e247ab8bdc06c89fe2ddc6.r2.dev',
      'encrypted-tbn0.gstatic.com',
      'https://cdn1.vectorstock.com',
    ],
    remotePatterns: [new URL(env.NEXT_PUBLIC_AWS_ENDPOINT_URL_S3)],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
};

export default nextConfig;
