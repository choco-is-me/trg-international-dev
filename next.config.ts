import { withFaust } from "@faustwp/core";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["chocoisme.local"], // Add your WordPress domain for image optimization
	},
};

export default withFaust(nextConfig);
