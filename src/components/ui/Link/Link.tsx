"use client"

import NextLink from "next/link"
import { usePageTransition } from "@/components/lib/animations/PageTransition"

/**
 * Base link props that all link variants share
 */
export type BaseLinkProps = {
	href: string
	children: React.ReactNode
	className?: string
	onClick?: () => void
	/** Enable page transition animation */
	withTransition?: boolean
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">

/**
 * Base Link component with optional page transitions
 * Use this for simple links without styling
 *
 * @example
 * <Link href="/about">About</Link>
 * <Link href="/contact" withTransition>Contact</Link>
 */
export function Link({
	href,
	children,
	className,
	onClick,
	withTransition = true,
	...props
}: BaseLinkProps) {
	const { handleTransitionClick } = usePageTransition()

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (withTransition) {
			handleTransitionClick(href, e, onClick)
		} else {
			if (onClick) onClick()
		}
	}

	return (
		<NextLink
			href={href}
			className={className}
			onClick={handleClick}
			{...props}
		>
			{children}
		</NextLink>
	)
}

export default Link
