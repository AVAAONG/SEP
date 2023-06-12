/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['avaa.org'],
  }
}

module.exports = nextConfig
