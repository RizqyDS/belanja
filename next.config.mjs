/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mdnvmijmibzvgewyanrn.supabase.co'
            }
        ]
    }
};

export default nextConfig;
