import { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/client"
import { singleEventQuery } from "@/components/lib/sanity/queries"
import {
	generateSEOMetadata,
	generateEventStructuredData,
} from "@/components/lib/sanity/seo"
import Image from "next/image"
import { Clock, MapPin } from "lucide-react"

interface EventPageProps {
	params: {
		slug: string
	}
}

// Generate metadata for the event page
export async function generateMetadata({
	params,
}: EventPageProps): Promise<Metadata> {
	const event = await client.fetch(singleEventQuery, { slug: params.slug })

	if (!event) {
		return {
			title: "Event Not Found",
			description: "The requested event could not be found.",
		}
	}

	return generateSEOMetadata({
		title: event.title,
		description: event.description,
		seo: event.seo,
		image: event.mainImage,
		slug: `events/${event.slug.current}`,
		type: "event",
		modifiedTime: event._updatedAt,
	})
}

// Generate static params for all events (for static generation)
export async function generateStaticParams() {
	const events = await client.fetch(`
    *[_type == "event" && defined(slug.current)] {
      "slug": slug.current
    }
  `)

	return events.map((event: { slug: string }) => ({
		slug: event.slug,
	}))
}

export default async function EventPage({ params }: EventPageProps) {
	const event = await client.fetch(singleEventQuery, { slug: params.slug })

	if (!event) {
		notFound()
	}

	const structuredData = generateEventStructuredData(event)

	return (
		<>
			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>

			<main>
				<article>
					<header>
						<h1>{event.title}</h1>

						<div className='event-meta'>
							<div className='event-datetime'>
								<Clock size={20} />
								<time dateTime={`${event.date}T${event.startTime}`}>
									{new Date(event.date).toLocaleDateString("no-NO", {
										weekday: "long",
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</time>
								<span>
									{event.startTime} - {event.endTime}
								</span>
							</div>

							<div className='event-location'>
								<MapPin size={20} />
								<address>
									{event.location}
									<br />
									{event.address}
									<br />
									{event.city}
								</address>
							</div>

							<div className='event-entry'>
								{event.entryType === "free"
									? "Gratis inngang"
									: "Bestill billett"}
							</div>
						</div>
					</header>

					{event.mainImage && (
						<div className='event-image'>
							<Image
								src={event.mainImage.asset.url}
								alt={event.mainImage.alt || event.title}
								width={1200}
								height={630}
								priority
							/>
						</div>
					)}

					<div className='event-content'>
						<p>{event.description}</p>
					</div>
				</article>
			</main>
		</>
	)
}
