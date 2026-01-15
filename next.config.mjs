/** @type {import('next').NextConfig} */
const nextConfig = {
    outputFileTracingRoot: 'C:\\Users\\Deep\\OneDrive\\Desktop\\Coding\\Nextjs\\cmsproject',
    images : {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'inyfujgqwujgwbgllavo.supabase.co',
                port: '',
            },
        ],
    },
};

export default nextConfig;
