import { Metadata } from "next"
import { Hero } from "@/components/Layout/Hero/Hero"
import Paragraph from "@/components/Layout/UI/Animations/ParagraphAnimation"
import About from "@/components/Layout/Cards/Card/Card"
import HeadingAnimation from "@/components/Layout/UI/Animations/HeadingAnimation"
import { TextWide } from "@/components/ui/TextBlocks"

export const metadata: Metadata = {
	title: "Hva er elma? | ELMA",
	description:
		"ELMA er et initiativ for å skape åpenhet, forståelse og trygghet rundt angst og psykisk helse – gjennom ekte historier og ærlige samtaler.",
}

const page = () => {
	return (
		<>
			<Hero
				title='Personvern og vilkår'
				subTitle='Ditt personvern er viktig for oss'
				buttonText='Tilbake til hjem'
				buttonHref='/'
			>
				<TextWide title='Personvern' color='light'>
					Personvernerklæringen beskriver hvordan vi samler inn, bruker og
					beskytter dine personopplysninger når du besøker og bruker ELMA sin
					nettside.
				</TextWide>
			</Hero>
			<main></main>
		</>
	)
}

export default page
