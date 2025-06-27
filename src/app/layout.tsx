import type { Metadata } from "next"
import { Newsreader, Playfair_Display } from "next/font/google"
import localFont from "next/font/local"

import { Nav } from "@/components/Nav/nav"

import "@/styles/globals.scss"

const newsreader = Newsreader({
	variable: "--font-newsreader",
	subsets: ["latin"],
})

const Playfair = Playfair_Display({
	variable: "--font-playfair",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
})

const Atyp = localFont({
	src: [
		{
			path: "../../public/fonts/AtypDisplay-Light.woff",
			weight: "100",
			style: "normal",
		},
		{
			path: "../../public/fonts/AtypDisplay-Regular.woff",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/AtypDisplay-Bold.woff",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-atyp",
	display: "swap",
})

export const metadata: Metadata = {
	title: "elma",
	description: "Et liv med angst",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${newsreader.variable} ${Playfair.variable} ${Atyp.variable} antialiased`}
			>
				<Nav />
				{children}
			</body>
		</html>
	)
}
