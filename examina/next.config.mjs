const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: ['pdf2json'],
  },
  images: {
    domains: ['seus-dominios-aqui'],
  },
  output: 'standalone',
};

export default nextConfig;