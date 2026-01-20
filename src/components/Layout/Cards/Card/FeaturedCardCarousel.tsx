"use client"

import { type SanityDocument } from "next-sanity"
import Anchor from "@/components/Layout/UI/Buttons/Anchor"
import styles from "./FeaturedCard.module.scss"
import HeadingAnimation from "../../UI/Animations/HeadingAnimation"
import ImageReveal from "../../UI/Animations/ImageReveal"
import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { DotButton } from "../../../Lists/Carousel/EmblaCarouselDotButton"

type FeaturedCardCarouselProps = {
	posts: SanityDocument[]
}

export default function FeaturedCardCarousel({
	posts,
}: FeaturedCardCarouselProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: true,
		align: "start",
		dragFree: true,
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
									<ImageReveal
										className={styles.card__image}
										src={
											post.mainImage?.asset?.url ?? "/images/fallback-image.png"
										}
										alt={post.title}
										width={400}
										height={600}
										parallax={true}
									/>
									<div className={styles.card__content}>
										<HeadingAnimation level='h3' title={post.title} />

										<p>{post.subtitle}</p>

										<Anchor href={`/blog/${post.slug.current}`}>Les mer</Anchor>
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
