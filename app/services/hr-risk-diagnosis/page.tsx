import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calculator, ShieldCheck, UserCheck } from "lucide-react"
import PageBanner from "@/components/page-banner"
import { pageMetadata } from "@/lib/seo"
import OrdinaryWageCalc from "./OrdinaryWageCalc"
import SafetyQuickDiagnosis from "./SafetyQuickDiagnosis"
import FreelancerQuickDiagnosis from "./FreelancerQuickDiagnosis"

export const metadata: Metadata = pageMetadata({
  title: "HR 리스크 진단 | 통상임금·산업안전·근로자성 간이진단",
  description:
    "통상임금·평균임금 간이 계산, 산업안전 간이진단, 프리랜서 근로자성 간이진단을 한 곳에서. 회원가입 없이 바로 확인하고, 정확한 진단은 FAIR인사노무컨설팅이 도와드립니다.",
  path: "/services/hr-risk-diagnosis",
  keywords: ["HR 리스크 진단", "통상임금 계산", "산업안전 진단", "근로자성 진단", "간이진단"],
})

function SectionHead({
  no,
  icon,
  title,
  desc,
}: {
  no: string
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          <span className="mr-1.5 text-primary">{no}.</span>
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  )
}

export default function HrRiskDiagnosisPage() {
  return (
    <div className="w-full overflow-x-hidden">
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

        <section id="ordinary-wage" className="mb-14 scroll-mt-28">
          <SectionHead
            no="1"
            icon={<Calculator className="h-6 w-6" />}
            title="통상임금과 평균임금 간이 진단"
            desc="임금항목별로 통상임금·평균임금 산입 여부를 5대 기준에 따라 자동 판정합니다. (FAIR CRM 판단기)"
          />
          <OrdinaryWageCalc />
        </section>

        <section id="safety" className="mb-14 scroll-mt-28">
          <SectionHead
            no="2"
            icon={<ShieldCheck className="h-6 w-6" />}
            title="산업안전 간이진단"
            desc="핵심 안전보건 의무 10가지를 이행하고 있는지 ‘예/아니오’로 점검합니다."
          />
          <SafetyQuickDiagnosis />
        </section>

        <section id="freelancer" className="mb-14 scroll-mt-28">
          <SectionHead
            no="3"
            icon={<UserCheck className="h-6 w-6" />}
            title="프리랜서 근로자성 간이 진단"
            desc="업무 방식 6가지 문항으로 3.3 프리랜서 관계의 근로자성 위험을 점검합니다."
          />
          <FreelancerQuickDiagnosis />
        </section>

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
      </div>
    </div>
  )
}
