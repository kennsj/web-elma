import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
	const baseUrl = "https://your-domain.com" // Replace

	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: [
				"/api/",
				"/admin/",
				"/_next/",
				"/studio/", // If you have Sanity Studio on the same domain
			],
		},
		sitemap: `${baseUrl}/sitemap.xml`,
	}
}
