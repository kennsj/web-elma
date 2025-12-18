"use client"
import { useState, useEffect } from "react"
import styles from "./WaveSeperator.module.scss"

export default function WaveSeperator({
	isDarkBackground = true,
	rotate = false,
}: {
	isDarkBackground?: boolean
	rotate?: boolean
}) {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	// Generate random wave parameters on each render (client-side only)
	const random = (min: number, max: number) => Math.random() * (max - min) + min

	const waveParams = isMounted
		? [
				{
					x: random(30, 60),
					y: random(-1, 1),
					duration: random(40, 55),
					delay: random(-3, 0),
					opacity: random(0.7, 0.95),
					waveType: 1,
				},
				{
					x: random(35, 65),
					y: random(2, 4),
					duration: random(55, 75),
					delay: random(-4, -1),
					opacity: random(0.75, 1),
					waveType: 2,
				},
				{
					x: random(40, 70),
					y: random(4, 6),
					duration: random(70, 95),
					delay: random(-6, -2),
					opacity: random(0.8, 1),
					waveType: 1,
				},
				{
					x: random(45, 75),
					y: random(6, 9),
					duration: random(95, 130),
					delay: random(-8, -3),
					opacity: 1,
					waveType: 2,
				},
			]
		: [
				{ x: 45, y: 0, duration: 47, delay: -1.5, opacity: 0.8, waveType: 1 },
				{ x: 50, y: 3, duration: 65, delay: -2.5, opacity: 0.85, waveType: 2 },
				{ x: 55, y: 5, duration: 82, delay: -4, opacity: 0.9, waveType: 1 },
				{ x: 60, y: 7.5, duration: 112, delay: -5.5, opacity: 1, waveType: 2 },
			]

	return (
		<div
			className={styles.waveContainer}
			style={{
				transform: rotate ? "rotate(180deg)" : "none",
			}}
		>
			<svg
				className={styles.waves}
				xmlns='http://www.w3.org/2000/svg'
				xmlnsXlink='http://www.w3.org/1999/xlink'
				viewBox='0 24 150 28'
				preserveAspectRatio='none'
				shapeRendering='auto'
			>
				<defs>
					{/* Softer, wider wave */}
					<path
						id='wave-1'
						d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z'
					/>
					{/* Tighter, more frequent wave */}
					<path
						id='wave-2'
						d='M-160 44c25 0 45-22 70-22s 45 22 70 22 45-22 70-22 45 22 70 22 45-22 70-22 45 22 70 22 v44h-420z'
					/>
				</defs>
				<g className={styles.parallax}>
					{waveParams.map((wave, index) => (
						<use
							key={index}
							xlinkHref={`#wave-${wave.waveType}`}
							x={wave.x}
							y={wave.y}
							fill={
								isDarkBackground
									? index === 0
										? "#12332F"
										: index === 1
											? "#225650"
											: index === 2
												? "#37746D"
												: "#E2FBF8"
									: index === 0
										? "#E2FBF8"
										: index === 1
											? "#37746D"
											: index === 2
												? "#225650"
												: "#12332F"
							}
							opacity={wave.opacity}
							style={{
								animationDuration: `${wave.duration}s`,
								animationDelay: `${wave.delay}s`,
							}}
						/>
					))}
				</g>
			</svg>
		</div>
	)
}
