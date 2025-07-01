"use client"
import Image from "next/image"

import styles from "./Header.module.scss"
import "@/styles/globals.scss"
import Anchor from "@/components/Buttons/Primary"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import WaveCss from "../WaveSeperator/WaveCss"
import { SplitText } from "gsap/SplitText"
// import { SplitText } from "gsap/all"

export const HeaderTwo = () => {
	const headingRef = useRef<HTMLHeadingElement>(null)
	const headerRef = useRef<HTMLDivElement>(null)
	const imageRef = useRef<HTMLDivElement>(null)
	const introRef = useRef<HTMLParagraphElement>(null)
	const ctaRef = useRef<HTMLAnchorElement>(null)

	const tl = gsap.timeline({
		ease: "power2.out",
		duration: 0.01,
	})

	useGSAP(() => {
		gsap.registerPlugin(SplitText)

		new SplitText("h1", { type: "lines", linesClass: "lineChild" })
		new SplitText("h1", { type: "lines", linesClass: "lineParent" })
		new SplitText(introRef.current, {
			type: "lines",
			linesClass: "lineParent",
		})

		const split = new SplitText(headingRef.current, {
			type: "lines",
			linesClass: "lineParent",
		})

		console.log(split.lines)

		tl.to(imageRef.current, { y: 0, autoAlpha: 1, duration: 0.6 })
			.from(
				split.lines,
				{
					opacity: 0,
					skewY: 7,
					duration: 0.75,
					yPercent: 110,
					stagger: 0.15,
				}
				// "-=.1" // Adjust the timing as needed
			)
			.to(
				imageRef.current,
				{
					// clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
					clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
					duration: 0.8,
					ease: "power2.out",
					scale: 1,
				},
				"-=.9"
			)
			.from(ctaRef.current, { y: -20, opacity: 1, duration: 0.2 }, "-=0.6")
			.from(
				introRef.current,
				{ y: 20, opacity: 0, duration: 0.5, stagger: 0.1 },
				"-=0.6"
			)
	}, [headerRef, imageRef, tl])

	return (
		<>
			<header className={styles.header}>
				<div className={styles.header__container}>
					<div className={styles.header__content}>
						<div className={styles.header__title}>
							<div>
								<h1 ref={headingRef}>
									For deg som vil leve, <br />
									ikke bare overleve
								</h1>
							</div>

							<Anchor
								ref={ctaRef}
								href='/historier'
								fontSize='1.5rem'
								isDarkBackground
							>
								Start din reise
							</Anchor>
						</div>

						<div className={styles.header__image} ref={imageRef}>
							<Image
								// src={"/images/man-mountain-alone.jpg"}
								src={"/images/anders-karlsen-bg.png"}
								alt={"Mountain"}
								width={1000}
								height={1000}
								priority
							/>
						</div>
					</div>
					<div className={styles.header__intro}>
						<p className='intro__paragraph' ref={introRef}>
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
				<WaveCss />
			</header>

			{/* <Waves /> */}
		</>
	)
}
