// "use client"

import styles from "./Footer.module.scss"
import Image from "next/image"
import Link from "next/link"
import Anchor from "@/components/Buttons/Anchor"
import Newsletter from "../../Forms/Newsletter"
import { TransitionLink } from "@/components/lib/animations/PageTransition"
import { NAV_LINKS } from "@/components/lib/links/links"

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<Newsletter />
			<section>
				<hr />
				<div className={styles.footer__content}>
					<div className={styles.footer__content__logo}>
						<Link href='/'>
							<Image
								src='/images/logo-elma.svg'
								alt='ELMA Logo'
								width={50}
								height={50}
							/>
						</Link>
					</div>
					<div className={styles.footer__content__nav}>
						<ul>
							{NAV_LINKS.map((link) => (
								<li key={link.href}>
									<Anchor isDarkBackground href={link.href}>
										{link.label}
									</Anchor>
								</li>
							))}
						</ul>
					</div>
					<div className={styles.footer__content__contact}>
						<h3>Kontakt</h3>
						<TransitionLink
							className={styles.footer__email}
							// Replace
							href='mailto:hei@elma.no'
						>
							hei@elma.no
						</TransitionLink>
						{/*  */}
						{/* <Anchor
							className={styles.footer__booking}
							isDarkBackground
							href='#'
						>
							Booking av elma
						</Anchor> */}
					</div>
				</div>
				<hr />
				<div className={styles.footer__bottom}>
					<div className={styles.footer__bottom__left}>
						<p>Laget med omtanke</p>
						<Anchor isDarkBackground href='/personvern'>
							Personvern og vilkår
						</Anchor>
					</div>
					<div className={styles.footer__bottom__right}>
						<p>Design og utvikling</p>
						<a
							href='mailto:kennethsjorgensen@gmail.com title=Kenneth Jørgensen'
							target='_blank'
							rel='noreferrer'
						>
							Kenneth <span>Jørgensen</span>
						</a>
					</div>
				</div>
			</section>
		</footer>
	)
}
