/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Add common domains you might use for external images (optional)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable experimental features as needed
  experimental: {
    // Optimize your build time
    optimizeServerReact: true,
  },
  // Cache aggressively for better performance
  staticPageGenerationTimeout: 120,
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Add powered by header
  poweredByHeader: false,
  // Strict mode for more reliable code
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig 