"use client"

import { useEffect, useRef, useState } from "react"
import type { QuickDiagAnswers, QuickDiagKind } from "@/lib/quickDiagnosis"

// 간이진단 결과 'AI 다듬기' 보조 박스.
// 등급·점수·위험신호는 위쪽 규칙 결과가 권위. 이 박스는 그 내용을 읽기 쉽게 재서술한 참고용이며,
// AI는 새 조언·제안을 하지 않는다. 실패·미설정·호출제한이면 박스 자체를 숨긴다. 저장 없음.

type State =
  | { kind: "loading" }
  | { kind: "ok"; polished: string; note: string }
  | { kind: "unavailable" }

export default function QuickDiagnosisAiAssist({
  kind,
  answers,
}: {
  kind: QuickDiagKind
  answers: QuickDiagAnswers
}) {
  const [state, setState] = useState<State>({ kind: "loading" })
  const ran = useRef(false)

  useEffect(() => {
    // StrictMode의 이중 마운트에서도 호출은 1회. 언마운트 취소 플래그는 두지 않는다
    // (두 번째 실행이 이 가드에 막혀 첫 요청만 남으므로, 취소하면 로딩에서 멈춘다).
    if (ran.current) return
    ran.current = true
    ;(async () => {
      try {
        const res = await fetch("/api/ai/diagnosis-polish", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kind, answers }),
        })
        if (!res.ok) {
          setState({ kind: "unavailable" })
          return
        }
        const data = (await res.json()) as { available?: boolean; polished?: string; note?: string }
        if (data.available && data.polished) {
          setState({ kind: "ok", polished: data.polished, note: data.note ?? "" })
        } else {
          setState({ kind: "unavailable" })
        }
      } catch {
        setState({ kind: "unavailable" })
      }
    })()
  }, [kind, answers])

  // 미설정/일시오류/호출제한이면 박스를 숨겨 화면을 어지럽히지 않는다(규칙 결과가 이미 위에 있음).
  if (state.kind === "unavailable") return null

  return (
    <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
      <div className="flex items-center gap-2">
        <span className="rounded bg-primary px-1.5 py-0.5 text-xs font-bold text-primary-foreground">AI</span>
        <p className="text-sm font-bold text-gray-900">AI가 다듬은 진단 설명</p>
      </div>
      {state.kind === "loading" ? (
        <p className="mt-2 text-sm text-gray-500">진단 결과를 정리하는 중…</p>
      ) : (
        <>
          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-800">{state.polished}</p>
          <p className="mt-3 text-[11px] leading-relaxed text-blue-700">※ {state.note}</p>
        </>
      )}
    </section>
  )
}
