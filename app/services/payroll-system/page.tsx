import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import PageBanner from "@/components/page-banner"
import { pageMetadata } from "@/lib/seo"
import { getServiceDetail } from "@/lib/serviceDetails"
import PayrollTabs from "./PayrollTabs"

const detail = getServiceDetail("payroll-system")!

export const metadata: Metadata = pageMetadata({
  title: "급여체계 컨설팅 | 통상·평균임금·포괄임금·임금피크제",
  description:
    "통상임금·평균임금 산정과 급여체계 정비를 넘어, 포괄임금 오남용 방지(고용노동부 지도지침)와 최근 대법원 판결(2024·2026)을 반영한 임금피크제까지 법에 맞게 컨설팅합니다.",
  path: "/services/payroll-system",
  keywords: ["급여체계 컨설팅", "포괄임금", "임금피크제", "통상임금", "평균임금", "임금체불 예방"],
})

export default function PayrollSystemPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <PageBanner
        title={detail.title}
        subtitle="급여체계 정비 · 포괄임금 · 임금피크제"
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
          급여체계 산정 오류는 곧바로 임금체불·소급지급 리스크로 이어집니다. 아래에서 <b>컨설팅 내용</b>과{" "}
          <b>포괄임금 관련 컨설팅</b>, <b>임금피크제 관련 컨설팅</b>을 확인하실 수 있습니다.
        </p>

        <PayrollTabs />

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
