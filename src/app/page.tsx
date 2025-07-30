import "@/styles/globals.scss"
import { EmblaOptionsType } from "embla-carousel"
import { type SanityDocument } from "next-sanity"
import { client } from "@/sanity/client"

import { frontPagePostQuery } from "@/components/lib/sanity/queries"

import Carousel from "@/components/Carousel/Carousel"
import Anchor from "@/components/Buttons/Anchor"

import AnimatedImage from "@/components/AnimatedImage/AnimatedImage"

import { Hero } from "@/components/Header/Hero"
import WaveCss from "@/components/WaveSeperator/WaveCss"
import EventList from "@/components/EventList/EventList"
import H2 from "@/components/lib/animations/H2"
import Paragraph from "@/components/lib/animations/Paragraph"

const OPTIONS: EmblaOptionsType = {
	dragFree: true,
	loop: true,
	align: "start",
}

const POST_LIMIT = 3 // Maximum number of posts to display on homepage

/*
   Home page component that fetches posts and renders the main landing sections for the ELMA website.
*/
export default async function Home() {
	const posts = await client.fetch(frontPagePostQuery)

	// Limit the number of posts

	console.log(posts)

	return (
		<main>
			<Hero
				title='For deg som vil <span>leve</span>, ikke bare <span>overleve</span>'
				subTitle='Hos ELMA møter du forståelse, fellesskap og mot. Det starter med å åpne opp - i ditt tempo.'
				buttonText='Start reisen'
				buttonHref='/om'
				imageSrc='/images/anders-moloen.png'
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

					<Carousel options={OPTIONS} />
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
							kjent på håpløsheten og mørket, og vet hvor vanskelig det kan være
							å finne veien tilbake. I dag bruker han sin erfaring til å hjelpe
							andre, enten du er ungdom, ung voksen, forelder eller fagperson
							som vil forstå bedre.
						</Paragraph>
					</div>

					{posts.length > 0 ? (
						posts.map((post: SanityDocument) => (
							<div className='content__spotlight' key={post._id}>
								<AnimatedImage
									// src={"/images/anders-karlsen-bg.png"}
									src={
										post.mainImage?.asset?.url ?? "/images/fallback-image.png"
									}
									alt={post.title}
									className='about__image'
									width={500}
									height={500}
									// fill
								/>
								<div className='spotlight__info'>
									<h4>{post.title}</h4>
									<Paragraph>{post.subtitle}</Paragraph>
									<Anchor href={`/${post.slug.current}`}>Les mer</Anchor>
								</div>
							</div>
						))
					) : (
						<p className='no-posts-message'>
							Ingen historier tilgjengelig akkurat nå.
						</p>
					)}
				</div>
			</section>
			<WaveCss isDarkBackground={false} rotate />
			<h1
				style={{
					textAlign: "center",
					fontWeight: "bold",
					fontStyle: "italic",
					marginBlock: "4rem",
				}}
			>
				Et trygt sted <br /> for urolige sinn
			</h1>

			<WaveCss isDarkBackground={false} />
			<EventList />
		</main>
	)
}
