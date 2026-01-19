import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // output: 'export', // Permanently disabled for Notion API Integration

  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'styles')],
  },

  serverExternalPackages: [
    "@axe-core/playwright",
    "playwright",
    "axe-core",
    "seo-analyzer",
    "@capyseo/core",
    "@houtini/geo-analyzer",
    "llms-txt-generator",
    "@notionhq/client"
  ],
};

export default nextConfig;
