import "@/styles/globals.scss"
import { EmblaOptionsType } from "embla-carousel"

import Carousel from "@/components/Lists/Carousel/Carousel"

import { Hero } from "@/components/Layout/Hero/Hero"
import WaveCss from "@/components/Layout/UI/WaveSeperator/WaveSeperator"
import EventList from "@/components/Lists/EventList/EventList"
import H2 from "@/components/Layout/UI/Animations/HeadingAnimation"
import Paragraph from "@/components/Layout/UI/Animations/ParagraphAnimation"
import About from "@/components/Layout/Cards/Card/Card"

const OPTIONS: EmblaOptionsType = {
	dragFree: true,
	loop: true,
	align: "start",
}

export default async function Home() {
	return (
		<main>
			<Hero
				title='For deg som vil <span>leve</span>, ikke bare <span>overleve</span>'
				subTitle='Hos ELMA møter du forståelse, fellesskap og mot. Det starter med å åpne opp - i ditt tempo.'
				buttonText='Start reisen'
				buttonHref='/om'
				imageSrc='/images/anders-moloen.png'
				imageAlt='Anders Moloen'
				imageSizes='(max-width: 768px) 500px, (max-width: 1200px) 50vw, 33vw'
				imageQuality={100}
				imagePriority={true}
				// intro='Elma ble startet av Anders, som selv har levd med angst i store
				// 		deler av livet. Gjennom elma ønsker han å skape et trygt rom for
				// 		deling, forståelse og støtte&mdash;slik at ingen skal måtte stå
				// 		alene med sin psykiske helse.'
			>
				<Paragraph className={"header__intro"}>
					Elma ble startet av Anders, som selv har levd med angst i store deler
					av livet. Gjennom elma ønsker han å skape et trygt rom for deling,
					forståelse og støtte&mdash;slik at ingen skal måtte stå alene med sin
					psykiske helse.
				</Paragraph>
			</Hero>

			<section className='section__histories section__fullwidth'>
				<div className='histories__wrapper'>
					<div className='section__intro'>
						<H2 title='Ekte stemmer' />

						<Paragraph className={"intro__paragraph"}>
							Her deler modige stemmer sine personlige reiser med
							angst&mdash;til ettertanke, gjenkjennelse og håp.
						</Paragraph>
					</div>

					<Carousel options={OPTIONS} />
					<WaveCss isDarkBackground={false} />
				</div>
			</section>

			<About />
			<WaveCss isDarkBackground={false} rotate />
			<h1
				style={{
					textAlign: "center",
					fontWeight: "bold",
					fontStyle: "italic",
					marginBlock: "4rem",
				}}
			>
				Et trygt sted <br /> for urolige sinn
			</h1>

			<WaveCss isDarkBackground={false} />
			<EventList />
		</main>
	)
}
