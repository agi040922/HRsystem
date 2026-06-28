import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import {
  NEWSLETTER_POSTS,
  getNewsletterPost,
  type Block,
} from "@/lib/newsletterPosts"

const SITE = "https://www.fairhr.net"

export function generateStaticParams() {
  return NEWSLETTER_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getNewsletterPost(slug)
  if (!post) return { title: "뉴스레터 | FAIR인사노무컨설팅" }

  return {
    title: `${post.title} | FAIR인사노무컨설팅`,
    description: post.summary,
    alternates: { canonical: `${SITE}/newsletter/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url: `${SITE}/newsletter/${post.slug}`,
      siteName: "FAIR인사노무컨설팅",
      locale: "ko_KR",
      publishedTime: post.date,
    },
  }
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-10 text-xl md:text-2xl font-bold text-gray-900">{block.text}</h2>
    case "h3":
      return <h3 className="mt-6 text-lg font-semibold text-gray-800">{block.text}</h3>
    case "ul":
      return (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      )
    case "p":
    default:
      return (
        <p className="mt-4 whitespace-pre-line leading-relaxed text-gray-700">
          {block.text}
        </p>
      )
  }
}

export default async function NewsletterPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getNewsletterPost(slug)
  if (!post) notFound()

  // 구조화 데이터 — 개별 글(BlogPosting). 검색·AI 크롤러 노출용.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    inLanguage: "ko-KR",
    url: `${SITE}/newsletter/${post.slug}`,
    author: { "@type": "Organization", name: "FAIR인사노무컨설팅", url: SITE },
    publisher: { "@type": "Organization", name: "FAIR인사노무컨설팅", url: SITE },
  }

  return (
    <div className="w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="container-fluid max-w-3xl py-10 md:py-14 lg:py-16 px-4">
        <nav className="mb-6 text-sm text-gray-400">
          <Link href="/newsletter" className="hover:text-primary">
            뉴스레터
          </Link>{" "}
          / <span className="text-gray-600">{post.title}</span>
        </nav>

        <header className="border-b border-gray-200 pb-6">
          <h1 className="text-2xl md:text-3xl font-bold leading-snug text-gray-900">
            {post.title}
          </h1>
          <time dateTime={post.date} className="mt-3 block text-sm text-gray-400">
            {post.date}
          </time>
        </header>

        <div className="mt-2 text-base">
          {post.body.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6">
          <Link href="/newsletter">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              목록으로
            </Button>
          </Link>
        </div>
      </article>
    </div>
  )
}
