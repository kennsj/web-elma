"use client"
import Image from "next/image"

import styles from "./Hero.module.scss"
import "@/styles/globals.scss"
import Anchor from "@/components/Anchor/Anchor"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import WaveCss from "../WaveSeperator/WaveCss"
import { SplitText } from "gsap/SplitText"
// import { SplitText } from "gsap/all"

export const Hero = () => {
	const headingRef = useRef<HTMLHeadingElement>(null)
	const introRef = useRef<HTMLParagraphElement>(null)
	const ctaRef = useRef<HTMLAnchorElement>(null)
	// const headerRef = useRef<HTMLDivElement>(null)
	const imageContainer = useRef<HTMLDivElement>(null)
	const imageRef = useRef<HTMLDivElement>(null)

	const tl = gsap.timeline({
		ease: "power1.out",
		duration: 0.5,
	})

	useGSAP(() => {
		gsap.registerPlugin(SplitText)

		new SplitText("h1", { type: "lines", linesClass: "lineChild" })
		new SplitText("h1", { type: "lines", linesClass: "lineParent" })

		const split = new SplitText(headingRef.current, {
			type: "lines, chars",
			linesClass: "lineParent",
		})

		const splitPara = new SplitText(introRef.current, {
			type: "lines, words",
			linesClass: "lineParent",
		})

		console.log(split.lines)

		tl.to(
			imageRef.current,
			{ y: 0, scale: 1.2, autoAlpha: 1, duration: 2.2 },
			"<"
		)
			.to(
				imageContainer.current,
				{
					// clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
					clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
					duration: 2,
					ease: "power2.out",
				},
				"-=1.5"
			)

			.from(
				split.chars,
				{
					opacity: 0,
					skewY: 5,
					duration: 0.8,
					yPercent: 110,
					stagger: 0.01,
				},
				"-=1.2" // Adjust the timing as needed
			)
			.from(
				splitPara.words,
				{
					opacity: 0,
					// skewY: 5,
					duration: 0.7,
					yPercent: 100,
					stagger: 0.01,
				},
				"-=1" // Adjust the timing as needed
			)
			.to(
				ctaRef.current,
				{ y: 0, opacity: 1, autoAlpha: 1, duration: 0.3 },
				"-=.9"
			)
			.from(
				introRef.current,
				{ y: 20, opacity: 0, duration: 0.5, stagger: 0.1 },
				"-=1"
			)
	}, [imageContainer, imageRef, introRef, headingRef, ctaRef, tl])

	return (
		<>
			<header className={styles.header}>
				<div className={styles.header__container}>
					<div className={styles.header__content}>
						<div className={styles.header__title}>
							<div>
								<h1 ref={headingRef}>
									For deg som vil{" "}
									<span className={styles.highlighted}>leve</span>
									, <br />
									ikke bare <span className={styles.highlighted}>overleve</span>
								</h1>

								<p ref={introRef}>
									Hos ELMA møter du forståelse, fellesskap og mot. <br />
									Det starter med å åpne opp - i ditt tempo.
								</p>
							</div>

							<Anchor
								ref={ctaRef}
								href='/historier'
								fontSize='1.5rem'
								isDarkBackground
							>
								<span>Start din reise</span>
							</Anchor>
						</div>

						<div className={styles.header__image} ref={imageContainer}>
							<Image
								ref={imageRef}
								// src={"/images/man-mountain-alone.jpg"}
								src={"/images/anders-moloen.png"}
								alt={"Mountain"}
								// width={1000}
								// height={1000}
								fill={true}
								quality={100}
								priority
							/>
						</div>
					</div>
				</div>
				<div className={styles.header__intro}>
					<p className='intro__paragraph'>
						Elma ble startet av Anders, som selv har levd med angst i store
						deler av livet. Gjennom elma ønsker han å skape et trygt rom for
						deling, forståelse og støtte&mdash;slik at ingen skal måtte stå
						alene med sin psykiske helse.
					</p>

					<Anchor href='/historier' isDarkBackground>
						Les andres historier
					</Anchor>
				</div>
				<WaveCss />
			</header>

			{/* <Waves /> */}
		</>
	)
}
