"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import SplitText from "gsap/SplitText"
import ScrollTrigger from "gsap/ScrollTrigger"
import { useRef } from "react"
import { usePathname } from "next/navigation"

type UseTextRevealOptions = {
	animateBy?: "line" | "paragraph"
	triggerStart?: string
	triggerEnd?: string
	initialOpacity?: number
}

export const useTextReveal = (options: UseTextRevealOptions = {}) => {
	const {
		animateBy = "line",
		triggerStart = "top 85%",
		triggerEnd = "top 60%",
		initialOpacity = 0.3,
	} = options

	const splitsRef = useRef<SplitText[]>([])
	const triggersRef = useRef<ScrollTrigger[]>([])
	const pathname = usePathname()

	useGSAP(
		() => {
			gsap.registerPlugin(SplitText, ScrollTrigger)

			// Clean up any previous instances
			triggersRef.current.forEach((trigger) => trigger.kill())
			triggersRef.current = []
			splitsRef.current.forEach((split) => split.revert())
			splitsRef.current = []
		},
		{
			dependencies: [pathname, animateBy],
		},
	)

	const addTarget = async (element: HTMLElement | null) => {
		if (!element) return

		// Wait for fonts to load before splitting text
		if (document.fonts && document.fonts.ready) {
			await document.fonts.ready
		}

		const splitType = animateBy === "paragraph" ? "lines" : "words"

		const split = new SplitText(element, {
			type: splitType,
			linesClass: "lineClass",
			wordsClass: "wordClass",
		})

		splitsRef.current.push(split)

		const pieces = splitType === "lines" ? split.lines : split.words

		if (!pieces || pieces.length === 0) return

		gsap.set(pieces, { opacity: initialOpacity })

		pieces.forEach((piece) => {
			const trigger = ScrollTrigger.create({
				trigger: piece,
				start: triggerStart,
				end: triggerEnd,
				scrub: 1,
				animation: gsap.to(piece, {
					opacity: 1,
					ease: "none",
				}),
			})

			triggersRef.current.push(trigger)
		})
	}

	const cleanup = () => {
		triggersRef.current.forEach((trigger) => trigger.kill())
		triggersRef.current = []
		splitsRef.current.forEach((split) => split.revert())
		splitsRef.current = []
	}

	return { addTarget, cleanup }
}
