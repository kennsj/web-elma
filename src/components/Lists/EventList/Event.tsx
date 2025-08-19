import styles from "./Event.module.scss"
import { client } from "@/sanity/client"
import { allEventsQuery } from "@/components/lib/sanity/queries"
import Image from "next/image"
import { Clock, Map } from "lucide-react"
import Link from "next/link"

interface EventType {
	_id: string
	title: string
	slug: { current: string }
	date: string
	startTime: string
	endTime: string
	city: string
	location: string
	address: string
	entryType?: string
	mainImage: {
		asset: {
			url: string
		}
	}
	status: "upcoming" | "expired"
}

export default async function Event({
	showExpiredEvents = true,
}: {
	showExpiredEvents?: boolean
}) {
	const events = await client.fetch<EventType[]>(allEventsQuery)

	const upcomingEvents = events.filter((e) => e.status === "upcoming")
	const pastEvents = events.filter((e) => e.status === "expired")

	const renderEvent = (event: EventType) => (
		<Link
			className={styles.event__link}
			href={`/events/${event.slug.current}`}
			key={event._id}
		>
			<div className={styles.event__item}>
				<div className={styles.event__container}>
					<div className={styles.event__title}>
						<span className={styles.event__date}>
							{new Date(event.date).toLocaleDateString("no-NO", {
								day: "numeric",
								month: "short",
							})}
						</span>
						<h2>{event.title}</h2>
						<div>
							{event.entryType === "free"
								? "Gratis inngang"
								: "Bestill billett"}
						</div>
					</div>
					<div className={styles.event__details}>
						<div>
							<div className={styles.event__details__info}>
								<Clock strokeWidth={2} size={20} />
								<h5 className={styles.date}>{event.startTime}</h5>
								<span>–</span>
								<h5 className={styles.date}>{event.endTime}</h5>
							</div>
							<div className={styles.event__details__info}>
								<Map strokeWidth={2} size={20} />
								<p className={styles.city}>{event.city}</p>
							</div>
						</div>
						<div>
							<p className={styles.location}>{event.location}</p>
						</div>
					</div>
					<div className={styles.event__image}>
						<Image
							src={event.mainImage.asset.url}
							alt='Event preview'
							width={450}
							height={250}
						/>
					</div>
				</div>
			</div>
		</Link>
	)

	return {
		upcomingEvents,
		pastEvents,
		renderEvent,
		showExpiredEvents,
	}
}
