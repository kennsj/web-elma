import Image from "next/image"
import React from "react"
import Anchor from "../Buttons/Anchor"

import styles from "./Event.module.scss"
import H2 from "@/components/lib/animations/H2"
import Paragraph from "@/components/lib/animations/Paragraph"

const EventList = () => {
	return (
		<section className={`section__fullwidth ${styles.event__section}`}>
			<div className={styles.event__wrapper}>
				<div className='section__intro' style={{ color: "#C4DED7" }}>
					<H2 title='Foredrag og arrangementer' />
					<Paragraph className='intro__paragraph'>
						Anders Karlsen reiser landet rundt for å snakke ærlig om angst,
						prestasjonspress og det å tørre å være åpen. Se hvor du kan møte ham
						neste gang.
					</Paragraph>

					{/* <Paragraph className='intro__paragraph'>
						Anders holder foredrag for skoler, organisasjoner, foresatte og
						fagmiljøer – med mål om å åpne opp for samtaler om psykisk helse og
						livsmestring. Med en formidling som er like relevant for ungdom som
						for voksne, setter han ord på det mange går og bærer på.
					</Paragraph>
					<Paragraph className='intro__paragraph'>
						Dette er ikke et foredrag du glemmer. Det er nært, ekte og gjør
						inntrykk – uansett hvem du er. Mange beskriver det som en oppvekker,
						en lettelse og en påminnelse om hvor viktig det er å snakke sammen.
					</Paragraph> */}
				</div>

				<div className={styles.event__list}>
					<EventItem
						date='1. juni'
						title='Åpenhet i prestasjonskultur'
						time='18:00 - 20:00'
						city='Oslo'
						location='Sentralen, Øvre Slottsgate 3'
						imageUrl='https://images.pexels.com/photos/2360666/pexels-photo-2360666.jpeg'
						signupHref='#'
						freeEntryText='Gratis inngang'
						isFreeEntry={true}
					/>

					<div className={styles.event__item}>
						<span className={styles.event__date}>8. juli</span>

						<div className={styles.event__container}>
							<div className={styles.event__title}>
								<h2>Åpenhet i prestasjonskultur</h2>
								<Anchor href='#' isDarkBackground>
									Meld deg på
								</Anchor>
							</div>
							<div className={styles.event__details}>
								<div>
									<h5 className={styles.date}>18:00 - 20:00</h5>
									<p className={styles.city}>Oslo</p>
								</div>
								<div>
									<p className={styles.location}>
										Sentralen,
										<br /> Øvre Slottsgate 3
									</p>
								</div>
							</div>
							<div className={styles.event__image}>
								<Image
									src={
										"https://images.pexels.com/photos/2360666/pexels-photo-2360666.jpeg"
									}
									alt='Event preview'
									width={450}
									height={250}
								/>
							</div>
							<Anchor
								isDarkBackground
								className='event__button_mobile'
								href='#'
							>
								Gratis inngang
							</Anchor>
						</div>
					</div>

					<div className={styles.event__item}>
						<span className={styles.event__date}>21. sept</span>

						<div className={styles.event__container}>
							<div className={styles.event__title}>
								<h2>Når det blir for mye - om angst i hverdagen</h2>
								<Anchor href='#' isDarkBackground>
									Meld deg på
								</Anchor>
							</div>
							<div className={styles.event__details}>
								<div>
									<h5 className={styles.date}>18:00 - 20:00</h5>
									<p className={styles.city}>Oslo</p>
								</div>
								<div>
									<p className={styles.location}>
										Sentralen,
										<br /> Øvre Slottsgate 3
									</p>
								</div>
							</div>
							<div className={styles.event__image}>
								<Image
									src={
										"https://images.pexels.com/photos/2360666/pexels-photo-2360666.jpeg"
									}
									alt='Event preview'
									width={450}
									height={250}
								/>
							</div>
							<Anchor
								isDarkBackground
								className='event__button_mobile'
								href='#'
							>
								Gratis inngang
							</Anchor>
						</div>
					</div>

					<div className={styles.event__item}>
						<span className={styles.event__date}>29. des</span>

						<div className={styles.event__container}>
							<div className={styles.event__title}>
								<h2>Bak fasaden: En personlig historie</h2>
								<Anchor href='#' isDarkBackground>
									Meld deg på
								</Anchor>
							</div>
							<div className={styles.event__details}>
								<div>
									<h5 className={styles.date}>18:00 - 20:00</h5>
									<p className={styles.city}>Oslo</p>
								</div>
								<div>
									<p className={styles.location}>
										Sentralen,
										<br /> Øvre Slottsgate 3
									</p>
								</div>
							</div>
							<div className={styles.event__image}>
								<Image
									src={
										"https://images.pexels.com/photos/2360666/pexels-photo-2360666.jpeg"
									}
									alt='Event preview'
									width={450}
									height={250}
								/>
							</div>
							<Anchor
								isDarkBackground
								className='event__button_mobile'
								href='#'
							>
								Gratis inngang
							</Anchor>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default EventList

type EventItemProps = {
	date: string
	title: string
	time: string
	city: string
	location: string
	imageUrl: string
	signupHref: string
	freeEntryText?: string
	isFreeEntry: boolean
}

const EventItem: React.FC<EventItemProps> = ({
	date,
	title,
	time,
	city,
	location,
	imageUrl,
	signupHref,
	freeEntryText = "Gratis inngang",
	isFreeEntry,
}) => (
	<div className={styles.event__item}>
		<span className={styles.event__date}>{date}</span>
		<div className={styles.event__container}>
			<div className={styles.event__title}>
				<h2>{title}</h2>
				{isFreeEntry ? (
					<Anchor href={signupHref} isDarkBackground>
						Gratis inngang
					</Anchor>
				) : (
					<Anchor href={signupHref} isDarkBackground>
						Meld deg på
					</Anchor>
				)}
			</div>
			<div className={styles.event__details}>
				<div>
					<h5 className={styles.date}>{time}</h5>
					<p className={styles.city}>{city}</p>
				</div>
				<div>
					<p className={styles.location}>{location}</p>
				</div>
			</div>
			<div className={styles.event__image}>
				<Image src={imageUrl} alt='Event preview' width={450} height={250} />
			</div>
			<Anchor
				isDarkBackground
				className='event__button_mobile'
				href={signupHref}
			>
				{freeEntryText}
			</Anchor>
		</div>
	</div>
)
