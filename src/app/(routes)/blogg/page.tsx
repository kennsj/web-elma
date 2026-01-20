import { Metadata } from "next"
import { client } from "@/sanity/client"
import Link from "next/link"
import Image from "next/image"
import { Hero } from "@/components/Layout/Hero/Hero"

interface BlogPost {
	_id: string
	title: string
	subtitle?: string
	slug: { current: string }
	publishedAt: string
	author?: string
	categories?: string[]
	excerpt?: string
	featured: boolean
	mainImage?: {
		asset: {
			url: string
		}
		alt?: string
	}
}

// Query for all blog posts
const allPostsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    slug,
    publishedAt,
    author,
    categories,
    excerpt,
    featured,
    mainImage {
      asset -> {
        url
      },
      alt
    }
  }
`

export const metadata: Metadata = {
	title: "Blog | ELMA",
	description:
		"Les de nyeste innleggene om psykisk helse, angst og personlig utvikling fra Anders Karlsen.",
}

export default async function BlogPage() {
	const posts = await client.fetch<BlogPost[]>(allPostsQuery)

	const featuredPosts = posts.filter((post) => post.featured)
	const regularPosts = posts.filter((post) => !post.featured)

	return (
		<main className='blog-page'>
			<Hero
				title='Oversikt over alle blogginnleggene'
				subTitle='Her kan du lese de nyeste innleggene om psykisk helse, angst og personlig utvikling fra Anders Karlsen.'
				// buttonText='Start reisen'
				// buttonHref='/om-elma'
				imageSrc='/images/anders-moloen.webp'
				imageAlt='Anders Moloen'
				imageSizes='(max-width: 768px) 500px, (max-width: 1200px) 50vw, 33vw'
				imageQuality={100}
				imagePriority={true}
				// intro='Elma ble startet av Anders, som selv har levd med angst i store
				// 		deler av livet. Gjennom elma ønsker han å skape et trygt rom for
				// 		deling, forståelse og støtte&mdash;slik at ingen skal måtte stå
				// 		alene med sin psykiske helse.'
			></Hero>
			<header className='blog-header'>
				<h1>Blog</h1>
				<p>
					Tanker og erfaringer om psykisk helse, angst og det å leve et
					meningsfullt liv.
				</p>
			</header>

			{/* Featured Posts */}
			{featuredPosts.length > 0 && (
				<section className='featured-posts'>
					<h2>Utvalgte innlegg</h2>
					<div className='featured-grid'>
						{featuredPosts.map((post) => (
							<article key={post._id} className='featured-post-card'>
								<Link href={`/blog/${post.slug.current}`}>
									{post.mainImage && (
										<div className='post-image'>
											<Image
												src={post.mainImage.asset.url}
												alt={post.mainImage.alt || post.title}
												width={600}
												height={300}
											/>
										</div>
									)}
									<div className='post-content'>
										<h3>{post.title}</h3>
										{post.excerpt && <p className='excerpt'>{post.excerpt}</p>}
										<div className='post-meta'>
											<time dateTime={post.publishedAt}>
												{new Date(post.publishedAt).toLocaleDateString(
													"no-NO",
													{
														year: "numeric",
														month: "long",
														day: "numeric",
													},
												)}
											</time>
											{post.author && <span>av {post.author}</span>}
										</div>
									</div>
								</Link>
							</article>
						))}
					</div>
				</section>
			)}

			{/* Regular Posts */}
			<section className='all-posts'>
				<h2>Alle innlegg</h2>
				<div className='posts-grid'>
					{regularPosts.map((post) => (
						<article key={post._id} className='post-card'>
							<Link href={`/blog/${post.slug.current}`}>
								{post.mainImage && (
									<div className='post-image'>
										<Image
											src={post.mainImage.asset.url}
											alt={post.mainImage.alt || post.title}
											width={400}
											height={200}
										/>
									</div>
								)}
								<div className='post-content'>
									<h3>{post.title}</h3>
									{post.subtitle && <p className='subtitle'>{post.subtitle}</p>}
									{post.excerpt && <p className='excerpt'>{post.excerpt}</p>}
									<div className='post-meta'>
										<time dateTime={post.publishedAt}>
											{new Date(post.publishedAt).toLocaleDateString("no-NO", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</time>
										{post.author && <span>av {post.author}</span>}
										{post.categories && post.categories.length > 0 && (
											<div className='categories'>
												{post.categories.map((category: string) => (
													<span key={category} className='category-tag'>
														{category.replace("-", " ")}
													</span>
												))}
											</div>
										)}
									</div>
								</div>
							</Link>
						</article>
					))}
				</div>

				{regularPosts.length === 0 && <p>Ingen innlegg funnet.</p>}
			</section>
		</main>
	)
}
