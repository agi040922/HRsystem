import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import PageBanner from "@/components/page-banner"
import StructuredData from "@/components/seo/structured-data"
import NewsletterLinkBlock from "@/components/newsletter-link-block"
import { pageMetadata, servicePageJsonLd } from "@/lib/seo"
import { getServiceDetail } from "@/lib/serviceDetails"
import HrConsultingTabs from "./HrConsultingTabs"

const detail = getServiceDetail("hr-consulting")!

export const metadata: Metadata = pageMetadata({
  title: "인사노무 컨설팅 · HR 테크 | 제도 설계부터 ERP 구축까지",
  description:
    "채용·평가·보상 등 인사제도를 설계하는 데서 끝나지 않습니다. 컨설팅으로 설계한 제도를 그대로 담은 맞춤형 ERP를 직접 구축해, 효율적이고 체계적인 성과관리를 현장에서 작동시킵니다. HR 전문성과 IT 기술의 결합.",
  path: "/services/hr-consulting",
  keywords: ["인사노무 컨설팅", "HR 테크", "성과관리 ERP", "인사제도 설계", "성과관리 시스템", "HR IT"],
})

export default function HrConsultingPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <StructuredData
        data={servicePageJsonLd({
          name: detail.title,
          description: detail.subtitle,
          path: "/services/hr-consulting",
        })}
      />
      <PageBanner
        title={detail.title}
        subtitle="제도 설계(컨설팅)부터 ERP 구축(HR 테크)까지"
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
          단순한 컨설팅이 아닙니다. 아래에서 <b>인사노무 컨설팅</b>(제도 설계·정착)과{" "}
          <b>HR 테크</b>(컨설팅 결과에 따른 ERP 설계·구축)를 확인하실 수 있습니다.
        </p>

        <HrConsultingTabs />

        {/* CTA */}
        <section className="mt-10">
          <div className="rounded-2xl bg-primary text-primary-foreground p-6 sm:p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">{detail.title}, 전문가와 상담하세요</h2>
            <p className="text-sm sm:text-base opacity-90 mb-5">
              27년 경력의 공인노무사가 제도 설계부터 시스템 구축까지 회사 상황에 맞게 함께합니다.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              상담 신청하기
            </Link>
          </div>
        </section>

        <NewsletterLinkBlock />
      </div>
    </div>
  )
}
