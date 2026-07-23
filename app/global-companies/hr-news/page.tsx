import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Newspaper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "외국계 기업 HR 소식 | 외국계기업 지원센터",
  description:
    "외국계 기업 인사담당자를 위한 노동법·노사관계 소식을 준비하고 있습니다.",
  path: "/global-companies/hr-news",
  keywords: ["외국계기업 HR", "외국계기업 노동법 소식", "외투기업 인사노무"],
})

export default function HrNewsPage() {
  return (
    <div className="w-full overflow-x-hidden pt-16">
      <section className="w-full bg-gradient-to-br from-primary/5 via-white to-blue-50 py-20 sm:py-28 md:py-36">
        <div className="container-fluid max-w-3xl px-4 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Newspaper className="h-8 w-8" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-5">
            준비 중
          </span>

          <h1 className="break-keep text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
            외국계 기업 HR 소식
          </h1>

          <p className="break-keep text-base sm:text-lg leading-relaxed text-gray-700">
            곧 선보입니다.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/global-companies">
              <Button variant="outline" size="lg" className="flex items-center gap-2 px-8">
                <ArrowLeft className="h-4 w-4" />
                외국계기업 지원센터로
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="px-8">
                자문 상담 신청
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
