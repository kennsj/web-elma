"use client"

// import { Header } from "@/components/Header/Header"
import Carousel from "@/components/Carousel/Carousel"
import "@/styles/globals.css"
import { EmblaOptionsType } from "embla-carousel"
import Anchor from "@/components/Anchor/Anchor"

import AnimatedImage from "@/components/AnimatedImage/AnimatedImage"
import Animated from "@/components/AnimatedImage/Animated"
import { HeaderTwo } from "@/components/Header/HeaderTwo"
import Image from "next/image"
import Waves from "@/components/WaveSeperator/Waves"

const OPTIONS: EmblaOptionsType = {
	dragFree: true,
	loop: true,
	align: "start",
}
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export default function Home() {
	return (
		<main>
			<HeaderTwo />

			<section className='section__histories'>
				<h3>Utvalgte historier</h3>
				<h2>
					Her deler modige stemmer sine personlige reiser med angst – til
					ettertanke, gjenkjennelse og håp.
				</h2>

				<Carousel slides={SLIDES} options={OPTIONS} />

				{/* <HistoryList /> */}
			</section>

			<section>
				<Animated>
					<div className='content__spotlight'>
						<AnimatedImage
							src={
								"https://images.pexels.com/photos/236151/pexels-photo-236151.jpeg"
							}
							alt='Test'
							className='spotlight__image'
							width={500}
							height={500}
						/>
						<div className='spotlight__info'>
							<h4>Om Elma</h4>
							<h3>
								En hånd å holde i <br />
								gjennom livets stormer
							</h3>
							<Anchor href='#' isDarkBackground>
								Les mer
							</Anchor>
						</div>
					</div>
				</Animated>
			</section>

			<section>
				<Animated>
					<div className='content__spotlight'>
						<AnimatedImage
							src={
								"https://images.pexels.com/photos/897817/pexels-photo-897817.jpeg"
							}
							alt='Test'
							className='spotlight__image'
							width={500}
							height={500}
						/>
						<div className='spotlight__info'>
							<h4>Om Elma</h4>
							<h3>
								En hånd å holde i <br />
								gjennom livets stormer
							</h3>
							<Anchor href='#' isDarkBackground>
								Les mer
							</Anchor>
						</div>
					</div>
				</Animated>
			</section>

			<section>
				<Animated>
					<div className='content__spotlight'>
						<AnimatedImage
							src={
								"https://images.pexels.com/photos/185801/pexels-photo-185801.jpeg"
							}
							alt='Test'
							className='spotlight__image'
							width={500}
							height={500}
						/>
						<div className='spotlight__info'>
							<h4>Om Elma</h4>
							<h3>
								En hånd å holde i <br />
								gjennom livets stormer
							</h3>
							<Anchor href='#' isDarkBackground>
								Les mer
							</Anchor>
						</div>
					</div>
				</Animated>
			</section>

			{/* <section className='videoer' ref={test}>
				<h3>Videoer</h3>
				<h2>Hør historiene til menneskene bak elma</h2>
				<div className='video__list'>
					<iframe
						src='https://www.youtube.com/embed/VIDEO_ID'
						title='YouTube video player'
						frameBorder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen
					></iframe>
					<iframe
						src='https://www.youtube.com/embed/VIDEO_ID'
						title='YouTube video player'
						frameBorder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen
					></iframe>
					<iframe
						src='https://www.youtube.com/embed/VIDEO_ID'
						title='YouTube video player'
						frameBorder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen
					></iframe>
				</div>
			</section> */}

			<section className='upcoming__events'>
				<div className='section__intro'>
					<h3>Foredrag og arrangementer</h3>
					<h2>
						Anders Karlsen reiser landet rundt for å snakke ærlig om angst,
						prestasjonspress og det å tørre å være åpen. Se hvor du kan møte ham
						neste gang.
					</h2>
				</div>
				<div className='event__list'>
					<div className='event__wrapper'>
						<span className='event__date'>8. juli</span>
						<div className='event__card'>
							<div className='event__title'>
								<h2>Åpenhet i prestasjonskultur</h2>
								<Anchor href='#' isDarkBackground>
									Meld deg på
								</Anchor>
							</div>
							<div className='event__info'>
								<h5>18:00 - 20:00</h5>
								<p>Oslo</p>
								<p>Sentralen, Øvre Slottsgate 3</p>
							</div>
							<div className='event__image'>
								<Image
									src={
										"https://images.pexels.com/photos/2360666/pexels-photo-2360666.jpeg"
									}
									alt='Event preview'
									width={450}
									height={250}
								/>
							</div>
						</div>
					</div>

					<div className='event__wrapper'>
						<span className='event__date'>29. aug</span>
						<div className='event__card'>
							<div className='event__title'>
								<h2>Åpenhet i prestasjonskultur</h2>
								<Anchor href='#' isDarkBackground>
									Meld deg på
								</Anchor>
							</div>
							<div className='event__info'>
								<h4>Oslo</h4>
								<p>18:00 - 20:00</p>
								<p>Sentralen, Øvre Slottsgate 3</p>
							</div>
							<div className='event__image'>
								<Image
									src={
										"https://images.pexels.com/photos/2360666/pexels-photo-2360666.jpeg"
									}
									alt='Event preview'
									width={400}
									height={300}
								/>
							</div>
						</div>
					</div>

					<div className='event__wrapper'>
						<span className='event__date'>8. juli</span>
						<div className='event__card'>
							<div className='event__title'>
								<h2>Åpenhet i prestasjonskultur</h2>
								<Anchor href='#' isDarkBackground>
									Meld deg på
								</Anchor>
							</div>
							<div className='event__info'>
								<h4>Oslo</h4>
								<p>18:00 - 20:00</p>
								<p>Sentralen, Øvre Slottsgate 3</p>
							</div>
							<div className='event__image'>
								<Image
									src={
										"https://images.pexels.com/photos/2360666/pexels-photo-2360666.jpeg"
									}
									alt='Event preview'
									width={400}
									height={300}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Waves />

			<footer
				className=''
				style={{
					height: "",
					backgroundColor: "",
					marginBlock: "10rem",
				}}
			>
				<section>
					<div className='footer__content'>
						<h3>Om Elma</h3>
						<p>
							Elma er et prosjekt som tar sikte på å gi en stemme til de som
							kjemper med angst. Gjennom historier, videoer og ressurser ønsker
							vi å skape forståelse og fellesskap.
						</p>
					</div>
					<div className='footer__links'>
						<a href='#'>Personvern</a>
						<a href='#'>Kontakt oss</a>
						<a href='#'>Om oss</a>
					</div>
					<p className='footer__copyright'>
						{new Date().getFullYear()} Elma. Alle rettigheter reservert.
					</p>
				</section>
			</footer>
		</main>
	)
}
