"use client"

import { Link, BaseLinkProps } from "./Link"
import styles from "./ButtonLink.module.scss"

type ButtonLinkProps = BaseLinkProps & {
	/** Visual variant of the button */
	variant?: "primary" | "secondary"
	/** Apply dark background styling */
	isDarkBackground?: boolean
}

/**
 * Link styled as a button with wave effect
 * Used for primary CTAs
 *
 * @example
 * <ButtonLink href="/start">Get Started</ButtonLink>
 * <ButtonLink href="/pricing" variant="secondary">View Pricing</ButtonLink>
 */
export function ButtonLink({
	href,
	children,
	variant = "primary",
	isDarkBackground = false,
	className = "",
	...props
}: ButtonLinkProps) {
	const buttonClassName =
		`${styles.button} ${styles[variant]} ${className}`.trim()

	return (
		<Link
			href={href}
			className={buttonClassName}
			data-dark-background={isDarkBackground}
			{...props}
		>
			<div className={styles.wave}></div>
			<div className={styles.content}>{children}</div>
			<svg
				width='24'
				height='13'
				viewBox='0 0 24 13'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				aria-hidden='true'
			>
				<path
					className={styles.tip}
					d='M17.5 1L23 6.5L17.5 12'
					strokeWidth='1'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					className={styles.line}
					d='M21 6.5H1'
					strokeWidth='1'
					strokeLinecap='round'
				/>
			</svg>
		</Link>
	)
}

export default ButtonLink
