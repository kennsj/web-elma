import styles from "./Anchor.module.scss"
import Link from "next/link"

type LinkProps = {
	href: string
	children: React.ReactNode
	isDarkBackground?: boolean
	ref?: React.Ref<HTMLAnchorElement>
	className?: string
	onClick?: () => void
}

export default function Anchor({
	href,
	children,
	isDarkBackground = false,
	className,
	ref,
	...props
}: LinkProps) {
	return (
		<Link
			href={href}
			className={styles.anchor + (className ? ` ${className}` : "")}
			{...props}
			data-dark-background={isDarkBackground}
			ref={ref}
		>
			{/* <div className={styles.wave}></div> */}
			{children}
			<svg
				width='24'
				height='13'
				viewBox='0 0 24 13'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					className={styles.tip}
					d='M17.5 1L23 6.5L17.5 12'
					// stroke={isDarkBackground ? "#e2fbf8" : "#0b2621"}
					strokeWidth='1'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					className={styles.line}
					d='M21 6.5H1'
					// stroke={isDarkBackground ? "#e2fbf8" : "#0b2621"}
					strokeWidth='1'
					strokeLinecap='round'
				/>
			</svg>
		</Link>
	)
}
