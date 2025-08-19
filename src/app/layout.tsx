import type { Metadata } from "next"
import { Newsreader, Oswald } from "next/font/google"
import localFont from "next/font/local"

import { Nav } from "@/components/Nav/nav"

import "@/styles/globals.scss"
import Footer from "@/components/Layout/Footer/Footer"

const newsreader = Newsreader({
	variable: "--font-newsreader",
	subsets: ["latin"],
})

const Playfair = Oswald({
	variable: "--font-playfair",
	subsets: ["latin"],
	// weight: ["400"],
})

// const Playfair = Playfair_Display({
// 	variable: "--font-playfair",
// 	subsets: ["latin"],
// 	weight: ["400", "500", "600", "700"],
// })

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
	metadataBase: new URL("https://your-domain.com"), // Replace with your actual domain
	title: {
		default: "ELMA - For deg som vil leve, ikke bare overleve",
		template: "%s | ELMA",
	},
	description:
		"Hos ELMA møter du forståelse, fellesskap og mot. Det starter med å åpne opp - i ditt tempo. Anders Karlsen reiser landet rundt for å snakke ærlig om angst og psykisk helse.",
	keywords: [
		"angst",
		"psykisk helse",
		"foredrag",
		"Anders Karlsen",
		"støtte",
		"fellesskap",
		"mental helse",
		"Norge",
	],
	authors: [{ name: "ELMA" }],
	creator: "ELMA",
	publisher: "ELMA",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	openGraph: {
		type: "website",
		locale: "no_NO",
		url: "https://your-domain.com", // Replace with your actual domain
		siteName: "ELMA",
		title: "ELMA - For deg som vil leve, ikke bare overleve",
		description:
			"Hos ELMA møter du forståelse, fellesskap og mot. Det starter med å åpne opp - i ditt tempo.",
	},
	twitter: {
		card: "summary_large_image",
		title: "ELMA - For deg som vil leve, ikke bare overleve",
		description:
			"Hos ELMA møter du forståelse, fellesskap og mot. Det starter med å åpne opp - i ditt tempo.",
	},
	verification: {
		// Add your verification codes here when you have them
		// google: 'your-google-verification-code',
		// yandex: 'your-yandex-verification-code',
		// yahoo: 'your-yahoo-verification-code',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	// document.designMode = "on"

	// console.log(document)

	return (
		<html lang='no'>
			<body
				className={`${newsreader.variable} ${Playfair.variable} ${Atyp.variable} antialiased`}
			>
				<Nav />
				{children}
				<Footer />
			</body>
		</html>
	)
}
