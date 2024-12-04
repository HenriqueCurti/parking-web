import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint:{
    dirs: ['pages', 'utils'],
    ignoreDuringBuilds: false
  }
};



export default nextConfig;
