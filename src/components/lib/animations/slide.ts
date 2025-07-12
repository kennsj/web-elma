import gsap from "gsap"
import { CustomEase } from "gsap/CustomEase"

gsap.registerPlugin(CustomEase)

type SlideOptions = {
	duration?: number
	delay?: number
	ease?: string
	direction?: "top" | "bottom"
	setOptions?: gsap.TweenVars
}

export const slideIn = (
	element: HTMLElement,
	{
		duration = 0.9,
		delay = 0,
		ease = "0.76, 0, 0.24, 1",
		// ease = "power1.inOut",
		direction = "bottom",
		setOptions = {},
	}: SlideOptions = {}
) => {
	if (!element) return

	const fromY = direction === "bottom" ? "100%" : "-100%"

	gsap.killTweensOf(element)

	// gsap.set(element, { y: fromY, ...setOptions, visibility: "visible" })

	gsap.to(element, {
		onStart: () => {
			gsap.set(element, { y: fromY, ...setOptions, visibility: "visible" })
		},
		y: 0,
		duration,
		delay,
		ease: CustomEase.create("slideInEase", ease),
		// ease,
	})
}

export const slideOut = (
	element: HTMLElement,
	{
		duration = 0.9,
		delay = 0,
		ease = "0.76, 0, 0.24, 1",
		// ease = "power1.inOut",
		direction = "top",
		setOptions = {},
	}: SlideOptions = {}
) => {
	if (!element) return

	const toY = direction === "top" ? "-100%" : "100%"

	gsap.killTweensOf(element)

	gsap.to(element, {
		y: toY,
		duration,
		delay,
		ease: CustomEase.create("slideOutEase", ease),
		// ease,
		onComplete: () => {
			gsap.set(element, { ...setOptions, visibility: "hidden" })
		},
	})
}
