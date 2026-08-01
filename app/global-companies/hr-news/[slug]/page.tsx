import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import StructuredData from "@/components/seo/structured-data"
import { pageMetadata, breadcrumbJsonLd, SITE_URL } from "@/lib/seo"
import { NEWS_ISSUES, getIssue, type NewsBlock } from "../newsData"

export function generateStaticParams() {
  return NEWS_ISSUES.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const issue = getIssue(slug)
  if (!issue) return { title: "외국계 기업 HR 소식" }
  return pageMetadata({
    title: `${issue.title} | 외국계 기업 HR 소식 ${issue.issue}`,
    description: issue.summary,
    path: `/global-companies/hr-news/${issue.slug}`,
    // 호마다 주제가 다르므로 호별 키워드를 쓴다(고정하면 옛 호의 주제가 전 호에 붙는다)
    keywords: ["외국계기업 HR", "외국계기업 노무사", "인사담당자", ...(issue.keywords ?? [])],
  })
}

function Block({ block }: { block: NewsBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="break-keep mt-10 text-xl sm:text-2xl font-bold text-gray-900">
          {block.text}
        </h2>
      )
    case "h3":
      return (
        <h3 className="break-keep mt-7 text-base sm:text-lg font-semibold text-gray-800">
          {block.text}
        </h3>
      )
    case "ul":
      return (
        <ul className="mt-4 space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2.5">
              <span aria-hidden className="mt-0.5 shrink-0 text-primary">
                •
              </span>
              <span className="break-keep text-sm sm:text-base leading-relaxed text-gray-700">
                {item}
              </span>
            </li>
          ))}
        </ul>
      )
    case "callout":
      return (
        <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
          <p className="text-sm font-bold text-primary mb-1.5">{block.title}</p>
          <p className="break-keep text-sm leading-relaxed text-gray-700">{block.text}</p>
        </div>
      )
    case "p":
    default:
      return (
        <p className="break-keep mt-4 text-sm sm:text-base leading-relaxed text-gray-700">
          {block.text}
        </p>
      )
  }
}

export default async function HrNewsIssuePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const issue = getIssue(slug)
  if (!issue) notFound()

  const url = `${SITE_URL}/global-companies/hr-news/${issue.slug}`

  return (
    <div className="w-full overflow-x-hidden pt-16">
      <StructuredData
        data={[
          breadcrumbJsonLd([
            { name: "홈", path: "/" },
            { name: "외국계기업 지원센터", path: "/global-companies" },
            { name: "외국계 기업 HR 소식", path: "/global-companies/hr-news" },
            { name: issue.issue, path: `/global-companies/hr-news/${issue.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: issue.title,
            description: issue.summary,
            datePublished: issue.date,
            inLanguage: "ko-KR",
            url,
            author: { "@type": "Organization", name: "FAIR인사노무컨설팅", url: SITE_URL },
            publisher: { "@type": "Organization", name: "FAIR인사노무컨설팅", url: SITE_URL },
          },
        ]}
      />

      <article className="container-fluid max-w-3xl py-10 md:py-14 px-4">
        <nav className="mb-6 text-sm text-gray-400">
          <Link href="/global-companies/hr-news" className="hover:text-primary">
            외국계 기업 HR 소식
          </Link>{" "}
          / <span className="text-gray-600">{issue.issue}</span>
        </nav>

        <header className="border-b border-gray-200 pb-6">
          <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
            {issue.issue}
          </span>
          <h1 className="break-keep mt-3 text-2xl sm:text-3xl font-bold leading-snug text-gray-900">
            {issue.title}
          </h1>
          <time dateTime={issue.date} className="mt-3 block text-sm text-gray-400">
            {issue.date}
          </time>
        </header>

        <div className="mt-2">
          {issue.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <p className="mt-10 text-xs leading-relaxed text-gray-400">
          ※ 본 글은 언론 보도와 공개된 법령을 바탕으로 정리한 일반적 정보이며, 특정 기업의 사실관계나
          법적 책임을 확정하는 내용이 아닙니다. 개별 사안의 법적 판단을 대체하지 않습니다. 기업명은
          모두 익명으로 표기했습니다.
        </p>

        <div className="mt-10 rounded-2xl bg-primary p-6 sm:p-8 text-center text-primary-foreground">
          <h2 className="break-keep text-lg sm:text-xl font-bold mb-2">
            우리 회사 상황도 점검이 필요하신가요?
          </h2>
          <p className="break-keep text-sm opacity-90 mb-5 leading-relaxed">
            현재 진행 중인 사안을 알려주시면 무엇을 먼저 정리해야 하는지 말씀드립니다.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            자문 상담 신청 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <Link href="/global-companies/hr-news">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              목록으로
            </Button>
          </Link>
        </div>
      </article>
    </div>
  )
}
