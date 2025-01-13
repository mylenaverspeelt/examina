const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  serverExternalPackages: ['pdf2json'],
  images: {
    domains: ['examina-mylenaverspeelts-projects.vercel.app/'],
  },
  output: 'standalone',
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['@mui/material'] = '@mui/material/esm';
      config.resolve.alias['@mui/icons-material'] = '@mui/icons-material/esm';
    }
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
