"use client"

import React, { useRef, useLayoutEffect } from "react"
import styles from "./Text.module.scss"
import { useTextReveal } from "./useTextReveal"

type Props = {
	className?: string
	title: string
	subTitle: string | React.ReactNode
	introduction?: string | React.ReactNode
	children?: string | React.ReactNode
	dataTheme?: string
	animateBy?: "line" | "paragraph"
}

const TextNarrow = ({
	title,
	subTitle,
	introduction,
	children,
	dataTheme,
	animateBy = "line",
}: Props) => {
	const subTitleRef = useRef<HTMLParagraphElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const { addTarget, cleanup } = useTextReveal({ animateBy })

	useLayoutEffect(() => {
		const initAnimations = async () => {
			if (subTitleRef.current) await addTarget(subTitleRef.current)
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
		<div className={styles.content}>
			<h4 className={styles.title} data-theme={dataTheme}>
				{title}
			</h4>
			<div className={styles.content__container}>
				<div className={styles.lead__container}>
					<h3 className={styles.subTitle} data-theme={dataTheme}>
						{subTitle}
					</h3>
				</div>
				<div
					ref={contentRef}
					data-theme={dataTheme}
					className={styles.body__content}
				>
					{introduction && (
						<p className={styles.introduction} data-theme={dataTheme}>
							{introduction}
						</p>
					)}
					{typeof children === "string" ? <p>{children}</p> : children}
				</div>
			</div>
		</div>
	)
}

export default TextNarrow
