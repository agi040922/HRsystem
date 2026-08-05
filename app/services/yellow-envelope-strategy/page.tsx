import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import PageBanner from "@/components/page-banner"
import StructuredData from "@/components/seo/structured-data"
import NewsletterLinkBlock from "@/components/newsletter-link-block"
import { pageMetadata, servicePageJsonLd } from "@/lib/seo"
import { getServiceDetail } from "@/lib/serviceDetails"
import YellowEnvelopeTabs from "./YellowEnvelopeTabs"

const detail = getServiceDetail("yellow-envelope-strategy")!

export const metadata: Metadata = pageMetadata({
  title: "노란봉투법 대응 전략수립 | 원청 사용자성·교섭의무 대응과 도급적합성 AI 간이진단",
  description:
    "개정 노조법(2026. 3. 10. 시행)에 따른 원청 사용자성 진단, 하청노조 단체교섭 요구 대응 체계, 쟁의 대비 전략, 도급구조 정비를 지원합니다. 대법원 5요소 기반 도급적합성 AI 간이진단(6문항)도 바로 확인할 수 있습니다.",
  path: "/services/yellow-envelope-strategy",
  keywords: ["노란봉투법", "개정 노조법", "원청 사용자성", "단체교섭", "위장도급", "불법파견", "사내하도급"],
})

export default function YellowEnvelopeStrategyPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <StructuredData
        data={servicePageJsonLd({
          name: detail.title,
          description: detail.subtitle,
          path: "/services/yellow-envelope-strategy",
        })}
      />
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
          개정 노조법 시대의 사내하도급·용역 리스크에 대응합니다. 아래에서 <b>서비스 내용</b>과{" "}
          <b>도급적합성 AI 간이진단</b>을 확인하실 수 있습니다.
        </p>

        <YellowEnvelopeTabs />

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

        <NewsletterLinkBlock />
      </div>
    </div>
  )
}
