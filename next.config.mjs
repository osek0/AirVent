/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: new URL(process.env.R2_PUBLIC_URL || "https://placeholder.com").hostname,
      },
    ],
  },
}

export default nextConfig