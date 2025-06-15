"use client"

import Image from "next/image"

export default function WaveSeperator() {
	return (
		<Image
			src={"/images/wave-seperator.svg"}
			alt={"Wave Seperator"}
			width={1920}
			height={100}
			className='w-full'
			style={{
				marginTop: "-1px",
				transform: "translateZ(0)", // for better performance
				backfaceVisibility: "hidden", // prevents flickering
				willChange: "transform", // hints browser about animation
				position: "relative", // ensures proper stacking
			}}
			draggable={false} // prevents unwanted drag behavior
			priority
		/>
	)
}
