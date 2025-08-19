import "@/styles/globals.scss"
import { Metadata } from "next"
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

export const metadata: Metadata = {
	title: "ELMA - For deg som vil leve, ikke bare overleve",
	description:
		"Hos ELMA møter du forståelse, fellesskap og mot. Det starter med å åpne opp - i ditt tempo. Anders Karlsen reiser landet rundt for å snakke ærlig om angst og psykisk helse.",
	keywords: [
		"angst",
		"psykisk helse",
		"foredrag",
		"Anders Karlsen",
		"støtte",
		"fellesskap",
	],
	openGraph: {
		title: "ELMA - For deg som vil leve, ikke bare overleve",
		description:
			"Hos ELMA møter du forståelse, fellesskap og mot. Det starter med å åpne opp - i ditt tempo.",
		type: "website",
		locale: "no_NO",
		url: "https://your-domain.com", // Replace with your actual domain
		siteName: "ELMA",
	},
	twitter: {
		card: "summary_large_image",
		title: "ELMA - For deg som vil leve, ikke bare overleve",
		description:
			"Hos ELMA møter du forståelse, fellesskap og mot. Det starter med å åpne opp - i ditt tempo.",
	},
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

			<EventList
				title='Foredrag og arrangementer'
				intro='Anders Karlsen reiser landet rundt for å snakke ærlig om angst, prestasjonspress og det å tørre å være åpen. Se hvor du kan møte ham neste gang.'
				showExpiredEvents={false}
			/>
		</main>
	)
}
