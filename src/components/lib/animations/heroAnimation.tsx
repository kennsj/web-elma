import gsap from "gsap"
import SplitText from "gsap/SplitText"
import ScrollTrigger from "gsap/ScrollTrigger"

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
	buttonRef?: HTMLElement | null
}) => {
	gsap.registerPlugin(SplitText, ScrollTrigger)

	const splitTitle = new SplitText(headingRef, {
		type: "words, chars",
		wordsClass: "wordClass",
	})
	const splitPara = new SplitText(paragraphRef, { type: "words" })

	// Set initial states
	gsap.set(headingRef, { autoAlpha: 1 })
	gsap.set(paragraphRef, { autoAlpha: 1 })
	gsap.set(imageRef, { autoAlpha: 0, y: 50 })
	if (buttonRef) {
		gsap.set(buttonRef, { autoAlpha: 0, y: 10 })
	}

	// Create main timeline
	const tl = gsap.timeline({ delay: 0.2 })

	// Title animation
	tl.from(splitTitle.chars, {
		opacity: 0,
		yPercent: 100,
		skewY: 5,
		duration: 0.8,
		stagger: 0.02,
		ease: "power2.out",
	})

		// Paragraph animation
		.from(
			splitPara.words,
			{
				opacity: 0,
				yPercent: 100,
				skewY: 5,
				duration: 0.7,
				stagger: 0.02,
				ease: "power2.out",
			},
			"-=0.4"
		)

		
	// Button animation (concurrent with paragraph) - only if button exists
	if (buttonRef) {
		tl.to(
			buttonRef,
			{
				y: 0,
				opacity: 1,
				autoAlpha: 1,
				duration: 0.4,
				ease: "power2.out",
			},
			"-=0.4"
		)
	}

	tl

		// Image animations
		.to(
			imageRef,
			{
				y: 0,
				autoAlpha: 1,
				duration: 0.5,
				ease: "power1.out",
			},
			"<"
		)

		.to(
			imageContainer,
			{
				clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
				duration: 1.8,
				ease: "power2.inOut",
			},
			"+.5"
		)

	// Add scroll trigger for parallax effect
	ScrollTrigger.create({
		trigger: imageContainer,
		start: "top bottom",
		end: "bottom top",
		scrub: 1,
		// onUpdate: (self) => {
		// 	gsap.to(imageRef, {
		// 		scale: 1 + self.progress * 0.1,
		// 		duration: 0.1,
		// 	})
		// },
	})

	// Return the timeline for external control if needed
	return { timeline: tl }
}
