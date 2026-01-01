"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import React from "react"

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

type HeadingAnimationProps = {
	title: string | React.ReactNode
	level: HeadingLevel
	className?: string
}

const HeadingAnimation: React.FC<HeadingAnimationProps> = ({
	title,
	level,
	className,
}) => {
	const headingRef = React.useRef<HTMLHeadingElement>(null)

	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger, SplitText)
		if (!headingRef.current) return

		const splitTitle = new SplitText(headingRef.current, {
			type: "lines, words, chars",
			linesClass: "lineClass",
			wordsClass: "wordClass",
			charsClass: "charClass",
		})

		gsap.set(splitTitle.chars, { opacity: 0, yPercent: 100, skewY: 5 })

		ScrollTrigger.create({
			trigger: headingRef.current,
			start: "top 80%",
			end: "bottom 20%",
			// markers: true,
			onEnter: () => {
				gsap.to(splitTitle.chars, {
					opacity: 1,
					yPercent: 0,
					skewY: 0,
					duration: 0.9,
					ease: "power2.out",
					stagger: {
						amount: 0.1,
						from: "start",
					},
				})
			},
		})
	}, [headingRef])

	const HeadingTag = level

	return (
		<div
			className={`heading__wrapper heading__wrapper--${level} ${className || ""}`}
		>
			<HeadingTag ref={headingRef}>{title}</HeadingTag>
		</div>
	)
}

export default HeadingAnimation
