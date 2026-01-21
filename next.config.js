/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/resources/environment/env.js'

import createIntlPlugin from 'next-intl/plugin'

const withNextIntl = createIntlPlugin('./src/packages/next-intl/utils/request.ts')

/** @type {import('next').NextConfig} */
const config = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ]
  },
  productionBrowserSourceMaps: true, // Enable source maps for production builds
  reactStrictMode: true,
  generateEtags: true,
  devIndicators: {
    position: 'top-left',
  },
  modularizeImports: {},
  transpilePackages: [],
  // output: 'standalone',
  poweredByHeader: true,
  outputFileTracingIncludes: {},
  experimental: {
    optimizePackageImports: [],
    webVitalsAttribution: ['FCP', 'LCP', 'CLS', 'FID', 'TTFB', 'INP'],
    nextScriptWorkers: true,
    clientRouterFilter: true,
    clientRouterFilterRedirects: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  allowedDevOrigins: ['https://11.11.11.194', 'http://11.11.11.194'],
}

export default withNextIntl(config)
