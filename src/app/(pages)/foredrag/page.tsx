import H2 from "@/animations/H2"
import Paragraph from "@/animations/Paragraph"
import Animated from "@/components/AnimatedImage/Animated"
import AnimatedImage from "@/components/AnimatedImage/AnimatedImage"
import Anchor from "@/components/Buttons/Anchor"
import { Hero } from "@/components/Header/Hero"
import WaveCss from "@/components/WaveSeperator/WaveCss"
import React from "react"

const page = () => {
	return (
		<>
			<Hero
				title='Anders reiser rundt i Norge for å dele sin historie'
				subTitle='Ønsker du å delta på et foredrag?'
				buttonText='Start reisen'
				buttonHref='/om'
				imageSrc='/images/person-aurora.webp'
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

					<WaveCss isDarkBackground={false} />
				</div>
			</section>

			<section className='section__about section__fullwidth'>
				<div className='about__wrapper'>
					<div className='section__intro'>
						<H2 title='Mer enn et prosjekt - et pusterom' />
						{/* <Paragraph className={"intro__paragraph"}>
							Elma er et fellesskap for alle som lever med angst. Her kan du
							delta i samtaler, dele erfaringer og finne støtte. Vi tror på
							kraften av åpenhet og fellesskap, og ønsker å skape et trygt rom
							for deling og forståelse.
						</Paragraph> */}

						<Paragraph className={"intro__paragraph"}>
							Anders vet hvordan det føles når livet kjennes tungt. Han har selv
							kjent på håpløsheten og mørket — og vet hvor vanskelig det kan
							være å finne veien tilbake. I dag bruker han sin erfaring til å
							hjelpe andre, enten du er ungdom, ung voksen, forelder eller
							fagperson som vil forstå bedre.
						</Paragraph>
						<Paragraph className={"intro__paragraph"}>
							Gjennom sin åpne og direkte formidling når han inn til folk i alle
							aldre. Det handler ikke om å være perfekt, men om å være ekte – og
							vise at det er mulig å reise seg, uansett hvor du har vært.
						</Paragraph>
					</div>

					<Animated>
						<div className='content__spotlight'>
							<AnimatedImage
								src={"/images/anders-karlsen-bg.png"}
								alt='Test'
								className='spotlight__image'
								width={500}
								height={500}
							/>
							<div className='spotlight__info'>
								<h4>Om Elma</h4>
								<Paragraph>
									En hånd å holde i <br />
									gjennom livets stormer
								</Paragraph>
								<Anchor href='/about'>Les mer</Anchor>
							</div>
						</div>
					</Animated>
				</div>
			</section>
			<WaveCss isDarkBackground={false} rotate />
		</>
	)
}

export default page
