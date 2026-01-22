"use client"

import styles from "./Anchor.module.scss"
import Link from "next/link"
import { usePageTransition } from "@/components/lib/animations/PageTransition"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"

type LinkProps = {
	href: string
	children: React.ReactNode
	isDarkBackground?: boolean
	ref?: React.Ref<HTMLAnchorElement>
	className?: string
	onClick?: () => void
	tabIndex?: number
	dataDarkBackground?: boolean
}

export default function Anchor({
	href,
	children,
	isDarkBackground = false,
	className,
	onClick,
	tabIndex,
	dataDarkBackground,
	...props
}: LinkProps) {
	const { handleTransitionClick } = usePageTransition()
	const anchorRef = useRef<HTMLAnchorElement>(null)

	useGSAP(() => {
		if (!anchorRef.current) return

		gsap.registerPlugin(ScrollTrigger)

		// Set initial state
		gsap.set(anchorRef.current, { opacity: 0 })

		ScrollTrigger.create({
			trigger: anchorRef.current,
			start: "top 100%",
			end: "bottom 10%",
			onEnter: () => {
				gsap.to(anchorRef.current, {
					opacity: 1,

					duration: 0.6,
					ease: "power2.out",
				})
			},
		})
	}, [anchorRef])

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		handleTransitionClick(href, e, onClick)
	}

	return (
		<Link
			href={href}
			className={styles.anchor + (className ? ` ${className}` : "")}
			onClick={handleClick}
			{...props}
			data-dark-background={isDarkBackground}
			ref={anchorRef}
			// {ref ? { ref } : {}}
			tabIndex={tabIndex}
		>
			{children}
			<svg
				width='24'
				height='13'
				viewBox='0 0 24 13'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				data-dark-background={isDarkBackground}
			>
				<path
					className={styles.tip}
					d='M17.5 1L23 6.5L17.5 12'
					stroke='currentColor'
					strokeWidth='1'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					className={styles.line}
					d='M21 6.5H1'
					stroke='currentColor'
					strokeWidth='1'
					strokeLinecap='round'
				/>
			</svg>
		</Link>
	)
}
