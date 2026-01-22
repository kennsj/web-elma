import { client } from "@/sanity/client"
import { frontPagePostQuery } from "@/components/lib/sanity/queries"
import { TextNarrow } from "@/components/ui/TextBlocks"
import WaveCss from "../../UI/WaveSeperator/WaveSeperator"
import FeaturedCardCarousel from "./FeaturedCardCarousel"

export default async function FeaturedCard() {
	const posts = await client.fetch(frontPagePostQuery)

	console.log(frontPagePostQuery)

	return (
		<section className=' section__fullwidth' data-theme='dark'>
			<div className='section__content'>
				<TextNarrow
					title='Det som rører seg'
					subTitle={"Tekster, historier og \nrefleksjoner fra ELMA"}
					dataTheme='dark'
				>
					Her samler vi det som kan være vanskelig å sette ord på og det som gir
					gjenkjennelse, ro og håp. Personlige historier, åpne tanker og tekster
					om å være menneske.
				</TextNarrow>

				<FeaturedCardCarousel posts={posts} />
			</div>
			<WaveCss isDarkBackground={true} />
		</section>
	)
}
