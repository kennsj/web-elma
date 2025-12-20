import React from "react"
import Event from "./Event"

import styles from "./Event.module.scss"
import H2 from "@/components/Layout/UI/Animations/HeadingAnimation"
import Paragraph from "@/components/Layout/UI/Animations/ParagraphAnimation"

export default async function EventList({
	title,
	intro,
	isDark = true,
	showExpiredEvents = true,
}: {
	isDark?: boolean
	title?: string
	intro?: string
	showExpiredEvents?: boolean
}) {
	const eventData = await Event({ showExpiredEvents })
	const { upcomingEvents, pastEvents, renderEvent } = eventData

	return (
		<section className={`section__fullwidth ${styles.event__section}`}>
			<div className={styles.event__wrapper}>
				<div
					className='section__intro'
					style={{ color: `${isDark ? "#12332F" : "#C4DED7"}` }}
				>
					<H2 title={title} />
					<Paragraph className='intro__paragraph'>{intro}</Paragraph>
				</div>

				<div className={styles.event__list}>
					{upcomingEvents.length > 0 && <>{upcomingEvents.map(renderEvent)}</>}

					{showExpiredEvents && pastEvents.length > 0 && (
						<>
							<h2 className={styles.section__title}>Tidligere arrangementer</h2>
							{pastEvents.map(renderEvent)}
						</>
					)}

					{upcomingEvents.length === 0 &&
						(showExpiredEvents ? pastEvents.length === 0 : true) && (
							<p>Ingen arrangementer funnet</p>
						)}
				</div>
			</div>
		</section>
	)
}
