"use client"

import { type SanityDocument } from "next-sanity"
import Anchor from "@/components/Layout/UI/Buttons/Anchor"
import styles from "./FeaturedCard.module.scss"
// import HeadingAnimation from "../../UI/Animations/HeadingAnimation"
// import ImageReveal from "../../UI/Animations/ImageReveal"
import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { DotButton } from "../../../Lists/Carousel/EmblaCarouselDotButton"
import Image from "next/image"

const categoryMap: Record<string, string> = {
	"mental-helse": "Mental helse",
	angst: "Angst",
	foredrag: "Foredrag",
	personlig: "Personlig",
	tips: "Tips og råd",
}

type FeaturedCardCarouselProps = {
	posts: SanityDocument[]
}

export default function FeaturedCardCarousel({
	posts,
}: FeaturedCardCarouselProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: true,
		align: "start",
		containScroll: "trimSnaps",
		dragFree: false,
	})
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

	useEffect(() => {
		if (!emblaApi) return

		const onSelect = () => {
			setSelectedIndex(emblaApi.selectedScrollSnap())
		}

		setScrollSnaps(emblaApi.scrollSnapList())
		emblaApi.on("select", onSelect)

		return () => {
			emblaApi.off("select", onSelect)
		}
	}, [emblaApi])

	const onDotButtonClick = (index: number) => {
		if (!emblaApi) return
		emblaApi.scrollTo(index)
	}

	return (
		<div className={styles.carouselContainer}>
			<div className={styles.embla} ref={emblaRef}>
				<div className={styles.embla__container}>
					{posts.length > 0 ? (
						posts.map((post: SanityDocument) => (
							<div className={styles.embla__slide} key={post._id}>
								<div className={styles.card}>
									<span className={styles.card__label}>
										{post.categories?.[0]
											? categoryMap[post.categories[0]]
											: ""}
									</span>
									<Image
										className={styles.card__image}
										src={
											post.mainImage?.asset?.url ?? "/images/fallback-image.png"
										}
										alt={post.title}
										width={500}
										height={700}
									/>
									<div className={styles.card__content}>
										<span className={styles.card__date}>
											{new Date(post.publishedAt).toLocaleDateString("no-NO", {
												day: "numeric",
												month: "long",
												year: "numeric",
											})}
										</span>
										<h3>{post.title}</h3>
										<p>{post.subtitle}</p>

										<Anchor
											href={`/blog/${post.slug.current}`}
											data-dark-background={true}
										>
											Les mer
										</Anchor>
									</div>
								</div>
							</div>
						))
					) : (
						<p className='no-posts-message'>
							Ingen historier tilgjengelig akkurat nå.
						</p>
					)}
				</div>
			</div>

			{/* Carousel dots */}
			{posts.length > 0 && (
				<div className={styles.embla__dots}>
					{scrollSnaps.map((_, index) => (
						<DotButton
							key={index}
							onClick={() => onDotButtonClick(index)}
							className={`${styles.embla__dot} ${
								index === selectedIndex ? styles.embla__dot_active : ""
							}`}
						/>
					))}
				</div>
			)}
		</div>
	)
}
