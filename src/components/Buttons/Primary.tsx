"use client"

import styles from "./Buttons.module.scss"
import { usePageTransition } from "@/components/lib/animations/PageTransition"

type PrimaryProps = {
	href: string
	children: React.ReactNode
	isDarkBackground?: boolean
	ref?: React.Ref<HTMLAnchorElement>
}

export default function Primary({
	href,
	children,
	isDarkBackground = false,
	ref,
	...props
}: PrimaryProps) {
	const { handleTransitionClick } = usePageTransition()

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		handleTransitionClick(href, e)
	}

	return (
		<a
			onClick={handleClick}
			href={href}
			className={styles.button}
			{...props}
			data-dark-background={isDarkBackground}
			ref={ref}
		>
			<div className={styles.wave}></div>
			<div>{children}</div>
			<svg
				width='24'
				height='13'
				viewBox='0 0 24 13'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					className={styles.tip}
					d='M17.5 1L23 6.5L17.5 12'
					stroke={isDarkBackground ? "#0b2621" : "#e2fbf8"}
					strokeWidth='1'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					className={styles.line}
					d='M21 6.5H1'
					stroke={isDarkBackground ? "#0b2621" : "#e2fbf8"}
					strokeWidth='1'
					strokeLinecap='round'
				/>
			</svg>
		</a>
	)
}
