import type { NextConfig } from "next";
import { env } from "./lib/env";

const nextConfig: NextConfig = {
  images: {
    domains: ["dummy_url.com", "img.daisyui.com"],
    remotePatterns: [new URL(env.NEXT_PUBLIC_AWS_ENDPOINT_URL_S3)],
  },
};

export default nextConfig;
