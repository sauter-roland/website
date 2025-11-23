import type { NextConfig } from "next";

// Read BASE_PATH from environment. For preview builds set BASE_PATH="/preview".
// Leave unset for production so the app is served at root.
const basePath = process.env.BASE_PATH || "/";

const nextConfig: NextConfig = {
};

export default nextConfig;
