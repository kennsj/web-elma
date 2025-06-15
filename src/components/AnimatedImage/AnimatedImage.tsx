"use client"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import Image from "next/image"
import { useRef } from "react"

export default function AnimatedImage({
	width,
	height,
	fill,
	src,
	alt,
}: {
	width?: number
	height?: number
	fill?: boolean
	src: string
	alt: string
}) {
	const imgRef = useRef<HTMLImageElement>(null)

	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger)
		gsap.to(imgRef.current, {
			ease: "power4.out",
			delay: 0.1,
			// yPercent: 10,
			// opacity: 0,
			scale: 1.1,
			// skewY: 2,
			duration: 2.4,
			scrollTrigger: {
				trigger: imgRef.current,
				start: "top 90%",
				// end: "top -=100",
				markers: true,
				// scrub: true,
			},
		})
	}, [imgRef])

	return (
		<Image
			ref={imgRef}
			src={src}
			alt={alt}
			width={width}
			height={height}
			fill={fill}
		/>
	)
}
