import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Extend NextRequest to include geo property (available in Vercel)
interface NextRequestWithGeo extends NextRequest {
	geo?: {
		city?: string
		country?: string
		region?: string
		latitude?: string
		longitude?: string
	}
}

// List of blocked country codes (ISO 3166-1 alpha-2)
const BLOCKED_COUNTRIES = [
	"CN", // China
	"RU", // Russia
	"IN", // India
	"ID", // Indonesia
	"PK", // Pakistan
	"BD", // Bangladesh
	"NG", // Nigeria
	"VN", // Vietnam
	"UA", // Ukraine
	"BY", // Belarus
	"KP", // North Korea
	"IR", // Iran
	"IQ", // Iraq
	"BR", // Brazil (high bot traffic)
	"TR", // Turkey
	"PH", // Philippines
	"RO", // Romania
]

export function middleware(request: NextRequestWithGeo) {
	// Get country from Vercel's geolocation headers
	const country =
		request.geo?.country || request.headers.get("x-vercel-ip-country")

	// Block if country is in the blocked list
	if (country && BLOCKED_COUNTRIES.includes(country)) {
		// Return 403 Forbidden
		return new NextResponse("Access denied", {
			status: 403,
			headers: {
				"Content-Type": "text/plain",
			},
		})
	}

	return NextResponse.next()
}

// Apply middleware to all routes except static files and api routes
export const config = {
	matcher: [
		/*
		 * Match all request paths except:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public folder
		 */
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
}
