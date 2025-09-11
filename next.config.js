/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel optimized configuration
  trailingSlash: true,
  images: {
    // Vercel handles image optimization automatically
    domains: ['your-supabase-project.supabase.co'],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
