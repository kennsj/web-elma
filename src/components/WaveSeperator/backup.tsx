import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"

gsap.registerPlugin(MorphSVGPlugin)

const wavePaths = [
	"M0,160 C480,280 960,40 1440,160 L1440,320 L0,320 Z",
	"M0,140 C480,260 960,60 1440,140 L1440,320 L0,320 Z",
]

export default function Wave() {
	const waveRefs = useRef<(SVGPathElement | null)[]>([])

	useEffect(() => {
		waveRefs.current.forEach((wave, i) => {
			const tl = gsap.timeline({
				repeat: -1,
				yoyo: true,
				defaults: { duration: 4 + i, ease: "sine.inOut" },
			})

			tl.to(wave, { morphSVG: wavePaths[1] }).to(wave, {
				morphSVG: wavePaths[0],
			})
		})
	}, [])

	return (
		<div style={{ position: "relative", height: "320px", overflow: "hidden" }}>
			<svg
				viewBox='0 0 1440 320'
				preserveAspectRatio='none'
				style={{
					width: "100%",
					height: "100%",
					position: "absolute",
					bottom: 0,
					transform: "rotate(180deg)",
				}}
			>
				<path
					ref={(el) => {
						waveRefs.current[0] = el
					}}
					d={wavePaths[0]}
					fill='#7A9A89'
					opacity={0.3}
					style={{ transform: `translateY(0px)` }}
				/>
				<path
					ref={(el) => {
						waveRefs.current[1] = el
					}}
					d={wavePaths[0]}
					fill='#4A6B5F'
					opacity={0.5}
					style={{ transform: `translateY(20px)` }}
				/>

				<path
					ref={(el) => {
						waveRefs.current[2] = el
					}}
					d={wavePaths[0]}
					fill='#12332F'
					opacity={1}
					style={{ transform: `translateY(30px)` }}
				/>
			</svg>
		</div>
	)
}
