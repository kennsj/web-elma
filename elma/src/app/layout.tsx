import "@/styles/globals.scss"
import "@/components/Layout/Hero/Hero.module.scss"

import type { Metadata } from "next"
import {
	Signika_Negative,
	Syne,
	Playfair_Display,
	Sen,
	IBM_Plex_Sans,
	DM_Sans,
} from "next/font/google"
import localFont from "next/font/local"

import { ViewTransitions } from "next-view-transitions"
import { Nav } from "@/components/Nav/nav"
import Footer from "@/components/Layout/Footer/Footer"
import { SpeedInsights } from "@vercel/speed-insights/next"

const playfair = Playfair_Display({
	variable: "--font-playfair",
	subsets: ["latin"],
	style: ["normal", "italic"],
	// weight: ["400"],
})

const Signika = Signika_Negative({
	variable: "--font-signika",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
})

const SyneFont = Syne({
	variable: "--font-syne",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
})

const SenFont = Sen({
	variable: "--font-sen",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
})

const IBM_Plex = IBM_Plex_Sans({
	variable: "--font-ibm-plex",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
})

const DMSansFont = DM_Sans({
	variable: "--font-dm-sans",
	subsets: ["latin"],
	weight: ["300", "400", "700"],
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
	metadataBase: new URL("https://your-domain.com"), // Replace
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
		"åpenhet",
		"mestring",
		"et liv med angst",
		"selvhjelp",
		"åpenhet",
		"stigma",
		"livskvalitet",
		"bedre hverdag",
		"Norge",
		"Bodø",
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
		url: "https://your-domain.com", // Replace
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
		<ViewTransitions>
			<html lang='no'>
				<body
					className={`${IBM_Plex.variable}  ${playfair.variable} ${Atyp.variable} ${Signika.variable} ${SyneFont.variable} ${SenFont.variable} ${DMSansFont.variable} antialiased`}
				>
					<Nav />
					{children}
					<Footer />
					<SpeedInsights />
				</body>
			</html>
		</ViewTransitions>
	)
}
