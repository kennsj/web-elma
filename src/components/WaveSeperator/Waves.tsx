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
			<Wave />
			{/* Middle wave */}
			<Wave />
			{/* Front wave */}
			<Wave />
		</div>
	)
}
