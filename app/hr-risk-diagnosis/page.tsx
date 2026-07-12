import type { Metadata } from "next"
import PageBanner from "@/components/page-banner"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "HR 리스크 진단 | FAIR인사노무컨설팅",
  description: "기업의 인사노무 리스크를 진단합니다.",
  path: "/hr-risk-diagnosis",
  keywords: ["HR 리스크 진단", "인사노무 진단"],
})

export default function HrRiskDiagnosisPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <PageBanner
        title="HR 리스크 진단"
        subtitle="기업의 인사노무 리스크를 진단합니다"
        backgroundImage="/FAIR000.png"
      />

      <div className="mx-auto max-w-4xl py-20 md:py-28 px-4 text-center">
        <p className="text-lg font-semibold text-gray-900">페이지 준비 중입니다.</p>
        <p className="mt-2 text-sm text-muted-foreground">곧 HR 리스크 진단 콘텐츠가 제공됩니다.</p>
      </div>
    </div>
  )
}
