// import Image from "next/image"
// import React from "react"
// import Anchor from "@/components/Buttons/Anchor"

// import styles from "./Event.module.scss"
// import H2 from "@/components/Layout/UI/Animations/HeadingAnimation"
// import Paragraph from "@/components/Layout/UI/Animations/ParagraphAnimation"

// import { client } from "@/sanity/client"

// import { frontPagePostQuery } from "@/components/lib/sanity/queries"
// import { type SanityDocument } from "next-sanity"

// export default async function EventList() {
// 	const posts = await client.fetch(frontPagePostQuery)

// 	return (
// 		<section className={`section__fullwidth ${styles.event__section}`}>
// 			<div className={styles.event__wrapper}>
// 				<div className='section__intro' style={{ color: "#C4DED7" }}>
// 					<H2 title='Foredrag og arrangementer' />
// 					<Paragraph className='intro__paragraph'>
// 						Anders Karlsen reiser landet rundt for å snakke ærlig om angst,
// 						prestasjonspress og det å tørre å være åpen. Se hvor du kan møte ham
// 						neste gang.
// 					</Paragraph>

// 				</div>

// 				<div className={styles.event__list}>
// 					<EventItem
// 						date='1. juni'
// 						title='Åpenhet i prestasjonskultur'
// 						time='18:00 - 20:00'
// 						city='Oslo'
// 						location='Sentralen, Øvre Slottsgate 3'
// 						imageUrl='https://images.pexels.com/photos/2360666/pexels-photo-2360666.jpeg'
// 						signupHref='#'
// 						freeEntryText='Gratis inngang'
// 						isFreeEntry={true}
// 					/>

// 					<div className={styles.event__item}>
// 						<span className={styles.event__date}>8. juli</span>

// 						<div className={styles.event__container}>
// 							<div className={styles.event__title}>
// 								<h2>Åpenhet i prestasjonskultur</h2>
// 								<Anchor href='#' isDarkBackground>
// 									Meld deg på
// 								</Anchor>
// 							</div>
// 							<div className={styles.event__details}>
// 								<div>
// 									<h5 className={styles.date}>18:00 - 20:00</h5>
// 									<p className={styles.city}>Oslo</p>
// 								</div>
// 								<div>
// 									<p className={styles.location}>
// 										Sentralen,
// 										<br /> Øvre Slottsgate 3
// 									</p>
// 								</div>
// 							</div>
// 							<div className={styles.event__image}>
// 								<Image
// 									src={
// 										"https://images.pexels.com/photos/2360666/pexels-photo-2360666.jpeg"
// 									}
// 									alt='Event preview'
// 									width={450}
// 									height={250}
// 								/>
// 							</div>
// 							<Anchor
// 								isDarkBackground
// 								className='event__button_mobile'
// 								href='#'
// 							>
// 								Gratis inngang
// 							</Anchor>
// 						</div>
// 					</div>

// 					<div className={styles.event__item}>
// 						<span className={styles.event__date}>21. sept</span>

// 						<div className={styles.event__container}>
// 							<div className={styles.event__title}>
// 								<h2>Når det blir for mye - om angst i hverdagen</h2>
// 								<Anchor href='#' isDarkBackground>
// 									Meld deg på
// 								</Anchor>
// 							</div>
// 							<div className={styles.event__details}>
// 								<div>
// 									<h5 className={styles.date}>18:00 - 20:00</h5>
// 									<p className={styles.city}>Oslo</p>
// 								</div>
// 								<div>
// 									<p className={styles.location}>
// 										Sentralen,
// 										<br /> Øvre Slottsgate 3
// 									</p>
// 								</div>
// 							</div>
// 							<div className={styles.event__image}>
// 								<Image
// 									src={
// 										"https://images.pexels.com/photos/2360666/pexels-photo-2360666.jpeg"
// 									}
// 									alt='Event preview'
// 									width={450}
// 									height={250}
// 								/>
// 							</div>
// 							<Anchor
// 								isDarkBackground
// 								className='event__button_mobile'
// 								href='#'
// 							>
// 								Gratis inngang
// 							</Anchor>
// 						</div>
// 					</div>

// 					<div className={styles.event__item}>
// 						<span className={styles.event__date}>29. des</span>

// 						<div className={styles.event__container}>
// 							<div className={styles.event__title}>
// 								<h2>Bak fasaden: En personlig historie</h2>
// 								<Anchor href='#' isDarkBackground>
// 									Meld deg på
// 								</Anchor>
// 							</div>
// 							<div className={styles.event__details}>
// 								<div>
// 									<h5 className={styles.date}>18:00 - 20:00</h5>
// 									<p className={styles.city}>Oslo</p>
// 								</div>
// 								<div>
// 									<p className={styles.location}>
// 										Sentralen,
// 										<br /> Øvre Slottsgate 3
// 									</p>
// 								</div>
// 							</div>
// 							<div className={styles.event__image}>
// 								<Image
// 									src={
// 										"https://images.pexels.com/photos/2360666/pexels-photo-2360666.jpeg"
// 									}
// 									alt='Event preview'
// 									width={450}
// 									height={250}
// 								/>
// 							</div>
// 							<Anchor
// 								isDarkBackground
// 								className='event__button_mobile'
// 								href='#'
// 							>
// 								Gratis inngang
// 							</Anchor>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</section>
// 	)
// }

// export default EventList

// type EventItemProps = {
// 	date: string
// 	title: string
// 	time: string
// 	city: string
// 	location: string
// 	imageUrl: string
// 	signupHref: string
// 	freeEntryText?: string
// 	isFreeEntry: boolean
// }

// const EventItem: React.FC<EventItemProps> = ({
// 	date,
// 	title,
// 	time,
// 	city,
// 	location,
// 	imageUrl,
// 	signupHref,
// 	freeEntryText = "Gratis inngang",
// 	isFreeEntry,
// }) => (
// 	<div className={styles.event__item}>
// 		<span className={styles.event__date}>{date}</span>
// 		<div className={styles.event__container}>
// 			<div className={styles.event__title}>
// 				<h2>{title}</h2>
// 				{isFreeEntry ? (
// 					<Anchor href={signupHref} isDarkBackground>
// 						Gratis inngang
// 					</Anchor>
// 				) : (
// 					<Anchor href={signupHref} isDarkBackground>
// 						Meld deg på
// 					</Anchor>
// 				)}
// 			</div>
// 			<div className={styles.event__details}>
// 				<div>
// 					<h5 className={styles.date}>{time}</h5>
// 					<p className={styles.city}>{city}</p>
// 				</div>
// 				<div>
// 					<p className={styles.location}>{location}</p>
// 				</div>
// 			</div>
// 			<div className={styles.event__image}>
// 				<Image src={imageUrl} alt='Event preview' width={450} height={250} />
// 			</div>
// 			<Anchor
// 				isDarkBackground
// 				className='event__button_mobile'
// 				href={signupHref}
// 			>
// 				{freeEntryText}
// 			</Anchor>
// 		</div>
// 	</div>
// )
