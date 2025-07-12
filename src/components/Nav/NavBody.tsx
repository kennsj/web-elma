"use client"

import React, { useRef, useState } from "react"
import styles from "./NavBody.module.scss"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import SplitText from "gsap/SplitText"
import { useGSAP } from "@gsap/react"

import { slideIn, slideOut } from "@/components/lib/animations/slide"
import Anchor from "../Buttons/Anchor"

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
}

const NavBody: React.FC<Props> = ({ navItems, isOpen }) => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null)
	const navBodyRef = useRef<HTMLDivElement>(null)
	const imageContainerRef = useRef<HTMLDivElement>(null)
	const linksRef = useRef<HTMLUListElement>(null)

	const splitRef = useRef<SplitText | null>(null)
	const hasAnimatedRef = useRef(false)

	useGSAP(() => {
		const navBody = navBodyRef.current
		const links = linksRef.current
		const imageContainer = imageContainerRef.current
		if (!navBody || !links || !imageContainer) return

		gsap.killTweensOf([links, ".char", imageContainer])

		if (isOpen) {
			slideIn(navBody, { direction: "top", duration: 0.7, delay: 0.2 })
			gsap.set(links, { opacity: 1 })

			// 👇 FIX: reset hidden image container
			gsap.set(imageContainer, { display: "block", opacity: 0 })

			if (!hasAnimatedRef.current) {
				splitRef.current?.revert()
				splitRef.current = new SplitText(links, {
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
		}
	}, [isOpen])

	const handleMouseEnter = (index: number) => {
		if (activeIndex === index) return
		setActiveIndex(index)

		const imageContainer = imageContainerRef.current
		if (!imageContainer) return

		gsap.killTweensOf(imageContainer)
		gsap.to(imageContainer, {
			opacity: 1,
			scale: 1,
			duration: 0.6,
			ease: "power2.out",
		})
	}

	const handleMouseLeave = () => {
		const imageContainer = imageContainerRef.current
		if (!imageContainer) return

		gsap.killTweensOf(imageContainer)
		gsap.to(imageContainer, {
			opacity: 0,
			scale: 0.95,
			duration: 0.4,
			ease: "power1.out",
			onComplete: () => {
				setActiveIndex(null) // let React hide the <Image>
			},
		})
	}

	return (
		<div className={styles.nav_body__container} ref={navBodyRef}>
			<div className={styles.nav_body__top}>
				<div className={styles.nav_body__content}>
					<div className={styles.nav_body__links}>
						<ul ref={linksRef}>
							{navItems.map((item, index) => (
								<li
									key={index}
									onMouseEnter={() => handleMouseEnter(index)}
									onMouseLeave={handleMouseLeave}
								>
									<Link href={item.href}>
										<span>{item.label}</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className={styles.nav_body__image} ref={imageContainerRef}>
						{activeIndex !== null && (
							<Image
								key={navItems[activeIndex].imgSrc} // 🔑 important!
								src={navItems[activeIndex].imgSrc}
								alt='preview'
								fill
								style={{ objectFit: "cover", pointerEvents: "none" }}
							/>
						)}
					</div>
				</div>
				<div className={styles.nav_body__footer}>
					<div>
						<h3>Kontakt</h3>
						<Link className={styles.footer__email} href='mailto:hei@elma.no'>
							hei@elma.no
						</Link>
						<Anchor isDarkBackground href='#'>
							Booking av elma
						</Anchor>
					</div>
				</div>
				<div>
					<Anchor isDarkBackground href='/om'>
						Personvern og vilkår
					</Anchor>
				</div>
			</div>
		</div>
	)
}

export default NavBody
