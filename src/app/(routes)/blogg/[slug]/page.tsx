import { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/client"
import { generateSEOMetadata } from "@/components/lib/sanity/seo"
import { PortableText } from "@portabletext/react"
import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/Layout/Hero/Hero"
import styles from "./BlogPage.module.scss"

// Query for single blog post
const postQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    slug,
    publishedAt,
    author,
    categories,
    excerpt,
    mainImage {
      asset -> {
        _id,
        url
      },
      alt
    },
    body,
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

interface BlogPostPageProps {
	params: Promise<{
		slug: string
	}>
}

// Generate metadata for the blog post
export async function generateMetadata({
	params,
}: BlogPostPageProps): Promise<Metadata> {
	const { slug } = await params
	const post = await client.fetch(postQuery, { slug })

	if (!post) {
		return {
			title: "Post Not Found",
			description: "The requested blog post could not be found.",
		}
	}

	return generateSEOMetadata({
		title: post.title,
		description: post.excerpt || post.subtitle,
		seo: post.seo,
		image: post.mainImage,
		slug: `blog/${post.slug.current}`,
		type: "article",
		publishedTime: post.publishedAt,
		modifiedTime: post._updatedAt,
	})
}

// Generate static params for all posts
export async function generateStaticParams() {
	const posts = await client.fetch(`
    *[_type == "post" && defined(slug.current)] {
      "slug": slug.current
    }
  `)

	return posts.map((post: { slug: string }) => ({
		slug: post.slug,
	}))
}

// Portable Text components for rich content
const portableTextComponents = {
	types: {
		image: ({ value }: { value: { asset: { url: string }; alt?: string } }) => (
			<div className='blog-image'>
				<Image
					src={value.asset.url}
					alt={value.alt || "Blog image"}
					width={800}
					height={450}
					className='rounded-lg'
				/>
			</div>
		),
	},
	block: {
		h2: ({ children }: { children?: React.ReactNode }) => (
			<h2 className='blog-h2'>{children}</h2>
		),
		h3: ({ children }: { children?: React.ReactNode }) => (
			<h3 className='blog-h3'>{children}</h3>
		),
		h4: ({ children }: { children?: React.ReactNode }) => (
			<h4 className='blog-h4'>{children}</h4>
		),
		blockquote: ({ children }: { children?: React.ReactNode }) => (
			<blockquote className='blog-quote'>{children}</blockquote>
		),
	},
	marks: {
		link: ({
			children,
			value,
		}: {
			children?: React.ReactNode
			value?: { href: string }
		}) => (
			<a
				href={value?.href}
				target='_blank'
				rel='noopener noreferrer'
				className='blog-link'
			>
				{children}
			</a>
		),
	},
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params
	const post = await client.fetch(postQuery, { slug })

	if (!post) {
		notFound()
	}

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.excerpt || post.subtitle,
		author: {
			"@type": "Person",
			name: post.author,
		},
		publisher: {
			"@type": "Organization",
			name: "ELMA",
			logo: {
				"@type": "ImageObject",
				url: "https://your-domain.com/logo.png", // Replace
			},
		},
		datePublished: post.publishedAt,
		dateModified: post._updatedAt,
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `https://your-domain.com/blog/${post.slug.current}`,
		},
		image: post.mainImage?.asset?.url ? [post.mainImage.asset.url] : [],
	}

	return (
		<>
			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>

			{/* Hero Section - matching the design from the image */}
			<Hero
				title='Å leve med angst, delt for å gi håp'
				subTitle='ELMA er et sted for ærlige samtaler om psykisk helse. Et trygt rom for deling, forståelse og fellesskap. I ditt tempo.'
				imageSrc='/images/anders-moloen.webp'
				imageAlt='Anders - grunnlegger av ELMA'
				imageSizes='(max-width: 768px) 500px, (max-width: 1200px) 50vw, 33vw'
				imageQuality={100}
				imagePriority={true}
			/>

			<main className='blog-post'>
				{/* Date info in upper left corner */}
				<div className={styles.pageInfo}>
					<time>
						{new Date(post.publishedAt).toLocaleDateString("no-NO", {
							day: "numeric",
							month: "long",
							year: "numeric",
						})}
					</time>
				</div>

				{/* Main content section matching the image layout */}
				<section className={styles.contentSection}>
					<div className={styles.contentWrapper}>
						{/* Left side - text content */}
						<div>
							<h1 className={styles.mainTitle}>
								Å leve med angst, delt for å gi håp
							</h1>

							<p className={styles.introText}>
								ELMA ble startet av Anders Karlsen, som selv har levd med angst
								i store deler av livet. Erfaringene hans har gitt en dyp
								forståelse for hvor vanskelig det kan føles å stå alene med
								tanker og følelser som er utfordrende å sette ord på.
							</p>

							<p className={styles.supportingText}>
								Mange opplever at psykisk helse forblir noe man bærer i
								stillhet. ELMA ønsker å endre på dette.
							</p>
						</div>

						{/* Right side - featured image */}
						<div>
							{post.mainImage && (
								<div className={styles.imageWrapper}>
									<Image
										src={post.mainImage.asset.url}
										alt={post.mainImage.alt || post.title}
										width={600}
										height={400}
										priority
										className={styles.landscapeImage}
									/>
								</div>
							)}
						</div>
					</div>
				</section>

				{/* Additional image sections matching the layout */}
				<section className={styles.imageSection}>
					<div className={styles.imageWrapper}>
						<Image
							src='/images/two-people-landscape.jpg'
							alt='To personer som ser ut over landskap'
							width={600}
							height={400}
							className={styles.landscapeImage}
						/>
					</div>
				</section>

				<section className={styles.imageSection}>
					<div className={styles.imageWrapper}>
						<Image
							src='/images/hands-together.jpg'
							alt='Hender sammen - støtte og fellesskap'
							width={400}
							height={300}
							className={styles.handsImage}
						/>
					</div>
				</section>

				{/* Original blog content */}
				<article className={styles.blogArticle}>
					<header className={styles.blogHeader}>
						{/* Breadcrumbs */}
						<nav className='breadcrumbs'>
							<Link href='/'>Hjem</Link> / <Link href='/blog'>Blog</Link> /{" "}
							<span>{post.title}</span>
						</nav>

						<h2>{post.title}</h2>
						{post.subtitle && <p className='subtitle'>{post.subtitle}</p>}

						<div className='post-meta'>
							{post.author && <span className='author'>av {post.author}</span>}
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
					</header>

					<div className={styles.blogContent}>
						<PortableText
							value={post.body}
							components={portableTextComponents}
						/>
					</div>

					{/* Back to blog */}
					<footer className={styles.blogFooter}>
						<Link href='/blog' className='back-to-blog'>
							← Tilbake til alle innlegg
						</Link>
					</footer>
				</article>
			</main>
		</>
	)
}
