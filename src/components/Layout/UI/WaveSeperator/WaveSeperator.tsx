import styles from "./WaveSeperator.module.scss"

export default function WaveCss({
	isDarkBackground = true,
	rotate = false,
}: {
	isDarkBackground?: boolean
	rotate?: boolean
}) {
	return (
		<div
			className={styles.waveContainer}
			style={{ transform: rotate ? "rotate(180deg)" : "none" }}
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
					<path
						id='gentle-wave'
						d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z'
					/>
				</defs>
				<g className={styles.parallax}>
					<use
						xlinkHref='#gentle-wave'
						x='48'
						y='0'
						fill={isDarkBackground ? "#12332F" : "#E2FBF8"}
					/>
					<use
						xlinkHref='#gentle-wave'
						x='48'
						y='3'
						fill={isDarkBackground ? "#225650" : "#37746D"}
					/>
					<use
						xlinkHref='#gentle-wave'
						x='48'
						y='5'
						fill={isDarkBackground ? "#37746D" : "#225650"}
					/>
					<use
						xlinkHref='#gentle-wave'
						x='48'
						y='7'
						fill={isDarkBackground ? "#E2FBF8" : "#12332F"}
					/>
				</g>
			</svg>
		</div>
	)
}
