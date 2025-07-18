"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import styles from "./NavBody.module.scss"
import Image from "next/image"
import Link from "next/link"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import Anchor from "../Buttons/Anchor"
import { useRouter } from "next/navigation"
import {
	animateNavOpen,
	animateNavClose,
	handleNavLinkClick,
	handleNavItemMouseEnter,
	handleNavItemMouseLeave,
} from "@/components/lib/animations/navAnimation"

type NavItem = {
	href: string
	label: string
	imgSrc: string
	index: number
}

type Props = {
	navItems: NavItem[]
	isOpen: boolean
	overlayRef: React.RefObject<HTMLDivElement | null>
	setIsOpen: (isOpen: boolean) => void
}

const NavBody: React.FC<Props> = ({
	navItems,
	isOpen,
	overlayRef,
	setIsOpen,
}) => {
	const navBodyRef = useRef<HTMLDivElement>(null)
	const imageContainerRef = useRef<HTMLDivElement>(null)
	const linksRef = useRef<HTMLUListElement>(null)
	const footerRef = useRef<HTMLDivElement>(null)

	const [activeIndex, setActiveIndex] = useState<number | null>(null)
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
	const [isNavigating, setIsNavigating] = useState(false)
	const hasAnimatedRef = useRef(false)
	// Use any type for SplitText to avoid TypeScript errors with GSAP plugins
	const splitRef = useRef<SplitText | null>(null)

	const isDesktop = useCallback(() => {
		if (typeof window === "undefined") return false
		return window.matchMedia("(hover: hover) and (pointer: fine)").matches
	}, [])

	const handleMouseEnter = useCallback(
		(index: number) => {
			handleNavItemMouseEnter(
				index,
				imageContainerRef as React.RefObject<HTMLDivElement>,
				isNavigating,
				setHoveredIndex,
				setActiveIndex,
				isDesktop
			)
		},
		[isDesktop, isNavigating]
	)

	const handleMouseLeave = useCallback(() => {
		handleNavItemMouseLeave(
			imageContainerRef as React.RefObject<HTMLDivElement>,
			isNavigating,
			setHoveredIndex,
			setActiveIndex,
			isDesktop
		)
	}, [isDesktop, isNavigating])

	// Keep track of active animation timelines
	const activeTimelines = useRef<gsap.core.Timeline[]>([])

	// Function to handle animation cleanup - with preference for reversing when possible
	const cleanupAllAnimations = useCallback(() => {
		// Reverse or kill active timelines
		if (activeTimelines.current.length > 0) {
			activeTimelines.current.forEach((tl) => {
				if (tl && tl.isActive()) {
					// Prefer reversing the animation if possible
					tl.reverse()
				} else if (tl) {
					// Kill if it's not active (can't be reversed)
					tl.kill()
				}
			})
		}

		// Kill any direct tweens on navBody only
		const navBody = navBodyRef.current
		if (navBody) gsap.killTweensOf(navBody)

		// DO NOT kill animations on links, footer, or characters
		// This allows all UI elements to animate smoothly when spamclicking
	}, [])

	useGSAP(() => {
		if (!navBodyRef.current || !linksRef.current || !footerRef.current) return

		// Create refs object for our animation functions
		const refs = {
			navBodyRef: navBodyRef as React.RefObject<HTMLDivElement>,
			imageContainerRef: imageContainerRef as React.RefObject<HTMLDivElement>,
			linksRef: linksRef as React.RefObject<HTMLUListElement>,
			footerRef: footerRef as React.RefObject<HTMLDivElement>,
			overlayRef: overlayRef as React.RefObject<HTMLDivElement>,
			splitRef: splitRef as React.MutableRefObject<SplitText | null>,
			activeTimelines: activeTimelines as React.MutableRefObject<
				gsap.core.Timeline[]
			>,
			hasAnimatedRef: hasAnimatedRef as React.MutableRefObject<boolean>,
		}

		// Handle animations based on open state
		if (isOpen) {
			animateNavOpen(refs, setIsNavigating)
		} else {
			animateNavClose(refs)
		}
	}, [isOpen, cleanupAllAnimations])

	const router = useRouter()

	const handleLinkClick = async (e: React.MouseEvent, href: string) => {
		const refs = {
			navBodyRef: navBodyRef as React.RefObject<HTMLDivElement>,
			imageContainerRef: imageContainerRef as React.RefObject<HTMLDivElement>,
			linksRef: linksRef as React.RefObject<HTMLUListElement>,
			footerRef: footerRef as React.RefObject<HTMLDivElement>,
			overlayRef: overlayRef as React.RefObject<HTMLDivElement>,
			splitRef: splitRef as React.RefObject<SplitText | null>,
			activeTimelines: activeTimelines as React.RefObject<gsap.core.Timeline[]>,
			hasAnimatedRef: hasAnimatedRef as React.RefObject<boolean>,
		}

		handleNavLinkClick(e, href, refs, setIsNavigating, setIsOpen, router)
	}

	const escapeHandler = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === "Escape" && isOpen) {
				setIsOpen(false)
				setHoveredIndex(null)
				setActiveIndex(null)
			}
		},
		[isOpen, setIsOpen]
	)

	useEffect(() => {
		if (isOpen) {
			document.addEventListener("keydown", escapeHandler)
		}
		return () => {
			document.removeEventListener("keydown", escapeHandler)
		}
	}, [isOpen, escapeHandler])

	return (
		<div className={styles.nav_body__container} ref={navBodyRef}>
			<div className={styles.nav_body__top} onMouseLeave={handleMouseLeave}>
				<div className={styles.nav_body__content}>
					<div className={styles.nav_body__links}>
						<ul ref={linksRef}>
							{navItems.map((item, index) => (
								<li
									key={item.href}
									onMouseEnter={() => handleMouseEnter(index)}
									onMouseLeave={handleMouseLeave}
									style={{
										filter:
											hoveredIndex !== null && hoveredIndex !== index
												? "blur(4px)"
												: "none",
										opacity:
											hoveredIndex !== null && hoveredIndex !== index ? 0.7 : 1,
										transition: "all 0.6s ease-in-out",
									}}
								>
									<a
										href={item.href}
										onClick={(e) => handleLinkClick(e, item.href)}
										style={{ display: "inline-block", overflow: "hidden" }}
									>
										<span className='split-text'>{item.label}</span>
									</a>
								</li>
							))}
						</ul>
					</div>
					<div className={styles.nav_body__image} ref={imageContainerRef}>
						{activeIndex !== null && (
							<Image
								priority
								src={navItems[activeIndex].imgSrc}
								alt='preview'
								fill
								style={{
									objectFit: "cover",
									opacity: 0.8,
									pointerEvents: "none",
								}}
							/>
						)}
					</div>
				</div>
				<div ref={footerRef} className={styles.nav_body__footer}>
					<div className={styles.nav_footer__left}>
						<h3>Kontakt</h3>
						<Link
							className={styles.footer__email}
							href='mailto:hei@elma.no'
							onClick={() => setIsOpen(false)}
						>
							hei@elma.no
						</Link>
						<Anchor
							className={styles.nav_footer__booking}
							isDarkBackground
							href='#'
							onClick={() => setIsOpen(false)}
						>
							Booking av elma
						</Anchor>
					</div>
					<div className={styles.nav_footer__right}>
						<Anchor
							href='/personvern'
							onClick={() => setIsOpen(false)}
							isDarkBackground
						>
							Personvern og vilkår
						</Anchor>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NavBody
