import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import PageBanner from "@/components/page-banner"
import StructuredData from "@/components/seo/structured-data"
import NewsletterLinkBlock from "@/components/newsletter-link-block"
import { pageMetadata, servicePageJsonLd } from "@/lib/seo"
import DiagnosisTabs from "./DiagnosisTabs"

export const metadata: Metadata = pageMetadata({
  title: "HR 리스크 진단 | 통상임금·산업안전·근로자성 간이진단",
  description:
    "통상임금·평균임금 간이 계산, 산업안전 간이진단, 프리랜서 근로자성 간이진단을 한 곳에서. 회원가입 없이 바로 확인하고, 정확한 진단은 FAIR인사노무컨설팅이 도와드립니다.",
  path: "/services/hr-risk-diagnosis",
  keywords: ["HR 리스크 진단", "통상임금 계산", "산업안전 진단", "근로자성 진단", "간이진단"],
})

export default function HrRiskDiagnosisPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <StructuredData
        data={servicePageJsonLd({
          name: "HR 리스크 진단",
          description: "통상임금·산업안전·근로자성을 간단히 자가진단해 보세요",
          path: "/services/hr-risk-diagnosis",
        })}
      />
      <PageBanner
        title="HR 리스크 진단"
        subtitle="통상임금·산업안전·근로자성을 간단히 자가진단해 보세요"
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

        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-10">
          회원가입 없이 바로 확인할 수 있는 간이진단입니다. 응답은 저장되지 않으며, 참고용 결과를
          제공합니다. 정확한 진단·자문은 FAIR인사노무컨설팅이 도와드립니다.
        </p>

        <div className="mb-14">
          <DiagnosisTabs />
        </div>

        {/* CTA */}
        <section>
          <div className="rounded-2xl bg-primary text-primary-foreground p-6 sm:p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">정확한 진단이 필요하신가요?</h2>
            <p className="text-sm sm:text-base opacity-90 mb-5">
              간이진단은 참고용입니다. 26년 경력의 공인노무사가 회사 상황에 맞게 정밀하게 진단하고
              대응 방안을 설계합니다.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              전문가 상담 신청하기
            </Link>
          </div>
        </section>

        <NewsletterLinkBlock />
      </div>
    </div>
  )
}
