// lib/imageUrl.ts
import imageUrlBuilder from "@sanity/image-url"
import { client } from "@/sanity/client"

const builder = imageUrlBuilder(client)

import { SanityImageSource } from "@sanity/image-url/lib/types/types"

export function urlFor(source: SanityImageSource) {
	return builder.image(source)
}
