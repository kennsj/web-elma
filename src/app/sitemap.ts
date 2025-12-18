import { MetadataRoute } from "next"
import { client } from "@/sanity/client"

interface EventType {
	slug: { current: string }
	date: string
	_updatedAt?: string
}

interface PostType {
	slug: { current: string }
	_updatedAt?: string
	publishedAt?: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = "https://your-domain.com" // Replace

	// Static routes
	const staticRoutes = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "daily" as const,
			priority: 1,
		},
		{
			url: `${baseUrl}/om-elma`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/events`,
			lastModified: new Date(),
			changeFrequency: "daily" as const,
			priority: 0.9,
		},
		{
			url: `${baseUrl}/foredrag`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/kontakt`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.7,
		},
		{
			url: `${baseUrl}/ressurser`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.8,
		},
	]

	try {
		// Fetch all events from Sanity
		const events = await client.fetch<EventType[]>(`
      *[_type == "event"] | order(date desc) {
        slug,
        date,
        _updatedAt
      }
    `)

		// Fetch all posts from Sanity
		const posts = await client.fetch<PostType[]>(`
      *[_type == "post"] | order(publishedAt desc) {
        slug,
        _updatedAt,
        publishedAt
      }
    `)

		// Generate dynamic routes for events
		const eventRoutes = events.map((event) => ({
			url: `${baseUrl}/events/${event.slug.current}`,
			lastModified: new Date(event._updatedAt || event.date),
			changeFrequency: "weekly" as const,
			priority: 0.7,
		}))

		// Generate dynamic routes for posts (if you have a blog or post pages)
		const postRoutes = posts.map((post) => ({
			url: `${baseUrl}/${post.slug.current}`,
			lastModified: new Date(post._updatedAt || post.publishedAt || new Date()),
			changeFrequency: "weekly" as const,
			priority: 0.6,
		}))

		return [...staticRoutes, ...eventRoutes, ...postRoutes]
	} catch (error) {
		console.error("Error generating sitemap:", error)
		// Return static routes only if there's an error fetching content
		return staticRoutes
	}
}
