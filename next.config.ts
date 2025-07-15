

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["dummy_url.com", "img.daisyui.com","images.unsplash.com",
"test_image_bucket.fly.storage.tigris.dev"], // Add the hostname(s) here
  },
};

export default nextConfig;
