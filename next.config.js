/** @type {import('next').NextConfig} */
const nextConfig = {
  ///@see https://github.com/vercel/next.js/issues/59432#issuecomment-1876846798
  ///@see https://github.com/Azure/azure-sdk-for-js/issues/28059
  experimental: {
    serverComponentsExternalPackages: ['@azure/storage-blob'],
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    domains: [
      'avaa.org',
      'media.licdn.com',
      'i.imgur.com',
      'lh3.googleusercontent.com',
      'd2u8k2ocievbld.cloudfront.net',
      'drive.google.com',
      'blobstoragex9083.blob.core.windows.net'
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
  async redirects() {
    return [
      {
        source: '/signin/becario',
        destination: '/signin',
        permanent: true, // Use true for a 301 redirect (SEO friendly), false for 302
      },
      {
        source: '/signin/admin',
        destination: '/signin',
        permanent: true, // Use true for a 301 redirect (SEO friendly), false for 302
      },
      {
        source: '/singin', // an error
        destination: '/signin',
        permanent: true, // Use true for a 301 redirect (SEO friendly), false for 302
      },
    ];
  }
};

module.exports = nextConfig;
