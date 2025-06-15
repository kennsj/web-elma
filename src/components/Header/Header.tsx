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

	const box = useRef<HTMLHeadingElement>(null)
	const test = useRef<HTMLParagraphElement>(null)

	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger)
		gsap.from(test.current, {
			ease: "power4.out",
			delay: 0,
			yPercent: 50,
			opacity: 0,
			skewY: 2,
			duration: 1.2,
			scrollTrigger: {
				trigger: test.current,
				start: "top 80%",
				end: "bottom 20%",
				// scrub: true,
			},
		})
	}, [test])

	useGSAP(() => {
		const split = new SplitText(box.current, {
			type: "lines, words, chars",
			linesClass: "line",
			wordsClass: "word",
			charsClass: "char",
		})

		gsap.from(split.chars, {
			opacity: 0,
			yPercent: 100,
			scale: 1,
			duration: 0.9,
			ease: "power3.out",
			stagger: 0.02,
			delay: 0.02,
		})

		return () => {
			split.revert()
		}
	}, [box])

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
			scrollTrigger: {
				trigger: test.current,
				start: "top 90%",
				// end: "top -=100",
				markers: true,
				// scrub: true,
			},
		})
		return () => {
			split.revert()
		}
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
							deling, forståelse og støtte–slik at ingen skal måtte stå alene
							med sin psykiske helse.
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
