"use client"
import Image from "next/image"

import styles from "./Hero.module.scss"
import "@/styles/globals.scss"
import PrimaryButton from "@/components/Buttons/Primary"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import WaveCss from "../WaveSeperator/WaveCss"
import { SplitText } from "gsap/SplitText"
import Anchor from "@/components/Buttons/Anchor"
// import { SplitText } from "gsap/all"

export const Hero = () => {
	const h1Ref = useRef<HTMLHeadingElement>(null)
	const introRef = useRef<HTMLParagraphElement>(null)
	const primaryButton = useRef<HTMLAnchorElement>(null)
	// const headerRef = useRef<HTMLDivElement>(null)
	const imageContainer = useRef<HTMLDivElement>(null)
	const imageRef = useRef<HTMLImageElement>(null)

	const tl = gsap.timeline({
		ease: "power1.out",
		duration: 0.5,
	})

	const mm = gsap.matchMedia()

	useGSAP(() => {
		gsap.registerPlugin(SplitText)

		new SplitText("h1", { type: "lines", linesClass: "lineChild" })
		new SplitText("h1", { type: "lines", linesClass: "lineParent" })

		const split = new SplitText(h1Ref.current, {
			type: "lines, chars",
			linesClass: "lineParent",
		})

		const splitPara = new SplitText(introRef.current, {
			type: "lines, words",
			linesClass: "lineParent",
		})

		// Animations for desktop
		mm.add(
			"(min-width: 768px)",
			() => {
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
						primaryButton.current,
						{ y: 0, opacity: 1, autoAlpha: 1, duration: 0.3 },
						"-=.9"
					)
					.from(
						introRef.current,
						{ y: 20, opacity: 0, duration: 0.5, stagger: 0.1 },
						"-=1"
					)
			},
			"desktop"
		)

		// Animations for mobile
		mm.add(
			"(max-width: 767px)",
			() => {
				tl.from(
					split.chars,
					{
						opacity: 0,
						skewY: 5,
						duration: 0.8,
						yPercent: 110,
						stagger: 0.01,
					}
					// Adjust the timing as needed
				)
					.from(
						introRef.current,
						{ y: 20, opacity: 0, duration: 0.5, stagger: 0.1 },
						"-=.8"
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
						primaryButton.current,
						{ opacity: 1, autoAlpha: 1, duration: 0.5 },
						"-=.5"
					)
					.to(
						imageRef.current,
						{ y: 0, scale: 1.2, autoAlpha: 1, duration: 1.5 },
						"<"
					)
					.to(
						imageContainer.current,
						{
							// clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
							clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
							duration: 1.5,
							ease: "power2.out",
						},
						"<"
					)
			},
			"mobile"
		)
	}, [imageContainer, imageRef, introRef, h1Ref, primaryButton, tl])

	// useGSAP(() => {
	// 	gsap.registerPlugin(SplitText)

	return (
		<>
			<header className={styles.header}>
				<div className={styles.header__container}>
					<div className={styles.header__content}>
						<div className={styles.header__title}>
							<div>
								<h1 ref={h1Ref}>
									For deg som vil{" "}
									<span className={styles.highlighted}>leve</span>
									, <br />
									ikke bare <span className={styles.highlighted}>overleve</span>
								</h1>

								<p ref={introRef}>
									Hos ELMA møter du forståelse, fellesskap og mot. Det starter
									med å åpne opp - i ditt tempo. <br />
								</p>
							</div>

							<PrimaryButton ref={primaryButton} href='/historier'>
								<span>Start din reise</span>
							</PrimaryButton>
						</div>

						<div className={styles.header__image} ref={imageContainer}>
							<Image
								ref={imageRef}
								src={"/images/anders-moloen.png"}
								alt={"Mountain"}
								sizes='(max-width: 768px) 500px, (max-width: 1200px) 50vw, 33vw'
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

					<Anchor href='/historier' isDarkBackground={true}>
						Les andres historier
					</Anchor>
				</div>
				<WaveCss />
			</header>
		</>
	)
}
