import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import PageBanner from "@/components/page-banner"
import { pageMetadata } from "@/lib/seo"
import FreelancerTabs from "./FreelancerTabs"

export const metadata: Metadata = pageMetadata({
  title: "프리랜서 진단과 관리 | 근로자 추정제 대비·근로자성 진단·명부 관리",
  description:
    "다가오는 근로자 추정제(입증책임 전환)에 대비해 프리랜서를 법에 맞게 체계적으로 관리해 드립니다. 근로자성 AI 진단, 검증된 계약서 생성, 프리랜서 명부·증빙자료 상시 관리, 입증서류 점검, AI 감독관 종합 점검, 법·판례 업데이트까지 한 곳에서.",
  path: "/services/freelancer",
  keywords: ["프리랜서 관리", "근로자 추정제", "근로자성 진단", "가짜 3.3", "프리랜서 계약서", "프리랜서 명부"],
})

export default function FreelancerServicePage() {
  return (
    <div className="w-full overflow-x-hidden">
      <PageBanner
        title="프리랜서 진단과 관리"
        subtitle="프리랜서를 법에 맞게 체계적으로 관리해 드립니다"
        backgroundImage="/FAIR000.png"
      />

      <div className="mx-auto max-w-5xl py-10 md:py-14 lg:py-16 px-4">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <Link href="/services">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              서비스 목록으로
            </Button>
          </Link>
          <a href="https://freelancer.plustai.com" target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground">
              프리랜서 백신 바로가기
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </a>
        </div>

        <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-muted-foreground mb-8">
          다가오는 <b>근로자 추정제</b>(입증책임 전환)에 대비해, 프리랜서를 법에 맞게 체계적으로 관리해
          드립니다. 아래에서 <b>근로자 추정제</b> 요약과 <b>프리랜서 관리 매뉴얼</b>을 확인하실 수 있습니다.
        </p>

        <FreelancerTabs />

        {/* CTA */}
        <section className="mt-12">
          <div className="rounded-2xl bg-primary text-primary-foreground p-6 sm:p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              우리 회사 프리랜서, 진짜 프리랜서일까요?
            </h2>
            <p className="text-sm sm:text-base opacity-90 mb-5">
              계약서의 이름이 아니라 실제 운영 방식이 근로자성을 결정합니다. 지금 무료로 자가진단하고,
              계약부터 명부·증빙까지 한 곳에서 관리해 보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href="https://freelancer.plustai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                프리랜서 근로자성 진단 시작하기
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="inline-block border border-white/70 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                자문 상담 신청
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
