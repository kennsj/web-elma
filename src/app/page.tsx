"use client"

// import { Header } from "@/components/Header/Header"
import Carousel from "@/components/Carousel/Carousel"
import "@/styles/globals.scss"
import { EmblaOptionsType } from "embla-carousel"
import Anchor from "@/components/Anchor/Anchor"

import AnimatedImage from "@/components/AnimatedImage/AnimatedImage"
import Animated from "@/components/AnimatedImage/Animated"
import { HeaderTwo } from "@/components/Header/HeaderTwo"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
// import gsap from "gsap"
import WaveCss from "@/components/WaveSeperator/WaveCss"
import { gsap, ScrollTrigger } from "gsap/all"

const OPTIONS: EmblaOptionsType = {
	dragFree: true,
	loop: true,
	align: "start",
}
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export default function Home() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const tl = useRef<gsap.core.Timeline | null>(null)

	gsap.registerPlugin(ScrollTrigger)

	useGSAP(() => {
		tl.current = gsap.timeline({
			scrollTrigger: {
				trigger: sectionRef.current,
				start: "top 80%",
				end: "bottom 30%",
				toggleActions: "play none none reverse",
			},
		})

		tl.current
			.from(".headline", {
				y: 40,
				opacity: 0,
				duration: 0.8,
				ease: "power2.out",
			})
			.from(
				".paragraph",
				{ y: 20, opacity: 0, duration: 0.6, stagger: 0.2 },
				"-=0.4"
			)
			.from(
				".value",
				{ y: 20, opacity: 0, duration: 0.5, stagger: 0.1 },
				"-=0.5"
			)
			.from(
				".cta-button",
				{ scale: 0.9, opacity: 0, duration: 0.4, ease: "back.out(1.7)" },
				"-=0.4"
			)
	}, [])

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

			<WaveCss isDarkBackground={false} />

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

			<section className='section__fullwidth event__section'>
				<div className='section__intro' style={{ color: "#C4DED7" }}>
					<h3>Foredrag og arrangementer</h3>
					<h2>
						Anders Karlsen reiser landet rundt for å snakke ærlig om angst,
						prestasjonspress og det å tørre å være åpen. Se hvor du kan møte ham
						neste gang.
					</h2>
				</div>

				{/* <div className='upcoming-events'>
					<div className='event-item'>
						<div className='event-date'>5. august</div>
						<div className='event-container'>
							<div>
								<h2>Bak fasaden: En personlig historie</h2>
								<span>Gratis deltakelse</span>
							</div>
							<div className='event-details'>
								<div className='event-time'>
									<span>18:00 - 20:00</span>
								</div>
								<div className='event-location'></div> */}

				<div className='event__list'>
					<div className='event__item'>
						<span className='event__date'>8. juli</span>

						<div className='event__container'>
							<div className='event__title'>
								<h2>Åpenhet i prestasjonskultur</h2>
								<Anchor href='#' isDarkBackground>
									Meld deg på
								</Anchor>
							</div>
							<div className='event__details'>
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

					<div className='event__item'>
						<span className='event__date'>15. sept</span>

						<div className='event__container'>
							<div className='event__title'>
								<h2>Åpenhet i prestasjonskultur</h2>
								<Anchor href='#' isDarkBackground>
									Meld deg på
								</Anchor>
							</div>
							<div className='event__details'>
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

					<div className='event__item'>
						<span className='event__date'>5. jan</span>

						<div className='event__container'>
							<div className='event__title'>
								<h2>Åpenhet i prestasjonskultur</h2>
								<Anchor href='#' isDarkBackground>
									Meld deg på
								</Anchor>
							</div>
							<div className='event__details'>
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
				</div>
			</section>

			<section
				ref={sectionRef}
				className='bg-[#f0f4f3] text-[#12332F] px-6 py-16 md:py-24'
			>
				<div className='max-w-4xl mx-auto text-center'>
					<h2 className='headline text-3xl md:text-4xl font-semibold mb-6'>
						Formål med ELMA
					</h2>
					<p className='paragraph text-lg mb-6 max-w-2xl mx-auto'>
						ELMA ble til med et mål om å skape et trygt rom – både fysisk og
						digitalt – hvor unge og unge voksne kan finne håp, inspirasjon og
						mot til å møte sine mentale utfordringer. Gjennom foredrag,
						historier og åpen dialog ønsker Anders Karlsen å senke terskelen for
						å snakke om det vanskelige og vise at ingen er alene i det de føler.
					</p>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8'>
						{["Åpenhet", "Trygghet", "Fellesskap", "Ærlighet", "Mot"].map(
							(value, index) => (
								<div
									key={index}
									className='value bg-white p-4 rounded-xl shadow-sm'
								>
									<p className='text-md font-medium'>{value}</p>
								</div>
							)
						)}
					</div>
					<button className='cta-button mt-6 px-6 py-3 bg-[#12332F] text-white rounded-xl hover:bg-[#0f2928] transition'>
						Les om Anders sin reise
					</button>
				</div>
			</section>

			<footer
				className=''
				style={{
					height: "",
					backgroundColor: "",
					marginBottom: "10rem",
				}}
			>
				<section>
					<h1>Here comes the footer!</h1>
				</section>
				{/* <section>
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
				</section> */}
			</footer>
		</main>
	)
}
