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
import { ScrollTrigger } from "gsap/ScrollTrigger"

export const Nav = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [navScrollY, setNavScrollY] = useState(0)
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
				duration: 0.5,
				delay: 0.5,
				setOptions: { opacity: 0, visibility: "hidden" },
			})
		}

		const showAnim = gsap
			.from(navRef.current, { yPercent: -100, paused: true, duration: 0.4 })
			.progress(1)

		ScrollTrigger.create({
			start: "top top",
			end: "max",
			onUpdate: (self) => {
				if (self.direction === -1) {
					showAnim.play()
				} else {
					showAnim.reverse()
				}
			},
		})
	}, [isOpen, navScrollY])

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
