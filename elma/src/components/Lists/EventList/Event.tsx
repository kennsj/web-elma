import styles from "./Event.module.scss"
// import { client } from "@/sanity/client"
// import { allEventsQuery } from "@/components/lib/sanity/queries"
import Image from "next/image"
import { Clock, Map } from "lucide-react"
import { Link } from "@/components/ui/Link"

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
	// Dummy events for styling - remove when Sanity is ready
	const dummyEvents: EventType[] = [
		{
			_id: "1",
			title: "Åpenhet om angst - et foredrag om psykisk helse",
			slug: { current: "apenhet-om-angst" },
			date: "2025-02-15",
			startTime: "18:00",
			endTime: "20:30",
			city: "Oslo",
			location: "Kulturhuset",
			address: "Youngsgate 6, 0181 Oslo",
			entryType: "free",
			mainImage: {
				asset: {
					url: "/images/anders-moloen.webp",
				},
			},
			status: "upcoming",
		},
		{
			_id: "2",
			title: "Livet med angst - en personlig historie",
			slug: { current: "livet-med-angst" },
			date: "2025-03-10",
			startTime: "19:00",
			endTime: "21:00",
			city: "Bergen",
			location: "Bergen Bibliotek",
			address: "Strømgaten 6, 5015 Bergen",
			entryType: "paid",
			mainImage: {
				asset: {
					url: "/images/anders-karlsen-bg.webp",
				},
			},
			status: "upcoming",
		},
		{
			_id: "3",
			title: "Fra mørke til lys - en reise gjennom psykisk helse",
			slug: { current: "fra-morke-til-lys" },
			date: "2025-04-22",
			startTime: "17:30",
			endTime: "19:30",
			city: "Trondheim",
			location: "Rockheim",
			address: "Brattørkaia 14, 7010 Trondheim",
			entryType: "free",
			mainImage: {
				asset: {
					url: "/images/person-aurora.webp",
				},
			},
			status: "upcoming",
		},
		{
			_id: "4",
			title: "Ungdom og angst - hvordan snakke om det",
			slug: { current: "ungdom-og-angst" },
			date: "2024-12-05",
			startTime: "18:30",
			endTime: "20:00",
			city: "Stavanger",
			location: "Stavanger kulturhus",
			address: "Solvberggata 2, 4006 Stavanger",
			entryType: "paid",
			mainImage: {
				asset: {
					url: "/images/man-mountain-alone.jpg",
				},
			},
			status: "expired",
		},
		{
			_id: "5",
			title: "Møt Anders - en samtale om å leve med angst",
			slug: { current: "mot-anders" },
			date: "2024-11-18",
			startTime: "19:00",
			endTime: "21:00",
			city: "Kristiansand",
			location: "Kilden Teater",
			address: "Sjølystveien 2, 4630 Kristiansand",
			entryType: "free",
			mainImage: {
				asset: {
					url: "/images/anders-moloen.webp",
				},
			},
			status: "expired",
		},
	]

	// Use dummy events instead of Sanity fetch
	const events = dummyEvents
	// const events = await client.fetch<EventType[]>(allEventsQuery)

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
