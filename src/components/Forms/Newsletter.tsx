import Button from "@/components/Buttons/Secondary"
import styles from "./Newsletter.module.scss"
import { TextWide } from "../ui/TextBlocks"

const Newsletter = () => {
	return (
		<div className={styles.newsletter__wrapper}>
			<TextWide title='Meld deg på vårt nyhetsbrev' color='light'>
				Hold deg oppdatert på kommende foredrag, arrangementer og nyheter fra
				ELMA.
			</TextWide>

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
	)
}

export default Newsletter
