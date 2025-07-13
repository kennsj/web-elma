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
	const splitRef = useRef<SplitText | null>(null)

	const router = useRouter()

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

	useGSAP(() => {
		const navBody = navBodyRef.current
		const links = linksRef.current
		const footer = footerRef.current
		if (!navBody || !links) return

		const textElements = navBody.querySelectorAll(".split-text")
		gsap.killTweensOf([textElements, ".char"])

		if (isOpen) {
			slideIn(navBody, { direction: "top", duration: 0.7, delay: 0.2 })
			gsap.set(links, { opacity: 1 })

			if (!hasAnimatedRef.current) {
				splitRef.current?.revert()
				splitRef.current = new SplitText(textElements, {
					type: "chars",
					charsClass: "char",
				})

				const chars = splitRef.current.chars
				gsap.set(chars, { yPercent: 100 })
				gsap.to(chars, {
					yPercent: 0,
					stagger: 0.01,
					duration: 0.8,
					delay: 0.6,
					ease: "power2.out",
					onComplete: () => {
						hasAnimatedRef.current = true
					},
				})
			}

			gsap.fromTo(
				footer,
				{ y: 40, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.9 }
			)

			setIsNavigating(false)
		} else {
			slideOut(navBody, { direction: "top", delay: 0.4 })

			const chars = splitRef.current?.chars
			if (chars) {
				gsap.to(chars, {
					yPercent: 100,
					duration: 0.4,
					ease: "power1.in",
					onComplete: () => {
						gsap.set(links, { opacity: 0 })
						splitRef.current?.revert()
						splitRef.current = null
						hasAnimatedRef.current = false
					},
				})
			} else {
				gsap.set(links, { opacity: 0 })
				hasAnimatedRef.current = false
			}

			gsap.to(footer, {
				y: 40,
				opacity: 0,
				duration: 0.4,
				ease: "power2.inOut",
			})
		}
	}, [isOpen])

	const handleLinkClick = async (e: React.MouseEvent, href: string) => {
		e.preventDefault()
		if (isNavigating) return
		setIsNavigating(true)

		const tl = gsap.timeline()
		tl.to(
			overlayRef.current,
			{ opacity: 0, duration: 0.4, ease: "power2.inOut" },
			0
		)
		tl.to(
			navBodyRef.current,
			{ y: -50, opacity: 0, duration: 0.4, ease: "expo.out" },
			0
		)
		tl.call(() => router.push(href))

		setIsOpen(false)
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
