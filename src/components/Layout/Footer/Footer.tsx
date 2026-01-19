// "use client"

import styles from "./Footer.module.scss"
import Image from "next/image"
import Link from "next/link"
import Anchor from "@/components/Buttons/Anchor"
import Newsletter from "../../Forms/Newsletter"
import { TransitionLink } from "@/components/lib/animations/PageTransition"
import { NAV_LINKS } from "@/components/lib/links/links"
import { TextNarrow } from "@/components/ui/TextBlocks"

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<section className='section__content'>
				{/* <Newsletter />
				<hr /> */}
				<TextNarrow
					dataTheme='dark'
					title='Fotnote'
					subTitle='Noen av bildene på denne nettsiden er generert med hjelp av kunstig intelligens (KI)'
				>
					<p>
						Dette er et bevisst valg i en tidlig fase mens vi jobber for å kunne
						løfte frem ekte mennesker og historier på sikt. Ingen mennesker er
						KI-generert, og ingen bilder hvor Anders står frem i bilder er
						KI-generert.¨
					</p>
				</TextNarrow>

				<div>
					<hr />
					<div className={styles.footer__content}>
						<div className={styles.footer__content__logo}>
							<Link href='/'>
								<Image
									src='/images/logo-elma.svg'
									alt='ELMA Logo'
									width={40}
									height={40}
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
							<p>© ELMA 2026. Laget med omtanke.</p>
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
								Kenneth <br />
								<span>Jørgensen</span>
							</a>
						</div>
					</div>
				</div>
			</section>
		</footer>
	)
}
