export const singlePostQuery = `*[_type == "post" && slug.current == $slug][0] {
  title,
  subtitle,
  mainImage {
    asset -> {
      url
    },
    alt
  },
  body
}`

export const frontPagePostQuery = `*[_type == "post"] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  mainImage {
    asset -> {
      url
    },
    alt
  },
  subtitle
}`
