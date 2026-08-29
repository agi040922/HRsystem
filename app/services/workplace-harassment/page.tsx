import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import PageBanner from "@/components/page-banner"
import StructuredData from "@/components/seo/structured-data"
import NewsletterLinkBlock from "@/components/newsletter-link-block"
import { pageMetadata, servicePageJsonLd } from "@/lib/seo"
import HarassmentTabs from "./HarassmentTabs"

export const metadata: Metadata = pageMetadata({
  title: "직장 내 괴롭힘 조사 수행 | 조사 절차와 수행 사례",
  description:
    "고용노동부 「직장 내 괴롭힘 예방·대응 매뉴얼」과 근로기준법 제76조의2·제76조의3을 기준으로 한 5단계 조사 절차와, FAIR인사노무컨설팅이 수행한 직장 내 괴롭힘 조사 사례를 안내합니다.",
  path: "/services/workplace-harassment",
  // 검색 유입 목표 키워드(CEO 지시 2026-08-13 — 직장 내 괴롭힘 센터는 마케팅 목적).
  // 실제 검색되는 말로 적는다. 내부 용어("셀프조사" 등)만 넣으면 아무도 못 찾는다.
  keywords: [
    "직장 내 괴롭힘 조사",
    "직장 내 괴롭힘 신고",
    "괴롭힘 조사 노무사",
    "직장 내 괴롭힘 외부조사",
    "직장 내 괴롭힘 조사 절차",
    "괴롭힘 조사 보고서",
    "직장 내 괴롭힘 대응",
    "노무법인 괴롭힘 조사",
    "직장 내 괴롭힘 허위신고",
    "괴롭힘 반복 신고 징계",
  ],
})

export default function WorkplaceHarassmentPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <StructuredData
        data={servicePageJsonLd({
          name: "직장 내 괴롭힘 조사 수행",
          description: "신고 접수부터 상담·조사·조치·모니터링까지, 법에 맞는 사건 처리 절차",
          path: "/services/workplace-harassment",
        })}
      />
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
          누구든 신고할 수 있고, 신고가 없어도 인지 시 접수됩니다. 아래에서 <b>조사 절차</b>,{" "}
          <b>수행 사례</b>, <b>FAIR 강점</b>을 확인하실 수 있습니다.
        </p>

        <HarassmentTabs />

        {/* 예방교육으로 연결 — 조사(사후)와 교육(사전)을 서로 잇는다.
            내부 링크가 양쪽 페이지의 검색 노출을 함께 끌어올린다(CEO 지시 2026-08-13). */}
        <section className="mt-10 rounded-2xl border border-border/60 bg-gray-50 p-6 sm:p-8">
          <h2 className="break-keep text-lg sm:text-xl font-bold text-gray-900 mb-2">
            사건이 생기기 전이라면
          </h2>
          <p className="break-keep text-sm sm:text-base leading-relaxed text-gray-700 mb-4">
            조사는 이미 벌어진 일을 다룹니다. 관리자가 기준을 모르면 악의가 없어도 사건이
            생깁니다. 사업장으로 찾아가는 예방교육을 함께 검토해 보세요.
          </p>
          <Link
            href="/services/harassment-training"
            className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-primary hover:underline"
          >
            직장 내 괴롭힘 예방교육 보기 <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

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

        <NewsletterLinkBlock />
      </div>
    </div>
  )
}
