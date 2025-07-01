"use client"
import Image from "next/image"

import styles from "./Header.module.scss"
import "@/styles/globals.scss"
import CTA from "@/components/Buttons/Primary"

import Anchor from "@/components/Buttons/Anchor"

export const Header = () => {
	return (
		<>
			<header className={styles.header}>
				<div className={styles.header__container}>
					<div className={styles.header__content}>
						<div className={styles.header__title}>
							<h1>
								For deg som vil leve, <br />
								ikke bare overleve
							</h1>

							<CTA href='/historier' fontSize='2rem' isDarkBackground>
								Start din reise
							</CTA>
						</div>

						<Image
							className={styles.header__image}
							src={"/man-mountain-alone.jpg"}
							alt={"Mountain"}
							width={1000}
							height={1000}
							priority
						/>
					</div>
					<div className={styles.header__intro}>
						<p>
							Elma ble startet av Anders, som selv har levd med angst i store
							deler av livet. Gjennom elma ønsker han å skape et trygt rom for
							deling, forståelse og støtte&mdash;slik at ingen skal måtte stå
							alene med sin psykiske helse.
						</p>

						<Anchor href='/historier' isDarkBackground>
							Les andres historier
						</Anchor>
					</div>
				</div>
			</header>
			<WaveSeperator />
		</>
	)
}
