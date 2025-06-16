"use client"
import Image from "next/image"

import styles from "./Header.module.scss"
import "@/styles/globals.css"
import Anchor from "@/components/Anchor/Anchor"

import { SplitText } from "gsap/SplitText"
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/all"

export const HeaderTwo = () => {
	const h1Ref = useRef<HTMLHeadingElement>(null)

	useGSAP(() => {
		gsap.registerPlugin(SplitText)
		const split = new SplitText(h1Ref.current, {
			type: "chars",
			charsClass: "split-word",
		})

		gsap.from(split.chars, 1.8, {
			opacity: 0,
			yPercent: 100,
			skewY: 7,
			duration: 1.2,
			ease: "power4.out",
		})
	}, [h1Ref])

	const imageRef = useRef(null)
	const introRef = useRef(null)

	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger)

		//   .to('.js-mask', { y: 0, delay: 0.3, duration: 0.7, stagger: -0.1 })
		// .to('.site-bg__in', { y: "-100%", delay: 0.3, duration: 1.3},'-=0.1')
		// .to('.header', { y: 0, delay: 0.3, duration: 1.3},'-=1.6')
		// .to('.site-bg', { x: "-100%", delay: 0.3, duration: 1.3},'-=0.5')
		// .to('.header-h2', { x: 0, delay: 0.5, duration: 0.7, stagger: -0.1 },'-=1.8')
		// .to('.js-mask', { color: "#000000", delay: 0.5, duration: 2 },'-=1')

		const tl = gsap.timeline()

		tl.from(
			imageRef.current,
			{
				opacity: 0,
				// scale: 0.95,
				duration: 1.6,
				yPercent: 50,
				// xPercent: -100,
				// scale: 2,
				ease: "power4.out",
			},
			"-=.2"
		).from(
			introRef.current,
			{
				opacity: 0,
				yPercent: 100,
				duration: 1.5,
				ease: "power4.out",
			},
			"-=1"
		)
	}, [])

	return (
		<>
			<header className={styles.header}>
				<div className={styles.header__container}>
					<div
						className={styles.header__content}
						style={{ overflow: "hidden" }}
					>
						<div className={styles.header__title}>
							{/* <h1 ref={h1Ref}>
								For deg som vil leve, <br />
								ikke bare overleve
							</h1> */}
							<h1 ref={h1Ref}>
								For deg som vil leve, <br />
								ikke bare overleve
							</h1>

							<Anchor href='/historier' fontSize='2rem' isDarkBackground>
								Start din reise
							</Anchor>
						</div>

						<Image
							ref={imageRef}
							className={styles.header__image}
							src={"/man-mountain-alone.jpg"}
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
			<Image
				src={"/images/wave-seperator.svg"}
				alt={"Wave Seperator"}
				width={4400}
				height={1000}
				style={{ marginTop: "-1px" }}
				// sizes='100vw'
				// objectFit='contain'
				// fill={true}
				priority
			/>
		</>
	)
}
