"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"
import Image from "next/image"

type ImageRevealProps = {
	src: string
	alt: string
	width?: number
	height?: number
	className?: string
	containerClassName?: string
	priority?: boolean
	fill?: boolean
	sizes?: string
	quality?: number
	triggerOnView?: boolean
	delay?: number
	duration?: number
	parallax?: boolean
}

const ImageReveal: React.FC<ImageRevealProps> = ({
	src,
	alt,
	width,
	height,
	className,
	containerClassName,
	priority = false,
	fill = false,
	sizes,
	quality = 90,
	triggerOnView = true,
	delay = 0,
	duration = 1.2,
	parallax = false,
}) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const imageRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		if (!containerRef.current || !imageRef.current) return

		gsap.registerPlugin(ScrollTrigger)

		// Set initial states
		gsap.set(imageRef.current, { autoAlpha: 0, y: 50 })
		gsap.set(containerRef.current, {
			clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
		})

		if (triggerOnView) {
			// Scroll-triggered animation
			ScrollTrigger.create({
				trigger: containerRef.current,
				start: "top 90%",
				end: "bottom 20%",
				// markers: true,
				onEnter: () => {
					const tl = gsap.timeline({ delay })

					tl.to(imageRef.current, {
						y: 0,
						autoAlpha: 1,
						duration: 0.2,
						ease: "easeInOut",
					}).to(
						containerRef.current,
						{
							clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
							duration,
							ease: "power2.inOut",
						},
						"+=0.2"
					)
				},
			})

			// Optional parallax effect
			if (parallax) {
				ScrollTrigger.create({
					trigger: containerRef.current,
					start: "top bottom",
					end: "bottom top",
					scrub: 1,
					onUpdate: (self) => {
						gsap.to(imageRef.current, {
							scale: 1 + self.progress * 0.1,
							duration: 0.1,
						})
					},
				})
			}
		} else {
			// Immediate animation (for hero sections)
			const tl = gsap.timeline({ delay })

			tl.to(imageRef.current, {
				y: 0,
				autoAlpha: 1,
				duration: 0.5,
				ease: "power1.out",
			}).to(
				containerRef.current,
				{
					clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
					duration,
					ease: "power2.inOut",
				},
				"+=0.2"
			)
		}
	}, [triggerOnView, delay, duration, parallax])

	return (
		<div
			ref={containerRef}
			className={`image-reveal-container ${containerClassName || ""}`}
			style={{
				position: "relative",
				overflow: "hidden",
			}}
		>
			<div
				ref={imageRef}
				className={`image-reveal-wrapper ${className || ""}`}
				style={{
					position: fill ? "absolute" : "relative",
					width: fill ? "100%" : width,
					height: fill ? "100%" : height,
				}}
			>
				<Image
					src={src}
					alt={alt}
					width={fill ? undefined : width}
					height={fill ? undefined : height}
					fill={fill}
					priority={priority}
					sizes={sizes}
					quality={quality}
					style={{
						objectFit: "cover",
						width: "100%",
						height: "100%",
					}}
				/>
			</div>
		</div>
	)
}

export default ImageReveal
