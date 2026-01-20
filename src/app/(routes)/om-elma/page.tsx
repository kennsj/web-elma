import { Metadata } from "next"
import { Hero } from "@/components/Layout/Hero/Hero"
import Image from "next/image"
import { TextNarrow } from "@/components/ui/TextBlocks"

export const metadata: Metadata = {
	title: "Hva er elma? | ELMA",
	description:
		"ELMA er et initiativ for å skape åpenhet, forståelse og trygghet rundt angst og psykisk helse – gjennom ekte historier og ærlige samtaler.",
}

const page = () => {
	return (
		<>
			<Hero
				title='ELMA <span>- et liv med angst</span>'
				subTitle='ELMA er et prosjekt skapt for å gjøre det lettere å snakke om angst.
				Gjennom ærlige erfaringer og menneskelige perspektiver ønsker vi å bidra til mer åpenhet, forståelse og trygghet.'
				imageSrc='/images/anders-karlsen-bg.webp'
				buttonText='Tilbake til hjem'
				buttonHref='/'
				imageAlt='Anders Moloen'
				imageSizes='(max-width: 768px) 500px, (max-width: 1200px) 50vw, 33vw'
				imageQuality={100}
				imagePriority={true}
			></Hero>
			<main>
				<section>
					<div className='section__content'>
						<TextNarrow
							title='Om ELMA'
							subTitle='Å leve med angst, delt for å gi gjenkjennelse og håp'
							introduction='Prosjektet springer ut av egne erfaringer, og et ønske om å
								normalisere det mange bærer på i stillhet. Gjennom tekst, video
								og delte historier ønker ELMA å skape rom for gjenkjennelse,
								ærlighet og fellesskap.'
							dataTheme='light'
							// animateBy='paragraph'
						>
							<p>
								Mange opplever at psykisk helse forblir noe man bærer i
								stillhet. ELMA ønsker å endre på dette, ved å tilby et trygt rom
								for deling og forståelse. Gjennom ærlige samtaler og personlige
								historier håper ELMA å bidra til et mer åpent samfunn, hvor
								ingen trenger å føle seg alene med sine utfordringer.
							</p>

							<Image
								src='/images/anders-moloen.webp'
								alt='Anders holder foredrag'
								width={800}
								height={400}
								className='image--fullwidth'
							/>

							<p>
								ELMA ble startet av Anders Karlsen, som selv har levd med angst
								i store deler av livet. Erfaringene hans har gitt en dyp
								forståelse for hvor vanskelig det kan føles å stå alene med
								tanker og følelser som er utfordrende å sette ord på.
							</p>

							<p>
								Gjennom ELMA ønsker Anders å bruke sin historie til å hjelpe
								andre. Ved å være åpen om sine egne erfaringer, håper han å
								skape et rom der flere kan finne gjenkjennelse, styrke og håp i
								møtet med angst og psykiske utfordringer.
							</p>
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
			</main>
		</>
	)
}

export default page
