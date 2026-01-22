import gsap from "gsap"
import SplitText from "gsap/SplitText"
import { slideIn, slideOut } from "./slide"

// Ensure GSAP plugins are registered
gsap.registerPlugin(SplitText)

// Types for the animations
export type NavAnimationRefs = {
	navBodyRef: React.RefObject<HTMLDivElement>
	imageContainerRef?: React.RefObject<HTMLDivElement>
	linksRef: React.RefObject<HTMLUListElement>
	footerRef: React.RefObject<HTMLDivElement>
	overlayRef: React.RefObject<HTMLDivElement | null>
	splitRef: React.RefObject<SplitText | null> // Using proper type for SplitText
	activeTimelines: React.RefObject<gsap.core.Timeline[]>
	hasAnimatedRef: React.RefObject<boolean>
}

/**
 * Initializes and runs animations when opening the navigation
 */
export const animateNavOpen = (
	refs: NavAnimationRefs,
	setIsNavigating: (value: boolean) => void
) => {
	const navBody = refs.navBodyRef.current
	const links = refs.linksRef.current
	const footer = refs.footerRef.current

	if (!navBody || !links || !footer || !refs.overlayRef.current) return

	// Kill timelines but DO NOT revert SplitText during state transitions
	if (refs.activeTimelines.current.length > 0) {
		refs.activeTimelines.current.forEach((tl) => {
			if (tl) tl.kill()
		})
		refs.activeTimelines.current = []
	}

	// Kill active tweens on navBody only, leave others alone
	if (navBody) gsap.killTweensOf(navBody)

	// Initialize text elements with their links hidden
	const textElements = navBody.querySelectorAll(".split-text")

	try {
		// Initialize or re-use SplitText instance
		if (
			!refs.splitRef.current ||
			!refs.splitRef.current.chars ||
			refs.splitRef.current.chars.length === 0
		) {
			// Create a fresh SplitText instance if needed
			if (refs.splitRef.current) {
				try {
					refs.splitRef.current.revert()
				} catch (e) {
					console.error("Error reverting SplitText:", e)
				}
			}

			// Create new instance
			refs.splitRef.current = new SplitText(textElements, {
				type: "chars",
				charsClass: "char",
			})

			// Set initial state for new chars
			gsap.set(refs.splitRef.current.chars, {
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
			refs.hasAnimatedRef.current = true
		},
		onReverseComplete: () => {
			// Remove from active timelines when reversed
			const index = refs.activeTimelines.current.indexOf(charTl)
			if (index !== -1) {
				refs.activeTimelines.current.splice(index, 1)
			}
		},
	})
	refs.activeTimelines.current.push(charTl)

	if (refs.splitRef.current && refs.splitRef.current.chars) {
		// Get current position to ensure smooth animation from current state
		const currentPos = Number(
			gsap.getProperty(refs.splitRef.current.chars[0], "yPercent") || 120
		)

		// Animate from current position to visible position (0%)
		charTl.fromTo(
			refs.splitRef.current.chars,
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
			const index = refs.activeTimelines.current.indexOf(footerTl)
			if (index !== -1) {
				refs.activeTimelines.current.splice(index, 1)
			}
		},
	})
	refs.activeTimelines.current.push(footerTl)

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
			const index = refs.activeTimelines.current.indexOf(overlayTl)
			if (index !== -1) {
				refs.activeTimelines.current.splice(index, 1)
			}
		},
	})
	refs.activeTimelines.current.push(overlayTl)

	// Add animation to the timeline
	overlayTl.to(refs.overlayRef.current, {
		duration: 0.4,
		ease: "power2.inOut",
	})

	setIsNavigating(false)
}

/**
 * Animates the navigation when closing
 */
export const animateNavClose = (refs: NavAnimationRefs) => {
	const navBody = refs.navBodyRef.current
	const footer = refs.footerRef.current

	if (!navBody || !footer || !refs.overlayRef.current) return

	// Only kill animations on navBody, not on footer or links
	// This allows their animations to continue naturally when spamclicking
	if (navBody) gsap.killTweensOf(navBody)

	// For closing, create a coordinated sequence with a master timeline
	const closeTl = gsap.timeline({
		onComplete: () => {
			// Clean up reference when the timeline completes naturally
			const index = refs.activeTimelines.current.indexOf(closeTl)
			if (index !== -1) {
				refs.activeTimelines.current.splice(index, 1)
			}
		},
	})
	refs.activeTimelines.current.push(closeTl)

	try {
		// If we don't have a SplitText instance or chars, create one
		if (
			!refs.splitRef.current ||
			!refs.splitRef.current.chars ||
			refs.splitRef.current.chars.length === 0
		) {
			const linkElements = navBody.querySelectorAll(".split-text")

			// Create a new SplitText instance
			try {
				refs.splitRef.current = new SplitText(linkElements, {
					type: "chars",
					charsClass: "char",
				})

				// If this is a fresh creation, force them to be at position 0 (visible)
				gsap.set(refs.splitRef.current.chars, {
					yPercent: 0,
					opacity: 1,
					display: "inline-block",
				})
			} catch (e) {
				console.error("Error creating SplitText during close:", e)
			}
		}

		// Handle character animations
		const chars = refs.splitRef.current?.chars
		if (chars && chars.length > 0) {
			// Find any active character timelines and reverse them
			const activeCharTimeline = refs.activeTimelines.current.find(
				(tl) => tl.isActive() && tl.data === "charAnimation"
			)

			if (activeCharTimeline) {
				// If we have an active character timeline, reverse it
				activeCharTimeline.reverse()
			} else {
				// Otherwise, create a new closing animation from current position
				const currentPos = Number(gsap.getProperty(chars[0], "yPercent") || 0)

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
				refs.hasAnimatedRef.current = false
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
	const footerTimelines = refs.activeTimelines.current.filter(
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
	const overlayTimelines = refs.activeTimelines.current.filter(
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
			refs.overlayRef.current,
			{
				opacity: 0,
				duration: 0.4,
				ease: "power2.inOut",
			},
			0.1
		)
	}
}

/**
 * Handles animation cleanup with preference for reversing
 */
export const cleanupNavAnimations = (refs: NavAnimationRefs) => {
	// Reverse or kill active timelines
	if (refs.activeTimelines.current.length > 0) {
		refs.activeTimelines.current.forEach((tl) => {
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
	const navBody = refs.navBodyRef.current
	if (navBody) gsap.killTweensOf(navBody)
}

/**
 * Handles link click animation and navigation
 */
export const handleNavLinkClick = async (
	e: React.MouseEvent,
	href: string,
	refs: NavAnimationRefs,
	setIsNavigating: (value: boolean) => void,
	setIsOpen: (value: boolean) => void,
	router: ReturnType<typeof import("next/navigation").useRouter>
) => {
	e.preventDefault()
	setIsNavigating(true)

	try {
		// Find any active character timelines and reverse them first
		const charTimelines = refs.activeTimelines.current.filter(
			(tl) => tl.isActive() && tl.data === "charAnimation"
		)

		if (charTimelines.length > 0) {
			// If we have active character timelines, reverse them
			charTimelines.forEach((tl) => tl.reverse())
		}

		// If no split text is available, just do the transition
		if (
			!refs.splitRef.current ||
			!refs.splitRef.current.chars ||
			!refs.splitRef.current.chars.length
		) {
			router.push(href)
			setIsOpen(false)
			return
		}

		// Create a timeline for the transition animation
		const tl = gsap.timeline({
			onComplete: () => {
				// Remove from active timelines when complete
				const index = refs.activeTimelines.current.indexOf(tl)
				if (index !== -1) {
					refs.activeTimelines.current.splice(index, 1)
				}
			},
		})

		// Add to active timelines
		refs.activeTimelines.current.push(tl)

		// Get current character position
		const chars = refs.splitRef.current.chars
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
		const overlayTimelines = refs.activeTimelines.current.filter(
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
				refs.overlayRef.current,
				{ opacity: 0, duration: 0.4, ease: "power2.inOut" },
				"-=0.3" // Overlap slightly with text animation
			)
		}

		tl.to(
			refs.navBodyRef.current,
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

/**
 * Handles mouse enter animation for navigation items
 */
export const handleNavItemMouseEnter = (
	index: number,
	imageContainerRef: React.RefObject<HTMLDivElement>,
	isNavigating: boolean,
	setHoveredIndex: (index: number | null) => void,
	setActiveIndex: (index: number | null) => void,
	isDesktop: () => boolean
) => {
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
}

/**
 * Handles mouse leave animation for navigation items
 */
export const handleNavItemMouseLeave = (
	imageContainerRef: React.RefObject<HTMLDivElement>,
	isNavigating: boolean,
	setHoveredIndex: (index: number | null) => void,
	setActiveIndex: (index: number | null) => void,
	isDesktop: () => boolean
) => {
	if (!isDesktop() || isNavigating || !imageContainerRef.current) return
	setHoveredIndex(null)

	gsap.killTweensOf(imageContainerRef.current)
	gsap.to(imageContainerRef.current, {
		opacity: 0,
		scale: 1,
		duration: 0.5,
		ease: "power1.out",
		onComplete: () => {
			if (imageContainerRef.current) {
				gsap.set(imageContainerRef.current, { display: "none" })
			}
			setActiveIndex(null)
		},
	})
}
