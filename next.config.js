const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa');

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  compiler: {
    reactRemoveProperties: isProd && {
      properties: ['^data-test'],
    },
    removeConsole: isProd && {
      exclude: ['error'],
    },
    styledComponents: true,
  },
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = withPWA({
  dest: 'public',
  maximumFileSizeToCacheInBytes: 7000000,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/_buildManifest\.js$/],
  runtimeCaching,
})(nextConfig);
