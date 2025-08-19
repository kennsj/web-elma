import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { name, email, subject, message } = body

		// Basic validation
		if (!name || !email || !subject || !message) {
			return NextResponse.json(
				{ error: "All fields are required" },
				{ status: 400 }
			)
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ error: "Invalid email address" },
				{ status: 400 }
			)
		}

		// Here you would typically:
		// 1. Send an email using a service like SendGrid, Nodemailer, etc.
		// 2. Save to database
		// 3. Send to a CRM or form handler

		console.log("Contact form submission:", {
			name,
			email,
			subject,
			message,
			timestamp: new Date().toISOString(),
		})

		// For now, just log and return success
		// In production, you'd want to actually send the email

		return NextResponse.json(
			{ message: "Form submitted successfully" },
			{ status: 200 }
		)
	} catch (error) {
		console.error("Error processing contact form:", error)
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		)
	}
}
