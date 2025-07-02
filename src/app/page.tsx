// import { Header } from "@/components/Header/Header"
import Carousel from "@/components/Carousel/Carousel"
import "@/styles/globals.scss"
import { EmblaOptionsType } from "embla-carousel"
import Anchor from "@/components/Buttons/Anchor"

import AnimatedImage from "@/components/AnimatedImage/AnimatedImage"
import Animated from "@/components/AnimatedImage/Animated"
// import { HeaderTwo } from "@/components/Header/HeaderTwo"
import { Hero } from "@/components/Header/Hero"
import WaveCss from "@/components/WaveSeperator/WaveCss"
import EventList from "@/components/EventList/EventList"

const OPTIONS: EmblaOptionsType = {
	dragFree: true,
	loop: true,
	align: "start",
}

// const SLIDE_COUNT = 9
// const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export default function Home() {
	return (
		<main>
			<Hero />

			<section className='section__histories section__fullwidth'>
				<div className='section__intro'>
					<h2>Ekte stemmer</h2>
					<p className='intro__paragraph'>
						Her deler modige stemmer sine personlige reiser med angst - til
						ettertanke, gjenkjennelse og håp.
					</p>
				</div>

				<Carousel options={OPTIONS} />
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
			<EventList />
		</main>
	)
}
