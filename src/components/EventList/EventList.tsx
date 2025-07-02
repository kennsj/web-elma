import Image from "next/image"
import React from "react"
import Anchor from "../Buttons/Anchor"

import styles from "./Event.module.scss"

const EventList = () => {
	return (
		<section className={`section__fullwidth ${styles.event__section}`}>
			<div className='section__intro' style={{ color: "#C4DED7" }}>
				<h2>Foredrag og arrangementer</h2>
				<p className='intro__paragraph'>
					Anders Karlsen reiser landet rundt for å snakke ærlig om angst,
					prestasjonspress og det å tørre å være åpen. Se hvor du kan møte ham
					neste gang.
				</p>
			</div>

			<div className={styles.event__list}>
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
						<Anchor isDarkBackground className='event__button_mobile' href='#'>
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
						<Anchor isDarkBackground className='event__button_mobile' href='#'>
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
						<Anchor isDarkBackground className='event__button_mobile' href='#'>
							Gratis inngang
						</Anchor>
					</div>
				</div>
			</div>
		</section>
	)
}

export default EventList
