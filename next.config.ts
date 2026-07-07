import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
     remotePatterns: [
    { protocol: "http", hostname: "serwer38987.lh.pl" },
  ],
  }
};

export default nextConfig;
