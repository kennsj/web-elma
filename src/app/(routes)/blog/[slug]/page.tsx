import { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/client"
import { generateSEOMetadata } from "@/components/lib/sanity/seo"
import { PortableText } from "@portabletext/react"
import Image from "next/image"
import Link from "next/link"
import { Hero } from "@/components/Layout/Hero/Hero"

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

			<Hero
				title={post.title}
				subTitle={post.subtitle || ""}
				imageSrc={
					post.mainImage?.asset?.url || "/images/default-blog-image.jpg"
				}
				imageAlt={post.mainImage?.alt || post.title}
				imageSizes='(max-width: 768px) 500px, (max-width: 1200px) 50vw, 33vw'
				imageQuality={100}
				imagePriority={true}
			/>

			<main className='blog-post'>
				<article>
					<header className='blog-header'>
						{/* Breadcrumbs */}
						<nav className='breadcrumbs'>
							<Link href='/'>Hjem</Link> / <Link href='/blog'>Blog</Link> /{" "}
							<span>{post.title}</span>
						</nav>

						<h1>{post.title}</h1>
						{post.subtitle && <p className='subtitle'>{post.subtitle}</p>}

						<div className='post-meta'>
							<time dateTime={post.publishedAt}>
								{new Date(post.publishedAt).toLocaleDateString("no-NO", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</time>
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

					{post.mainImage && (
						<div className='featured-image'>
							<Image
								src={post.mainImage.asset.url}
								alt={post.mainImage.alt || post.title}
								width={1200}
								height={630}
								priority
								className='rounded-lg'
							/>
						</div>
					)}

					<div className='blog-content'>
						<PortableText
							value={post.body}
							components={portableTextComponents}
						/>
					</div>

					{/* Back to blog */}
					<footer className='blog-footer'>
						<Link href='/blog' className='back-to-blog'>
							← Tilbake til alle innlegg
						</Link>
					</footer>
				</article>
			</main>
		</>
	)
}
