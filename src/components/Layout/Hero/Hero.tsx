"use client"
import Image from "next/image"

import styles from "./Hero.module.scss"
import PrimaryButton from "@/components/Buttons/Primary"
import { useGSAP } from "@gsap/react"
import React, { useRef } from "react"

import { heroAnimation } from "@/components/lib/animations/heroAnimation"

type HeroProps = {
	title?: React.ReactNode
	subTitle: React.ReactNode
	buttonText?: string
	buttonHref?: string
	imageSrc?: string
	imageAlt?: string
	imagePriority?: boolean
	imageQuality?: number
	imageSizes?: string
	children?: React.ReactNode
}

const renderTitleContent = (titleStr: string) => {
	const lines = titleStr.split("\n")
	return lines.map((line, lineIndex) => {
		// Parse span tags safely
		const parts = line.split(/(<span>.*?<\/span>)/g)
		return (
			<React.Fragment key={lineIndex}>
				{parts.map((part, partIndex) => {
					if (part.startsWith("<span>") && part.endsWith("</span>")) {
						const content = part.slice(6, -7) // Remove <span> and </span>
						return (
							<span
								key={partIndex}
								style={{
									color: "var(--color-tertiary)",
									fontStyle: "italic",
								}}
								className='highlight'
							>
								{content}
							</span>
						)
					}
					return part
				})}
				{lineIndex < lines.length - 1 && <br />}
			</React.Fragment>
		)
	})
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
}) => {
	const containerRef = useRef(null)
	const imageRef = useRef(null)
	const imageContainer = useRef(null)
	const headingRef = useRef(null)
	const paragraphRef = useRef(null)
	const buttonRef = useRef(null)

	useGSAP(
		() => {
			// Only require headingRef and paragraphRef - image refs are optional
			if (!headingRef.current || !paragraphRef.current) return

			heroAnimation({
				imageRef: imageRef.current,
				imageContainer: imageContainer.current,
				headingRef: headingRef.current,
				paragraphRef: paragraphRef.current,
				buttonRef: buttonRef.current,
			})
		},
		{ dependencies: [imageSrc, title] },
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
								{title && (
									<h1 ref={headingRef} className='title'>
										{typeof title === "string"
											? renderTitleContent(title)
											: title}
									</h1>
								)}
							</div>
							<div className={styles.header__subtitle}>
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
					{imageSrc && (
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
					)}
					{children && (
						<div className={styles.header__children}>{children}</div>
					)}
				</div>
			</header>
		</>
	)
}
