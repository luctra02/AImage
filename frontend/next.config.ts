import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // For development/testing with placeholder images
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      // Hugging Face - your actual AI image generation
      {
        protocol: 'https',
        hostname: '**.huggingface.co',
      },
      {
        protocol: 'https',
        hostname: 'image.pollinations.ai',
      },
    ],
  },
};

export default nextConfig;