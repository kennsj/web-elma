// "use client"

import styles from "./Footer.module.scss"
import Image from "next/image"
import Link from "next/link"
import Anchor from "@/components/Buttons/Anchor"
import Newsletter from "../../Forms/Newsletter"

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
								src='/images/elma-logo-white.svg'
								alt='ELMA Logo'
								width={150}
								height={150}
							/>
						</Link>
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
						<a
							href='mailto:kennethsjorgensen@gmail.com'
							target='_blank'
							rel='noreferrer'
						>
							Kenneth <br />
							<span>Jørgensen</span>
						</a>
					</div>
				</div>
			</section>
		</footer>
	)
}
