import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // From https://dopoto.github.io/blog/20250217-nextjs-serializing-big-strings
  webpack: (config: { cache: { type: string } }) => {
    config.cache = {
      type: "memory",
    };

    return config;
  },
};

// This enables local dev access to Cloudflare bindings. It comes from
// https://opennext.js.org/cloudflare/get-started#11-develop-locally
void initOpenNextCloudflareForDev({
  environment: "dev",
});

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

// Apply Serwist to the Next config
export default withSerwist(nextConfig);
