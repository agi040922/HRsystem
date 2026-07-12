import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import PageBanner from "@/components/page-banner"
import { ServiceDonut } from "@/components/service-donut"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "프리랜서 진단과 관리 | 근로자성 리스크 진단·계약·명부 관리",
  description:
    "프리랜서를 법에 맞게 체계적으로 관리해 드립니다. 근로자성 AI 진단, 검증된 계약서 생성, 프리랜서 명부·증빙자료 상시 관리, 입증서류 점검, AI 감독관 종합 점검, 법·판례 업데이트까지 한 곳에서.",
  path: "/services/freelancer",
  keywords: ["프리랜서 관리", "근로자성 진단", "가짜 3.3", "프리랜서 계약서", "프리랜서 명부"],
})

const STEPS = [
  {
    no: "01",
    color: "#1e40af",
    title: "근로자성 위험에 대한 AI 진단",
    desc: "예/아니오 문항으로 프리랜서 계약의 적합성을 자가진단. 노무사 설계 로직 기반, AI 보조.",
  },
  {
    no: "02",
    color: "#2563eb",
    title: "근로자성 분쟁 예방을 위한 검증된 계약서 생성",
    desc: "27년 경력의 노무사가 검증한 계약서 생성.",
  },
  {
    no: "03",
    color: "#14b8a6",
    title: "근로감독과 분쟁에 대비한 운영 및 증빙자료 관리",
    badges: ["상시 관리 허브", "프리랜서 명부 제공"],
    desc: "수탁자·계약·수수료 상시 관리 + 운영 메뉴얼 + 원천징수 신고서류 작성.",
    highlight: true,
  },
  {
    no: "04",
    color: "#6366f1",
    title: "입증서류 체크",
    desc: "법에 맞는 관리에 필요한 서류 점검.",
  },
  {
    no: "05",
    color: "#0ea5e9",
    title: "T백신 AI 감독관 — 기존 자료 종합 점검",
    desc: "생성·업로드한 위탁계약서와 구인공고, 운영·증빙자료를 판례와 정부의 가이드라인으로 종합 점검하고 위험조항·수정문구를 제시. 비저장·자동삭제.",
  },
  {
    no: "06",
    color: "#8b5cf6",
    title: "법개정과 판례 및 정부의 가이드라인 변경에 따른 업데이트",
    desc: "법·판례 변경을 반영해 다시 진단.",
  },
]

export default function FreelancerServicePage() {
  return (
    <div className="w-full overflow-x-hidden">
      <PageBanner
        title="프리랜서 진단과 관리"
        subtitle="프리랜서를 법에 맞게 체계적으로 관리해 드립니다"
        backgroundImage="/FAIR000.png"
      />

      <div className="container-fluid max-w-6xl py-10 md:py-14 lg:py-16 px-4">
        <div className="mb-6">
          <Link href="/services">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              서비스 목록으로
            </Button>
          </Link>
        </div>

        <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-muted-foreground mb-10">
          프리랜서를 법에 맞게 체계적으로 관리해 드립니다. 진단·계약서·명부·준비서류를 한 곳에서 —
          등록된 프리랜서를 계약유형·진단결과·계약상태까지 한 명부에서 상시 관리합니다.
        </p>

        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[minmax(0,360px)_1fr] items-start">
          {/* 순환 다이어그램 */}
          <div className="lg:sticky lg:top-28">
            <ServiceDonut />
          </div>

          {/* 6단계 카드 */}
          <div className="space-y-3.5">
            {STEPS.map((step) => (
              <div
                key={step.no}
                className={`flex items-start gap-4 rounded-2xl border p-5 ${
                  step.highlight ? "border-teal-200 bg-teal-50/60" : "border-gray-200 bg-white"
                }`}
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                  style={{ backgroundColor: step.color }}
                >
                  {step.no}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-gray-900">{step.title}</h3>
                    {step.badges?.map((b, i) => (
                      <span
                        key={b}
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          i === 0 ? "bg-teal-100 text-teal-700" : "bg-indigo-100 text-indigo-700"
                        }`}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

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
