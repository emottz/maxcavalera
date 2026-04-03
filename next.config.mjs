/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maxcavalera.com.tr",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
