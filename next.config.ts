import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "gsap"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "videos.pexels.com" },
    ],
  },
};

export default nextConfig;
