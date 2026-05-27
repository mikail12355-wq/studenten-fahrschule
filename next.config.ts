import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/studenten-fahrschule",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
