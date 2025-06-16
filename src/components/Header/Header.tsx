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
import WaveSeperator from "../WaveSeperator/WaveSeperator"

export const Header = () => {
	// const h1Ref = useRef(null)
	gsap.registerPlugin(useGSAP, SplitText)

	const h1Ref = useRef(null)

	useGSAP(() => {
		gsap.registerPlugin(SplitText, ScrollTrigger)

		const split = new SplitText(h1Ref.current, {
			type: "lines, words, chars",
			linesClass: "line",
			wordsClass: "word",
			charsClass: "char",
		})

		const tl = gsap.timeline({
			default: {
				ease: "power4.out",
				duration: 1.2,
			},
		})

		tl.from(split.chars, {
			yPercent: 100,
			opacity: 0,
			stagger: 0.01,
			// scrollTrigger: {
			// 	trigger: h1Ref.current,
			// 	start: "top 90%",
			// 	// end: "top -=100",
			// 	markers: true,
			// 	// scrub: true,
			// },
		})
	}, [h1Ref])

	return (
		<>
			<header className={styles.header}>
				<div className={styles.header__container}>
					<div className={styles.header__content}>
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
							className={styles.header__image}
							src={"/man-mountain-alone.jpg"}
							alt={"Mountain"}
							width={1000}
							height={1000}
							priority
						/>
					</div>
					<div className={styles.header__intro}>
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
			<WaveSeperator />
		</>
	)
}
