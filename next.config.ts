import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: "pumyhiwwhikthoybttce.supabase.co",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
