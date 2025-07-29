import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "chocoisme.local",
			},
			// More domain can be added here
			// {
			//   protocol: 'https',
			//   hostname: 'example.com',
			// },
		],
	},
	// Include any other existing configurations here
};

export default nextConfig;
