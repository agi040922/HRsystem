import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "FAIR 노동법 한영사전 | 외국계기업 지원센터",
  description:
    "외국계 기업을 전문적으로 자문하고 있는 FAIR인사노무컨설팅의 오랜 경험과 노하우를 바탕으로 설계한 노동법 한영사전을 준비하고 있습니다.",
  path: "/global-companies/glossary",
  keywords: ["노동법 한영사전", "노동법 영문 용어", "외국계기업 노무 용어"],
})

export default function GlossaryPage() {
  return (
    <div className="w-full overflow-x-hidden pt-16">
      <section className="w-full bg-gradient-to-br from-primary/5 via-white to-blue-50 py-20 sm:py-28 md:py-36">
        <div className="container-fluid max-w-3xl px-4 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <BookOpen className="h-8 w-8" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-5">
            준비 중
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
            FAIR 노동법 한영사전
          </h1>

          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700">
            외국계 기업을 전문적으로 자문하고 있는 FAIR인사노무컨설팅의
            <br className="hidden sm:block" /> 오랜 경험과 노하우를 바탕으로 설계한
            <br className="hidden sm:block" />
            <span className="font-bold text-primary"> FAIR 노동법 한영사전</span>이 조만간
            선보입니다.
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
