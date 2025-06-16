"use client"

import Image from "next/image"
import styles from "./Anchor.module.scss"
import Link from "next/link"
import gsap from "gsap"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger, SplitText } from "gsap/all"

type LinkProps = {
	href: string
	children: React.ReactNode
	fontSize?: string
	isDarkBackground?: boolean
}

export default function Anchor({
	href,
	children,
	fontSize = "1rem",
	isDarkBackground = false,
	...props
}: LinkProps) {
	const linkRef = useRef<HTMLAnchorElement>(null)

	useGSAP(() => {
		gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

		const split = new SplitText(linkRef.current, {
			type: "lines, words, chars",
			linesClass: "line",
			wordsClass: "word",
			charsClass: "char",
		})

		gsap.from(split.chars, {
			ease: "power4.out",
			delay: 0.1,
			yPercent: 100,
			opacity: 0,
			// skewY: 2,
			duration: 1.2,
			stagger: 0.01,
			// scrollTrigger: {
			// 	trigger: linkRef.current,
			// 	start: "top 90%",
			// 	end: "top -=100",
			// 	// markers: true,
			// 	// scrub: true,
			// },
		})
	}, [linkRef])

	return (
		// <div className={styles.anchor__wrapper}>
		<Link
			ref={linkRef}
			href={href}
			className={`${styles.anchor} ${isDarkBackground ? styles.light : styles.dark}`}
			{...props}
			data-dark-background={isDarkBackground}
			style={{
				color: isDarkBackground ? "#e2fbf8" : "#12332f",
				fontSize,
			}}
		>
			{children}

			{/* TODO: Replace with dark mode detection */}
			<Image
				src={
					isDarkBackground
						? "/images/arrow-link-light.svg"
						: "/images/arrow-link-dark.svg"
				}
				alt='Arrow Link'
				className={styles.anchor__icon}
				width={44}
				height={44}
			/>
		</Link>
		// </div>
	)
}
