"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import styles from "./NavBody.module.scss"
import Image from "next/image"
import Link from "next/link"

import gsap from "gsap"
import SplitText from "gsap/SplitText"
import { useGSAP } from "@gsap/react"
import { slideIn, slideOut } from "@/components/lib/animations/slide"
import Anchor from "../Buttons/Anchor"
import { useRouter } from "next/navigation"

// Register the SplitText plugin
gsap.registerPlugin(SplitText)

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
	const splitRef = useRef<any>(null)

	const isDesktop = useCallback(() => {
		if (typeof window === "undefined") return false
		return window.matchMedia("(hover: hover) and (pointer: fine)").matches
	}, [])

	const handleMouseEnter = useCallback(
		(index: number) => {
			if (!isDesktop() || isNavigating || !imageContainerRef.current) return
			setHoveredIndex(index)
			setActiveIndex(index)

			gsap.killTweensOf(imageContainerRef.current)
			gsap.set(imageContainerRef.current, {
				opacity: 0,
				scale: 1,
				display: "block",
			})
			gsap.to(imageContainerRef.current, {
				opacity: 1,
				scale: 1,
				duration: 0.8,
				ease: "power2.out",
			})
		},
		[isDesktop, isNavigating]
	)

	const handleMouseLeave = useCallback(() => {
		if (!isDesktop() || isNavigating || !imageContainerRef.current) return
		setHoveredIndex(null)

		gsap.killTweensOf(imageContainerRef.current)
		gsap.to(imageContainerRef.current, {
			opacity: 0,
			scale: 1,
			duration: 0.5,
			ease: "power1.out",
			onComplete: () => {
				gsap.set(imageContainerRef.current, { display: "none" })
				setActiveIndex(null)
			},
		})
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
		const navBody = navBodyRef.current
		const links = linksRef.current
		const footer = footerRef.current
		if (!navBody || !links) return

		// Kill timelines but DO NOT revert SplitText during state transitions
		if (activeTimelines.current.length > 0) {
			activeTimelines.current.forEach((tl) => {
				if (tl) tl.kill()
			})
			activeTimelines.current = []
		}

		// Kill active tweens on navBody only, leave others alone
		// DO NOT kill tweens on links or footer so they can animate naturally
		if (navBody) gsap.killTweensOf(navBody)

		if (isOpen) {
			// Don't clean up animations during transition to preserve character positions

			// Initialize text elements with their links hidden
			const textElements = navBody.querySelectorAll(".split-text")

			try {
				// Initialize or re-use SplitText instance
				if (
					!splitRef.current ||
					!splitRef.current.chars ||
					splitRef.current.chars.length === 0
				) {
					// Create a fresh SplitText instance if needed
					if (splitRef.current) {
						try {
							splitRef.current.revert()
						} catch (e) {
							console.error("Error reverting SplitText:", e)
						}
					}

					// Create new instance
					splitRef.current = new SplitText(textElements, {
						type: "chars",
						charsClass: "char",
					})

					// Set initial state for new chars
					gsap.set(splitRef.current.chars, {
						yPercent: 120,
						opacity: 1,
						display: "inline-block",
					})
				}
				// We don't reset positions when spamclicking to allow smooth reversals
			} catch (e) {
				console.log("Error setting up SplitText initially:", e)
			}

			// Now slide in the navigation container
			slideIn(navBody, { direction: "top", duration: 0.7, delay: 0.2 })

			// Use a separate timeline for character animation with proper lifecycle callbacks
			const charTl = gsap.timeline({
				delay: 0.9,
				data: "charAnimation", // Identify this timeline for reversal in closing animation
				onComplete: () => {
					hasAnimatedRef.current = true
				},
				onReverseComplete: () => {
					// Remove from active timelines when reversed
					const index = activeTimelines.current.indexOf(charTl)
					if (index !== -1) {
						activeTimelines.current.splice(index, 1)
					}
				},
			})
			activeTimelines.current.push(charTl)

			if (splitRef.current && splitRef.current.chars) {
				// Get current position to ensure smooth animation from current state
				const currentPos = Number(
					gsap.getProperty(splitRef.current.chars[0], "yPercent") || 120
				)

				// Animate from current position to visible position (0%)
				charTl.fromTo(
					splitRef.current.chars,
					{ yPercent: currentPos },
					{
						yPercent: 0,
						stagger: 0.015,
						duration: 0.7,
						ease: "power3.out",
					}
				)
			}

			// Create a timeline for the footer that we can reverse if needed
			// First ensure footer is visible in the DOM
			gsap.set(footer, {
				visibility: "visible",
			})

			// Create a new timeline for footer animation that we can reverse
			const footerTl = gsap.timeline({
				delay: 0.9,
				data: "footerAnimation", // Tag this timeline for identification later
				onReverseComplete: () => {
					// Remove from active timelines when reversed
					const index = activeTimelines.current.indexOf(footerTl)
					if (index !== -1) {
						activeTimelines.current.splice(index, 1)
					}
				},
			})
			activeTimelines.current.push(footerTl)

			// Add animation to the timeline
			footerTl.to(footer, {
				y: 0,
				opacity: 1,
				duration: 0.7,
				ease: "power2.out",
			})

			// Create a timeline for the overlay that we can reverse
			const overlayTl = gsap.timeline({
				delay: 0.2,
				data: "overlayAnimation", // Tag this timeline for identification later
				onReverseComplete: () => {
					// Remove from active timelines when reversed
					const index = activeTimelines.current.indexOf(overlayTl)
					if (index !== -1) {
						activeTimelines.current.splice(index, 1)
					}
				},
			})
			activeTimelines.current.push(overlayTl)

			// Add animation to the timeline
			overlayTl.to(overlayRef.current, {
				duration: 0.4,
				ease: "power2.inOut",
			})

			setIsNavigating(false)
		} else {
			// Only kill animations on navBody, not on footer or links
			// This allows their animations to continue naturally when spamclicking
			if (navBody) gsap.killTweensOf(navBody)

			// For closing, create a coordinated sequence with a master timeline
			const closeTl = gsap.timeline({
				onComplete: () => {
					// Clean up reference when the timeline completes naturally
					const index = activeTimelines.current.indexOf(closeTl)
					if (index !== -1) {
						activeTimelines.current.splice(index, 1)
					}
				},
			})
			activeTimelines.current.push(closeTl)

			try {
				// If we don't have a SplitText instance or chars, create one
				if (
					!splitRef.current ||
					!splitRef.current.chars ||
					splitRef.current.chars.length === 0
				) {
					const linkElements = navBody.querySelectorAll(".split-text")

					// Create a new SplitText instance
					try {
						splitRef.current = new SplitText(linkElements, {
							type: "chars",
							charsClass: "char",
						})

						// If this is a fresh creation, force them to be at position 0 (visible)
						gsap.set(splitRef.current.chars, {
							yPercent: 0,
							opacity: 1,
							display: "inline-block",
						})
					} catch (e) {
						console.error("Error creating SplitText during close:", e)
					}
				}

				// Handle character animations
				const chars = splitRef.current?.chars
				if (chars && chars.length > 0) {
					// Find any active character timelines and reverse them
					const activeCharTimeline = activeTimelines.current.find(
						(tl) => tl.isActive() && tl.data === "charAnimation"
					)

					if (activeCharTimeline) {
						// If we have an active character timeline, reverse it
						activeCharTimeline.reverse()
					} else {
						// Otherwise, create a new closing animation from current position
						const currentPos = Number(
							gsap.getProperty(chars[0], "yPercent") || 0
						)

						// Only animate if they're not already hidden
						if (currentPos < 120) {
							closeTl.fromTo(
								chars,
								{ yPercent: currentPos, opacity: 1, display: "inline-block" },
								{
									yPercent: 120,
									duration: 0.5,
									ease: "power3.in",
								},
								0
							)
						}
					}

					// Delay the container slide out until after chars animate
					closeTl.add(() => {
						slideOut(navBody, {
							direction: "top",
							duration: 0.9,
						})
					}, 0.4)
				} else {
					// Fallback if there are no characters
					closeTl.add(() => {
						slideOut(navBody, { direction: "top", duration: 0.9 })
					}, 0)
				}

				// Only reset the animation flag at the end, but don't destroy SplitText instance
				// This allows for smoother transitions when spamclicking
				closeTl.call(
					() => {
						hasAnimatedRef.current = false
					},
					[],
					1.5
				)
			} catch (e) {
				console.error("Error with closing animation sequence:", e)
				// Fallback if anything fails
				slideOut(navBody, { direction: "top", delay: 0.1, duration: 0.9 })
			}

			// Find active footer animations to reverse
			const footerTimelines = activeTimelines.current.filter(
				(tl) => tl.isActive() && tl.data === "footerAnimation"
			)

			if (footerTimelines.length > 0) {
				// Reverse existing animations
				closeTl.add(() => {
					footerTimelines.forEach((tl) => tl.reverse())
				}, 0.1)
			} else {
				// Fallback animation if no active footer timelines exist
				closeTl.to(
					footer,
					{
						y: 30,
						opacity: 0,
						duration: 0.5,
						ease: "power2.in",
					},
					0.1
				)
			}

			// Find active overlay animations to reverse by data tag
			const overlayTimelines = activeTimelines.current.filter(
				(tl) => tl.isActive() && tl.data === "overlayAnimation"
			)

			if (overlayTimelines.length > 0) {
				// Reverse existing animations
				closeTl.add(() => {
					overlayTimelines.forEach((tl) => tl.reverse())
				}, 0.1)
			} else {
				// Fallback animation if no active overlay timelines exist
				closeTl.to(
					overlayRef.current,
					{
						opacity: 0,
						duration: 0.4,
						ease: "power2.inOut",
					},
					0.1
				)
			}
		}
	}, [isOpen, cleanupAllAnimations])

	const router = useRouter()

	const handleLinkClick = async (e: React.MouseEvent, href: string) => {
		e.preventDefault()
		if (isNavigating) return
		setIsNavigating(true)

		try {
			// Find any active character timelines and reverse them first
			const charTimelines = activeTimelines.current.filter(
				(tl) => tl.isActive() && tl.data === "charAnimation"
			)

			if (charTimelines.length > 0) {
				// If we have active character timelines, reverse them
				charTimelines.forEach((tl) => tl.reverse())
			}

			// If no split text is available, just do the transition
			if (
				!splitRef.current ||
				!splitRef.current.chars ||
				!splitRef.current.chars.length
			) {
				router.push(href)
				setIsOpen(false)
				return
			}

			// Create a timeline for the transition animation
			const tl = gsap.timeline({
				onComplete: () => {
					// Remove from active timelines when complete
					const index = activeTimelines.current.indexOf(tl)
					if (index !== -1) {
						activeTimelines.current.splice(index, 1)
					}
				},
			})

			// Add to active timelines
			activeTimelines.current.push(tl)

			// Get current character position
			const chars = splitRef.current.chars
			const currentPos = Number(gsap.getProperty(chars[0], "yPercent") || 0)

			// Animate from current position to hidden position
			tl.fromTo(
				chars,
				{ yPercent: currentPos, opacity: 1 },
				{
					yPercent: 120,
					duration: 0.5,
					ease: "power3.in",
				}
			)

			// Find active overlay animations to reverse
			const overlayTimelines = activeTimelines.current.filter(
				(t) => t !== tl && t.data === "overlayAnimation" && t.isActive()
			)

			if (overlayTimelines.length > 0) {
				// If we have active overlay animations, reverse them
				tl.add(() => {
					overlayTimelines.forEach((timeline) => timeline.reverse())
				}, "-=0.3")
			} else {
				// If no active animations to reverse, create a new one
				tl.to(
					overlayRef.current,
					{ opacity: 0, duration: 0.4, ease: "power2.inOut" },
					"-=0.3" // Overlap slightly with text animation
				)
			}

			tl.to(
				navBodyRef.current,
				{ y: -50, opacity: 0, duration: 0.7, ease: "expo.out" },
				"-=0.4" // Overlap with overlay animation
			)

			// Navigate with a slight delay to let text animation finish
			setTimeout(() => {
				router.push(href)
			}, 300) // 300ms delay

			// Close the menu
			setIsOpen(false)
		} catch (error) {
			console.error("Error in link click animation:", error)
			// Fallback if animation fails
			router.push(href)
			setIsOpen(false)
		}
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
