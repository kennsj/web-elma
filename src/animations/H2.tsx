"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import React from "react"

type H2Props = {
	title: string
}

const H2: React.FC<H2Props> = ({ title }) => {
	const h2Ref = React.useRef<HTMLHeadingElement>(null)

	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger, SplitText)
		if (!h2Ref.current) return

		const splitTitle = new SplitText(h2Ref.current, {
			type: "lines, words, chars",
			linesClass: "lineClass",
			wordsClass: "wordClass",
			charsClass: "charClass",
		})

		gsap.set(splitTitle.chars, { opacity: 0, yPercent: 100, skewY: 5 })

		ScrollTrigger.create({
			trigger: h2Ref.current,
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
	}, [h2Ref])

	return (
		<div className='h2__wrapper'>
			{/* <div className='line'></div> */}
			<h2 ref={h2Ref}>{title}</h2>
		</div>
	)
}

export default H2
