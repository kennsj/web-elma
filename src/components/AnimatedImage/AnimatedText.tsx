"use client"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { use, useRef } from "react"

export default function AnimatedText({
	children,
}: {
	children: React.ReactNode
}) {
	const ref = useRef<HTMLDivElement>(null)
	gsap.registerPlugin(useGSAP, ScrollTrigger)

	useGSAP(() => {
		// gsap.registerPlugin(ScrollTrigger)
		gsap.from(ref.current, {
			ease: "power4.out",
			delay: 0.1,
			yPercent: 10,
			opacity: 0,
			// skewY: 2,
			duration: 1.2,
			stagger: 0.1,
			scrollTrigger: {
				trigger: ref.current,
				start: "top 90%",
				// end: "top -=100",
				markers: true,
				// scrub: true,
			},
		})
	}, [ref])

	return <div ref={ref}>{children}</div>
}
