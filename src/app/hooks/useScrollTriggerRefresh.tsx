"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Hook: refreshes ScrollTrigger on route change
export default function useScrollTriggerRefresh() {
	const pathname = usePathname()

	useEffect(() => {
		// Delay refresh to avoid interrupting momentum scroll on mobile
		const timer = setTimeout(() => {
			requestAnimationFrame(() => {
				ScrollTrigger.refresh()
			})
		}, 300) // Wait for momentum to settle

		return () => clearTimeout(timer)
	}, [pathname])
}
