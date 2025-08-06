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

export const eventQuery = `*[_type == "event"] | order(scheduledAt asc) {
  _id,
  title,
  subtitle,
  slug,
  scheduledAt,
  image {
    asset -> {
      url
    },
    alt
  }
}`

export const singleEventQuery = `*[_type == "event" && slug.current == $slug][0] {
  title,
  subtitle,
  scheduledAt,
  image {
    asset -> {
      url
    },
    alt
  },
  body
}`
