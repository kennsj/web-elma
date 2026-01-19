import styles from "./Card.module.scss"

type NewCardProps = {
	image?: string
	video?: string
	title?: string
	content?: string | React.ReactNode
	name?: string
	link?: string
	href?: string
}

const NewCard = ({ title, content, link }: NewCardProps) => {
	return (
		<>
			{link ? (
				<a href='#' className={styles.card}>
					<h4 className={styles.card__title}>{title}</h4>
					<div className={styles.card__content}>{content}</div>
				</a>
			) : (
				<div className={styles.card}>
					<h4 className={styles.card__title}>{title}</h4>
					<div className={styles.card__content}>{content}</div>
				</div>
			)}
		</>
	)
}

export default NewCard
