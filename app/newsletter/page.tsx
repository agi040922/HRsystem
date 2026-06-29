import type { Metadata } from "next"
import Link from "next/link"
import PageBanner from "@/components/page-banner"
import { NEWSLETTER_POSTS } from "@/lib/newsletterPosts"

const SITE = "https://www.fairhr.net"

export const metadata: Metadata = {
  title: "뉴스레터 | FAIR인사노무컨설팅",
  description:
    "노란봉투법·직장 내 괴롭힘·중대재해 등 기업 인사노무 리스크를 법·판례 중심으로 쉽게 정리한 FAIR인사노무컨설팅 뉴스레터. 회원가입 없이 누구나 무료로 읽을 수 있습니다.",
  alternates: { canonical: `${SITE}/newsletter` },
  openGraph: {
    type: "website",
    title: "뉴스레터 | FAIR인사노무컨설팅",
    description:
      "기업 인사노무 리스크를 법·판례 중심으로 쉽게 정리한 FAIR인사노무컨설팅 뉴스레터.",
    url: `${SITE}/newsletter`,
    siteName: "FAIR인사노무컨설팅",
    locale: "ko_KR",
  },
}

export default function NewsletterListPage() {
  // 발행일 내림차순 정렬(최신 글이 위로)
  const posts = [...NEWSLETTER_POSTS].sort((a, b) => b.date.localeCompare(a.date))

  // 구조화 데이터 — 글 목록(Blog). 검색·AI 크롤러 노출용.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "FAIR인사노무컨설팅 뉴스레터",
    description: "기업 인사노무 리스크를 법·판례 중심으로 정리한 뉴스레터.",
    url: `${SITE}/newsletter`,
    inLanguage: "ko-KR",
    publisher: { "@type": "Organization", name: "FAIR인사노무컨설팅", url: SITE },
    blogPost: posts.slice(0, 50).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.summary,
      datePublished: p.date,
      url: `${SITE}/newsletter/${p.slug}`,
    })),
  }

  return (
    <div className="w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageBanner
        title="뉴스레터"
        subtitle="인사노무 리스크를 법·판례 중심으로 쉽게 정리해 전합니다"
        backgroundImage="/FAIR000.png"
      />

      <div className="container-fluid max-w-6xl py-10 md:py-14 lg:py-16 px-4">
        <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
          노란봉투법·직장 내 괴롭힘·중대재해 등 기업이 마주하는 인사노무 리스크를
          법·판례·분쟁사례 중심으로 쉽게 정리해 발행합니다. 회원가입 없이 누구나
          읽을 수 있습니다.
        </p>

        {posts.length > 0 ? (
          <ul className="mt-8 divide-y divide-gray-200 border-y border-gray-200">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/newsletter/${p.slug}`}
                  className="flex flex-col gap-1 px-1 py-5 transition-colors hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900">{p.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {p.summary}
                    </p>
                  </div>
                  <time
                    dateTime={p.date}
                    className="shrink-0 text-sm text-gray-400 sm:ml-6"
                  >
                    {p.date}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6 text-sm text-muted-foreground">
            아직 발행된 글이 없습니다.
          </p>
        )}
      </div>
    </div>
  )
}
