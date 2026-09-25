/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Blog images are copied into Supabase Storage by the admin workflow,
  // so external image domains are not required for published article media.
};

export default nextConfig;
