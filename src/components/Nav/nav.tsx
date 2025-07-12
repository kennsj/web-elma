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

// type NavItem = {
// 	href: string
// 	label: string
// 	imgSrc: string
// 	index: number
// }

export const Nav = () => {
	const [isOpen, setIsOpen] = useState(false)

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

	// Preload images for navItems

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
				delay: 0.6,
				setOptions: { opacity: 0, visibility: "hidden" },
			})
		}
	}, [isOpen])

	return (
		<>
			<nav className={styles.nav}>
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
				<div>
					<ul className={styles.nav__list}>
						<div>
							<li>
								<Link href='/' className=''>
									Hjem
								</Link>
							</li>
							<li>
								<Link href='/about' className=''>
									Om elma
								</Link>
							</li>
							<li>
								<Link href='/resources' className={styles.nav__link}>
									Ressurser
								</Link>
							</li>
							<li>
								<Link href='/events' className=''>
									Arrangementer
								</Link>
							</li>
							<li>
								<Link href='/contact' className=''>
									Kontakt
								</Link>
							</li>
						</div>
					</ul>
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
			</nav>
			{/* <NavBody navItems={navItems} /> */}
			<div ref={overlayRef} className={styles.nav__overlay}></div>
			<NavBody
				navItems={navItems}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				overlayRef={overlayRef}
			/>
		</>
	)
}
