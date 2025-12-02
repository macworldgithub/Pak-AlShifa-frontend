import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.placeholder.com", // Allows placeholder images for avatars/testing
        port: "",
        pathname: "/**", // Matches any path on this host
      },
      // Add more patterns if needed (e.g., for other external images/CDNs):
      // {
      //   protocol: "https",
      //   hostname: "your-cdn.com",
      //   port: "",
      //   pathname: "/images/**",
      // },
    ],
  },
};

export default nextConfig;
