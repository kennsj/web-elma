"use client"
import Image from "next/image"

import styles from "./Hero.module.scss"
import "@/styles/globals.scss"
import PrimaryButton from "@/components/Buttons/Primary"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import WaveCss from "../WaveSeperator/WaveCss"

import { heroAnimation } from "@/animations/heroAnimation"

type HeroProps = {
	title?: React.ReactNode
	subTitle: React.ReactNode
	buttonText: string
	buttonHref?: string
	intro: React.ReactNode
	imageSrc: string
	imageAlt?: string
	imagePriority?: boolean
	imageQuality?: number
	imageSizes?: string
}

export const Hero: React.FC<HeroProps> = ({
	title,
	subTitle,
	buttonText,
	buttonHref = "",
	intro,
	imageSrc,
	imageAlt = "",
	imagePriority = true,
	imageQuality = 100,
	imageSizes = "(max-width: 768px) 500px, (max-width: 1200px) 50vw, 33vw",
}) => {
	const containerRef = useRef(null)
	const imageRef = useRef(null)
	const imageContainer = useRef(null)
	const headingRef = useRef(null)
	const paragraphRef = useRef(null)
	const buttonRef = useRef(null)
	const introRef = useRef(null)

	useGSAP(
		() => {
			heroAnimation({
				// container: containerRef.current!,
				imageRef: imageRef.current!,
				imageContainer: imageContainer.current!,
				headingRef: headingRef.current!,
				paragraphRef: paragraphRef.current!,
				buttonRef: buttonRef.current!,
				introRef: introRef.current!,
			})
		},
		{ scope: containerRef }
	)

	return (
		<>
			<header className={styles.header} ref={containerRef}>
				<div className={styles.header__container}>
					<div className={styles.header__content}>
						<div className={styles.header__title}>
							<div>
								<h1 ref={headingRef}>{title}</h1>
								<p ref={paragraphRef}>{subTitle}</p>
							</div>
							<PrimaryButton isDarkBackground ref={buttonRef} href={buttonHref}>
								{buttonText}
							</PrimaryButton>
						</div>
						<div className={styles.header__image} ref={imageContainer}>
							<Image
								ref={imageRef}
								src={imageSrc}
								alt={imageAlt}
								sizes={imageSizes}
								fill={true}
								quality={imageQuality}
								priority={imagePriority}
							/>
						</div>
					</div>
					<p className={styles.header__intro} ref={introRef}>
						{intro}
					</p>
				</div>
				<WaveCss />
			</header>
		</>
	)
}
