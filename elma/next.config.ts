import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images.pexels.com",
				port: "",
				pathname: "/**",
			},
		],
	},
	reactStrictMode: false, // Disabled to prevent GSAP animation issues in production
	webpack: (config) => {
		config.resolve.alias = {
			...config.resolve.alias,
			gsap: "gsap",
			"gsap/all": "gsap/dist/gsap",
		}
		return config
	},
}

export default nextConfig
