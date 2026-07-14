import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import PageBanner from "@/components/page-banner"
import { pageMetadata } from "@/lib/seo"
import { getServiceDetail } from "@/lib/serviceDetails"
import LaborConsultingTabs from "./LaborConsultingTabs"

const detail = getServiceDetail("labor-consulting")!

export const metadata: Metadata = pageMetadata({
  title: "인사노무 관리 자문 | 자문 내용과 FAIR CRM을 통한 자문",
  description:
    "채용부터 퇴직까지 인사노무 리스크를 예방·대응하는 자문 내용과, 자문 이력·진단·산업안전 관리를 시스템으로 통합하는 FAIR CRM을 통한 자문을 안내합니다.",
  path: "/services/labor-consulting",
  keywords: ["인사노무 관리 자문", "노무 자문", "FAIR CRM", "인사노무 진단", "자문 이력 관리"],
})

export default function LaborConsultingPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <PageBanner
        title={detail.title}
        subtitle="자문 내용과 FAIR CRM을 통한 자문"
        backgroundImage="/FAIR000.png"
      />

      <div className="mx-auto max-w-5xl py-10 md:py-14 lg:py-16 px-4">
        <div className="mb-6">
          <Link href="/services">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              서비스 목록으로
            </Button>
          </Link>
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-8">
          채용부터 퇴직까지, 인사노무 리스크를 예방·대응합니다. 아래에서 <b>자문 내용</b>과{" "}
          <b>FAIR CRM을 통한 자문</b>을 확인하실 수 있습니다.
        </p>

        <LaborConsultingTabs />

        {/* CTA */}
        <section className="mt-10">
          <div className="rounded-2xl bg-primary text-primary-foreground p-6 sm:p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">{detail.title}, 전문가와 상담하세요</h2>
            <p className="text-sm sm:text-base opacity-90 mb-5">
              26년 경력의 공인노무사가 회사 상황에 맞는 해법을 함께 설계합니다.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              상담 신청하기
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
