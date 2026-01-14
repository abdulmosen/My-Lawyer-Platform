import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    swcMinify: true,

    // Internationalization for bilingual support
    i18n: {
        locales: ["en", "ar"],
        defaultLocale: "ar",
        localeDetection: true,
    },

    // Environment variables
    env: {
        NEXT_PUBLIC_APP_NAME: "My Lawyer",
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
    },

    // Image optimization
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
            },
            {
                protocol: "https",
                hostname: "*.example.com",
            },
        ],
    },

    // Headers for security and CORS
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                ],
            },
        ];
    },

    // Redirects
    async redirects() {
        return [
            {
                source: "/",
                destination: "/dashboard",
                permanent: false,
            },
        ];
    },

    // Rewrites for API proxy (optional)
    async rewrites() {
        return {
            beforeFiles: [
                // Proxy API requests if needed
                {
                    source: "/api/:path*",
                    destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
                },
            ],
        };
    },
};

export default nextConfig;
