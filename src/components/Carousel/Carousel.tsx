"use client"

import Image from "next/image"
import styles from "./Carousel.module.scss"

import useEmblaCarousel from "embla-carousel-react"
import { EmblaOptionsType } from "embla-carousel"
import {
	DotButton,
	useDotButton,
} from "@/components/Carousel/EmblaCarouselDotButton"
import Anchor from "../Buttons/Anchor"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import gsap from "gsap"

type PropType = {
	options?: EmblaOptionsType
}

const slides = [
	{
		id: 1,
		image:
			"https://images.pexels.com/photos/3356489/pexels-photo-3356489.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		quote:
			"Å sende én melding, møte én venn, gå én tur – det føles som seier når hjernen sier ‘bare bli hjemme’.",
		name: "Lovise (41)",
		video: true,
	},
	{
		id: 2,
		image:
			"https://images.pexels.com/photos/3833370/pexels-photo-3833370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		quote: "Ingen visste hvor mye energi det tok å møte opp.",
		name: "Kenneth (35)",
		video: false,
	},
	{
		id: 3,
		image:
			"https://images.pexels.com/photos/1161268/pexels-photo-1161268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		quote:
			"Folk sier jeg virker så rolig. Men det de ikke ser, er hvordan tankene kverner som en storm inni meg - hele tiden.",
		name: "Maria (21)",
		video: true,
	},
	{
		id: 4,
		image:
			"https://images.pexels.com/photos/3356489/pexels-photo-3356489.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		quote:
			"Å sende én melding, møte én venn, gå én tur – det føles som seier når hjernen sier ‘bare bli hjemme’.",
		name: "Lovise (41)",
		video: false,
	},
	{
		id: 5,
		image:
			"https://images.pexels.com/photos/3833370/pexels-photo-3833370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		quote: "Ingen visste hvor mye energi det tok å møte opp.",
		name: "Kenneth (35)",
		video: true,
	},
	{
		id: 6,
		image:
			"https://images.pexels.com/photos/1161268/pexels-photo-1161268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		quote:
			"Folk sier jeg virker så rolig. Men det de ikke ser, er hvordan tankene kverner som en storm inni meg - hele tiden.",
		name: "Maria (21)",
		video: false,
	},
	{
		id: 7,
		image:
			"https://images.pexels.com/photos/1161268/pexels-photo-1161268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		quote:
			"Folk sier jeg virker så rolig. Men det de ikke ser, er hvordan tankene kverner som en storm inni meg - hele tiden.",
		name: "Maria (21)",
		video: false,
	},
]

export default function Carousel({ options }: PropType) {
	const [emblaRef, emblaApi] = useEmblaCarousel(options)

	const { selectedIndex, scrollSnaps, onDotButtonClick } =
		useDotButton(emblaApi)

	return (
		<>
			<div className={styles.embla}>
				<div className={styles.embla__viewport} ref={emblaRef}>
					<div className={styles.embla__container}>
						{slides.map((slide) => {
							return <CardItem key={slide.id} slide={slide} />

							// return slide.video ?
							// (
							// 	<div className={styles.embla__slide} key={slide.id}>
							// 		<div className={styles.embla__slide__number}>
							// 			<div
							// 				className={
							// 					`${styles.slide__item}` + " " + `${styles.slide__video}`
							// 				}
							// 			>
							// 				<Link href={`/historier/${slide.id}`}>
							// 					<Image
							// 						src={slide.image}
							// 						alt='Anxiety'
							// 						width={800}
							// 						height={800}
							// 					/>
							// 					<div className={styles.slide__video_overlay}></div>
							// 					<span>{slide.name}</span>
							// 				</Link>
							// 			</div>
							// 		</div>
							// 	</div>
							// ) : (
							// 	<div className={styles.embla__slide} key={slide.id}>
							// 		<div className={styles.embla__slide__number}>
							// 			<div
							// 				className={
							// 					`${styles.slide__item}` + " " + `${styles.slide__text}`
							// 				}
							// 			>
							// 				<Link href={`/historier/${slide.id}`}>
							// 					<Image
							// 						src={slide.image}
							// 						alt='Anxiety'
							// 						width={800}
							// 						height={800}
							// 					/>
							// 					<p>{slide.quote}</p>
							// 					<span>{slide.name}</span>
							// 				</Link>
							// 			</div>
							// 		</div>
							// 	</div>
							// )
						})}
					</div>
				</div>

				<div className={styles.embla__controls}>
					<div className={styles.embla__dots}>
						{scrollSnaps.map((_, index) => (
							<DotButton
								key={index}
								onClick={() => onDotButtonClick(index)}
								className={
									styles.embla__dot +
									(index === selectedIndex
										? " " + styles["embla__dot--selected"]
										: "")
								}
							/>
						))}
					</div>
					<Anchor href='#' isDarkBackground={false}>
						Utforsk flere
					</Anchor>
				</div>
			</div>
		</>
	)
}

type CardItemProps = {
	slide: (typeof slides)[number]
}

function CardItem({ slide }: CardItemProps) {
	return slide.video ? (
		<div className={styles.embla__slide}>
			<div className={styles.embla__slide__number}>
				<div className={`${styles.slide__item} ${styles.slide__video}`}>
					<Link href={`/historier/${slide.id}`}>
						<Image src={slide.image} alt='Anxiety' width={800} height={800} />
						<div className={styles.slide__video_overlay}></div>
						<span>
							{slide.name}
							{/* {slide.id} */}
						</span>
					</Link>
				</div>
			</div>
		</div>
	) : (
		<div className={styles.embla__slide}>
			<div className={styles.embla__slide__number}>
				<div className={`${styles.slide__item} ${styles.slide__text}`}>
					<Link href={`/historier/${slide.id}`}>
						<Image src={slide.image} alt='Anxiety' width={800} height={800} />
						<p>{slide.quote}</p>
						<span>
							{slide.name}
							{/* {slide.id} */}
						</span>
					</Link>
				</div>
			</div>
		</div>
	)
}
