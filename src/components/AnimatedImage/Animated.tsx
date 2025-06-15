"use client"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { useRef } from "react"

export default function Animated({ children }: { children: React.ReactNode }) {
	const ref = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger)
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
