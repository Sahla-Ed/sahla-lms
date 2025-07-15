

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "test_image_bucket.fly.storage.tigris.dev",
      }
    ]
  }
};

export default nextConfig;
