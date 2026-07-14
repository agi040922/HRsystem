"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Scale, MonitorCheck, ChevronDown, ArrowRight, ExternalLink } from "lucide-react"
import { getServiceDetail } from "@/lib/serviceDetails"

const CONSULTING = getServiceDetail("labor-consulting")!
const CRM_URL = "https://efm.fairhr.net"

// FAIR CRM을 통한 자문 — 기존 홈피 FAIR CRM 콘텐츠 기반
type Section = { no: string; title: string; sub: string; open?: boolean; body?: string; items?: string[] }
const CRM_ADVISORY: Section[] = [
  {
    no: "1",
    title: "‘기억’이 아니라 ‘데이터’로 관리합니다",
    sub: "전화·메일로 흩어진 자문을 시스템에 자동 기록",
    open: true,
    body: "전화·이메일로 흩어진 상담은 담당자의 기억에 의존하게 되고, 담당자가 바뀌면 회사의 노무 히스토리가 끊깁니다. FAIR CRM은 자문 이력을 시스템에 자동으로 쌓아, 상담·회의·이메일 기록을 타임라인으로 정리합니다. 자문이 곧 회사의 자산이 됩니다.",
  },
  {
    no: "2",
    title: "인사노무 진단 리포트 — 리스크를 미리 감지",
    sub: "입사 전수 진단·정기 진단으로 취약 영역 정량화",
    items: [
      "입사 시 전수 진단과 정기 진단으로 문제를 조기에 감지합니다.",
      "체크리스트 기반 진단으로 취약 영역을 점수로 정량화합니다.",
      "분기 진단 리포트로 선제적 노무 개선을 이끕니다.",
    ],
  },
  {
    no: "3",
    title: "산업안전보건·법정의무 관리",
    sub: "이행 현황과 서류를 한 화면에서",
    items: [
      "산업안전보건 체크리스트와 이행 상태를 한 화면에서 확인합니다.",
      "법정 의무 이행 현황과 관련 서류를 한 번에 관리합니다.",
      "법정 기한·계약 갱신·교육 일정 누락을 사전 알림으로 방지합니다.",
    ],
  },
  {
    no: "4",
    title: "자문 + 시스템 = 분쟁에 강한 회사",
    sub: "노무사 자문과 CRM 기록의 결합",
    items: [
      "27년 경력 공인노무사의 자문과 CRM 기록이 결합됩니다.",
      "축적된 자문·진단·이행 기록이 곧 분쟁 대응의 증빙이 됩니다.",
      "‘발생 후 대응’이 아니라 ‘시스템으로 선제 관리’ — 분쟁 비용을 줄입니다.",
    ],
  },
]

type TabKey = "consulting" | "crm"

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

export default function LaborConsultingTabs() {
  const [active, setActive] = useState<TabKey>("consulting")

  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.replace("#", "")
      if (h === "consulting" || h === "crm") setActive(h)
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
      title: "자문 내용",
      desc: "규정 검토·법률 자문·법규 대응·노사협의회",
      icon: <Scale className="h-6 w-6" />,
    },
    {
      key: "crm",
      title: "FAIR CRM을 통한 자문",
      desc: "자문 이력·진단·안전관리를 시스템으로",
      icon: <MonitorCheck className="h-6 w-6" />,
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

      {/* ── 자문 내용 (기존 내용) ── */}
      {active === "consulting" && (
        <div className="mt-8">
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-8">
            {CONSULTING.intro}
          </p>
          <Accordion items={CONSULTING.sections.map((s) => ({ no: s.no, title: s.title, summary: s.summary, points: s.points }))} />
        </div>
      )}

      {/* ── FAIR CRM을 통한 자문 ── */}
      {active === "crm" && (
        <div className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              FAIR CRM을 통한 자문 — 상담이 데이터로 쌓입니다
            </h3>
            <Link
              href="/fair-crm"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-primary hover:underline"
            >
              FAIR CRM 자세히 보기 <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <p className="mt-2 mb-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
            FAIR의 자문은 상담으로 끝나지 않습니다. 27년 경력 노무사가 설계한 인사노무 CRM에 자문 이력과
            진단·안전관리까지 쌓여, 회사의 노무 관리가 ‘기억’이 아니라 ‘시스템’으로 이어집니다.
          </p>

          <Accordion items={CRM_ADVISORY.map((s) => ({ no: s.no, title: s.title, summary: s.sub, body: s.body, points: s.items, open: s.open }))} />

          <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
            <p className="text-sm leading-relaxed text-gray-700">
              <b>자문과 시스템을 한 곳에서.</b> FAIR CRM으로 자문 이력·진단·산업안전 관리를 통합해 보세요.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <Link
                href="/fair-crm"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                FAIR CRM 살펴보기
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={CRM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-primary/40 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
              >
                CRM 로그인 (기존 고객)
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
