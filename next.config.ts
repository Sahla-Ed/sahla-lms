

import type { NextConfig } from "next";
import { env } from "./lib/env";

const nextConfig: NextConfig = {
  images: {
    domains: ["dummy_url.com", "img.daisyui.com","images.unsplash.com",
"test_image_bucket.fly.storage.tigris.dev"],
    remotePatterns: [new URL(env.NEXT_PUBLIC_AWS_ENDPOINT_URL_S3)],
  },
};

export default nextConfig;
