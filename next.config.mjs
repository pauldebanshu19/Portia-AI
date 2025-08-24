/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'pbs.twimg.com',
          port: '',
          pathname: '/account123/**',
          search: '',
        },
      ],
        domains: ["i.pinimg.com"],
      },
};

export default nextConfig;
