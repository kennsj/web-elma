"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import React from "react"

type ParagraphProps = {
	children: React.ReactNode
	className?: string
}

const Paragraph: React.FC<ParagraphProps> = ({ children, className }) => {
	const paragraphRef = React.useRef<HTMLHeadingElement>(null)

	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger, SplitText)
		if (!paragraphRef.current) return

		const splitParagraph = new SplitText(paragraphRef.current, {
			// type: "lines, words, chars",
			type: "lines, words",
			linesClass: "lineClass",
			wordsClass: "wordClass",
			charsClass: "charClass",
		})

		gsap.set(splitParagraph.words, { opacity: 0, yPercent: 100, skewY: 5 })

		ScrollTrigger.create({
			trigger: paragraphRef.current,
			start: "top 80%",
			end: "bottom 20%",
			onEnter: () => {
				gsap.to(splitParagraph.words, {
					opacity: 1,
					yPercent: 0,
					skewY: 0,
					duration: 0.9,
					ease: "power2.out",
					// stagger: 0.1,
					stagger: {
						amount: 0.35,
						from: "start",
					},
				})
			},
		})
	}, [paragraphRef])

	return (
		<p ref={paragraphRef} className={className}>
			{children}
		</p>
	)
}

export default Paragraph
