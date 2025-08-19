import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Side ikke funnet | ELMA",
	description: "Beklager, siden du leter etter finnes ikke.",
}

export default function NotFound() {
	return (
		<main className='not-found-page'>
			<div className='not-found-content'>
				<h1>404</h1>
				<h2>Siden finnes ikke</h2>
				<p>
					Beklager, siden du leter etter kan ikke finnes. Den kan være flyttet,
					slettet eller du har skrevet feil adresse.
				</p>

				<div className='not-found-actions'>
					<Link href='/' className='primary-button'>
						Gå til forsiden
					</Link>
					<Link href='/blog' className='secondary-button'>
						Se alle bloginnlegg
					</Link>
					<Link href='/events' className='secondary-button'>
						Se arrangementer
					</Link>
				</div>

				<div className='search-help'>
					<p>Du kan også:</p>
					<ul>
						<li>Sjekke om du har skrevet riktig adresse</li>
						<li>Gå tilbake til forrige side</li>
						<li>Kontakte oss hvis du tror dette er en feil</li>
					</ul>
				</div>
			</div>
		</main>
	)
}
