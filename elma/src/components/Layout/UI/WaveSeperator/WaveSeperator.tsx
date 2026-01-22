"use client"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import styles from "./WaveSeperator.module.scss"

export default function WaveSeperator({
	isDarkBackground = true,
	rotate = false,
}: {
	isDarkBackground?: boolean
	rotate?: boolean
}) {
	// Use fixed wave parameters for consistent SSR/CSR rendering
	const waveParams = [
		{ x: 45, y: 0, opacity: 0.8, waveType: 1 },
		{ x: 50, y: 3, opacity: 0.85, waveType: 2 },
		{ x: 55, y: 5, opacity: 0.9, waveType: 1 },
		{ x: 60, y: 7.5, opacity: 1, waveType: 2 },
	]

	const svgRef = useRef<SVGSVGElement>(null)

	useGSAP(
		() => {
			if (!svgRef.current) return
			const uses = svgRef.current.querySelectorAll("use")
			uses.forEach((el, i) => {
				// Front waves (lower index) move faster, back waves slower
				const baseDuration = 8 // overall speed up
				const duration = baseDuration + i * 3.5 // front wave fastest
				gsap.fromTo(
					el,
					{ x: waveParams[i].x - 20 },
					{
						x: waveParams[i].x + 20,
						duration,
						repeat: -1,
						yoyo: true,
						ease: "power1.inOut",
					},
				)
			})
		},
		{ scope: svgRef },
	)

	return (
		<div
			className={styles.waveContainer}
			style={{
				transform: rotate ? "rotate(180deg)" : "none",
			}}
		>
			<svg
				ref={svgRef}
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
												: // : "#ddddda"
													"#e2fbf8"
									: index === 0
										? // ? "#ddddda"
											"#e2fbf8"
										: index === 1
											? "#37746D"
											: index === 2
												? "#225650"
												: "#12332F"
							}
							opacity={wave.opacity}
						/>
					))}
				</g>
			</svg>
		</div>
	)
}
