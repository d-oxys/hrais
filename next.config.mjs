/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/product/product-performance",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
