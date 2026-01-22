import { Metadata } from "next"
import { EmblaOptionsType } from "embla-carousel"

import Carousel from "@/components/Lists/Carousel/Carousel"

import { Hero } from "@/components/Layout/Hero/Hero"
import WaveCss from "@/components/Layout/UI/WaveSeperator/WaveSeperator"
// import EventList from "@/components/Lists/EventList/EventList"
import About from "@/components/Layout/Cards/Card/FeaturedCard"
import { TextNarrow, TextWide } from "@/components/ui/TextBlocks"
import Image from "next/image"
import Anchor from "@/components/Layout/UI/Buttons/Anchor"
// import Help from "@/components/Layout/Help/Help"

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
		"Anders Karlsen",
		"mental helse",
		"ELMA",
		"et liv med angst",
		"leve med angst",
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
				title={
					"For deg som vil <span>leve</span>, \nikke bare <span>overleve</span>"
				}
				subTitle='Hos ELMA møter du forståelse, fellesskap og mot. Det starter med å åpne opp. I ditt tempo.'
				buttonText='Start reisen'
				buttonHref='/om-elma'
				imageSrc='/images/anders-moloen.webp'
				imageAlt='Anders Moloen'
				imageSizes='(max-width: 768px) 500px, (max-width: 1200px) 50vw, 33vw'
				imageQuality={100}
				imagePriority={true}
			/>

			<main>
				<section>
					<div className='section__content'>
						<TextNarrow
							title='Om ELMA'
							subTitle='ELMA handler om noe mange kjenner på – men sjelden snakker om'
							introduction='Bak ELMA står Anders Karlsen, som i sine voksne år bestemte seg for å være åpen om det som hadde styrt livet hans i over 20 år; en usynlig kamp mot angst og det å bære på det som er vanskelig alene.'
							dataTheme='light'
							animateBy='line'
							// animateBy='paragraph'
						>
							<p>
								Gjennom tekst, videoer, refleksjoner og historier ønsker ELMA å
								skape et rom for gjenkjennelse, styrke og fellesskap. For de som
								skjenner det på kroppen, for de som står tett på, og for de som
								ønsker å forstå mer—dette er en invitasjon for å bli med på en
								reise mot større åpenhet og aksept rundt psykisk helse.
							</p>

							<Anchor href='/om-elma' className='textnarrow__link'>
								Lær mer om ELMA
							</Anchor>
						</TextNarrow>
					</div>
					<WaveCss isDarkBackground={false} />
				</section>

				<section data-theme='dark'>
					<div className='section__content'>
						<div className='section__intro'>
							<TextWide
								title='Ekte stemmer'
								// dataTheme='dark'
								// animateBy='paragraph'
							>
								Her deler modige stemmer sine personlige reiser med
								angst&mdash;til ettertanke, gjenkjennelse og håp.
							</TextWide>
							{/* <TextNarrow
								title='Om ELMA'
								introduction='Å leve med angst, delt for å gi gjenkjennelse og håp'
								dataTheme='dark'
								// animateBy='paragraph'
							>
								<p>
									Her deler modige stemmer sine personlige reiser med
									angst&mdash;til ettertanke, gjenkjennelse og håp.
								</p>

								<Anchor href='/om-elma' className='textnarrow__link'>
									Lær mer om ELMA
								</Anchor>
							</TextNarrow> */}
						</div>
					</div>
					<Carousel options={OPTIONS} />
				</section>
				<About />

				{/* <section>
					<div className='section__content'>
						<Help />
					</div>
				</section> */}
				<section>
					<div className='section__content'>
						<TextWide title='Takk til våre partnere' dataTheme='light'>
							Vi er stolte av å samarbeide med engasjerte aktører som deler vårt
							mål; å skape mer åpenhet og trygghet rundt psykisk helse. Deres
							støtte gjør det mulig å nå ut til flere, og å gjøre en forskjell,
							sammen.
						</TextWide>
						<div className='partners__logo-container'>
							<a
								href='https://autoelektroas.boschcarservice.no/'
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src='/images/partners/auto-elektro-as.png'
									alt='Auto Elektro AS Bodø'
									sizes='(max-width: 768px) 50px, 50px, (max-width: 1200px) 80vw, 800px'
									quality={90}
									height={450}
									width={300}
								/>
							</a>
							{/* <Image
								src='/images/partners/sulland.png'
								alt='Auto Elektro AS Bodø'
								sizes='(max-width: 768px) 50px, 50px, (max-width: 1200px) 80vw, 800px'
								quality={90}
								height={450}
								width={150}
							/>
							<Image
								src='/images/partners/bopro.png'
								alt='Auto Elektro AS Bodø'
								sizes='(max-width: 768px) 50px, 50px, (max-width: 1200px) 80vw, 800px'
								quality={90}
								height={450}
								width={150}
							/>
							<Image
								src='/images/partners/sulland.png'
								alt='Auto Elektro AS Bodø'
								sizes='(max-width: 768px) 50px, 50px, (max-width: 1200px) 80vw, 800px'
								quality={90}
								height={450}
								width={150}
							/>
							<Image
								src='/images/partners/auto-elektro-as.png'
								alt='Auto Elektro AS Bodø'
								sizes='(max-width: 768px) 50px, 50px, (max-width: 1200px) 80vw, 800px'
								quality={90}
								height={450}
								width={200}
							/> */}
						</div>
					</div>
					<WaveCss isDarkBackground={false} />
				</section>
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
