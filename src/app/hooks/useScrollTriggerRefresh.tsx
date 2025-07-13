"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Hook: refreshes ScrollTrigger on route change
export default function useScrollTriggerRefresh() {
	const pathname = usePathname()

	useEffect(() => {
		// Wait a frame before refreshing scroll triggers
		requestAnimationFrame(() => {
			ScrollTrigger.refresh()
		})
	}, [pathname])
}
