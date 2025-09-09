/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure we're running on the correct port
  experimental: {
    // Enable any experimental features if needed
  },
  // API configuration
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:30000/api/:path*', // Backend API
      },
    ];
  },
};

export default nextConfig;
