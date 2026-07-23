import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Newspaper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { pageMetadata } from "@/lib/seo"
import { NEWS_ISSUES } from "./newsData"

export const metadata: Metadata = pageMetadata({
  title: "외국계 기업 HR 소식 | 외국계기업 지원센터",
  description:
    "외국계 기업 인사담당자를 위한 노동법·노사관계 소식을 매월 정리해 전합니다.",
  path: "/global-companies/hr-news",
  keywords: ["외국계기업 HR", "외국계기업 노동법 소식", "외투기업 인사노무"],
})

export default function HrNewsPage() {
  return (
    <div className="w-full overflow-x-hidden pt-16">
      <section className="w-full bg-gradient-to-br from-primary/5 via-white to-blue-50 py-14 sm:py-20">
        <div className="container-fluid max-w-4xl px-4">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Newspaper className="h-7 w-7" />
          </div>
          <h1 className="break-keep text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            외국계 기업 HR 소식
          </h1>
          <p className="break-keep text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            한국에서 일어난 노동 이슈 가운데 외국계 기업 인사담당자가 알아 두면 좋을 사안을
            골라, 법령과 실무 관점에서 정리해 전합니다.
          </p>
        </div>
      </section>

      <section className="w-full bg-white py-12 sm:py-16">
        <div className="container-fluid max-w-4xl px-4">
          <ul className="space-y-5">
            {NEWS_ISSUES.map((n) => (
              <li key={n.slug}>
                <Link
                  href={`/global-companies/hr-news/${n.slug}`}
                  className="group block rounded-2xl border border-border/50 bg-white p-6 sm:p-8 transition-colors hover:border-primary/40 hover:bg-primary/5"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {n.issue}
                    </span>
                    <time dateTime={n.date} className="text-xs text-gray-400">
                      {n.date}
                    </time>
                  </div>
                  <h2 className="break-keep text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {n.title}
                  </h2>
                  <p className="break-keep text-sm leading-relaxed text-muted-foreground">
                    {n.summary}
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
            <Link href="/global-companies">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                외국계기업 지원센터로
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
