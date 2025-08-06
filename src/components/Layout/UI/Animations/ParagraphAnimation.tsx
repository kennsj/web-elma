"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import SplitText from "gsap/SplitText"
import ScrollTrigger from "gsap/ScrollTrigger"
import React, { useRef } from "react"
import { usePathname } from "next/navigation"

type ParagraphProps = {
	children: React.ReactNode
	className?: string
}

const Paragraph: React.FC<ParagraphProps> = ({ children, className }) => {
	const ref = useRef<HTMLParagraphElement>(null)
	const pathname = usePathname()
	const splitRef = useRef<SplitText | null>(null)

	useGSAP(
		() => {
			if (!ref.current) return

			gsap.registerPlugin(SplitText, ScrollTrigger)

			// Revert any previous SplitText
			splitRef.current?.revert()

			splitRef.current = new SplitText(ref.current, {
				type: "lines, words",
				linesClass: "lineClass",
				wordsClass: "wordClass",
			})

			gsap.set(splitRef.current.words, { opacity: 0, yPercent: 100, skewY: 5 })

			ScrollTrigger.create({
				trigger: ref.current,
				start: "top 80%",
				end: "bottom 20%",
				onEnter: () => {
					gsap.to(splitRef.current!.words, {
						opacity: 1,
						yPercent: 0,
						skewY: 0,
						duration: 0.9,
						ease: "power2.out",
						stagger: {
							amount: 0.35,
							from: "start",
						},
					})
				},
			})
		},
		{ dependencies: [pathname], scope: ref, revertOnUpdate: true } // <- triggers on route change
	)

	return (
		<p ref={ref} className={className}>
			{children}
		</p>
	)
}

export default Paragraph
