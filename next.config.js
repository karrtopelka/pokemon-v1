/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_POKEMON_API: process.env.NEXT_PUBLIC_POKEMON_API,
    NEXT_PUBLIC_POKEMON_IMAGE_API: process.env.NEXT_PUBLIC_POKEMON_IMAGE_API,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
