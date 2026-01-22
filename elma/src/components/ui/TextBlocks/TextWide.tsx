"use client"

import { useRef, useLayoutEffect } from "react"
import styles from "./Text.module.scss"
// import HeadingAnimation from "@/components/Layout/UI/Animations/HeadingAnimation"
import { useTextReveal } from "./useTextReveal"

type Props = {
	title?: string
	children: string | React.ReactNode
	className?: string
	dataTheme?: "light" | "dark"
	animateBy?: "line" | "paragraph"
}

const TextWide = ({
	children,
	title,
	dataTheme = "dark",
	animateBy = "line",
}: Props) => {
	const contentRef = useRef<HTMLDivElement>(null)
	const { addTarget, cleanup } = useTextReveal({ animateBy })

	useLayoutEffect(() => {
		const initAnimations = async () => {
			if (contentRef.current) {
				const elements = Array.from(
					contentRef.current.querySelectorAll(
						"p, li, h1, h2, h3, h4, h5, h6, span",
					),
				)
				for (const el of elements) {
					await addTarget(el as HTMLElement)
				}
			}
		}

		initAnimations()

		return cleanup
	}, [addTarget, cleanup])

	return (
		<div className={`${styles.content} ${styles.wide}`} data-color={dataTheme}>
			<h4 className={styles.title} data-theme={dataTheme}>
				{title}
			</h4>
			<div ref={contentRef}>
				{typeof children === "string" ? (
					<p className={styles.introduction}>{children}</p>
				) : (
					children
				)}
			</div>
		</div>
	)
}

export default TextWide
