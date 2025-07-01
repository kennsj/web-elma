import styles from "./Buttons.module.scss"

type ButtonProps = {
	type: "button" | "submit" | "reset"
	ariaLabel?: string
	children: React.ReactNode
	fontSize?: string
	isDarkBackground?: boolean
	ref?: React.Ref<HTMLButtonElement>
}

export default function Button({
	type,
	ariaLabel,
	children,
	fontSize = "1rem",
	isDarkBackground = false,
	ref,
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			className={styles.button}
			aria-label={ariaLabel}
			{...props}
			data-dark-background={isDarkBackground}
			style={{
				fontSize,
			}}
			ref={ref}
		>
			<div className={styles.wave}></div>
			<div>{children}</div>
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
					stroke={isDarkBackground ? "#0b2621" : "#e2fbf8"}
					strokeWidth='1'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					className={styles.line}
					d='M21 6.5H1'
					stroke={isDarkBackground ? "#0b2621" : "#e2fbf8"}
					strokeWidth='1'
					strokeLinecap='round'
				/>
			</svg>
		</button>
	)
}
