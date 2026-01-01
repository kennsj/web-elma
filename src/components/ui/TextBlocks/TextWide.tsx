import Paragraph from "@/components/Layout/UI/Animations/ParagraphAnimation"
import styles from "./Text.module.scss"
import HeadingAnimation from "@/components/Layout/UI/Animations/HeadingAnimation"

type Props = {
	title?: string
	children: string | React.ReactNode
	className?: string
	color?: "light" | "dark"
}

const TextWide = ({ children, title, color = "dark" }: Props) => {
	return (
		<div className={`${styles.intro} ${styles.wide}`} data-color={color}>
			<HeadingAnimation className={styles.title} level='h3' title={title} />
			<div className={styles.intro__paragraph}>
				<Paragraph>{children}</Paragraph>
			</div>
		</div>
	)
}

export default TextWide
