/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [{
            protocol: "http",
            hostname: "192.168.1.91",
            // hostname: "192.168.1.91",
        }, ]
    }
};
export default nextConfig;