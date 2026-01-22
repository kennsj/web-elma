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

export const frontPagePostQuery = `*[_type == "post"] | order(publishedAt desc)[0...5] {
  _id,
  title,
  publishedAt,
  slug,
  mainImage {
    asset -> {
      url
    },
    alt
  },
  subtitle,
  categories
}`

export const allEventsQuery = `
  *[_type == "event"] | order(date asc) {
    _id,
    title,
    slug,
    date,
    startTime,
    endTime,
    city,
    address,
    location,
    entryType,
    description,
    mainImage{
      asset->{url}
    },
    seo,
    _updatedAt,
    "status": select(
      date > now() => "upcoming",
      date <= now() => "expired"
    )
  }
`

export const singleEventQuery = `
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    date,
    startTime,
    endTime,
    city,
    address,
    location,
    entryType,
    description,
    mainImage {
      asset -> {
        _id,
        url
      },
      alt
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset -> {
          _id
        }
      },
      keywords,
      noIndex,
      canonicalUrl
    },
    _updatedAt
  }
`

export const upcomingEventsQuery = `
  *[_type == "event" && date >= now()] | order(date asc) {
    _id,
    title,
    slug,
    date,
    city,
    address,
    location,
    entryType,
    mainImage{
      asset->{url}
    }
  }
`
