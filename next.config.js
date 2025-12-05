/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  
  // Configure images
  images: {
    domains: [],
    remotePatterns: [],
  },
  
  // Webpack configuration for compatibility
  webpack: (config, { isServer }) => {
    // Ensure .jsx extensions are resolved
    config.resolve.extensions.push('.jsx', '.js');
    
    // Add path aliases for easier imports
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
      '@components': path.resolve(__dirname, 'components'),
      '@lib': path.resolve(__dirname, 'lib'),
    };
    
    // Ensure we can resolve from project root
    config.resolve.modules = [
      path.resolve(__dirname),
      ...(config.resolve.modules || []),
      'node_modules',
    ];
    
    return config;
  },
};

module.exports = nextConfig;
