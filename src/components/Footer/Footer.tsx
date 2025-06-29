"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import styles from "./Footer.module.scss"
import Image from "next/image"
import Link from "next/link"
import Anchor from "../Anchor/Anchor"

export default function Footer() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const tl = useRef<gsap.core.Timeline | null>(null)

	gsap.registerPlugin(ScrollTrigger)

	useGSAP(() => {
		tl.current = gsap.timeline({
			scrollTrigger: {
				trigger: sectionRef.current,
				start: "top 80%",
				end: "bottom 30%",
				toggleActions: "play none none reverse",
			},
		})

		tl.current
			.from(".headline", {
				y: 40,
				opacity: 0,
				duration: 0.8,
				ease: "power2.out",
			})
			.from(
				".paragraph",
				{ y: 20, opacity: 0, duration: 0.6, stagger: 0.2 },
				"-=0.4"
			)
			.from(
				".value",
				{ y: 20, opacity: 0, duration: 0.5, stagger: 0.1 },
				"-=0.5"
			)
			.from(
				".cta-button",
				{ scale: 0.9, opacity: 0, duration: 0.4, ease: "back.out(1.7)" },
				"-=0.4"
			)
	}, [])

	return (
		<footer className={styles.footer}>
			<section ref={sectionRef}>
				<div className={styles.newsletter}>
					<h2>
						Få et lite pust <br />i innboksen
					</h2>
					<p className='intro__paragraph'>
						Vi sender deg korte, ekte og ærlige oppdateringer fra
						ELMA-universet. Du får høre om nye videoer, foredrag, historier - og
						kanskje noe som treffer akkurat deg.
					</p>

					<form
						action='https://elma.us21.list-manage.com/subscribe/post?u=0c8f1b2d3e4f5a6b7c8d9e0f1&amp;id=2a3b4c5d6e'
						method='post'
						target='_blank'
						noValidate
						className={styles.newsletter__form}
					>
						<input
							type='email'
							name='EMAIL'
							placeholder='Din epost'
							required
							aria-label='Din e-postadresse'
							className={styles.newsletter__input}
						/>
						<button
							type='submit'
							className={styles.newsletter__button}
							aria-label='Meld deg på nyhetsbrev'
						>
							<Anchor href='#'>Meld deg på</Anchor>
						</button>
					</form>
				</div>
				<hr />
				<div className={styles.footer__content}>
					<div className={styles.footer__content__logo}>
						<Image
							src='/images/elma-logo-white.svg'
							alt='ELMA Logo'
							width={150}
							height={150}
						/>
					</div>
					<div className={styles.footer__content__nav}>
						<ul>
							<li>
								<Link href='/start'>Start din reise</Link>
							</li>
							<li>
								<Link href='/historier'>Historier</Link>
							</li>
							<li>
								<Link href='/foredrag'>Foredrag</Link>
							</li>
							<li>
								<Link href='/hjelp'>Trenger du hjelp?</Link>
							</li>
							<li>
								<Link href='/om'>Om elma</Link>
							</li>
							<li>
								<Link href='/stotte'>Bli en støttespiller?</Link>
							</li>
						</ul>
					</div>
					<div className={styles.footer__content__contact}>
						<h3 className='headline'>Kontakt</h3>
						<Link href='mailto:hei@elma.no'>hei@elma.no</Link>
						<Link href='#'>Booking av elma</Link>
					</div>
				</div>
				<hr />
				<div className={styles.footer__bottom}>
					<div>
						<p>© {new Date().getFullYear()} ELMA &mdash; Laget med omtanke</p>
						<Link href='/personvern'>Personvern og vilkår</Link>
					</div>
					<div className={styles.footer__bottom__right}>
						Design og kode
						<Link
							href='mailto:kennethsjorgensen@gmail.com'
							target='_blank'
							rel='noreferrer'
						>
							Kenneth <br />
							<span>Jørgensen</span>
						</Link>
					</div>
				</div>
			</section>
		</footer>
	)
}
