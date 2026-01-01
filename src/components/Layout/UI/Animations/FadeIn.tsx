"use client"

import React, { useRef, useLayoutEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger)
}

interface TextRevealProps {
	children: React.ReactNode
	className?: string
	wordReveal?: boolean // If true, animate words individually
	initialOpacity?: number // Default: 0.3 for gentle fade
	duration?: number // Fade duration in seconds
	triggerStart?: string // ScrollTrigger start value
	triggerEnd?: string // ScrollTrigger end value
}

const prefersReducedMotion =
	typeof window !== "undefined" &&
	window.matchMedia("(prefers-reduced-motion: reduce)").matches

export default function TextReveal({
	children,
	className = "",
	wordReveal = false,
	initialOpacity = 0.3,
	duration = 1.2,
	triggerStart = "top 85%",
	triggerEnd = "top 40%",
}: TextRevealProps) {
	const blockRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		const block = blockRef.current
		if (!block || prefersReducedMotion) return

		// Set initial opacity for the block
		gsap.set(block, { opacity: initialOpacity })

		// If wordReveal, wrap each word in a span
		const wordSpans: HTMLElement[] = []
		if (wordReveal) {
			const textNodes = Array.from(block.childNodes).filter(
				(node) => node.nodeType === Node.TEXT_NODE
			)
			textNodes.forEach((node) => {
				const words = (node.textContent || "").split(/(\s+)/)
				const frag = document.createDocumentFragment()
				words.forEach((word) => {
					if (word.trim() === "") {
						frag.appendChild(document.createTextNode(word))
					} else {
						const span = document.createElement("span")
						span.textContent = word
						span.style.opacity = String(initialOpacity)
						span.style.transition = "opacity 0.3s"
						span.className = "text-reveal__word"
						frag.appendChild(span)
						wordSpans.push(span)
					}
				})
				block.replaceChild(frag, node)
			})
		}

		// Animate block opacity
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: block,
				start: triggerStart,
				end: triggerEnd,
				scrub: 1,
				markers: false,
			},
		})

		tl.to(block, {
			opacity: 1,
			duration,
			ease: "power1.out",
		})

		// Animate words if enabled
		if (wordReveal && wordSpans.length > 0) {
			tl.to(
				wordSpans,
				{
					opacity: 1,
					duration: 0.6,
					stagger: 0.07,
					ease: "power1.out",
				},
				"<" // Start with block fade
			)
		}

		return () => {
			tl.kill()
			ScrollTrigger.getAll().forEach((trigger) => {
				if (trigger.trigger === block) trigger.kill()
			})
		}
	}, [wordReveal, initialOpacity, duration, triggerStart, triggerEnd])

	return (
		<div
			ref={blockRef}
			className={`text-reveal ${className}`}
			aria-live='polite'
			style={{
				transition: "opacity 0.3s",
				willChange: "opacity",
			}}
		>
			{children}
		</div>
	)
}
