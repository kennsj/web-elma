"use client"

import { Link, BaseLinkProps } from "./Link"
import styles from "./LinkWithArrow.module.scss"

type LinkWithArrowProps = BaseLinkProps & {
	/** Apply dark background styling */
	isDarkBackground?: boolean
}

/**
 * Styled link with arrow icon
 * Used for call-to-action links
 *
 * @example
 * <LinkWithArrow href="/contact">Contact us</LinkWithArrow>
 * <LinkWithArrow href="/about" isDarkBackground>Learn more</LinkWithArrow>
 */
export function LinkWithArrow({
	href,
	children,
	isDarkBackground = false,
	className = "",
	...props
}: LinkWithArrowProps) {
	const linkClassName = `${styles.anchor} ${className}`.trim()

	return (
		<Link
			href={href}
			className={linkClassName}
			data-dark-background={isDarkBackground}
			{...props}
		>
			{children}
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

export default LinkWithArrow
