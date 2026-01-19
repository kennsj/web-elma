"use client"

import { useRef, useLayoutEffect, ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

// Register GSAP plugins
if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger, SplitText)
}

interface ParagraphFadeInProps {
	children: ReactNode
	className?: string
	animationType?: "words" | "lines" | "letters"
	initialOpacity?: number
	staggerDelay?: number
	triggerStart?: string
	triggerEnd?: string
	ref?: React.Ref<HTMLDivElement>
}

export default function ParagraphFadeIn({
	children,
	className = "",
	animationType = "letters",
	initialOpacity = 0.5,
	staggerDelay = 0.2,
	triggerStart = "top 90%",
	triggerEnd = "bottom 60%",
}: ParagraphFadeInProps) {
	const containerRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		if (!containerRef.current) return

		const container = containerRef.current

		// Find all text elements to split
		const textElements = container.querySelectorAll(
			"p, div, span, h1, h2, h3, h4, h5, h6",
		)

		// Use SplitText to split text based on animation type
		const splitType =
			animationType === "letters"
				? "words,chars" // Split by both words and chars to maintain word integrity
				: animationType === "words"
					? "words"
					: "lines"

		const splits: SplitText[] = []
		const splitElements: Element[] = []

		// Set proper text handling on container for letter animations
		if (animationType === "letters") {
			gsap.set(container, {
				whiteSpace: "pre-wrap",
				wordWrap: "break-word",
			})
		}

		if (textElements.length === 0) {
			// If no text elements found, split the entire container
			const split = SplitText.create(container, {
				type: splitType,
				mask: "lines",
			})
			splits.push(split)
			// For letters, use chars; for others, use the appropriate split type
			if (animationType === "letters") {
				// Set word containers to prevent wrapping but DON'T set opacity on them
				split.words?.forEach((word) => {
					gsap.set(word, {
						display: "inline-block",
						whiteSpace: "nowrap",
						// No opacity here to avoid multiplication
					})
				})
				splitElements.push(...(split.chars || []))
			} else {
				splitElements.push(
					...split[animationType === "words" ? "words" : "lines"],
				)
			}
		} else {
			// Split each text element
			textElements.forEach((element) => {
				const split = SplitText.create(element, { type: splitType })
				splits.push(split)
				// For letters, use chars; for others, use the appropriate split type
				if (animationType === "letters") {
					// Set word containers to prevent wrapping but DON'T set opacity on them
					split.words?.forEach((word) => {
						gsap.set(word, {
							display: "inline-block",
							whiteSpace: "nowrap",
							// No opacity here to avoid multiplication
						})
					})
					splitElements.push(...(split.chars || []))
				} else {
					splitElements.push(
						...split[animationType === "words" ? "words" : "lines"],
					)
				}
			})
		}

		// Ensure split elements display inline (especially important for chars)
		splitElements.forEach((element) => {
			if (animationType === "letters") {
				gsap.set(element, {
					display: "inline-block",
					whiteSpace: "pre",
					lineHeight: "inherit",
				})
			} else if (animationType === "words") {
				gsap.set(element, {
					display: "inline-block",
					whiteSpace: "nowrap",
				})
			} else {
				gsap.set(element, { display: "block" })
			}
		})

		// Use only the split text elements for animation (images excluded)
		const elementsToAnimate = splitElements

		if (elementsToAnimate.length === 0) return

		// Set initial opacity ONLY for the elements we're animating to avoid multiplication
		gsap.set(elementsToAnimate, { opacity: initialOpacity })

		// Create individual ScrollTriggers for each element to reveal words as they enter viewport
		const triggers: ScrollTrigger[] = []

		elementsToAnimate.forEach((element) => {
			const trigger = ScrollTrigger.create({
				trigger: element,
				start: "top 85%", // Start revealing when word is 85% down the viewport
				end: "top 65%", // Fully revealed when word is 65% down the viewport
				scrub: 1,
				animation: gsap.to(element, { opacity: 1, duration: 1, ease: "none" }),
				markers: false,
			})
			triggers.push(trigger)
		})

		// Cleanup function
		return () => {
			// Kill all individual triggers
			triggers.forEach((trigger) => trigger.kill())
			// Revert all SplitText instances
			splits.forEach((split) => split.revert())
		}
	}, [animationType, initialOpacity, staggerDelay, triggerStart, triggerEnd])

	return (
		<div ref={containerRef} className={className}>
			{children}
		</div>
	)
}

// Export a simple wrapper for common use cases
export function FadeInParagraph({
	children,
	className,
	ref,
	...props
}: Omit<ParagraphFadeInProps, "animationType">) {
	return (
		<ParagraphFadeIn
			ref={ref}
			animationType='lines'
			className={className}
			{...props}
		>
			{children}
		</ParagraphFadeIn>
	)
}

export function FadeInWords({
	children,
	className,
	ref,
	...props
}: Omit<ParagraphFadeInProps, "animationType">) {
	return (
		<ParagraphFadeIn
			ref={ref}
			animationType='words'
			className={className}
			{...props}
		>
			{children}
		</ParagraphFadeIn>
	)
}

export function FadeInLetters({
	children,
	className,
	ref,
	...props
}: Omit<ParagraphFadeInProps, "animationType">) {
	return (
		<ParagraphFadeIn
			ref={ref}
			animationType='letters'
			className={className}
			{...props}
		>
			{children}
		</ParagraphFadeIn>
	)
}
