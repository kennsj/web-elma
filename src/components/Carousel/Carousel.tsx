"use client"

import Image from "next/image"
import styles from "./Carousel.module.scss"

import useEmblaCarousel from "embla-carousel-react"
import { EmblaOptionsType } from "embla-carousel"
import {
	DotButton,
	useDotButton,
} from "@/components/Carousel/EmblaCarouselDotButton"
import Anchor from "../Anchor/Anchor"
import Link from "next/link"

type PropType = {
	slides: number[]
	options?: EmblaOptionsType
}

export default function Test({ slides, options }: PropType) {
	// const { slides, options } = props
	const [emblaRef, emblaApi] = useEmblaCarousel(options)

	const { selectedIndex, scrollSnaps, onDotButtonClick } =
		useDotButton(emblaApi)

	return (
		<>
			<section className={styles.embla}>
				<div className={styles.embla__viewport} ref={emblaRef}>
					<div className={styles.embla__container}>
						{slides.map((index) => (
							<div className={styles.embla__slide} key={index}>
								<div className={styles.embla__slide__number}>
									{/* <div className={styles.history__item}> */}
									<div className={styles.slide__item}>
										<Link href={`/historier/${index + 1}`}>
											<Image
												src={`https://images.pexels.com/photos/33564${index + 1}/pexels-photo-33564${index + 1}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
												alt='Anxiety'
												width={800}
												height={800}
											/>

											<p>
												"Å sende én melding, møte én venn, gå én tur – det føles
												som seier når hjernen sier ‘bare bli hjemme’."
											</p>
											<span>Lovise (41)</span>
										</Link>
									</div>
								</div>
							</div>
						))}
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
					<Anchor href='#'>Utforsk flere</Anchor>
				</div>
			</section>

			{/* <div className={styles.history__list}>
				<div className={styles.history__item}>
					<Image
						src='https://images.pexels.com/photos/3356489/pexels-photo-3356489.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
						alt='Anxiety'
						width={800}
						height={800}
					/>
					<h4>
						"Å sende én melding, møte én venn, gå én tur – det føles som seier
						når hjernen sier ‘bare bli hjemme’."
					</h4>
					<p>Lovise (41)</p>
				</div>

				<div className={styles.history__item}>
					<Image
						src='https://images.pexels.com/photos/3833370/pexels-photo-3833370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
						alt='Anxiety'
						width={800}
						height={800}
					/>
					<h4>“Ingen visste hvor mye energi det tok å møte opp”</h4>
					<p>Kenneth (35)</p>
				</div>

				<div className={styles.history__item}>
					<Image
						src='https://images.pexels.com/photos/1161268/pexels-photo-1161268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
						alt='Anxiety'
						width={800}
						height={800}
					/>
					<h4>
						Folk sier jeg virker så rolig. Men det de ikke ser, er hvordan
						tankene kverner som en storm inni meg – hele tiden.
					</h4>
					<p>Maria (21)</p>
				</div>
				<div className={styles.history__item}>
					<Image
						src={
							"https://images.pexels.com/photos/4471316/pexels-photo-4471316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
						}
						alt='Anxiety'
						width={800}
						height={800}
					/>
					<h4>“Jeg latet som jeg hadde det fint i årevis”</h4>
					<p>Mari (34)</p>
				</div>
				<div className={styles.history__item}>
					<Image
						src='https://images.pexels.com/photos/897817/pexels-photo-897817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
						alt='Anxiety'
						width={800}
						height={800}
					/>
					<h4>"Noen dager er bare overlevelse."</h4>
					<p>Martin (28)</p>
				</div>
			</div> */}
		</>

		// <div className="history-list">
		//   {history.map((item, index) => (
		//     <div
		//       key={index}
		//       className="history-item"
		//       onClick={() => onSelect(item)}
		//     >
		//       <span className="history-item-title">{item.title}</span>
		//       <span className="history-item-date">{new Date(item.date).toLocaleString()}</span>
		//     </div>
		//   ))}
		// </div>
	)
}

// function CarouselSlide({
// 	index,
// 	children,
// }: {
// 	index: number
// 	children: React.ReactNode
// }) {
// 	return (
// 		<div className={styles.embla__slide} key={index}>
// 			<div className={styles.embla__slide__number}>
// 				{/* <div className={styles.history__item}> */}
// 				<div className={styles.slide__item}>
// 					<Link href={`/historier/${index + 1}`}>
// 						<Image
// 							src={`https://images.pexels.com/photos/33564${index + 1}/pexels-photo-33564${index + 1}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
// 							alt='Anxiety'
// 							width={800}
// 							height={800}
// 						/>
// 						<CarouselItem index={index}>
// 							<h4>test</h4>
// 						</CarouselItem>
// 						<p>
// 							"Å sende én melding, møte én venn, gå én tur – det føles som seier
// 							når hjernen sier ‘bare bli hjemme’."
// 						</p>
// 						<span>Lovise (41)</span>
// 					</Link>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }
