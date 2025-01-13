const nextConfig = {
  reactStrictMode: true,
  experimental: {}, 
  serverExternalPackages: ['pdf2json'], 
  images: {
    domains: ['https://examina-mylenaverspeelts-projects.vercel.app/'], 
  },
  output: 'standalone',
};

export default nextConfig;
