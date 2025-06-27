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
	const headerRef = useRef<HTMLDivElement>(null)
	const imageRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {}, [headerRef])

	// let tl = gsap.timeline({
	// 	ease: "power2.out",
	// 	scrollTrigger: {
	// 		trigger: headerRef.current,
	// 		start: "top 80%",
	// 		end: "bottom 30%",
	// 		toggleActions: "play none none reverse",
	// 		markers: true,
	// 	},
	// })

	useGSAP(() => {
		gsap.registerPlugin(SplitText)

		new SplitText(headerRef.current, { type: "lines", linesClass: "lineChild" })
		new SplitText(headerRef.current, {
			type: "lines",
			linesClass: "lineParent",
		})

		tl.fromTo(
			imageRef.current,
			{ autoAlpha: 0 },
			{ autoAlpha: 1, duration: 3, ease: "power2.out" }
		)
			.from(
				".lineChild",
				{
					skewY: 7,
					duration: 0.75,
					yPercent: 110,
					stagger: 0.25,
				},
				"-=1"
			)
			.from(
				".intro__paragraph",
				{ y: 20, opacity: 0, duration: 0.5, stagger: 0.1 },
				"-=0.5"
			)
	}, [headerRef, imageRef, tl])

	return (
		<>
			<header className={styles.header}>
				<div className={styles.header__container}>
					<div className={styles.header__content}>
						<div className={styles.header__title}>
							<div>
								<h1 ref={headerRef}>
									For deg som vil leve, <br />
									ikke bare overleve
								</h1>

								<p>
									Hos ELMA møter du forståelse, fellesskap og mot. <br />
									Det starter med å åpne opp - i ditt tempo.
								</p>
							</div>

							<Anchor href='/historier' fontSize='1.5rem' isDarkBackground>
								Start din reise
							</Anchor>
						</div>

						<div className={styles.header__image}>
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
