"use client"

import { useRef, useState } from "react"
import QuickDiagnosisAiAssist from "@/components/QuickDiagnosisAiAssist"
import { FREELANCER_QUESTIONS as QUESTIONS, freelancerGrade as grade } from "@/lib/quickDiagnosis"

// 프리랜서 근로자성 간이진단 (참고용). 업무 6문항 → "예" = 위험 신호. 저장 없음.
// 문항·등급 로직은 lib/quickDiagnosis.ts 단일 출처.
type Ans = Partial<Record<string, "예" | "아니오">>

export default function FreelancerQuickDiagnosis() {
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
            <p className="mt-3 text-sm text-gray-600">위험으로 분류된 항목이 없습니다. 다만 간이진단은 업무 6개 문항만 확인하므로, 분쟁·서류 지표까지 전체 진단으로 점검해 보시길 권장합니다.</p>
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
        <QuickDiagnosisAiAssist kind="freelancer" answers={answers} />
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
      <p className="text-xs leading-relaxed text-gray-400">※ 간이·참고용 진단입니다(업무 6문항). 체크하신 응답을 기반으로 AI가 결과 설명을 보조하며, 판정은 규칙 기반으로 이뤄집니다. 분쟁·서류 지표까지 포함한 정확한 진단은 프리랜서 백신 심층진단 또는 FAIR인사노무컨설팅 상담으로 받아 보세요.</p>
    </div>
  )
}
