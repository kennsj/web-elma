import React from "react"
import H2 from "../../UI/Animations/HeadingAnimation"
import { client } from "@/sanity/client"

import { frontPagePostQuery } from "@/components/lib/sanity/queries"
import { type SanityDocument } from "next-sanity"
import Paragraph from "@/components/Layout/UI/Animations/ParagraphAnimation"
import Anchor from "@/components/Buttons/Anchor"
import Image from "next/image"

import styles from "./FeaturedCard.module.scss"

export default async function FeaturedCard() {
	const posts = await client.fetch(frontPagePostQuery)

	return (
		<section className='section__about section__fullwidth'>
			<div className='about__wrapper'>
				<div className='section__intro'>
					<H2 title='Mer enn et prosjekt - et pusterom' />

					<Paragraph className={"intro__paragraph"}>
						Anders vet hvordan det føles når livet kjennes tungt. Han har selv
						kjent på håpløsheten og mørket, og vet hvor vanskelig det kan være å
						finne veien tilbake. I dag bruker han sin erfaring til å hjelpe
						andre, enten du er ungdom, ung voksen, forelder eller fagperson som
						vil forstå bedre.
					</Paragraph>
				</div>

				{posts.length > 0 ? (
					posts.map((post: SanityDocument) => (
						<div className={styles.card} key={post._id}>
							<div className={styles.card__content}>
								<h2>{post.title}</h2>
								<Paragraph>{post.subtitle}</Paragraph>
								<Anchor href={`/blog/${post.slug.current}`}>Les mer</Anchor>
							</div>
							<Image
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
							/>
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
