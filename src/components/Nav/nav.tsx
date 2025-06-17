import Image from "next/image"
import styles from "./Nav.module.scss"
import Link from "next/link"

export const Nav = () => {
	return (
		<nav className={styles.nav}>
			<div>
				<Link href='/'>
					<Image
						src='/images/elma-logo.svg'
						alt='elma logo'
						width={100}
						height={100}
					/>
				</Link>
			</div>
			<div>
				<ul className={styles.nav__list}>
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
				</ul>
			</div>
		</nav>
	)
}
