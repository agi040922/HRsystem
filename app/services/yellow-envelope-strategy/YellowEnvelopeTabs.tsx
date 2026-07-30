"use client"

import { useEffect, useRef, useState } from "react"
import { Handshake, ClipboardCheck, ChevronDown } from "lucide-react"
import { getServiceDetail } from "@/lib/serviceDetails"
import QuickDiagnosisAiAssist from "@/components/QuickDiagnosisAiAssist"
import { SUBCONTRACT_QUESTIONS as QUESTIONS, subcontractGrade as grade } from "@/lib/quickDiagnosis"

const DETAIL = getServiceDetail("yellow-envelope-strategy")!

// ── 도급적합성 간이진단 (참고용) ─────────────────────────────────────────
// 도급백신 진단 15문항 중 현장 핵심 6문항. "예" = 위험 신호. 저장 없음.
// 문항·등급 로직은 lib/quickDiagnosis.ts 단일 출처.
type Ans = Partial<Record<string, "예" | "아니오">>

function SubcontractQuickDiagnosis() {
  const [answers, setAnswers] = useState<Ans>({})
  const [result, setResult] = useState<ReturnType<typeof compute> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement | null>(null)
  const answered = QUESTIONS.filter((q) => answers[q.id] !== undefined).length

  function compute() {
    let total = 0, core = 0
    const signals: typeof QUESTIONS = []
    for (const q of QUESTIONS) {
      if (answers[q.id] === "예") {
        total += q.weight
        if (q.core) core += 1
        signals.push(q)
      }
    }
    return { ...grade(total, core), signals }
  }

  function submit() {
    if (answered < QUESTIONS.length) { setError("6개 문항에 모두 답해 주세요."); return }
    setError(null)
    setResult(compute())
    requestAnimationFrame(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }))
  }

  if (result) {
    const isRed = result.g === "🔴"
    const isYel = result.g === "🟡"
    return (
      <div ref={ref} className="space-y-4">
        <div className={`rounded-2xl border p-6 ${isRed ? "border-red-200 bg-red-50" : isYel ? "border-amber-200 bg-amber-50" : "border-emerald-200 bg-emerald-50"}`}>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">AI 간이진단 결과 (6문항 기준)</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{result.label}</p>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">{result.head}</p>
        </div>
        <div className="rounded-2xl border border-blue-900 bg-white p-6">
          <h4 className="text-sm font-semibold text-gray-500">위험 신호로 잡힌 항목 ({result.signals.length})</h4>
          {result.signals.length === 0 ? (
            <p className="mt-3 text-sm text-gray-600">위험으로 분류된 항목이 없습니다. 다만 간이진단은 현장 6개 문항만 확인하므로, 분쟁·서류 지표와 노조법상 사용자성까지 전문가 상담으로 점검해 보시길 권장합니다.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {result.signals.map((s) => (
                <li key={s.id} className="flex items-start gap-2 text-sm text-gray-700">
                  <span aria-hidden className={s.core ? "text-red-500" : "text-amber-500"}>{s.core ? "★" : "•"}</span>
                  <span>{s.text}<span className="mt-1 block text-xs text-gray-500">※ {s.reason}</span></span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <QuickDiagnosisAiAssist kind="subcontract" answers={answers} />
        <button type="button" onClick={() => { setAnswers({}); setResult(null) }} className="w-full rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
          다시 진단하기
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-blue-900 bg-white px-4 py-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-600">{answered} / {QUESTIONS.length} 문항</span>
          <span className="text-gray-400">예 / 아니오로 답해 주세요</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(answered / QUESTIONS.length) * 100}%` }} />
        </div>
      </div>
      <div className="space-y-3">
        {QUESTIONS.map((q, i) => {
          const v = answers[q.id]
          return (
            <div key={q.id} className="rounded-xl border border-blue-900 bg-white p-4">
              <p className="text-sm leading-relaxed text-gray-800">
                <span className="mr-1 font-semibold text-gray-400">{i + 1}.</span>{q.text}
              </p>
              <div className="mt-3 flex gap-2">
                {(["예", "아니오"] as const).map((opt) => (
                  <button key={opt} type="button" onClick={() => { setError(null); setAnswers((p) => ({ ...p, [q.id]: opt })) }} aria-pressed={v === opt}
                    className={`flex-1 rounded-md border px-4 py-2 text-sm font-semibold transition-colors ${v === opt ? "border-primary bg-primary text-primary-foreground" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      {error && <p role="alert" className="text-sm font-medium text-red-600">{error}</p>}
      <button type="button" onClick={submit} className={`w-full rounded-md px-5 py-4 text-base font-bold transition-colors ${answered === QUESTIONS.length ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-gray-100 text-gray-400"}`}>
        간이진단 결과 보기
      </button>
      <p className="text-xs leading-relaxed text-gray-400">※ 간이·참고용 진단입니다(현장 6문항). 체크하신 응답을 기반으로 AI가 결과 설명을 보조하며, 판정은 규칙 기반으로 이뤄집니다. 파견법상 위장도급 위험을 점검하며, 개정 노동조합법(2026. 3. 10. 시행)상 원청 사용자성·교섭의무는 별개 쟁점입니다. 분쟁·서류 지표까지 포함한 정밀 점검은 FAIR인사노무컨설팅 상담으로 받아 보세요.</p>
    </div>
  )
}

// ── 탭 ──────────────────────────────────────────────────────────────────
type TabKey = "service" | "diagnosis"

function Accordion({
  items,
}: {
  items: { no: string; title: string; summary: string; points: string[] }[]
}) {
  return (
    <div className="space-y-3">
      {items.map((s) => (
        <details key={s.no} className="group rounded-2xl border border-blue-900 bg-white">
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
          <ul className="space-y-2.5 border-t border-gray-100 px-5 py-4">
            {s.points.map((point, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-600">
                <span aria-hidden className="mt-0.5 shrink-0 text-primary">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  )
}

export default function YellowEnvelopeTabs() {
  const [active, setActive] = useState<TabKey>("service")

  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.replace("#", "")
      if (h === "service" || h === "diagnosis") setActive(h)
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
    { key: "service", title: "서비스 내용", desc: "사용자성 진단·교섭 대응·구조 정비", icon: <Handshake className="h-6 w-6" /> },
    { key: "diagnosis", title: "도급적합성 AI 간이진단", desc: "핵심 6문항 AI 자가진단 (참고용)", icon: <ClipboardCheck className="h-6 w-6" /> },
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

      {/* ── 서비스 내용 (기존 4개 섹션) ── */}
      {active === "service" && (
        <div className="mt-8">
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-8">{DETAIL.intro}</p>
          <Accordion
            items={DETAIL.sections.map((s) => ({ no: s.no, title: s.title, summary: s.summary, points: s.points }))}
          />
        </div>
      )}

      {/* ── 도급적합성 간이진단 ── */}
      {active === "diagnosis" && (
        <div className="mt-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">우리 회사의 사내하도급, 도급다운가요?</h3>
          <p className="mt-2 mb-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
            대법원 근로자파견 판단기준(5요소)에 기반한 현장 핵심 6문항입니다. 예/아니오만 선택하면
            바로 결과를 확인할 수 있으며, 체크하신 응답을 기반으로 AI가 결과 설명을 보조합니다.
            응답은 저장되지 않습니다.
          </p>
          <SubcontractQuickDiagnosis />
        </div>
      )}
    </div>
  )
}
