"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { GlobalHqVisual, DiagnosisVisual, DisputeVisual } from "./audience-visuals"

/**
 * 홈 — "어떤 고객에게, 무엇을" 지그재그 섹션.
 *
 * 기존 ServiceFinderSection(아이콘 10개 그리드)을 이 섹션이 흡수한다.
 * 아이콘만 나열하면 방문자가 자기 상황을 못 찾으므로, **고객 유형 → 그 사람의 문제
 * → FAIR가 하는 일 → 해당 서비스** 순으로 읽히게 바꾼다.
 * 기존 10개 서비스 링크는 하나도 빠짐없이 4개 블록에 나눠 담았다(경로 변경 없음).
 */

type Block = {
  eyebrow: string
  title: string
  situation: string
  body: string
  services: { label: string; href: string }[]
  /** 시각물 — SVG 목업이거나 실제 제품 화면. */
  visual: React.ReactNode
}

const BLOCKS: Block[] = [
  {
    eyebrow: "외국계기업",
    title: "본사 정책과 한국 노동법 사이",
    situation: "본사는 글로벌 스탠다드를 요구하는데, 한국 노동법은 다르게 말합니다.",
    body: "양쪽을 다 아는 사람이 필요합니다. 한국법 기준으로 판단하고, 본사가 납득할 수 있는 형태로 정리해 드립니다.",
    services: [
      { label: "상시 노무자문", href: "/services/labor-consulting" },
      { label: "통상임금·평균임금", href: "/services/hr-risk-diagnosis#ordinary-wage" },
      { label: "포괄임금", href: "/services/payroll-system#pogwal" },
    ],
    visual: <GlobalHqVisual />,
  },
  {
    eyebrow: "프리랜서·유연인력",
    title: "3.3 계약, 이제 회사가 입증해야 합니다",
    situation: "근로자 추정제로 입증책임이 사용자에게 넘어왔습니다.",
    body: "계약서만 바꿔서는 막지 못합니다. 실제 운영방식을 진단하고, 나중에 근거로 쓸 자료를 계약 시점부터 남기도록 설계합니다.",
    services: [
      { label: "프리랜서·3.3", href: "/services/freelancer" },
      { label: "근로자 추정제", href: "/services/freelancer#presumption" },
    ],
    visual: <DiagnosisVisual />,
  },
  {
    eyebrow: "분쟁·근로감독",
    title: "이미 벌어진 일에는 순서가 있습니다",
    situation: "해고, 괴롭힘 신고, 중대재해 — 초기 대응이 결과를 가릅니다.",
    body: "사실관계 정리부터 노동위원회 서면과 심문회의까지, 사건을 직접 처리해 온 방식 그대로 대응합니다.",
    services: [
      { label: "해고·징계", href: "/services/labor-disputes" },
      { label: "직장 내 괴롭힘", href: "/services/workplace-harassment" },
      { label: "산업안전·중대재해", href: "/services/serious-accident-law" },
    ],
    visual: <DisputeVisual />,
  },
  {
    eyebrow: "HR테크·인사제도",
    title: "자문에서 끝내지 않고 시스템까지",
    situation: "진단은 받았는데, 그다음 관리할 도구가 없습니다.",
    body: "노무법인이 직접 만든 시스템으로 진단 결과를 제도에 반영하고 운영까지 이어 갑니다.",
    services: [
      { label: "인사제도·HR 테크", href: "/services/hr-consulting" },
      { label: "임금피크제", href: "/services/payroll-system#peak" },
    ],
    visual: (
      /* 섹션 A(왜 FAIR인가)가 CRM 대시보드 영상을 쓰므로, 여기는 같은 화면을 피해
         진단 보고서 화면을 쓴다 — 같은 스크린샷이 홈에 두 번 나오지 않게. */
      <img
        src="/crm/diagnosis-report.png"
        alt="FAIR CRM 인사노무 진단 보고서 화면"
        className="h-full w-full object-cover object-top"
        loading="lazy"
      />
    ),
  },
]

export default function AudienceSection() {
  return (
    <section id="audience" className="w-full bg-white py-14 md:py-20">
      <div className="container-fluid max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-3xl md:mb-16"
        >
          <h2 className="text-2xl font-bold leading-snug text-gray-900 [word-break:keep-all] sm:text-3xl md:text-4xl">
            어떤 상황이신가요
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground [word-break:keep-all] md:text-lg">
            고객이 가장 자주 찾는 네 가지 상황입니다. 해당하는 곳에서 바로 서비스로 이동하실 수 있습니다.
          </p>
        </motion.div>

        <div className="flex flex-col gap-14 md:gap-24">
          {BLOCKS.map((block, index) => {
            const isReversed = index % 2 === 1
            return (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`grid grid-cols-1 items-center gap-7 md:grid-cols-2 md:gap-12 lg:gap-16 ${
                  isReversed ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* 시각물 */}
                <div className="relative aspect-video overflow-hidden rounded-2xl border border-border/50 bg-slate-50 shadow-sm">
                  {block.visual}
                </div>

                {/* 문구 */}
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-primary">
                    {block.eyebrow}
                  </p>
                  <h3 className="mt-3 text-xl font-bold leading-snug text-gray-900 [word-break:keep-all] sm:text-2xl md:text-3xl">
                    {block.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium text-gray-700 [word-break:keep-all] md:text-base">
                    {block.situation}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground [word-break:keep-all] md:text-base">
                    {block.body}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {block.services.map((s) => (
                      <li key={s.href}>
                        <Link
                          href={s.href}
                          className="group inline-flex items-center gap-1 rounded-full border border-blue-900/25 bg-white px-3.5 py-2 text-[13px] font-semibold text-gray-900 transition-all hover:border-primary hover:text-primary hover:shadow-sm md:text-sm"
                        >
                          {s.label}
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
