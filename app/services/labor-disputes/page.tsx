import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import PageBanner from "@/components/page-banner"
import { pageMetadata } from "@/lib/seo"
import { getServiceDetail } from "@/lib/serviceDetails"
import LaborDisputesTabs from "./LaborDisputesTabs"

const detail = getServiceDetail("labor-disputes")!

export const metadata: Metadata = pageMetadata({
  title: "노동분쟁 해결 | 노동위원회 사건 대응과 FAIR의 강점",
  description:
    "부당해고·징계, 임금·퇴직금, 직장 내 괴롭힘, 근로자성 분쟁 등 노동위원회·노동청 사건에 전문적으로 대응합니다. 증거 중심 사건 구성과 판단구조를 반영한 대응 전략으로 현실적인 해결책을 제시합니다.",
  path: "/services/labor-disputes",
  keywords: ["노동분쟁", "부당해고", "노동위원회", "구제신청", "근로감독 대응", "노동청 진정"],
})

export default function LaborDisputesPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <PageBanner title={detail.title} subtitle={detail.subtitle} backgroundImage="/FAIR000.png" />

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
          노동위원회 사건과 각종 노동분쟁에 전문적으로 대응합니다. 아래에서 <b>대응 내용</b>과{" "}
          <b>FAIR의 강점</b>을 확인하실 수 있습니다.
        </p>

        <LaborDisputesTabs />

        {/* CTA */}
        <section className="mt-10">
          <div className="rounded-2xl bg-primary text-primary-foreground p-6 sm:p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">{detail.title}, 전문가와 상담하세요</h2>
            <p className="text-sm sm:text-base opacity-90 mb-5">
              27년 경력의 공인노무사가 회사 상황에 맞는 해법을 함께 설계합니다.
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
