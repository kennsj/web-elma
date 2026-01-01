"use client"

import { useTransitionRouter } from "next-view-transitions"
import { usePathname } from "next/navigation"
import Link from "next/link"

export function slideInOut() {
	document.documentElement.animate(
		[
			{ transform: "translateY(0%)", opacity: 1 },
			{ transform: "translateY(-35%)", opacity: 1 },
		],
		{
			duration: 800,
			easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
			fill: "forwards",
			pseudoElement: "::view-transition-old(root)",
		}
	)

	document.documentElement.animate(
		[
			{
				clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
			},
			{
				clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
			},
		],
		{
			duration: 800,
			easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
			fill: "forwards",
			pseudoElement: "::view-transition-new(root)",
		}
	)
}

export function usePageTransition() {
	const router = useTransitionRouter()
	const currentPath = usePathname()

	const handleTransitionClick = (
		href: string,
		e: React.MouseEvent<HTMLAnchorElement>,
		onClick?: () => void
	) => {
		e.preventDefault()

		// Execute onClick callback if provided
		if (onClick) onClick()

		// Check if clicking on current page - if so, skip transition
		const targetPath = href.split("?")[0].split("#")[0] // Remove query params and hash
		const isCurrentPage = currentPath === targetPath

		if (isCurrentPage) {
			// Just scroll to top if clicking same page
			window.scrollTo({ top: 0, behavior: "smooth" })
			return
		}

		// Navigate with transition
		router.push(href, { onTransitionReady: slideInOut })
	}

	return { handleTransitionClick }
}

type TransitionLinkProps = {
	href: string
	children: React.ReactNode
	className?: string
	onClick?: () => void
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">

/**
 * Reusable Link component with page transition animation
 * @example
 * <TransitionLink href="/about">About</TransitionLink>
 * <TransitionLink href="/contact" onClick={() => console.log('clicked')}>Contact</TransitionLink>
 */
export function TransitionLink({
	href,
	children,
	className,
	onClick,
	...props
}: TransitionLinkProps) {
	const { handleTransitionClick } = usePageTransition()

	return (
		<Link
			href={href}
			className={className}
			onClick={(e) => handleTransitionClick(href, e, onClick)}
			{...props}
		>
			{children}
		</Link>
	)
}
