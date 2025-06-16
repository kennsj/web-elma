import React from "react"
import Wave from "./Wave"

export default function Waves() {
	return (
		<div
			style={{
				position: "relative",
				height: "200px",
				width: "100%",
				overflow: "hidden",
			}}
		>
			{/* Back wave */}
			<Wave color='#12332F' speed={4} amplitude={20} offset={0} zIndex={1} />

			{/* Middle wave */}
			<Wave color='#225650' speed={6} amplitude={25} offset={900} zIndex={2} />

			{/* Front wave */}
			<Wave color='#37746D' speed={8} amplitude={30} offset={500} zIndex={3} />
		</div>
	)
}
