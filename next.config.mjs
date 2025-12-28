/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'inyfujgqwujgwbgllavo.supabase.co',
                port: '',
            },
            {
                protocol: 'https',
                hostname: '*.supabase.co',
                port: '',
            },
        ],
    },
};

export default nextConfig;
