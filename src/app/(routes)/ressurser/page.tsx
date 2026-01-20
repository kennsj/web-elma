import { Hero } from "@/components/Layout/Hero/Hero"
import WaveCss from "@/components/Layout/UI/WaveSeperator/WaveSeperator"
import React from "react"

const page = () => {
	return (
		<>
			<Hero
				title='Ressurser som støtter deg'
				subTitle='Her finner du verktøy, artikler og ressurser for å håndtere angst'
				buttonText='Start reisen'
				buttonHref='/om-elma'
				imageSrc='/images/man-mountain-alone.jpg'
				imageAlt='Anders Moloen'
				imageSizes='(max-width: 768px) 500px, (max-width: 1200px) 50vw, 33vw'
				imageQuality={100}
				imagePriority={true}
				// intro='Elma ble startet av Anders, som selv har levd med angst i store
				// 		deler av livet. Gjennom elma ønsker han å skape et trygt rom for
				// 		deling, forståelse og støtte&mdash;slik at ingen skal måtte stå
				// 		alene med sin psykiske helse.'
			></Hero>

			<section className='section__histories section__fullwidth'>
				<div className='histories__wrapper'>
					<div className='section__intro'>
						<p className={"intro__paragraph"}>
							Her deler modige stemmer sine personlige reiser med
							angst&mdash;til ettertanke, gjenkjennelse og håp.
						</p>
					</div>

					<WaveCss isDarkBackground={false} />
				</div>
			</section>

			<section className='section__about section__fullwidth'>
				<div className='about__wrapper'>
					<div className='section__intro'>
						<p className={"intro__paragraph"}>
							Anders vet hvordan det føles når livet kjennes tungt. Han har selv
							kjent på håpløsheten og mørket — og vet hvor vanskelig det kan
							være å finne veien tilbake. I dag bruker han sin erfaring til å
							hjelpe andre, enten du er ungdom, ung voksen, forelder eller
							fagperson som vil forstå bedre.
						</p>
					</div>
				</div>
			</section>
		</>
	)
}

export default page
