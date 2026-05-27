import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGitHubPages && {
    output: "export",
    basePath: "/studenten-fahrschule",
    trailingSlash: true,
  }),
  images: {
    unoptimized: isGitHubPages,
    formats: isGitHubPages ? undefined : ["image/avif", "image/webp"],
  },
};

export default nextConfig;
