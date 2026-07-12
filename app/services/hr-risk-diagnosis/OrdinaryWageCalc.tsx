"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"

// 통상임금·평균임금 판단기 (FAIR CRM 기본서비스 판단기 이식 · 참고용). 저장 없음.
type Ans = "" | "O" | "X"
type Row = { id: number; name: string; amount: string; q1: Ans; q2: Ans; q3: Ans; q4: Ans; q5: Ans }
const QKEYS = ["q1", "q2", "q3", "q4", "q5"] as const

// ── 통상임금: 가중치 5기준 ──
const ORD_CRITERIA = [
  { key: "q1", label: "① 소정근로 대가 (근무시간에 일한 것의 대가)", weight: 30, hint: "근무 외 명목(복리후생 등)이면 X" },
  { key: "q2", label: "② 정기성 (매월·정기 지급)", weight: 30, hint: "비정기 격려금·일시금은 X" },
  { key: "q3", label: "③ 일률성 (조건 충족 직원 모두 동일 지급)", weight: 30, hint: "개인 실적·일부만 지급 시 X" },
  { key: "q4", label: "④ 지급의무 (단체협약·취업규칙·근로계약 명시)", weight: 10, hint: "보조 기준" },
  { key: "q5", label: "⑤ 금액 확정성 (사전 확정, 근무결과와 무관)", weight: 0, hint: "참고기준" },
]
// ── 평균임금: O/X 5기준 ──
const AVG_CRITERIA = [
  { key: "q1", label: "① 취업규칙·근로계약·단체협약에 지급 근거가 명시되어 있는가?", hint: "규정 명문화 여부. O일수록 포함 가능성 ↑" },
  { key: "q2", label: "② 매월·매 급여일에 정기적으로 지급되는가?", hint: "정기성. 연 1회 일시 지급은 X." },
  { key: "q3", label: "③ 전 근로자(또는 조건 충족 모든 근로자)에게 일률적으로 지급되는가?", hint: "일률성. 특정 개인 성과에만 지급되면 X." },
  { key: "q4", label: "④ 금액이 사전에 확정되어 있거나 고정적으로 산정 가능한가?", hint: "고정성. 실적 변동에 연동되면 X." },
  { key: "q5", label: "⑤ 근로의 대가(노동의 대가)로서 지급되는가?", hint: "의례적·은혜적 금품이 아닌 근로 대가성." },
]

type Verdict = { label: string; cls: string }
function judgeOrdinary(row: Row): { score: number; answered: boolean; verdict: Verdict } {
  let score = 0, answered = false
  for (const c of ORD_CRITERIA) {
    const v = row[c.key as (typeof QKEYS)[number]]
    if (v) answered = true
    if (v === "O") score += c.weight
  }
  let verdict: Verdict
  if (score >= 90) verdict = { label: "포함 확실", cls: "text-emerald-700 bg-emerald-50" }
  else if (score >= 70) verdict = { label: "가능성 높음", cls: "text-primary bg-primary/10" }
  else if (score >= 40) verdict = { label: "확인 필요", cls: "text-orange-700 bg-orange-50" }
  else if (score >= 10) verdict = { label: "제외 가능", cls: "text-yellow-700 bg-yellow-50" }
  else verdict = { label: "제외 높음", cls: "text-red-700 bg-red-50" }
  return { score, answered, verdict }
}
function judgeAverage(row: Row): { oCount: number; answered: boolean; verdict: Verdict } {
  let oCount = 0, answered = false
  for (const k of QKEYS) {
    const v = row[k]
    if (v) answered = true
    if (v === "O") oCount += 1
  }
  const table: Verdict[] = [
    { label: "제외 (0%)", cls: "text-red-700 bg-red-50" },
    { label: "제외 높음 (20%)", cls: "text-red-500 bg-red-50" },
    { label: "제외 가능 (40%)", cls: "text-yellow-700 bg-yellow-50" },
    { label: "확인 필요 (60%)", cls: "text-orange-700 bg-orange-50" },
    { label: "가능성 높음 (80%)", cls: "text-primary bg-primary/10" },
    { label: "포함 확실 (100%)", cls: "text-emerald-700 bg-emerald-50" },
  ]
  return { oCount, answered, verdict: table[oCount] }
}

const DEFAULT_NAMES = ["기본급", "직책수당", "정기상여금"]
function makeRows(): Row[] {
  return DEFAULT_NAMES.map((name, i) => ({ id: i + 1, name, amount: "", q1: "", q2: "", q3: "", q4: "", q5: "" }))
}

function AnsSelect({ value, onChange }: { value: Ans; onChange: (v: Ans) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Ans)}
      className="w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm focus:border-primary focus:outline-none"
    >
      <option value="">-</option>
      <option value="O">O</option>
      <option value="X">X</option>
    </select>
  )
}

function JudgeTable({ mode }: { mode: "ordinary" | "average" }) {
  const [rows, setRows] = useState<Row[]>(makeRows)
  const criteria = mode === "ordinary" ? ORD_CRITERIA : AVG_CRITERIA
  const resultHeader = mode === "ordinary" ? "점수" : "자동 판정"

  const set = (id: number, patch: Partial<Row>) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  const add = () =>
    setRows((rs) => (rs.length >= 10 ? rs : [...rs, { id: Math.max(0, ...rs.map((r) => r.id)) + 1, name: "", amount: "", q1: "", q2: "", q3: "", q4: "", q5: "" }]))
  const remove = (id: number) => setRows((rs) => rs.filter((r) => r.id !== id))

  return (
    <div>
      {/* 기준 요약 */}
      <div className="mb-4 overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-gray-500">
              <th className="px-3 py-2 font-medium">번호</th>
              <th className="px-3 py-2 font-medium">판단 기준</th>
              {mode === "ordinary" && <th className="px-3 py-2 text-right font-medium">가중치</th>}
              <th className="px-3 py-2 font-medium">설명</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {criteria.map((c, i) => (
              <tr key={c.key}>
                <td className="px-3 py-2 text-center text-gray-500">{i + 1}</td>
                <td className="px-3 py-2 font-medium text-gray-800">{c.label}</td>
                {mode === "ordinary" && (
                  <td className="px-3 py-2 text-right font-bold text-primary">{(c as { weight: number }).weight}점</td>
                )}
                <td className="px-3 py-2 text-gray-400">{c.hint}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 임금항목별 판단 */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-gray-900">임금항목별 판단</h4>
        <button
          type="button"
          onClick={add}
          disabled={rows.length >= 10}
          className="inline-flex items-center gap-1 rounded-md border border-primary/40 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/5 disabled:opacity-40"
        >
          <Plus className="h-3.5 w-3.5" /> 항목 추가 ({rows.length}/10)
        </button>
      </div>

      <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-[720px] w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-600">
              <th className="px-3 py-2 text-left font-medium">항목명</th>
              <th className="px-3 py-2 text-left font-medium">월 지급액</th>
              {criteria.map((c, i) => (
                <th key={c.key} className="px-2 py-2 text-center font-medium">
                  {["①", "②", "③", "④", "⑤"][i]}
                  {mode === "ordinary" && (
                    <span className="block text-[11px] text-gray-400">({(c as { weight: number }).weight}점)</span>
                  )}
                </th>
              ))}
              <th className="px-3 py-2 text-center font-medium">{resultHeader}</th>
              <th className="px-2 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => {
              const res =
                mode === "ordinary" ? judgeOrdinary(row) : judgeAverage(row)
              return (
                <tr key={row.id}>
                  <td className="px-2 py-2">
                    <input
                      value={row.name}
                      onChange={(e) => set(row.id, { name: e.target.value })}
                      placeholder="항목명"
                      className="w-32 rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:border-primary focus:outline-none"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      inputMode="numeric"
                      value={row.amount}
                      onChange={(e) => set(row.id, { amount: e.target.value })}
                      placeholder="0"
                      className="w-28 rounded-md border border-gray-300 px-2 py-1.5 text-right text-sm focus:border-primary focus:outline-none"
                    />
                  </td>
                  {QKEYS.map((k) => (
                    <td key={k} className="px-1.5 py-2">
                      <AnsSelect value={row[k]} onChange={(v) => set(row.id, { [k]: v } as Partial<Row>)} />
                    </td>
                  ))}
                  <td className="px-2 py-2 text-center">
                    {res.answered ? (
                      <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ${res.verdict.cls}`}>
                        {mode === "ordinary" ? `${(res as { score: number }).score}점 · ` : ""}
                        {res.verdict.label}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">미입력</span>
                    )}
                  </td>
                  <td className="px-1 py-2 text-center">
                    <button type="button" onClick={() => remove(row.id)} aria-label="삭제" className="text-gray-300 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* 판정 조견표 */}
      <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs leading-relaxed text-gray-600">
        <p className="mb-1 font-semibold text-gray-700">판정 기준</p>
        {mode === "ordinary" ? (
          <p>90점↑ 포함 확실 · 70~89 가능성 높음 · 40~69 확인 필요 · 10~39 제외 가능 · 0~9 제외 높음. (①~③ 3대 요건 각 30점)</p>
        ) : (
          <p>O 5개 포함 확실(100%) · 4개 80% · 3개 60% 확인 필요 · 2개 40% · 1개 20% · 0개 제외. (O 개수 기준 6단계)</p>
        )}
      </div>
    </div>
  )
}

export default function OrdinaryWageCalc() {
  const [tab, setTab] = useState<"ordinary" | "average">("ordinary")
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
      <div className="mb-5 flex gap-2">
        {(["ordinary", "average"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              tab === t ? "bg-primary text-primary-foreground" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {t === "ordinary" ? "통상임금 판단" : "평균임금 판단"}
          </button>
        ))}
      </div>
      <JudgeTable key={tab} mode={tab} />
      <p className="mt-4 text-xs leading-relaxed text-gray-400">
        ※ FAIR CRM 기본서비스의 판단기를 옮긴 참고용 도구입니다. 각 기준에 대한 O/X 판단과 최종 산입 여부는
        사안마다 달라질 수 있으므로, 정확한 판단은 FAIR인사노무컨설팅에 문의해 주세요.
      </p>
    </div>
  )
}
