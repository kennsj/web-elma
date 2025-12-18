import { Metadata } from "next"
import { generateSEOMetadata } from "@/components/lib/sanity/seo"
import { Hero } from "@/components/Layout/Hero/Hero"
import Paragraph from "@/components/Layout/UI/Animations/ParagraphAnimation"
// import { EventsContainer } from "@/components/Events"

export const metadata: Metadata = generateSEOMetadata({
	title: "Arrangementer",
	description:
		"Se alle kommende og tidligere arrangementer med Anders Karlsen. Foredrag om psykisk helse, angst og det å tørre å være åpen.",
	slug: "events",
	type: "website",
})

export default function EventsPage() {
	return (
		<main>
			<Hero
				title='For deg som vil <span>leve</span>, ikke bare <span>overleve</span>'
				subTitle='Hos ELMA møter du forståelse, fellesskap og mot. Det starter med å åpne opp - i ditt tempo.'
				buttonText='Start reisen'
				buttonHref='/om-elma'
				imageSrc='/images/anders-moloen.webp'
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
			<div style={{ padding: "60px 0 0 0" }}>
				<div
					style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}
				>
					<header style={{ marginBottom: "40px", textAlign: "center" }}>
						<h1
							style={{
								fontSize: "2.5rem",
								fontWeight: "700",
								marginBottom: "16px",
							}}
						>
							Arrangementer
						</h1>
						<p
							style={{
								fontSize: "1.125rem",
								color: "var(--color-text-secondary)",
								lineHeight: "1.6",
								maxWidth: "600px",
								margin: "0 auto",
							}}
						>
							Anders Karlsen reiser landet rundt for å snakke ærlig om angst,
							prestasjonspress og det å tørre å være åpen. Se hvor du kan møte
							ham neste gang.
						</p>
					</header>
				</div>
			</div>

			{/* <EventsContainer
				showExpiredEvents={true}
				upcomingVariant='default'
				expiredVariant='compact'
				showUpcomingViewAll={false}
				expiredCollapsible={true}
				expiredInitiallyExpanded={false}
			/> */}
		</main>
	)
}
