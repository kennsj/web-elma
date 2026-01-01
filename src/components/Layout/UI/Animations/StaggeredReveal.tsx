"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { useRef } from "react"

interface StaggeredRevealProps {
	children: React.ReactNode
	delay?: number
	className?: string
}

const StaggeredReveal = ({
	children,
	delay = 0.2,
	className = "",
}: StaggeredRevealProps) => {
	const containerRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		if (!containerRef.current) return

		gsap.registerPlugin(ScrollTrigger)

		const cards = gsap.utils.toArray(containerRef.current.children)

		// Set initial state
		gsap.set(cards, {
			opacity: 0,
			yPercent: 10,
		})

		// Create scroll trigger animation
		ScrollTrigger.create({
			trigger: containerRef.current,
			start: "top 80%",
			onEnter: () => {
				gsap.to(cards, {
					opacity: 1,
					yPercent: 0,
					duration: 0.8,
					ease: "power2.out",
					stagger: delay,
				})
			},
		})
	})

	return (
		<div ref={containerRef} className={className}>
			{children}
		</div>
	)
}

export default StaggeredReveal
