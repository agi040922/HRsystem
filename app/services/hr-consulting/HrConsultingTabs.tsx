"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Briefcase, Cpu, ChevronDown, ArrowRight } from "lucide-react"
import { getServiceDetail } from "@/lib/serviceDetails"

const CONSULTING = getServiceDetail("hr-consulting")!

// HR 테크 — 컨설팅으로 설계 → ERP로 구축
type Section = { no: string; title: string; sub: string; open?: boolean; body?: string; items?: string[] }
const HRTECH: Section[] = [
  {
    no: "1",
    title: "컨설팅에서 끝나지 않습니다 — ERP까지 구축합니다",
    sub: "보고서가 아니라, 돌아가는 시스템으로",
    open: true,
    body: "대부분의 인사 컨설팅은 진단서·보고서에서 멈춥니다. 그러나 제도(HR)와 시스템(IT)이 따로 놀면 현장에서 작동하지 않습니다. FAIR는 컨설팅으로 설계한 인사·성과 제도를, 그 설계 그대로 담은 맞춤형 ERP로 ‘설계 → 구축 → 운영’까지 완결해 드립니다.",
  },
  {
    no: "2",
    title: "FAIR의 3단계 — 진단·설계 → 구축 → 운영",
    sub: "컨설팅과 IT 개발을 한 팀이 함께",
    items: [
      "① 컨설팅(설계) — 직무분석·평가·보상·성과관리 제도를 27년 경력 공인노무사가 회사 규모·업종에 맞게 설계합니다.",
      "② 구축(IT) — 설계한 제도를 그대로 담은 맞춤형 ERP·성과관리 시스템을 직접 개발·구축합니다. 남의 표준 패키지에 회사를 끼워 맞추지 않습니다.",
      "③ 운영·정착 — 데이터 축적, 법·판례 개정 반영, 지속 업데이트와 관리자 코칭으로 현장에 안착시킵니다.",
    ],
  },
  {
    no: "3",
    title: "왜 HR과 IT를 결합해야 하나",
    sub: "제도 없는 IT는 껍데기, 시스템 없는 제도는 서랍 속 보고서",
    body: "노무 전문성이 ‘무엇을·왜’ 설계하고, 기술이 그것을 ‘어떻게’ 구현해야 성과관리가 비로소 효율적·체계적으로 돌아갑니다. 설계자와 개발자가 분리되면 제도와 시스템 사이에 간극이 생기지만, FAIR는 노무사가 직접 설계하고 개발까지 관여하므로 그 간극이 없습니다.",
  },
  {
    no: "4",
    title: "성과관리, 이렇게 한 흐름으로",
    sub: "직무분석 → 평가 → 성과 → 임직원 포털",
    items: [
      "직무분석 — 역할·책임과 평가요소를 정의해 ‘무엇을 평가할지’를 명확히 합니다.",
      "평가관리 — KPI/OKR·역량 평가, 중간점검, 이의제기·피드백을 시스템으로 운영합니다.",
      "성과관리 — 목표–실적을 추적하고 보상과 합리적으로 연계합니다.",
      "임직원 포털 — 구성원이 자신의 목표·평가·피드백을 직접 확인해 투명성과 수용성을 높입니다.",
    ],
  },
  {
    no: "5",
    title: "FAIR HR 테크 라인업 — 이미 만들어 운영 중입니다",
    sub: "구축 역량의 증거",
    items: [
      "성과관리 ERP — 직무분석·평가·성과·임직원 포털을 한 흐름으로 통합.",
      "FAIR CRM — 자문 이력·인사노무 진단·산업안전 기록을 통합 관리.",
      "HR 리스크 진단기 — 통상임금·산업안전·근로자성을 자가진단.",
      "위치기반 근태 시스템 — 주 52시간·포괄임금 분쟁 대비 실근로시간 관리.",
      "AI 백신·감독관 — 프리랜서·직장 내 괴롭힘·산업안전 등 리스크를 AI로 진단·점검.",
    ],
  },
  {
    no: "6",
    title: "FAIR만의 장점",
    sub: "노무 전문성 × 자체 기술",
    items: [
      "노무사가 직접 설계·개발 — 제도와 시스템의 간극이 없습니다.",
      "법·판례가 시스템에 내장 — 판정 로직이 근로기준법·노동위원회 판례 기준으로 설계됩니다.",
      "데이터가 곧 증빙 — 축적된 기록을 근로감독·분쟁 대응에 즉시 활용합니다.",
      "회사에 맞춘 커스터마이징 — 규모·업종별로 꼭 필요한 기능만 설계·구축합니다.",
    ],
  },
]

type TabKey = "consulting" | "hr-tech"

function Accordion({ items }: { items: { no: string; title: string; summary: string; points?: string[]; body?: string; open?: boolean }[] }) {
  return (
    <div className="space-y-3">
      {items.map((s) => (
        <details key={s.no} open={s.open} className="group rounded-2xl border border-blue-900 bg-white">
          <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-4 [&::-webkit-details-marker]:hidden">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
              {s.no}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-base font-bold text-gray-900">{s.title}</span>
              <span className="mt-0.5 block text-xs sm:text-sm text-muted-foreground">{s.summary}</span>
            </span>
            <ChevronDown aria-hidden className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
          </summary>
          {s.body && (
            <div className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-600">{s.body}</div>
          )}
          {s.points && (
            <ul className="space-y-2.5 border-t border-gray-100 px-5 py-4">
              {s.points.map((point, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-600">
                  <span aria-hidden className="mt-0.5 shrink-0 text-primary">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </details>
      ))}
    </div>
  )
}

export default function HrConsultingTabs() {
  const [active, setActive] = useState<TabKey>("consulting")

  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.replace("#", "")
      if (h === "consulting" || h === "hr-tech") setActive(h)
    }
    sync()
    window.addEventListener("hashchange", sync)
    return () => window.removeEventListener("hashchange", sync)
  }, [])

  const select = (key: TabKey) => {
    setActive(key)
    if (typeof window !== "undefined" && window.location.hash !== `#${key}`) {
      window.history.replaceState(null, "", `#${key}`)
    }
  }

  const TABS: { key: TabKey; title: string; desc: string; icon: React.ReactNode }[] = [
    {
      key: "consulting",
      title: "인사노무 컨설팅",
      desc: "채용·평가·보상 제도 설계와 정착",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      key: "hr-tech",
      title: "HR 테크",
      desc: "컨설팅으로 설계하고 ERP로 구축",
      icon: <Cpu className="h-6 w-6" />,
    },
  ]

  return (
    <div>
      {/* 2개 선택 상자 — 옆으로 나란히 */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {TABS.map((t) => {
          const isActive = t.key === active
          return (
            <button
              key={t.key}
              id={t.key}
              type="button"
              onClick={() => select(t.key)}
              aria-pressed={isActive}
              className={`scroll-mt-28 flex items-center gap-3 rounded-2xl border p-4 sm:p-5 text-left transition-all ${
                isActive
                  ? "border-primary bg-primary/5 ring-2 ring-primary/30 shadow-sm"
                  : "border-blue-900 bg-white hover:border-primary hover:bg-primary/5"
              }`}
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                  isActive ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                }`}
              >
                {t.icon}
              </div>
              <div className="min-w-0">
                <div className="text-sm sm:text-base font-bold text-gray-900 leading-tight">{t.title}</div>
                <div className="mt-0.5 text-xs sm:text-sm text-muted-foreground">{t.desc}</div>
              </div>
            </button>
          )
        })}
      </div>

      {/* ── 인사노무 컨설팅 (기존 내용) ── */}
      {active === "consulting" && (
        <div className="mt-8">
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-8">
            {CONSULTING.intro}
          </p>
          <Accordion items={CONSULTING.sections.map((s) => ({ no: s.no, title: s.title, summary: s.summary, points: s.points }))} />
        </div>
      )}

      {/* ── HR 테크 ── */}
      {active === "hr-tech" && (
        <div className="mt-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">
            HR × IT — 컨설팅으로 설계하고, ERP로 구축합니다
          </h3>
          <p className="mt-2 mb-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
            FAIR인사노무컨설팅은 ‘진단·설계’에서 멈추지 않습니다. 컨설팅으로 설계한 제도를 그대로 담은
            맞춤형 ERP를 직접 구축해, 효율적이고 체계적인 성과관리를 현장에서 작동시킵니다.
          </p>

          <Accordion items={HRTECH.map((s) => ({ no: s.no, title: s.title, summary: s.sub, body: s.body, points: s.items, open: s.open }))} />

          <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
            <p className="text-sm leading-relaxed text-gray-700">
              <b>컨설팅과 시스템을 한 곳에서.</b> 제도 설계부터 ERP 구축, 운영·정착까지 FAIR가 함께합니다.
              우리 회사에 맞는 성과관리 체계가 필요하시면 지금 상담해 보세요.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              HR 테크 도입 상담하기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
