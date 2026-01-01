import { Metadata } from "next"
import { EmblaOptionsType } from "embla-carousel"

import Carousel from "@/components/Lists/Carousel/Carousel"

import { Hero } from "@/components/Layout/Hero/Hero"
import WaveCss from "@/components/Layout/UI/WaveSeperator/WaveSeperator"
import EventList from "@/components/Lists/EventList/EventList"
import About from "@/components/Layout/Cards/Card/FeaturedCard"
import { TextNarrow, TextWide } from "@/components/ui/TextBlocks"
import Help from "@/components/Layout/Help/Help"
import {
	FadeInLetters,
	FadeInParagraph,
	FadeInWords,
} from "@/components/Layout/UI/Animations/ParagraphFadeIn"
import Image from "next/image"
import TextReveal from "@/components/Layout/UI/Animations/FadeIn"

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
		url: "https://your-domain.com", // Replace
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
		<>
			<Hero
				key='home-hero'
				title='For deg som vil <span>leve</span>, <br /> ikke bare <span>overleve</span>'
				subTitle='Hos ELMA møter du forståelse, fellesskap og mot. Det starter med å åpne opp. I ditt tempo.'
				buttonText='Start reisen'
				buttonHref='/om-elma'
				imageSrc='/images/anders-moloen.webp'
				imageAlt='Anders Moloen'
				imageSizes='(max-width: 768px) 500px, (max-width: 1200px) 50vw, 33vw'
				imageQuality={100}
				imagePriority={true}
			>
				{/* <TextWide color='light'>
					ELMA ble startet av Anders, som selv har levd med angst i store deler
					av livet. Gjennom ELMA ønsker han å skape et trygt rom for deling,
					forståelse og støtte, slik at ingen skal måtte stå alene med sin
					psykiske helse.
				</TextWide> */}
				<FadeInLetters>
					<p>
						Enten du selv sliter med angst, kjenner noen som gjør det, eller
						bare ønsker å lære mer om psykisk helse, er du velkommen her.
					</p>
				</FadeInLetters>
			</Hero>

			<main>
				<section>
					<div className='section__content'>
						<TextNarrow
							title='Om ELMA'
							introduction='Å leve med angst, delt for å gi gjenkjennelse og håp'
							dataTheme='light'
							link={{ href: "/om-elma", label: "Lær mer om ELMA" }}
						>
							{/* <FadeInLetters initialOpacity={0.3}>
								<p>
									Prosjektet springer ut av egne erfaringer, og et ønske om å
									normalisere det mange bærer på i stillhet. Gjennom tekst,
									video og delte historier ønker ELMA å skape rom for
									gjenkjennelse, ærlighet og fellesskap.
								</p>

								<p>
									Mange opplever at psykisk helse forblir noe man bærer i
									stillhet. ELMA ønsker å endre på dette, ved å tilby et trygt
									rom for deling og forståelse. Gjennom ærlige samtaler og
									personlige historier håper ELMA å bidra til et mer åpent
									samfunn, hvor ingen trenger å føle seg alene med sine
									utfordringer.
								</p>

								<Image
									src='/images/anders-moloen.webp'
									alt='Anders holder foredrag'
									width={800}
									height={400}
									className='image--fullwidth'
								/>

								<p>
									ELMA ble startet av Anders Karlsen, som selv har levd med
									angst i store deler av livet. Erfaringene hans har gitt en dyp
									forståelse for hvor vanskelig det kan føles å stå alene med
									tanker og følelser som er utfordrende å sette ord på.
								</p>
							</FadeInLetters> */}
							<TextReveal initialOpacity={0.3}>
								<p>
									Prosjektet springer ut av egne erfaringer, og et ønske om å
									normalisere det mange bærer på i stillhet. Gjennom tekst,
									video og delte historier ønker ELMA å skape rom for
									gjenkjennelse, ærlighet og fellesskap.
								</p>

								<p>
									Mange opplever at psykisk helse forblir noe man bærer i
									stillhet. ELMA ønsker å endre på dette, ved å tilby et trygt
									rom for deling og forståelse. Gjennom ærlige samtaler og
									personlige historier håper ELMA å bidra til et mer åpent
									samfunn, hvor ingen trenger å føle seg alene med sine
									utfordringer.
								</p>

								<Image
									src='/images/anders-moloen.webp'
									alt='Anders holder foredrag'
									width={800}
									height={400}
									className='image--fullwidth'
								/>

								<p>
									ELMA ble startet av Anders Karlsen, som selv har levd med
									angst i store deler av livet. Erfaringene hans har gitt en dyp
									forståelse for hvor vanskelig det kan føles å stå alene med
									tanker og følelser som er utfordrende å sette ord på.
								</p>
							</TextReveal>
						</TextNarrow>
					</div>
				</section>

				{/* <section className='section__histories section__fullwidth'>
					<div className='histories__wrapper'>
						<div className='section__intro'>
							<HeadingAnimation level='h2' title='Ekte stemmer' />

							<Paragraph className={"intro__paragraph"}>
								Her deler modige stemmer sine personlige reiser med
								angst&mdash;til ettertanke, gjenkjennelse og håp.
							</Paragraph>
						</div>

						<Carousel options={OPTIONS} />
						<WaveCss isDarkBackground={false} />
					</div>
				</section> */}
				<WaveCss isDarkBackground={false} />
				<About />
				{/* <WaveCss isDarkBackground={false} rotate /> */}
				{/* Disabled for now */}
				{/* <EventList
					title='Foredrag og arrangementer'
					intro='Anders Karlsen reiser landet rundt for å snakke ærlig om angst, prestasjonspress og det å tørre å være åpen. Se hvor du kan møte ham neste gang.'
					showExpiredEvents={false}
				/> */}
				{/* <WaveCss isDarkBackground={false} /> */}
			</main>
		</>
	)
}
