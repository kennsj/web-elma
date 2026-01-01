import { TextNarrow } from "@/components/ui/TextBlocks"
import styles from "./Help.module.scss"
import HelpCard from "../Cards/Card/HelpCard"
import StaggeredReveal from "../UI/Animations/StaggeredReveal"
import Paragraph from "../UI/Animations/ParagraphAnimation"

const Help = () => {
	return (
		<>
			<TextNarrow
				title='Få hjelp'
				introduction='Trenger du noen å snakke med?'
				dataTheme='light'
			>
				<Paragraph>
					ELMA kan ikke erstatte profesjonell hjelp. Hvis du har det vanskelig,
					finnes det mennesker og tjenester som kan støtte deg akkurat nå.
				</Paragraph>
			</TextNarrow>

			<StaggeredReveal className={styles.help__cards} delay={0.3}>
				<HelpCard
					title='Mental Helse Ungdom'
					phone='116 123'
					description='Åpen hele døgnet. For deg som trenger noen å snakke med, anonymt og gratis.'
					href='www.mentalhelseungdom.no'
					linkText='mentalhelseungdom.no'
				/>
				<HelpCard
					title='Kirken SOS'
					phone='22 40 00 40'
					description='Døgnåpen tjeneste. Samtale, chat og meldingstjeneste for alle som trenger støtte.'
					href='www.kirken-sos.no'
					linkText='kirken-sos.no'
				/>
				<HelpCard
					title='Røde Kors – Kors på halsen'
					phone='800 33 321'
					description='For barn og unge. Chat, telefon og meldingstjeneste med trygge voksne.'
					href='www.korspahalsen.no'
					linkText='korspahalsen.no'
				/>
				<HelpCard
					title='Alarmtelefonen for barn og unge'
					phone='116 111'
					description='En døgnåpen hjelpetjeneste for barn, unge og bekymrede voksne.'
					href='www.116111.no'
					linkText='116111.no'
				/>
			</StaggeredReveal>
		</>
	)
}

export default Help
