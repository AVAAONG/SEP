/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'avaa.org',
      'media.licdn.com',
      'i.imgur.com',
      'lh3.googleusercontent.com',
      'd2u8k2ocievbld.cloudfront.net',
      'drive.google.com',
    ],
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
};

module.exports = nextConfig;
