"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import SplitText from "gsap/SplitText"
import ScrollTrigger from "gsap/ScrollTrigger"
import React, { useRef } from "react"
import { usePathname } from "next/navigation"
import HeadingAnimation from "@/components/Layout/UI/Animations/HeadingAnimation"
import styles from "./Text.module.scss"
import Anchor from "@/components/Buttons/Anchor"
import {
	FadeInLetters,
	FadeInWords,
} from "@/components/Layout/UI/Animations/ParagraphFadeIn"
import Paragraph from "@/components/Layout/UI/Animations/ParagraphAnimation"

type Props = {
	className?: string
	title: string
	children: string | React.ReactNode
	introduction: string | React.ReactNode
	dataTheme?: string
	link?: { href: string; label: string }
}

const TextNarrow = ({
	title,
	children,
	introduction,
	dataTheme,
	link,
}: Props) => {
	const introRef = useRef<HTMLParagraphElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const pathname = usePathname()

	useGSAP(
		() => {
			gsap.registerPlugin(SplitText, ScrollTrigger)

			// Animate introduction paragraph
			if (introRef.current) {
				const introSplit = new SplitText(introRef.current, {
					type: "lines",
					linesClass: "lineClass",
				})

				gsap.set(introSplit.lines, { opacity: 0, y: 15 })

				ScrollTrigger.create({
					trigger: introRef.current,
					start: "top 85%",
					onEnter: () => {
						gsap.to(introSplit.lines, {
							opacity: 1,
							y: 0,
							duration: 0.6,
							ease: "power2.out",
							stagger: 0.08,
						})
					},
				})
			}

			// Animate content paragraphs if any
			if (contentRef.current) {
				const paragraphs = contentRef.current.querySelectorAll("p")

				if (paragraphs.length > 0) {
					// Create splits for all paragraphs
					const splits = Array.from(paragraphs).map((paragraph) => {
						const split = new SplitText(paragraph, {
							type: "lines",
							linesClass: "lineClass",
						})
						gsap.set(split.lines, { opacity: 0, y: 12 })
						return { paragraph, split }
					})

					// Progressive reveal with overlap for natural reading flow
					ScrollTrigger.create({
						trigger: paragraphs[0],
						start: "top 85%",
						onEnter: () => {
							const tl = gsap.timeline()

							splits.forEach(({ split }, index) => {
								// Start next paragraph before current finishes (overlap)
								tl.to(
									split.lines,
									{
										opacity: 1,
										y: 0,
										duration: 0.5,
										ease: "power2.out",
										stagger: 0.05, // Fast line stagger
									},
									index * 0.2
								) // Overlap timing for seamless flow
							})
						},
					})
				}
			}
		},
		{
			dependencies: [pathname],
			revertOnUpdate: true,
		}
	)

	return (
		<div className={styles.intro}>
			<HeadingAnimation title={title} level='h3' className={styles.title} />
			<div className={styles.intro__content}>
				<div className={styles.left}>
					<Paragraph className={styles.intro__paragraph}>
						{introduction}
					</Paragraph>
				</div>
				<div ref={contentRef} data-theme={dataTheme} className={styles.right}>
					<FadeInWords>{children}</FadeInWords>
					{link && (
						<Anchor href={link.href} className={styles.intro__link}>
							{link.label}
						</Anchor>
					)}
				</div>
			</div>
		</div>
	)
}

export default TextNarrow
