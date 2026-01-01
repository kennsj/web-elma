import Anchor from "@/components/Buttons/Anchor"
import styles from "./Card.module.scss"

type HelpCardProps = {
	title: string
	phone: string
	description: string
	href: string
	linkText?: string
}

const HelpCard = ({
	title,
	phone,
	description,
	href,
	linkText,
}: HelpCardProps) => {
	return (
		<div className={styles.help__card}>
			<h3>{title}</h3>
			<p>
				Tlf: <a href={`tel:${phone}`}>{phone}</a>
			</p>
			<p>{description}</p>
			<Anchor isDarkBackground href={href}>
				{linkText || href}
			</Anchor>
		</div>
	)
}

export default HelpCard
