const nextConfig = {
  reactStrictMode: true,
  experimental: {}, 
  serverExternalPackages: ['pdf2json'], 
  images: {
    domains: ['https://examina.vercel.app/'], 
  },
  output: 'standalone',
};

export default nextConfig;
