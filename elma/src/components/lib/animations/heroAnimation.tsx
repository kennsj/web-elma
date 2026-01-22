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
	imageRef?: HTMLElement | null
	imageContainer?: HTMLElement | null
	headingRef: HTMLElement
	paragraphRef: HTMLElement
	buttonRef?: HTMLElement | null
}) => {
	gsap.registerPlugin(SplitText, ScrollTrigger)

	const splitTitle = SplitText.create(headingRef, {
		type: "lines, words, chars",
		mask: "lines",
	})
	const splitPara = SplitText.create(paragraphRef, {
		type: "words",
		mask: "words",
	})

	// Set proper display on words to maintain natural wrapping
	gsap.set(splitPara.words, { display: "inline-block" })

	// Set initial states
	gsap.set(headingRef, { autoAlpha: 1 })
	gsap.set(paragraphRef, { autoAlpha: 1 })

	// Only set image states if image elements exist
	if (imageRef) {
		gsap.set(imageRef, { autoAlpha: 0, y: 50 })
	}

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
				duration: 0.8,
				stagger: 0.03,
				ease: "power2.out",
			},
			"-=0.4"
		)

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
			"-=.9"
		)
	}

	// Image animations - only if image elements exist
	if (imageRef) {
		tl.to(
			imageRef,
			{
				y: 0,
				autoAlpha: 1,
				duration: 0.5,
				ease: "power1.out",
			},
			"<"
		)
	}

	if (imageContainer) {
		tl.to(
			imageContainer,
			{
				clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
				duration: 1.8,
				ease: "power2.inOut",
			},
			"+.5"
		)
	}

	// Add scroll trigger for parallax effect only if image container exists
	if (imageContainer) {
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
	}

	// Return the timeline for external control if needed
	return { timeline: tl }
}
