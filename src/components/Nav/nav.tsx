"use client"

import Image from "next/image"
import styles from "./Nav.module.scss"
import Link from "next/link"
import NavBody from "./NavBody"
import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { CustomEase } from "gsap/all"
import { slideIn, slideOut } from "@/components/lib/animations/slide"

export const Nav = () => {
	const [isOpen, setIsOpen] = useState(false)
	const navRef = useRef<HTMLDivElement>(null)

	const navItems = [
		{ href: "/", label: "Hjem", imgSrc: "/images/anders-moloen.png", index: 0 },
		{
			href: "/om",
			label: "Om elma",
			imgSrc: "/images/anders-karlsen-bg.png",
			index: 1,
		},
		{
			href: "/ressurser",
			label: "Ressurser",
			imgSrc: "/images/man-mountain-alone.jpg",
			index: 2,
		},
		{
			href: "/foredrag",
			label: "Foredrag",
			imgSrc: "/images/person-aurora.webp",
			index: 3,
		},
		{
			href: "/kontakt",
			label: "Kontakt",
			imgSrc: "/images/placeholder1.png",
			index: 4,
		},
	]

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

	return (
		<>
			<nav ref={navRef} className={styles.nav}>
				<div className={styles.nav__wrapper}>
					<div>
						<Link href='/'>
							<Image
								src='/images/elma-logo-white.svg'
								alt='elma logo'
								width={150}
								height={150}
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
