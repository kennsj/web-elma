import { Metadata } from "next"
import { urlFor } from "./imageUrl"

export interface SEOData {
	metaTitle?: string
	metaDescription?: string
	ogImage?: {
		asset?: {
			_id: string
		}
	}
	keywords?: string[]
	noIndex?: boolean
	canonicalUrl?: string
}

export interface PageSEOProps {
	title?: string
	description?: string
	seo?: SEOData
	image?: {
		asset?: {
			_id: string
		}
	}
	slug?: string
	type?: "website" | "article" | "event"
	publishedTime?: string
	modifiedTime?: string
}

const defaultSEO = {
	siteName: "ELMA - For deg som vil leve, ikke bare overleve",
	defaultTitle: "ELMA - For deg som vil leve, ikke bare overleve",
	defaultDescription:
		"Hos ELMA møter du forståelse, fellesskap og mot. Det starter med å åpne opp - i ditt tempo. Anders Karlsen reiser landet rundt for å snakke ærlig om angst og psykisk helse.",
	siteUrl: "https://your-domain.com", // Replace
}

export function generateSEOMetadata({
	title,
	description,
	seo,
	image,
	slug,
	type = "website",
	publishedTime,
	modifiedTime,
}: PageSEOProps): Metadata {
	const metaTitle = seo?.metaTitle || title || defaultSEO.defaultTitle
	const metaDescription =
		seo?.metaDescription || description || defaultSEO.defaultDescription
	const ogImage = seo?.ogImage || image
	const canonicalUrl =
		seo?.canonicalUrl ||
		(slug ? `${defaultSEO.siteUrl}/${slug}` : defaultSEO.siteUrl)

	const metadata: Metadata = {
		title: metaTitle,
		description: metaDescription,
		keywords: seo?.keywords?.join(", "),
		robots: {
			index: !seo?.noIndex,
			follow: !seo?.noIndex,
		},
		alternates: {
			canonical: canonicalUrl,
		},
		openGraph: {
			type: type === "article" || type === "event" ? "article" : "website",
			title: metaTitle,
			description: metaDescription,
			url: canonicalUrl,
			siteName: defaultSEO.siteName,
			locale: "no_NO",
			images: ogImage?.asset?._id
				? [
						{
							url: urlFor(ogImage).width(1200).height(630).url(),
							width: 1200,
							height: 630,
							alt: metaTitle,
						},
					]
				: [],
			...(publishedTime && { publishedTime }),
			...(modifiedTime && { modifiedTime }),
		},
		twitter: {
			card: "summary_large_image",
			title: metaTitle,
			description: metaDescription,
			images: ogImage?.asset?._id
				? [urlFor(ogImage).width(1200).height(630).url()]
				: [],
		},
	}

	return metadata
}

// Generate structured data for events
export function generateEventStructuredData(event: {
	title: string
	description?: string
	startTime: string
	endTime: string
	date: string
	location: string
	address: string
	city: string
	entryType?: string
	mainImage?: { asset: { url: string } }
	slug: { current: string }
}) {
	const startDateTime = new Date(`${event.date}T${event.startTime}`)
	const endDateTime = new Date(`${event.date}T${event.endTime}`)

	return {
		"@context": "https://schema.org",
		"@type": "Event",
		name: event.title,
		description:
			event.description || `Foredrag med Anders Karlsen om psykisk helse`,
		startDate: startDateTime,
		endDate: endDateTime,
		location: {
			"@type": "Place",
			name: event.location,
			address: {
				"@type": "PostalAddress",
				streetAddress: event.address,
				addressLocality: event.city,
				addressCountry: "NO",
			},
		},
		image: event.mainImage?.asset?.url ? [event.mainImage.asset.url] : [],
		organizer: {
			"@type": "Organization",
			name: "ELMA",
			url: defaultSEO.siteUrl,
		},
		offers: {
			"@type": "Offer",
			price: event.entryType === "free" ? "0" : undefined,
			priceCurrency: "NOK",
			availability: "https://schema.org/InStock",
			url: `${defaultSEO.siteUrl}/events/${event.slug.current}`,
		},
		eventStatus: "https://schema.org/EventScheduled",
		eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
	}
}
