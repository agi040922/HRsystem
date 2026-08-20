import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink } from "lucide-react"
import {
  NEWSLETTER_POSTS,
  getNewsletterPost,
  type Block,
} from "@/lib/newsletterPosts"
import { breadcrumbJsonLd } from "@/lib/seo"

const SITE = "https://www.fairhr.net"
const BLOG_URL = "https://blog.naver.com/fairhr"

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

/**
 * 뉴스레터 본문 타이포그래피 — 4개 사이트 공통 규격(2026-07-28 확정).
 * 한글 장문 가독성 기준: 본문 17px / 행간 2.0 / 어절 단위 줄바꿈(break-keep).
 * 구분선 대신 여백으로 위계를 만든다.
 */
/**
 * 본문 안의 `**굵게**` 표기를 굵은 글씨로 바꾼다.
 *
 * 한글 장문은 한 문단이 길어져서 눈이 미끄러진다. 문단마다 한두 곳만 굵게 잡아
 * 시선의 착지점을 만든다(백신 사이트 `RichText` 와 같은 방식).
 * 표기를 쓰지 않은 글은 split 결과가 한 조각이라 예전 그대로 출력된다.
 */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-bold text-gray-900">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-16 break-keep text-[1.375rem] font-bold leading-[1.5] tracking-tight text-gray-900 md:mt-20 md:text-2xl">
          {block.text}
        </h2>
      )
    case "h3":
      return (
        <h3 className="mt-10 break-keep text-[1.0625rem] font-bold leading-[1.6] text-gray-800 md:text-lg">
          {block.text}
        </h3>
      )
    case "ul":
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 break-keep text-[1.0625rem] leading-[1.9] text-gray-700"
            >
              <span
                aria-hidden
                className="mt-[0.85em] h-[3px] w-[3px] shrink-0 rounded-full bg-gray-400"
              />
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ul>
      )
    case "p":
    default:
      return (
        <p className="mt-7 whitespace-pre-line break-keep text-[1.0625rem] leading-[2] text-gray-700">
          <RichText text={block.text} />
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

  // 구조화 데이터 — 빵부스러기 경로(BreadcrumbList).
  const crumbsJsonLd = breadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: "뉴스레터", path: "/newsletter" },
    { name: post.title, path: `/newsletter/${post.slug}` },
  ])

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsJsonLd) }}
      />

      {/* 표지 — 제목·발행일을 가운데 두고 여백으로 격을 만든다 */}
      <header className="w-full bg-gray-50">
        <div className="container-fluid max-w-4xl px-4 py-16 text-center md:py-24">
          <nav className="text-xs text-gray-400">
            <Link href="/newsletter" className="hover:text-primary">
              뉴스레터
            </Link>
          </nav>
          <h1 className="mx-auto mt-5 max-w-3xl break-keep text-[1.75rem] font-bold leading-[1.4] tracking-tight text-gray-900 sm:text-[2.125rem] md:text-[2.5rem]">
            {post.title}
          </h1>
          <time
            dateTime={post.date}
            className="mt-8 block text-sm tracking-wide text-gray-400 md:mt-10"
          >
            {post.date.replace(/-/g, ".")}
          </time>
        </div>
      </header>

      <article className="container-fluid max-w-3xl px-4 py-14 md:py-20">
        <div>
          {post.body.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}
        </div>

        {/* 함께 보기 — 관련 서비스·상담 내부링크(SEO) */}
        <section className="mt-12">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">함께 보기</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              {
                href: "/services/labor-consulting",
                t: "노무 자문",
                d: "기업 인사노무 리스크 상시 관리",
              },
              {
                href: "/services/hr-risk-diagnosis",
                t: "HR 리스크 진단",
                d: "임금·근태·규정 자가진단 도구",
              },
              {
                href: "/contact",
                t: "상담 문의",
                d: "노무사에게 직접 문의하기",
              },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block h-full rounded-2xl border border-gray-200 p-5 transition-colors hover:border-primary/40 hover:bg-gray-50"
                >
                  <p className="text-sm font-bold text-gray-900">{l.t}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{l.d}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 네이버 블로그 연결 */}
        <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6 text-center">
          <p className="text-sm sm:text-base text-gray-700">
            인사노무 이야기를 <b>네이버 블로그</b>에서도 만나보세요.
          </p>
          <a
            href={post.blogUrl ?? BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {post.blogUrl ? "네이버 블로그에서 원문 보기" : "네이버 블로그에서 더 많은 글 보기"}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
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
