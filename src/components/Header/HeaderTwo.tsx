"use client"
import Image from "next/image"

import styles from "./Header.module.scss"
import "@/styles/globals.scss"
import Anchor from "@/components/Anchor/Anchor"
import Waves from "../WaveSeperator/Waves"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
// import { SplitText } from "gsap/all"

export const HeaderTwo = () => {
	const h1Ref = useRef<HTMLHeadingElement>(null)
	const imageRef = useRef<HTMLImageElement>(null)
	const introRef = useRef<HTMLDivElement>(null)

	// gsap.registerPlugin(SplitText)

	// const text = new SplitText(h1Ref.current, {
	// 	type: "chars",
	// 	charsClass: "char",
	// })

	// const chars = text.chars //an array of all the divs that wrap each character

	// useGSAP(() => {
	// 	gsap.from(chars, {
	// 		ease: "power4.out",
	// 		delay: 0.1,
	// 		yPercent: 10,
	// 		opacity: 0,
	// 		duration: 1.2,
	// 		stagger: 0.0,
	// 		scrollTrigger: {
	// 			trigger: h1Ref.current,
	// 			start: "top 90%",
	// 			markers: true,
	// 		},
	// 	})
	// }, [h1Ref])

	const tl = gsap.timeline({
		defaults: { ease: "power2.out", duration: 1.2 },
	})

	useGSAP(() => {
		tl.fromTo(
			h1Ref.current,
			{
				yPercent: 10,
				clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", // ending position
			},
			{
				yPercent: 0,
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // starting position
				duration: 2.5,
				ease: "power4.out",
			}
		).fromTo(
			imageRef.current,
			{
				opacity: 0,
				yPercent: 10,
				clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", // ending position
			},
			{
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // starting position
				opacity: 1,
				yPercent: 0,
				duration: 1.2,
			},
			"-=2.2" // "<" means start this animation at the same time as the previous one
		)
		// .fromTo(
		// 	introRef.current,
		// 	{
		// 		clipPath: "polygon(0% 100%, 0% 0%, 0% 0%, 0% 100%)", // ending position
		// 		opacity: 0,
		// 		yPercent: 10,
		// 	},
		// 	{
		// 		clipPath: "polygon(0% 100%, 0% 0%, 100% 0%, 100% 100%)", // starting position
		// 		opacity: 1,
		// 		yPercent: 0,
		// 		duration: 1.2,
		// 	},
		// 	"-=1.8" // start this animation at the same time as the previous one
		// )
	}, [h1Ref, imageRef, tl])

	return (
		<>
			<header className={styles.header}>
				<div className={styles.header__container}>
					<div
						className={styles.header__content}
						style={{ overflow: "hidden" }}
					>
						<div className={styles.header__title} ref={h1Ref}>
							<h1>
								For deg som vil leve, <br />
								ikke bare overleve
							</h1>

							<Anchor href='/historier' fontSize='1.5rem' isDarkBackground>
								Start din reise
							</Anchor>
						</div>

						<Image
							ref={imageRef}
							className={styles.header__image}
							src={"/images/man-mountain-alone.jpg"}
							alt={"Mountain"}
							width={1000}
							height={1000}
							priority
						/>
					</div>
					<div className={styles.header__intro} ref={introRef}>
						<p>
							Elma ble startet av Anders, som selv har levd med angst i store
							deler av livet. Gjennom elma ønsker han å skape et trygt rom for
							deling, forståelse og støtte&mdash;slik at ingen skal måtte stå
							alene med sin psykiske helse.
						</p>

						<Anchor href='/historier' isDarkBackground>
							Les andres historier
						</Anchor>
					</div>
				</div>
			</header>

			<Waves />
		</>
	)
}
