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
	className,
}: {
	width?: number
	height?: number
	fill?: boolean
	src: string
	alt: string
	className?: string
}) {
	const imgRef = useRef<HTMLImageElement>(null)

	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger)
		gsap.to(imgRef.current, {
			ease: "power4.out",
			opacity: 1,
			// scale: 1.2,
			duration: 1.8,
			scrollTrigger: {
				trigger: imgRef.current,
				start: "top 80%",
			},
		})
	}, [imgRef])

	return (
		<Image
			ref={imgRef}
			src={src}
			alt={alt}
			className={className}
			width={width}
			height={height}
			fill={fill}
		/>
	)
}
