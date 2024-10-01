/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.feeef.app",
        pathname: "/**/*",
      },
    ],
  },
};

export default nextConfig;
