"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import styles from "./Footer.module.scss"
import Image from "next/image"
import Link from "next/link"
import Button from "@/components/Buttons/Secondary"
import Anchor from "@/components/Buttons/Anchor"
import H2 from "@/animations/H2"
import Paragraph from "@/animations/Paragraph"

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
					<H2 title='Få et lite pust i innboksen' />

					<Paragraph className='intro__paragraph'>
						Vi sender deg korte, ekte og ærlige oppdateringer fra
						ELMA-universet. Du får høre om nye videoer, foredrag, historier - og
						kanskje noe som treffer akkurat deg.
					</Paragraph>

					<form
						action='https://elma.us21.list-manage.com/subscribe/post?u=0c8f1b2d3e4f5a6b7c8d9e0f1&amp;id=2a3b4c5d6e'
						method='post'
						target='_blank'
						noValidate
						className={styles.newsletter__form}
					>
						<div>
							<label htmlFor='EMAIL' className={styles.visuallyHidden}>
								Din e-postadresse
							</label>
							<input
								type='email'
								name='EMAIL'
								placeholder='Din epost'
								required
								aria-label='Din e-postadresse'
								className={styles.newsletter__input}
							/>
						</div>

						<Button
							type='submit'
							aria-label='Meld deg på nyhetsbrev'
							isDarkBackground
							// className={styles.newsletter__button}
						>
							Meld deg på
						</Button>
						{/* <Anchor
							href='/'
							type='submit'
							className={styles.newsletter__button}
							aria-label='Meld deg på nyhetsbrev'
						>
							<Link href='#'>Meld deg på</Link>
						</Anchor> */}
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
								<Anchor isDarkBackground href='/start'>
									Start din reise
								</Anchor>
							</li>
							<li>
								<Anchor isDarkBackground href='/historier'>
									Historier
								</Anchor>
							</li>
							<li>
								<Anchor isDarkBackground href='/foredrag'>
									Foredrag
								</Anchor>
							</li>
							<li>
								<Anchor isDarkBackground href='/hjelp'>
									Trenger du hjelp?
								</Anchor>
							</li>
							<li>
								<Anchor isDarkBackground href='/om'>
									Om elma
								</Anchor>
							</li>
						</ul>
					</div>
					<div className={styles.footer__content__contact}>
						<h3>Kontakt</h3>
						<Link className={styles.footer__email} href='mailto:hei@elma.no'>
							hei@elma.no
						</Link>
						<Anchor
							className={styles.footer__booking}
							isDarkBackground
							href='#'
						>
							Booking av elma
						</Anchor>
						{/* <Link href='mailto:hei@elma.no'>hei@elma.no</Link>
						<Link href='#'>Booking av elma</Link> */}
					</div>
				</div>
				<hr />
				<div className={styles.footer__bottom}>
					<div>
						{/* <p>© {new Date().getFullYear()} E.L.M.A.</p> */}
						<p>Laget med omtanke</p>
						<Anchor isDarkBackground href='/personvern'>
							Personvern og vilkår
						</Anchor>
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
