"use client"

import Image from "next/image"
import styles from "./Anchor.module.scss"
import Link from "next/link"

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
	return (
		// <div className={styles.anchor__wrapper}>
		<Link
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
