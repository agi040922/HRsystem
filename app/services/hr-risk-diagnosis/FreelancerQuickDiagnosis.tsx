"use client"

import { useRef, useState } from "react"

// 프리랜서 근로자성 간이진단 (참고용). 업무 6문항 → "예" = 위험 신호. 저장 없음.
type Ans = Partial<Record<string, "예" | "아니오">>

const QUESTIONS: { id: string; core: boolean; weight: number; text: string; reason: string }[] = [
  { id: "w1", core: true, weight: 2, text: "업무 방법을 구체적으로 지시하거나, 카톡·메신저 등으로 수시로 업무 지시를 하나요?", reason: "사업주가 업무 방법을 구체적이고 수시로 지시하면 근로자로 해석될 가능성이 높아집니다." },
  { id: "w2", core: true, weight: 2, text: "정해진 출퇴근 시간이 있고, 프리랜서가 그 시간에 맞춰 일해야 하나요?", reason: "정해진 출퇴근 시간에 맞춰 일하는 점은 근로자의 대표적 특징입니다." },
  { id: "w3", core: false, weight: 1, text: "회사가 지정한 장소(사무실 등)에 나와서 일해야 하나요?", reason: "지정된 장소 출근이 의무인 경우 근로자로 해석될 가능성이 높아집니다." },
  { id: "w4", core: false, weight: 1, text: "회사 직원처럼 휴가·근태·인사평가 규정을 적용받나요?", reason: "직원처럼 근태·인사평가 규정을 적용하면 독립적 프리랜서에 적합하지 않습니다." },
  { id: "w5", core: false, weight: 1, text: "자신이 직접 해야 하며, 다른 사람을 써서 대신 처리하면 안 되나요?", reason: "본인이 직접 해야 하고 대체가 안 되는 점은 사용종속성을 전제로 한 근로제공으로 해석될 수 있습니다." },
  { id: "w6", core: true, weight: 2, text: "일의 양·결과와 상관없이 매달 고정된 금액(고정급)을 지급하나요?", reason: "실적(결과)과 무관한 고정급 지급은 임금성·종속성의 강한 징표입니다." },
]

const MAX = QUESTIONS.reduce((s, q) => s + q.weight, 0)

function grade(total: number, core: number) {
  if (core >= 2 || total >= 5) return { g: "🔴", label: "🔴 친화도 하 (위험)", head: "적법한 프리랜서 계약으로 인정되지 않을 위험이 높습니다. 계약서만으로는 해결되지 않으며, 운영방식 개선 또는 근로계약 전환을 검토해 보시기 바랍니다." }
  if (core >= 1 || total >= 3) return { g: "🟡", label: "🟡 친화도 중 (주의)", head: "일부 위험 신호가 있습니다. 표시된 항목을 개선하면 안전 구간으로 이동할 수 있습니다." }
  return { g: "🟢", label: "🟢 친화도 상 (양호)", head: "독립적 프리랜서 관계에 가깝습니다. 계약서·지급증빙으로 현 상태를 유지·관리하시기 바랍니다." }
}

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
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">간이진단 결과 (6문항 기준)</p>
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
      <p className="text-xs leading-relaxed text-gray-400">※ 간이·참고용 진단입니다(업무 6문항). 분쟁·서류 지표까지 포함한 정확한 진단은 프리랜서 백신 심층진단 또는 FAIR인사노무컨설팅 상담으로 받아 보세요.</p>
    </div>
  )
}
