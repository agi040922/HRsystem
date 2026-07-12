import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import PageBanner from "@/components/page-banner"
import { pageMetadata } from "@/lib/seo"
import HarassmentTabs from "./HarassmentTabs"

export const metadata: Metadata = pageMetadata({
  title: "직장 내 괴롭힘 조사 수행 | 조사 절차와 수행 사례",
  description:
    "고용노동부 「직장 내 괴롭힘 예방·대응 매뉴얼」과 근로기준법 제76조의2·제76조의3을 기준으로 한 5단계 조사 절차와, FAIR인사노무컨설팅이 수행한 직장 내 괴롭힘 조사 사례를 안내합니다.",
  path: "/services/workplace-harassment",
  keywords: ["직장 내 괴롭힘", "괴롭힘 조사", "직장 내 괴롭힘 조사 절차", "괴롭힘 조사 사례", "셀프조사", "노무 자문"],
})

export default function WorkplaceHarassmentPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <PageBanner
        title="직장 내 괴롭힘 조사 수행"
        subtitle="신고 접수부터 상담·조사·조치·모니터링까지, 법에 맞는 사건 처리 절차"
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
          누구든 신고할 수 있고, 신고가 없어도 인지 시 접수됩니다. 아래에서 <b>조사 절차</b>와{" "}
          <b>수행 사례</b>를 확인하실 수 있습니다.
        </p>

        <HarassmentTabs />

        {/* CTA */}
        <section className="mt-10">
          <div className="rounded-2xl bg-primary text-primary-foreground p-6 sm:p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              직장 내 괴롭힘 조사, 전문가와 함께 하세요
            </h2>
            <p className="text-sm sm:text-base opacity-90 mb-5">
              대표·임원이 신고 대상이거나 사안이 복잡할수록 외부 전문가의 객관적 조사가 필요합니다.
              FAIR인사노무컨설팅이 접수부터 조사·조치·모니터링까지 지원합니다.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              조사·자문 상담 신청하기
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
