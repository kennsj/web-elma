import { Metadata } from "next"
import { Hero } from "@/components/Layout/Hero/Hero"

export const metadata: Metadata = {
	title: "Side ikke funnet | ELMA",
	description: "Beklager, siden du leter etter finnes ikke.",
}

export default function NotFound() {
	return (
		<>
			<Hero
				title='Woops, 404! Siden finnes ikke'
				subTitle='Frykt ikke, vi hjelper deg å finne veien tilbake'
				buttonText='Reis hjem'
				buttonHref='/'
				imageSrc='/images/anders-moloen.webp'
				imageAlt='Anders Moloen'
				imageSizes='(max-width: 768px) 500px, (max-width: 1200px) 50vw, 33vw'
				imageQuality={100}
				imagePriority={true}
				showWave={false}
			></Hero>
		</>
	)
}
