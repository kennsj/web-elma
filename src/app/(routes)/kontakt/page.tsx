import H2 from "@/components/Layout/UI/Animations/HeadingAnimation"
import Paragraph from "@/components/lib/animations/ParagraphAnimation"
import { Hero } from "@/components/Layout/Hero/Hero"
import WaveCss from "@/components/Layout/UI/WaveSeperator/WaveSeperator"
import React from "react"

const page = () => {
	return (
		<>
			<Hero
				title='Ønsker du å kontakte oss?'
				subTitle='Vi er her for å hjelpe deg, og vi vil gjerne høre fra deg'
				buttonText='Start reisen'
				buttonHref='/om'
				imageSrc='/images/placeholder1.png'
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
					</div>
				</div>
			</section>
		</>
	)
}

export default page
