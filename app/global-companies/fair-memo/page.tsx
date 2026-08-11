import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, StickyNote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { pageMetadata } from "@/lib/seo"
import InformationTabs from "@/components/information-tabs"
import { MEMO_POSTS } from "./memoData"

/**
 * FAIR 메모 목록 — 「외국계 기업 HR 소식」과 같은 레이아웃을 쓴다.
 * 본문은 FAIR 네이버 블로그 원문이며, 상세에서 canonical 로 원문을 가리킨다.
 */
export const metadata: Metadata = pageMetadata({
  title: "FAIR 메모 | 외국계기업 지원센터",
  description:
    "법 개정사항과 외국계기업 HR이 유의해야 할 사항을 정리해 전합니다.",
  path: "/global-companies/fair-memo",
  keywords: ["외국계기업 HR", "법 개정사항", "외국계기업 노무", "FAIR 메모"],
})

export default function FairMemoPage() {
  return (
    <div className="w-full overflow-x-hidden pt-16">
      <section className="w-full bg-gradient-to-br from-primary/5 via-white to-blue-50 py-14 sm:py-20">
        <div className="container-fluid max-w-4xl px-4">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <StickyNote className="h-7 w-7" />
          </div>
          <h1 className="break-keep text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            FAIR 메모
          </h1>
          <p className="break-keep text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            법 개정사항과 외국계기업 HR이 유의해야 할 사항을 정리해 전하는 공간입니다.
          </p>
        </div>
      </section>

      <section className="w-full bg-white py-12 sm:py-16">
        <div className="container-fluid max-w-4xl px-4">
          <InformationTabs active="memo" />

          <ul className="space-y-5">
            {MEMO_POSTS.map((m) => (
              <li key={m.slug}>
                <Link
                  href={`/global-companies/fair-memo/${m.slug}`}
                  className="group block rounded-2xl border border-border/50 bg-white p-6 sm:p-8 transition-colors hover:border-primary/40 hover:bg-primary/5"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {m.label}
                    </span>
                  </div>
                  <h2 className="break-keep text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {m.title}
                  </h2>
                  <p className="break-keep text-sm text-muted-foreground leading-relaxed">
                    {m.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    자세히 보기
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Button asChild variant="outline">
              <Link href="/global-companies">
                <ArrowLeft className="mr-2 h-4 w-4" />
                외국계기업 지원센터
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
