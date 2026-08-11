import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import StructuredData from "@/components/seo/structured-data"
import { pageMetadata, breadcrumbJsonLd, SITE_URL } from "@/lib/seo"
import { MEMO_POSTS, getMemo, type MemoBlock } from "../memoData"

/**
 * FAIR 메모 상세.
 *
 * ⚠️ canonical 은 네이버 원문(sourceUrl)을 가리킨다 — CEO 결정 2026-08-10.
 *   같은 글이 블로그와 이 사이트 두 곳에 존재하므로, 그대로 두면 검색엔진이 어느 쪽을
 *   원본으로 볼지 스스로 정하고 블로그 원문의 순위를 우리가 깎을 수 있다.
 *   canonical 은 명령이 아니라 힌트라 100% 보장되지 않으므로 본문 하단에
 *   "원문 보기" 링크도 함께 둔다. sourceUrl 이 없는 글은 기본 canonical(자기 주소)을 쓴다.
 */

export function generateStaticParams() {
  return MEMO_POSTS.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const memo = getMemo(slug)
  if (!memo) return { title: "FAIR 메모" }

  const base = pageMetadata({
    title: `${memo.title} | FAIR 메모 ${memo.label}`,
    description: memo.summary,
    path: `/global-companies/fair-memo/${memo.slug}`,
    keywords: ["외국계기업 HR", "외국계기업 노무사", "인사담당자", "FAIR 메모"],
  })

  if (!memo.sourceUrl) return base
  return { ...base, alternates: { ...base.alternates, canonical: memo.sourceUrl } }
}

function Block({ block }: { block: MemoBlock }) {
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
          <p className="mb-1.5 text-sm font-bold text-primary">{block.title}</p>
          <p className="break-keep text-sm leading-relaxed text-gray-700">{block.text}</p>
        </div>
      )
    case "links":
      return (
        <ul className="mt-5 space-y-2">
          {block.items.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 break-all text-sm sm:text-base font-semibold text-primary hover:underline"
              >
                {link.label}
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              </a>
            </li>
          ))}
        </ul>
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

export default async function FairMemoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const memo = getMemo(slug)
  if (!memo) notFound()

  const url = `${SITE_URL}/global-companies/fair-memo/${memo.slug}`

  return (
    <div className="w-full overflow-x-hidden pt-16">
      <StructuredData
        data={[
          breadcrumbJsonLd([
            { name: "홈", path: "/" },
            { name: "외국계기업 지원센터", path: "/global-companies" },
            { name: "FAIR 메모", path: "/global-companies/fair-memo" },
            { name: memo.label, path: `/global-companies/fair-memo/${memo.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: memo.title,
            description: memo.summary,
            inLanguage: "ko-KR",
            url,
            author: { "@type": "Organization", name: "FAIR인사노무컨설팅", url: SITE_URL },
            publisher: { "@type": "Organization", name: "FAIR인사노무컨설팅", url: SITE_URL },
          },
        ]}
      />

      <article className="container-fluid max-w-3xl py-10 md:py-14 px-4">
        <nav className="mb-6 text-sm text-gray-400">
          <Link href="/global-companies/fair-memo" className="hover:text-primary">
            FAIR 메모
          </Link>{" "}
          / <span className="text-gray-600">{memo.label}</span>
        </nav>

        <header className="border-b border-gray-200 pb-6">
          <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
            {memo.label}
          </span>
          <h1 className="break-keep mt-3 text-2xl sm:text-3xl font-bold leading-snug text-gray-900">
            {memo.title}
          </h1>
        </header>

        <div className="mt-2">
          {memo.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        {memo.sourceUrl && (
          <div className="mt-10 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4">
            <a
              href={memo.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-primary"
            >
              원문 보기 — FAIR 블로그
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}

        <p className="mt-8 text-xs leading-relaxed text-gray-400">
          ※ 본 글은 공개된 법령과 자료를 바탕으로 정리한 일반적 정보이며, 개별 사안의 법적 판단을
          대체하지 않습니다. 기업명은 모두 익명으로 표기했습니다.
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
          <Link href="/global-companies/fair-memo">
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
