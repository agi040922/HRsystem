"use client"

import { useRef, useState } from "react"

// 산업안전 간이진단 (참고용). 이행 확인 문항 → "아니오" = 위험(미이행). 저장 없음.
type Ans = Partial<Record<string, "예" | "아니오">>

const QUESTIONS: {
  id: string
  area: string
  core: boolean
  weight: number
  text: string
  reason: string
}[] = [
  { id: "b1", area: "목표·방침", core: false, weight: 1, text: "회사의 안전보건 목표와 경영방침을 정해 두고, 일하는 사람들이 알 수 있게 공유하고 있습니까?", reason: "안전보건 관리의 출발점입니다. 목표·방침을 문서로 정하고 게시·공유해 두면 좋습니다." },
  { id: "b2", area: "예산", core: false, weight: 1, text: "안전보건 활동(보호구·점검·교육 등)에 필요한 예산을 따로 잡아 집행하고 있습니까?", reason: "필요한 예산이 확보되어야 실제 안전조치가 이뤄집니다. 편성·집행 내역을 남겨 두세요." },
  { id: "a4", area: "조직·권한", core: false, weight: 1, text: "안전보건 업무를 맡은 책임자·관리감독자에게 그 일을 할 수 있는 권한과 예산을 주고 있습니까?", reason: "담당자에게 실질적 권한·자원이 없으면 관리가 형식에 그칠 수 있습니다." },
  { id: "c1", area: "위험성평가", core: true, weight: 2, text: "우리 사업장의 위험요인을 찾아보고(위험성평가), 개선까지 이어지도록 관리하고 있습니까?", reason: "사고 예방의 핵심입니다. 위험요인 발굴 → 개선 → 기록이 기본 절차입니다." },
  { id: "c2", area: "위험성평가", core: false, weight: 1, text: "위험요인을 찾을 때 실제 그 작업을 하는 근로자의 의견을 듣거나 참여시키고 있습니까?", reason: "현장을 아는 근로자의 참여가 위험 발굴의 정확도를 높입니다." },
  { id: "d1", area: "교육", core: true, weight: 2, text: "법에서 정한 안전보건교육(정기·채용 시·작업내용 변경 시 등)을 실시하고 기록을 남기고 있습니까?", reason: "교육은 기본 의무이자 사고 예방책입니다. 교육일지·이수기록을 보관하세요." },
  { id: "d3", area: "비상대응", core: false, weight: 1, text: "급박한 위험이나 큰 사고에 대비한 대응절차(작업중지·대피·구호 등)를 마련하고 점검·훈련하고 있습니까?", reason: "비상 상황에서 피해를 줄이려면 절차 마련과 주기적인 훈련이 필요합니다." },
  { id: "f1", area: "정기점검", core: false, weight: 1, text: "안전·보건 관계 법령상 해야 할 일들을 정기적으로 점검하고, 결과를 보고받아 조치하고 있습니까?", reason: "빠뜨린 의무가 없는지 주기적으로 점검·보고하는 체계가 있으면 좋습니다." },
  { id: "f3", area: "재해보고", core: true, weight: 2, text: "산업재해가 발생했을 때 정해진 기한 안에 보고하고, 재발방지대책을 세워 기록하고 있습니까?", reason: "재해 발생 시 신속한 보고와 재발방지 조치·증빙 관리가 중요합니다." },
  { id: "g2", area: "보건관리", core: false, weight: 1, text: "근로자에 대한 일반건강진단을 법에서 정한 주기에 맞춰 실시하고 있습니까?", reason: "근로자 건강 관리의 기본으로, 정기적인 일반건강진단이 필요합니다." },
]

const MAX = QUESTIONS.reduce((s, q) => s + q.weight, 0)

function grade(total: number, core: number) {
  const ratio = MAX > 0 ? total / MAX : 0
  if (core >= 2 || ratio >= 0.45) return { g: "🔴", label: "🔴 위험", head: "확인이 필요한 핵심 항목이 여럿입니다. 전체 진단으로 정확히 점검하고, 산업안전 전문가·노무사 상담을 권장합니다." }
  if (core >= 1 || ratio >= 0.2) return { g: "🟡", label: "🟡 주의", head: "일부 항목은 이행·증빙 확인이 필요해 보입니다. 표시된 항목을 점검·보완하고, 정확한 확인은 전체 진단으로 받아 보시길 권합니다." }
  return { g: "🟢", label: "🟢 양호", head: "핵심 안전보건 의무를 대체로 이행하고 있는 것으로 보입니다. 다만 간이진단은 10개 문항만 확인하므로, 전체 진단으로 세부 항목까지 점검해 보시길 권합니다." }
}

export default function SafetyQuickDiagnosis() {
  const [answers, setAnswers] = useState<Ans>({})
  const [result, setResult] = useState<ReturnType<typeof compute> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement | null>(null)
  const answered = QUESTIONS.filter((q) => answers[q.id] !== undefined).length

  function compute() {
    let total = 0, core = 0
    const signals: typeof QUESTIONS = []
    for (const q of QUESTIONS) {
      if (answers[q.id] === "아니오") {
        total += q.weight
        if (q.core) core += 1
        signals.push(q)
      }
    }
    return { ...grade(total, core), signals }
  }

  function submit() {
    if (answered < QUESTIONS.length) { setError("10개 문항에 모두 답해 주세요."); return }
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
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">간이진단 결과 (10문항 기준)</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{result.label}</p>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">{result.head}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h4 className="text-sm font-semibold text-gray-500">점검이 필요한 항목 ({result.signals.length})</h4>
          {result.signals.length === 0 ? (
            <p className="mt-3 text-sm text-gray-600">미이행으로 잡힌 항목이 없습니다. 다만 간이진단은 10개 문항만 확인합니다.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {result.signals.map((s) => (
                <li key={s.id} className="flex items-start gap-2 text-sm text-gray-700">
                  <span aria-hidden className={s.core ? "text-red-500" : "text-amber-500"}>{s.core ? "★" : "•"}</span>
                  <span>
                    <span className="mr-1 text-xs font-semibold text-primary">[{s.area}]</span>
                    {s.text}
                    <span className="mt-1 block text-xs text-gray-500">※ {s.reason}</span>
                  </span>
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
      <div className="rounded-lg border border-gray-200 bg-white px-4 py-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-600">{answered} / {QUESTIONS.length} 문항</span>
          <span className="text-gray-400">이행하고 있으면 “예”</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(answered / QUESTIONS.length) * 100}%` }} />
        </div>
      </div>
      <div className="space-y-3">
        {QUESTIONS.map((q, i) => {
          const v = answers[q.id]
          return (
            <div key={q.id} className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-sm leading-relaxed text-gray-800">
                <span className="mr-1 font-semibold text-gray-400">{i + 1}.</span>
                <span className="mr-1 text-xs font-semibold text-primary">[{q.area}]</span>
                {q.text}
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
      <p className="text-xs leading-relaxed text-gray-400">※ 간이·참고용 진단이며 임계값은 확정 대상입니다. 정확한 진단은 전체 진단 또는 FAIR인사노무컨설팅 상담으로 받아 보세요.</p>
    </div>
  )
}
