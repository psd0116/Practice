import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // 깃허브 이미지 주소 허용
      },
    ],
  },
};

export default nextConfig;