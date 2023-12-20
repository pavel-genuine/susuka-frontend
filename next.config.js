/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        // reactRefresh: true,
        swcMinify: false,
        // useFileSystemPublicRoutes: false,
        esmExternals: false,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    //output: "standalone",
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                // destination: "https://api.geniematic.com/api/:path*",
                destination: 'http://localhost:8000/api/:path*',
            },
        ];
    },

    modularizeImports: {
        lodash: {
            transform: 'lodash/{{member}}',
        },
        '@mui/material': {
            transform: '@mui/material/{{member}}',
        },
        '@mui/styles': {
            transform: '@mui/styles/{{member}}',
        },
        '@mui/lab': {
            transform: '@mui/lab/{{member}}',
        },
        '@mui/icons-material/?(((\\w*)?/?)*)': {
            transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}',
        },
    },
};

module.exports = nextConfig;
