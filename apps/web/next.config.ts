import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;

// This enables local dev access to Cloudflare bindings. It comes from
// https://opennext.js.org/cloudflare/get-started#11-develop-locally
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

void initOpenNextCloudflareForDev();
