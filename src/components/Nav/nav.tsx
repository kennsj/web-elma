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
						<a href='#' className=''>
							Hjem
						</a>
					</li>
					<li>
						<a href='#' className=''>
							Om elma
						</a>
					</li>
					<li>
						<a href='#' className=''>
							Ressurser
						</a>
					</li>
					<li>
						<a href='#' className=''>
							Arrangementer
						</a>
					</li>
					<li>
						<a href='#' className=''>
							Kontakt
						</a>
					</li>
				</ul>
			</div>
		</nav>
	)
}
