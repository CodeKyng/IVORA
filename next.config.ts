import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "videos.pexels.com" },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "three/examples/jsm/environments/RoomEnvironment.js": path.join(
        process.cwd(),
        "node_modules/three/examples/jsm/environments/RoomEnvironment.js"
      ),
    };
    return config;
  },
};

export default nextConfig;
