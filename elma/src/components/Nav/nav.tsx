"use client"

import Image from "next/image"
import styles from "./Nav.module.scss"
import Link from "next/link"
import NavBody from "./NavBody"
import { useEffect, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { CustomEase } from "gsap/all"
import { slideIn, slideOut } from "@/components/lib/animations/slide"
import { usePageTransition } from "@/components/lib/animations/PageTransition"
import { NAV_LINKS } from "@/components/lib/links/links"

export const Nav = () => {
	const [isOpen, setIsOpen] = useState(false)
	const navRef = useRef<HTMLDivElement>(null)

	const navItems = NAV_LINKS

	// Preload images when menu opens
	useEffect(() => {
		if (isOpen) {
			const links: HTMLLinkElement[] = []

			navItems.forEach((item) => {
				const img = new window.Image()
				img.src = item.imgSrc

				// Also add preload link for Next.js optimization
				const link = document.createElement("link")
				link.rel = "preload"
				link.as = "image"
				link.href = item.imgSrc
				document.head.appendChild(link)
				links.push(link)
			})

			// Cleanup function to remove preload links
			return () => {
				links.forEach((link) => {
					document.head.removeChild(link)
				})
			}
		}
	})

	gsap.registerPlugin(CustomEase)
	const overlayRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		const overlay = overlayRef.current
		if (!overlay) return

		if (isOpen) {
			slideIn(overlay, {
				setOptions: { opacity: 0.5, visibility: "visible" },
				direction: "top",
				duration: 0.9,
			})
		} else {
			slideOut(overlay, {
				direction: "top",
				duration: 0.7,
				delay: 0.7,
				setOptions: { opacity: 0, visibility: "hidden" },
			})
		}
	}, [isOpen])

	useGSAP(() => {
		const nav = navRef.current
		if (!nav) return

		const handleScroll = () => {
			const footer = document.querySelector("footer")
			if (!footer) return

			const navRect = nav.getBoundingClientRect()
			const footerRect = footer.getBoundingClientRect()

			// If nav bottom is below footer top, hide nav
			if (navRect.bottom > footerRect.top) {
				nav.style.opacity = "0"
				nav.style.translate = "0 -10%"
				nav.style.transition = " 0.3s ease-in-out"
				nav.style.pointerEvents = "none"
			} else {
				nav.style.opacity = "1"
				nav.style.translate = "0 0"
				nav.style.transition = " 0.3s ease-in-out"
				nav.style.pointerEvents = "auto"
			}
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	const { handleTransitionClick } = usePageTransition()

	const handleClick =
		(href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
			handleTransitionClick(href, e)
		}

	return (
		<>
			<nav ref={navRef} className={styles.nav}>
				<div className={styles.nav__wrapper}>
					<div>
						<Link href='/' onClick={handleClick("/")}>
							<Image
								src='/images/logo-elma.svg'
								alt='elma logo'
								width={40}
								height={40}
								sizes='(max-width: 768px) 30px, 120px'
								priority
								onClick={() => setIsOpen(false)}
							/>
						</Link>
					</div>
					<button
						className={styles.nav__hamburger}
						onClick={() => setIsOpen(!isOpen)}
						datatype='hamburger'
						aria-label='Toggle navigation'
						aria-expanded={isOpen}
						aria-controls='nav-menu'
						aria-haspopup='true'
						aria-pressed={isOpen}
						data-menu-open={isOpen}
					></button>
				</div>
			</nav>
			<div
				ref={overlayRef}
				className={styles.nav__overlay}
				onClick={() => setIsOpen(false)}
			></div>
			<NavBody
				navItems={navItems}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				overlayRef={overlayRef}
			/>
		</>
	)
}
