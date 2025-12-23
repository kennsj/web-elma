"use client"
import Image from "next/image"

import styles from "./Hero.module.scss"
import PrimaryButton from "@/components/Buttons/Primary"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import WaveCss from "@/components/Layout/UI/WaveSeperator/WaveSeperator"

import { heroAnimation } from "@/components/lib/animations/heroAnimation"

type HeroProps = {
	title?: React.ReactNode
	subTitle: React.ReactNode
	buttonText?: string
	buttonHref?: string
	imageSrc: string
	imageAlt?: string
	imagePriority?: boolean
	imageQuality?: number
	imageSizes?: string
	children?: React.ReactNode
	showWave?: boolean
}

export const Hero: React.FC<HeroProps> = ({
	title,
	subTitle,
	buttonText,
	buttonHref = "",
	imageSrc,
	imageAlt = "",
	imagePriority = true,
	imageQuality = 100,
	imageSizes = "(max-width: 768px) 500px, (max-width: 1200px) 50vw, 33vw",
	children = null,
	showWave = true,
}) => {
	const containerRef = useRef(null)
	const imageRef = useRef(null)
	const imageContainer = useRef(null)
	const headingRef = useRef(null)
	const paragraphRef = useRef(null)
	const buttonRef = useRef(null)

	useGSAP(
		() => {
			if (
				!imageRef.current ||
				!imageContainer.current ||
				!headingRef.current ||
				!paragraphRef.current
			)
				return

			heroAnimation({
				imageRef: imageRef.current,
				imageContainer: imageContainer.current,
				headingRef: headingRef.current,
				paragraphRef: paragraphRef.current,
				buttonRef: buttonRef.current,
			})
		},
		{ dependencies: [imageSrc] }
	)

	// Debug: Log styles to see if they're loading
	if (typeof window !== "undefined" && !styles.header) {
		console.error("Hero styles not loaded:", styles)
	}

	return (
		<>
			<header className={styles.header} ref={containerRef}>
				<div className={styles.header__container}>
					<div className={styles.header__content}>
						<div className={styles.header__title}>
							<div className={styles.header__title__text}>
								<h1
									ref={headingRef}
									className='title'
									dangerouslySetInnerHTML={{
										__html:
											typeof title === "string"
												? title
														.replaceAll(
															"<span>",
															'<span style="color: var(--color-tertiary); font-weight: bold; " class="highlight">'
														)
														.replaceAll("<br>", "<br />")
												: "",
									}}
								/>
							</div>
							<div className={styles.header__title__intro}>
								<p ref={paragraphRef}>{subTitle}</p>
								{buttonHref && buttonText && (
									<PrimaryButton
										isDarkBackground
										ref={buttonRef}
										href={buttonHref}
									>
										{buttonText}
									</PrimaryButton>
								)}
							</div>
						</div>
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

					<div className={styles.header__intro}>{children}</div>
				</div>
				{showWave && <WaveCss />}
			</header>
		</>
	)
}
