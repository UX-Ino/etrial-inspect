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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/@sparticuz/chromium/bin/**/*'],
  } as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  outputFileTracingExcludes: {
    '*': [
      './public/screenshots/**/*',
      './public/screenshots',
    ],
  } as any,
  experimental: {
  },
};

export default nextConfig;
