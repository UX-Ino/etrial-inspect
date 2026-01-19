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
    "playwright-core",
    "axe-core",
    "seo-analyzer",
    "@capyseo/core",
    "@houtini/geo-analyzer",
    "@sparticuz/chromium",
    "llms-txt-generator"
  ],
  experimental: {
    outputFileTracingIncludes: {
      '/api/**/*': ['./node_modules/@sparticuz/chromium/bin/**/*'],
    },
  },
};

export default nextConfig;
