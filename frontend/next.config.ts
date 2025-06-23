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
      // Common AI image services you might use
      {
        protocol: 'https',
        hostname: 'cdn.openai.com',
      },
      {
        protocol: 'https',
        hostname: 'replicate.delivery',
      },
      // AWS S3 - if you store images there later
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      // Vercel blob storage - good option for Vercel deployments
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;