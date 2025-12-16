const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching: [
        {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'supabase-api',
                expiration: {
                    maxEntries: 32,
                    maxAgeSeconds: 60 * 5 // 5 minutes
                },
                networkTimeoutSeconds: 10
            }
        },
        {
            urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
            handler: 'CacheFirst',
            options: {
                cacheName: 'static-image-assets',
                expiration: {
                    maxEntries: 64,
                    maxAgeSeconds: 24 * 60 * 60 // 24 hours
                }
            }
        },
        {
            urlPattern: /\.(?:js)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'static-js-assets',
                expiration: {
                    maxEntries: 32,
                    maxAgeSeconds: 24 * 60 * 60
                }
            }
        },
        {
            urlPattern: /\.(?:css|less)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'static-style-assets',
                expiration: {
                    maxEntries: 32,
                    maxAgeSeconds: 24 * 60 * 60
                }
            }
        },
        {
            urlPattern: ({ url }) => {
                const isSameOrigin = self.origin === url.origin;
                if (!isSameOrigin) return false;
                const pathname = url.pathname;
                // Don't cache API routes
                if (pathname.startsWith('/api/')) return false;
                return true;
            },
            handler: 'NetworkFirst',
            options: {
                cacheName: 'pages',
                expiration: {
                    maxEntries: 32,
                    maxAgeSeconds: 24 * 60 * 60
                },
                networkTimeoutSeconds: 10
            }
        }
    ]
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: [],
    },
}

module.exports = withPWA(nextConfig);
