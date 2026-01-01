import { client } from "@/sanity/client"

import { frontPagePostQuery } from "@/components/lib/sanity/queries"
import { type SanityDocument } from "next-sanity"
import Paragraph from "@/components/Layout/UI/Animations/ParagraphAnimation"
import Anchor from "@/components/Buttons/Anchor"

import styles from "./FeaturedCard.module.scss"
import HeadingAnimation from "../../UI/Animations/HeadingAnimation"
import ImageReveal from "../../UI/Animations/ImageReveal"
import { TextWide } from "@/components/ui/TextBlocks"
import { FadeInWords } from "../../UI/Animations/ParagraphFadeIn"

export default async function FeaturedCard() {
	const posts = await client.fetch(frontPagePostQuery)

	return (
		<section className=' section__fullwidth' data-theme='dark'>
			<div className='section__content'>
				{/* <Paragraph className={"intro__paragraph"}>
						Anders vet hvordan det føles når livet kjennes tungt. Han har selv
						kjent på håpløsheten og mørket, og vet hvor vanskelig det kan være å
						finne veien tilbake. I dag bruker han sin erfaring til å hjelpe
						andre, enten du er ungdom, ung voksen, forelder eller fagperson som
						vil forstå bedre.
					</Paragraph> */}

				<TextWide title='Aktuelt' color='light'>
					Å leve med angst, delt for å gi gjenkjennelse og håp
				</TextWide>

				{posts.length > 0 ? (
					posts.map((post: SanityDocument) => (
						<div className={styles.card} key={post._id}>
							<div className={styles.card__content}>
								<HeadingAnimation level='h3' title={post.title} />
								{/* <Paragraph>{post.subtitle}</Paragraph> */}
								<FadeInWords>
									<p>{post.subtitle}</p>
								</FadeInWords>
								<Anchor href={`/blog/${post.slug.current}`}>Les mer</Anchor>
							</div>
							<ImageReveal
								className={styles.card__image}
								src={post.mainImage?.asset?.url ?? "/images/fallback-image.png"}
								alt={post.title}
								width={500}
								height={500}
								parallax={true}
							/>
							{/* <Image
								src={post.mainImage?.asset?.url ?? "/images/fallback-image.png"}
								alt={post.title}
								width={500}
								height={500}
								// style={{
								// 	width: "100%",
								// 	height: "100%",
								// 	objectFit: "cover",
								// }}
								className={styles.card__image}
							/> */}
						</div>
					))
				) : (
					<p className='no-posts-message'>
						Ingen historier tilgjengelig akkurat nå.
					</p>
				)}
			</div>
		</section>
	)
}
