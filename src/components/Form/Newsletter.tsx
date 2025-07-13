import React from "react"
import Paragraph from "../lib/animations/Paragraph"
import Button from "../Buttons/Secondary"
import H2 from "../lib/animations/H2"

const Newsletter = () => {
	return (
		<div className={styles.newsletter}>
			<H2 title='Få et lite pust i innboksen' />

			<Paragraph className='intro__paragraph'>
				Vi sender deg korte, ekte og ærlige oppdateringer fra ELMA-universet. Du
				får høre om nye videoer, foredrag, historier - og kanskje noe som
				treffer akkurat deg.
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
	)
}

export default Newsletter
