import { Metadata } from "next"
import { Hero } from "@/components/Layout/Hero/Hero"
import Paragraph from "@/components/Layout/UI/Animations/ParagraphAnimation"
import About from "@/components/Layout/Cards/Card/Card"
import HeadingAnimation from "@/components/Layout/UI/Animations/HeadingAnimation"

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
			>
				<Paragraph>
					ELMA er mer enn bare et navn – det er en bevegelse. En bevegelse som
					handler om å bryte ned barrierer, dele erfaringer og finne styrke i
					fellesskap. Vi tror på kraften av ærlige samtaler og ekte historier
					for å skape en verden der ingen trenger å føle seg alene i møte med
					angst og psykiske utfordringer.
				</Paragraph>
			</Hero>
			<main></main>
		</>
	)
}

export default page
