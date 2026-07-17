"use client"

import { useEffect, useState } from "react"
import { Scale, Award, ChevronDown } from "lucide-react"
import { getServiceDetail } from "@/lib/serviceDetails"

const DISPUTES = getServiceDetail("labor-disputes")!

type Sec = { no: string; title: string; sub: string; open?: boolean; body?: string }

// FAIR의 강점 — 노동사건 수행 원칙
const STRENGTHS: Sec[] = [
  {
    no: "1",
    title: "사건의 핵심을 빠르게 파악합니다",
    sub: "주장 반복이 아니라 객관적 분석",
    open: true,
    body: "의뢰인의 주장만 반복하기보다 사건 전체를 객관적으로 분석합니다. 불리한 사실과 취약한 증거까지 먼저 확인하여, 실제 판단기관이 사건을 어떻게 바라볼지를 기준으로 대응전략을 수립합니다.",
  },
  {
    no: "2",
    title: "주장보다 증거를 중심으로 사건을 구성합니다",
    sub: "결과를 가르는 것은 뒷받침 자료",
    body: "노동사건의 결과는 주장 자체보다 이를 뒷받침하는 자료에 따라 달라질 수 있습니다. 계약서, 취업규칙, 인사자료, 이메일, 문자메시지, 녹취록, 급여자료 등 각종 증거를 면밀히 검토하고, 사실관계와 법리를 일관된 구조로 정리합니다.",
  },
  {
    no: "3",
    title: "노동위원회와 노동청의 판단구조를 반영합니다",
    sub: "사건 유형별 판단기준·입증방법",
    body: "부당해고, 징계, 임금, 직장 내 괴롭힘, 근로자성 등 사건 유형에 따라 판단기준과 입증방법은 달라집니다. 사건별 쟁점을 정확히 구분하고, 조사관·근로감독관·노동위원회가 확인하는 핵심사항을 중심으로 의견서와 이유서를 작성합니다.",
  },
  {
    no: "4",
    title: "법률적 승리와 현실적 해결을 함께 고려합니다",
    sub: "소송·심판·진정·합의 중 최적안",
    body: "모든 사건을 장기적인 다툼으로 이끄는 것이 최선은 아닙니다. 승소 가능성, 소요기간, 비용, 조직에 미치는 영향, 합의 가능성을 종합적으로 검토하여 소송·심판·진정·합의 중 가장 적합한 해결방식을 제안합니다.",
  },
  {
    no: "5",
    title: "기업 인사·노무 경험을 바탕으로 입체적으로 대응합니다",
    sub: "분쟁 해결을 넘어 제도 개선까지",
    body: "개별 사건만 보는 것이 아니라 채용, 근로계약, 평가, 징계, 해고, 임금, 퇴직 등 인사관리 전반과 연결하여 사건을 분석합니다. 이를 통해 현재의 분쟁을 해결하는 데 그치지 않고, 같은 문제가 다시 발생하지 않도록 제도 개선방안까지 함께 제시합니다.",
  },
  {
    no: "6",
    title: "의뢰인과 직접 소통하며 끝까지 책임집니다",
    sub: "담당 노무사가 직접 참여",
    body: "사건을 일률적으로 처리하지 않습니다. 초기상담부터 사실관계 정리, 증거 검토, 서면 작성, 조사 및 심문 대응까지 담당 노무사가 직접 참여하여 사건의 흐름을 일관되게 관리합니다.",
  },
]

const PRACTICE_AREAS = [
  "부당해고·징계·전보 사건",
  "임금·퇴직금 분쟁",
  "직장 내 괴롭힘",
  "근로자성 분쟁",
  "노동청 진정 및 근로감독 대응",
  "노동위원회 구제신청",
  "인사조치 및 노사분쟁 자문",
]

type TabKey = "response" | "strength"

function Accordion({
  items,
}: {
  items: { no: string; title: string; summary: string; points?: string[]; body?: string; open?: boolean }[]
}) {
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

export default function LaborDisputesTabs() {
  const [active, setActive] = useState<TabKey>("response")

  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.replace("#", "")
      if (h === "response" || h === "strength") setActive(h)
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
    { key: "response", title: "대응 내용", desc: "구제신청·조정·집단분쟁·예방", icon: <Scale className="h-6 w-6" /> },
    { key: "strength", title: "FAIR의 강점", desc: "사건을 보는 원칙과 방식", icon: <Award className="h-6 w-6" /> },
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

      {/* ── 대응 내용 (기존) ── */}
      {active === "response" && (
        <div className="mt-8">
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-8">{DISPUTES.intro}</p>
          <Accordion
            items={DISPUTES.sections.map((s) => ({ no: s.no, title: s.title, summary: s.summary, points: s.points }))}
          />
        </div>
      )}

      {/* ── FAIR의 강점 ── */}
      {active === "strength" && (
        <div className="mt-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">노동사건은 법률만으로 해결되지 않습니다</h3>
          <p className="mt-2 mb-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
            노동사건은 법리뿐만 아니라 사실관계, 증거, 조직 내부 사정, 당사자의 감정과 향후 관계까지 함께 살펴야
            합니다. 27년간 기업 인사·노무 자문과 노동사건을 수행해 온 경험을 바탕으로, 사건의 핵심을 정확히
            진단하고 현실적인 해결책을 제시합니다.
          </p>

          <Accordion
            items={STRENGTHS.map((s) => ({ no: s.no, title: s.title, summary: s.sub, body: s.body, open: s.open }))}
          />

          {/* 주요 대리 분야 */}
          <div className="mt-6 rounded-2xl border border-blue-900 bg-white p-5 sm:p-6">
            <h4 className="text-base font-bold text-gray-900">주요 대리 분야</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {PRACTICE_AREAS.map((a) => (
                <span
                  key={a}
                  className="rounded-full bg-primary/10 px-3 py-1.5 text-xs sm:text-sm font-semibold text-primary"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
            <p className="text-sm sm:text-base font-bold leading-relaxed text-gray-800">
              사건이 발생한 이후의 대응뿐만 아니라, 사건이 어떻게 판단될지를 미리 분석하고 가장 효과적인
              해결전략을 제시합니다.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
