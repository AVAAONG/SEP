/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {

    appDir: true,
  },
  images: {
    domains: ['avaa.org', 'media.licdn.com', 'i.imgur.com'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
