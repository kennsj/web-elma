/**
 * Centralized link configuration for the entire app
 * Used in Nav, Footer, and can be extended with Sanity CMS data
 */

export type NavLink = {
	href: string
	label: string
	imgSrc: string
	index: number
}

export type FooterLink = {
	href: string
	label: string
}

/**
 * Main navigation links (used in Nav menu)
 */
export const NAV_LINKS: NavLink[] = [
	{
		href: "/",
		label: "Hjem",
		imgSrc: "/images/anders-moloen.webp",
		index: 0,
	},
	{
		href: "/om-elma",
		label: "Om elma",
		imgSrc: "/images/person-aurora.webp",
		index: 1,
	},
	{
		href: "/hjelp",
		label: "Hjelp",
		imgSrc: "/images/person-aurora.webp",
		index: 2,
	},
	{
		href: "/stotte",
		label: "Støtte",
		imgSrc: "/images/person-aurora.webp",
		index: 3,
	},
	{
		href: "/blog",
		label: "Blogg",
		imgSrc: "/images/man-mountain-alone.jpg",
		index: 4,
	},
	{
		href: "/kontakt",
		label: "Kontakt",
		imgSrc: "/images/anders-moloen.webp",
		index: 5,
	},
]

/**
 * Footer navigation links
 */
export const FOOTER_LINKS: FooterLink[] = [
	{
		href: "/start",
		label: "Start din reise",
	},
	{
		href: "/historier",
		label: "Historier",
	},
	{
		href: "/events",
		label: "Foredrag",
	},
	{
		href: "/hjelp",
		label: "Trenger du hjelp?",
	},
	{
		href: "/om-elma",
		label: "Om elma",
	},
]

/**
 * Utility to merge Sanity CMS links with static links
 * Use this when you add Sanity integration later
 */
export function mergeWithSanityLinks(
	staticLinks: NavLink[],
	sanityLinks: NavLink[] = []
): NavLink[] {
	// Merge logic: Sanity links override static ones with same href
	const linkMap = new Map<string, NavLink>()

	// Add static links first
	staticLinks.forEach((link) => linkMap.set(link.href, link))

	// Override with Sanity links
	sanityLinks.forEach((link) => linkMap.set(link.href, link))

	return Array.from(linkMap.values())
}
