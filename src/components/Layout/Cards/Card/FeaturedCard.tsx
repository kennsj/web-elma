import { client } from "@/sanity/client"
import { frontPagePostQuery } from "@/components/lib/sanity/queries"
import { TextNarrow } from "@/components/ui/TextBlocks"
import WaveCss from "../../UI/WaveSeperator/WaveSeperator"
import FeaturedCardCarousel from "./FeaturedCardCarousel"

export default async function FeaturedCard() {
	const posts = await client.fetch(frontPagePostQuery)

	return (
		<section className=' section__fullwidth' data-theme='dark'>
			<div className='section__content'>
				<TextNarrow
					title='Det som rører seg'
					subTitle={"Utvalgte tekster \nog historier"}
					dataTheme='dark'
				>
					Her samler vi historier og tanker som kan gi gjenkjennelse, ro og håp.
				</TextNarrow>

				<FeaturedCardCarousel posts={posts} />
			</div>
			<WaveCss isDarkBackground={true} />
		</section>
	)
}
