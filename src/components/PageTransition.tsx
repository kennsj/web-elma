"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import gsap from "gsap"
import styles from "./PageTransition.module.scss"

const PageTransition = () => {
	const overlay1 = useRef<HTMLDivElement>(null)
	const overlay2 = useRef<HTMLDivElement>(null)
	const pathname = usePathname()

	useEffect(() => {
		if (!pathname) return

		const tl = gsap.timeline()

		tl.to(overlay2.current, {
			y: "0",
			ease: "power2.inOut",
			duration: 1.3,
		})

		tl.to([overlay2.current, overlay1.current], {
			y: "-100%",
			ease: "power2.inOut",
			duration: 1.3,
			delay: 0.2,
			stagger: 0.2,
		})

		// tl.to(
		// 	overlay1.current,
		// 	{
		// 		y: "-100%",
		// 		ease: "power2.inOut",
		// 		duration: 0.8,
		// 	},
		// 	"-=0.001"
		// )

		// tl.to(overlay1.current, {
		// 	y: "0%",
		// 	scaleY: 1,
		// 	opacity: 1,
		// 	filter: "blur(0px)",
		// 	duration: 1.1,
		// 	ease: "power4.inOut",
		// })
		// 	.to(
		// 		overlay2.current,
		// 		{
		// 			y: "0%",
		// 			scaleY: 1,
		// 			opacity: 1,
		// 			filter: "blur(0px)",
		// 			duration: 1.1,
		// 			ease: "power4.inOut",
		// 		},
		// 		"-=1"
		// 	)
		// 	.to([overlay1.current, overlay2.current], {
		// 		y: "-100%",
		// 		duration: 1,
		// 		delay: 0.2,
		// 		ease: "power2.inOut",
		// 	})

		// gsap.from("main", {
		// 	opacity: 0,
		// 	// y: 20,
		// 	duration: 0.6,
		// 	delay: 2.2,
		// 	ease: "power1.out",
		// })

		// Optionally, fade-in content right after
		// gsap.from('main', { opacity: 0, y: 20, duration: 0.6, delay: 2.2, ease: 'power1.out' })
	}, [pathname])

	return (
		<>
			<div ref={overlay1} className={styles.overlay1}></div>
			<div ref={overlay2} className={styles.overlay2}></div>
		</>
	)
}

export default PageTransition
