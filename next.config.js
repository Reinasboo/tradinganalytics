/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize for Vercel deployment
  compress: true,
  // Enable SWR and incremental static regeneration
  swcMinify: true,
  // Ensure proper module resolution
  experimental: {
    // Enable optimizations for production
    esmExternals: true,
  },
  // Headers for performance and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
