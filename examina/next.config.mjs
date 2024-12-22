const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: ['pdf2json'],
  },
  images: {
    domains: ['https://examina.vercel.app/'],
  },
  output: 'standalone',
};

export default nextConfig;