import "@/styles/globals.scss"
import { EmblaOptionsType } from "embla-carousel"
import { type SanityDocument } from "next-sanity"
import { client } from "@/sanity/client"

import Carousel from "@/components/Carousel/Carousel"
import Anchor from "@/components/Buttons/Anchor"

import AnimatedImage from "@/components/AnimatedImage/AnimatedImage"
import Animated from "@/components/AnimatedImage/Animated"
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

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}
`

const sanityOptions = { next: { revalidate: 30 } }

// const SLIDE_COUNT = 9
// const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export default async function Home() {
	const posts = await client.fetch<SanityDocument[]>(
		POSTS_QUERY,
		{},
		sanityOptions
	)

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

					{posts.map((post) => (
						<div className='content__spotlight' key={post._id}>
							<Animated
								src={`/images/posts/${post.slug.current}.jpg`}
								alt={post.title}
								className='about__image'
								width={500}
								height={500}
							></Animated>
							<div className='spotlight__info'>
								<h4>{post.title}</h4>
								<Paragraph>{post.body}</Paragraph>
								<Anchor href={`/${post.slug.current}`}>Les mer</Anchor>
							</div>
						</div>
					))}

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

			{/* <section>
				<Animated>
					<div className='content__spotlight' style={{ marginTop: "10rem" }}>
						<AnimatedImage
							src={
								"https://images.pexels.com/photos/236151/pexels-photo-236151.jpeg"
							}
							alt='Test'
							className='spotlight__image'
							width={500}
							height={500}
						/>
						<div className='spotlight__info'>
							<h4>Om Elma</h4>
							<h3>
								En hånd å holde i <br />
								gjennom livets stormer
							</h3>
							<Anchor href='#' isDarkBackground>
								Les mer
							</Anchor>
						</div>
					</div>
				</Animated> 

				<Animated>
					<div className='content__spotlight'>
						<AnimatedImage
							src={
								"https://images.pexels.com/photos/897817/pexels-photo-897817.jpeg"
							}
							alt='Test'
							className='spotlight__image'
							width={500}
							height={500}
						/>
						<div className='spotlight__info'>
							<h4>Om Elma</h4>
							<h3>
								En hånd å holde i <br />
								gjennom livets stormer
							</h3>
							<Anchor href='#' isDarkBackground>
								Les mer
							</Anchor>
						</div>
					</div>
				</Animated>

				<Animated>
					<div className='content__spotlight'>
						<AnimatedImage
							src={
								"https://images.pexels.com/photos/185801/pexels-photo-185801.jpeg"
							}
							alt='Test'
							className='spotlight__image'
							width={500}
							height={500}
						/>
						<div className='spotlight__info'>
							<h4>Om Elma</h4>
							<h3>
								En hånd å holde i <br />
								gjennom livets stormer
							</h3>
							<Anchor href='#' isDarkBackground>
								Les mer
							</Anchor>
						</div>
					</div>
				</Animated> 
			</section> */}

			<WaveCss isDarkBackground={false} />
			<EventList />
		</main>
	)
}
