import EventList from "@/components/Lists/EventList/EventList"
import React from "react"

const page = () => {
	return (
		<main>
			<EventList
				title='Oversikt over alle arrangementer'
				intro='Her finner du en oversikt over alle kommende arrangementer og foredrag. Klikk på et arrangement for mer informasjon.'
			/>
		</main>
	)
}

export default page
