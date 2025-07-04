// "use client"
// import gsap from "gsap"
// import { useGSAP } from "@gsap/react"
// import { useRef } from "react"

import Image from "next/image"
import styles from "./Nav.module.scss"
import Link from "next/link"

export const Nav = () => {
	return (
		<nav className={styles.nav}>
			<div>
				<Link href='/'>
					<Image
						src='/images/elma-logo-white.svg'
						alt='elma logo'
						width={150}
						height={150}
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
					<div className={styles.nav__hamburger}></div>
				</ul>
			</div>
		</nav>
	)
}
