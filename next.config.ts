import type { NextConfig } from "next";
import { env } from "./lib/env";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "dummy_url.com",
      "img.daisyui.com",
      "images.unsplash.com",
      "test_image_bucket.fly.storage.tigris.dev",
      "iam.storage.dev",
      "pub-c2c0ea10c9e247ab8bdc06c89fe2ddc6.r2.dev",
    ],
    remotePatterns: [new URL(env.NEXT_PUBLIC_AWS_ENDPOINT_URL_S3)],
  },
};

export default nextConfig;
