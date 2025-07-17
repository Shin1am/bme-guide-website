/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASS: process.env.GMAIL_PASS,
    JWT_SECRET: process.env.JWT_SECRET, 
  },
};

export default nextConfig;
