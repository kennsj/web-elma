import gsap from "gsap"
import SplitText from "gsap/SplitText"

export const heroAnimation = ({
	imageRef,
	imageContainer,
	headingRef,
	paragraphRef,
	buttonRef,
}: {
	imageRef: HTMLElement
	imageContainer: HTMLElement
	headingRef: HTMLElement
	paragraphRef: HTMLElement
	buttonRef: HTMLElement
}) => {
	gsap.registerPlugin(SplitText)

	const splitTitle = new SplitText(headingRef, {
		type: "words, chars",
		wordsClass: "wordClass",
	})
	const splitPara = new SplitText(paragraphRef, { type: "words" })

	const mm = gsap.matchMedia()

	mm.add(
		{
			isMobile: "(max-width: 768px)",
			isDesktop: "(min-width: 769px)",
			reduceMotion: "(prefers-reduced-motion: reduce)",
		},
		(context) => {
			const { isMobile, reduceMotion } = context.conditions!

			const tl = gsap.timeline({ delay: 0.7 })

			if (isMobile) {
				tl.from(splitTitle.chars, {
					opacity: 0,
					// skewY: 5,
					yPercent: 100,
					duration: reduceMotion ? 0 : 0.8,
					stagger: 0.02,
					onLoad: () => {
						gsap.set(headingRef, {
							visibility: "visible",
							opacity: 1,
						})
					},
				})
					.from(
						splitPara.words,
						{
							opacity: 0,
							yPercent: 100,
							skewY: 5,
							duration: reduceMotion ? 0 : 0.4,
							stagger: 0.01,
							onLoad: () => {
								gsap.set(paragraphRef, {
									visibility: "visible",
									opacity: 1,
								})
							},
						},
						"-=0.6"
					)
					.to(
						buttonRef,
						{
							y: 0,
							opacity: 1,
							autoAlpha: 1,
							duration: reduceMotion ? 0 : 0.7,
						},
						"-=0.6"
					)
					.to(
						imageRef,
						{
							y: 0,
							scale: 1.2,
							autoAlpha: 1,
							duration: reduceMotion ? 0 : 2.2,
						},
						"-=0.2"
					)
					.to(
						imageContainer,
						{
							clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
							duration: reduceMotion ? 0 : 2,
							ease: "power2.out",
						},
						"-=3s"
					)
			} else {
				tl.to(imageRef, {
					y: 0,
					scale: 1,
					autoAlpha: 1,
					duration: reduceMotion ? 0 : 1.5,
				})
					.to(
						imageContainer,
						{
							clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
							duration: reduceMotion ? 0 : 2,
							ease: "power2.out",
						},
						"-=1.5"
					)
					.from(
						splitTitle.chars,
						{
							opacity: 0,
							skewY: 5,
							yPercent: 110,
							duration: reduceMotion ? 0 : 0.8,
							stagger: 0.01,
							onLoad: () => {
								gsap.set(headingRef, {
									visibility: "visible",
									opacity: 1,
								})
							},
						},
						"-=1.2"
					)
					.from(
						splitPara.words,
						{
							opacity: 0,
							yPercent: 100,
							duration: reduceMotion ? 0 : 0.7,
							stagger: 0.01,
							onLoad: () => {
								gsap.set(paragraphRef, {
									visibility: "visible",
									opacity: 1,
								})
							},
						},
						"-=1"
					)
					.to(
						buttonRef,
						{
							y: 0,
							opacity: 1,
							autoAlpha: 1,
							duration: reduceMotion ? 0 : 0.3,
						},
						"-=.9"
					)
			}
		}
	)
}
