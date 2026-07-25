"use client"

/**
 * AI 상담 도우미(세일즈 에이전트) — FAIR인사노무컨설팅.
 *
 * 4단계(규모·업종·고민·현재 상태)를 버튼으로 물어보고,
 * 규칙 기반 서비스 추천 + LLM 요약(보조)을 보여준 뒤 진단/서비스/카톡으로 연결한다.
 *
 * 원칙:
 * - 대화 내용을 저장하지 않는다.
 * - AI는 판정하지 않는다 — "AI가 정리한 안내" 표시 + 면책 문구 상시 노출.
 * - 진입 유도(시간/스크롤)는 세션당 1회, 이미 열었으면 하지 않는다.
 * - NEXT_PUBLIC_SALES_AGENT_ENABLED="false"로 끌 수 있다(기본 ON).
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { MessageSquareText, X, ExternalLink } from "lucide-react"
import { recommendPlan } from "@/lib/salesAgent/recommend"
import {
  SIZE_OPTIONS,
  INDUSTRY_OPTIONS,
  CONCERN_OPTIONS,
  STATUS_OPTIONS,
  TARGET_META,
  type Option,
} from "@/lib/salesAgent/options"
import type { ConsultAnswers, Recommendation } from "@/lib/salesAgent/types"
import { consultSummary } from "@/app/sales/actions"
import posthog from "posthog-js"

/** posthog-js 가 초기화되지 않았거나 차단된 환경에서도 상담 자체는 계속 동작해야 한다. */
function getAnalyticsId(): string | undefined {
  try {
    return posthog.get_distinct_id()
  } catch {
    return undefined
  }
}

const ENABLED = process.env.NEXT_PUBLIC_SALES_AGENT_ENABLED !== "false"
const KAKAO_URL = "https://open.kakao.com/o/smv8tNDi"
const AUTO_OPEN_MS = 15000
const AUTO_OPEN_SCROLL = 0.55
const SESSION_KEY = "fair_sales_agent_prompted"

type StepKey = "size" | "industry" | "concern" | "status"
const STEP_ORDER: StepKey[] = ["size", "industry", "concern", "status"]

const STEP_QUESTION: Record<StepKey, string> = {
  size: "회사 상시근로자 수는 어느 정도인가요?",
  industry: "어떤 업종인가요?",
  concern: "요즘 가장 크게 고민되는 부분은 무엇인가요?",
  status: "지금 인사노무는 어떻게 관리하고 계신가요?",
}

export default function SalesAgentWidget() {
  const [open, setOpen] = useState(false)
  const [nudge, setNudge] = useState(false)
  const [answers, setAnswers] = useState<Partial<ConsultAnswers>>({})
  const [stepIdx, setStepIdx] = useState(0)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ rec: Recommendation; summary: string } | null>(null)
  const interacted = useRef(false)

  const markPrompted = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1")
    } catch {
      /* 무시 */
    }
  }, [])

  // 진입 유도 — 시간/스크롤(세션당 1회).
  useEffect(() => {
    if (!ENABLED) return
    let prompted = false
    try {
      prompted = sessionStorage.getItem(SESSION_KEY) === "1"
    } catch {
      /* 무시 */
    }
    if (prompted) return

    const fire = () => {
      if (interacted.current || prompted) return
      prompted = true
      markPrompted()
      setNudge(true)
    }
    const timer = window.setTimeout(fire, AUTO_OPEN_MS)
    const onScroll = () => {
      const h = document.documentElement
      const ratio = (h.scrollTop + window.innerHeight) / h.scrollHeight
      if (ratio >= AUTO_OPEN_SCROLL) fire()
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener("scroll", onScroll)
    }
  }, [markPrompted])

  const openPanel = useCallback(() => {
    interacted.current = true
    markPrompted()
    setNudge(false)
    setOpen(true)
  }, [markPrompted])

  const restart = useCallback(() => {
    setAnswers({})
    setStepIdx(0)
    setResult(null)
    setLoading(false)
  }, [])

  const runRecommend = useCallback(async (full: ConsultAnswers) => {
    setLoading(true)
    // 규칙 추천은 즉시 계산(오류·오프라인에도 안전). LLM 요약은 서버에서 보조.
    const localRec = recommendPlan(full)
    try {
      const res = await consultSummary(full, getAnalyticsId())
      if (res.ok) setResult({ rec: res.recommendation, summary: res.summary })
      else setResult({ rec: localRec, summary: localRec.reason })
    } catch {
      setResult({ rec: localRec, summary: localRec.reason })
    } finally {
      setLoading(false)
    }
  }, [])

  const pick = useCallback(
    (key: StepKey, value: string) => {
      const next = { ...answers, [key]: value } as Partial<ConsultAnswers>
      setAnswers(next)
      const idx = STEP_ORDER.indexOf(key)
      if (idx < STEP_ORDER.length - 1) setStepIdx(idx + 1)
      else void runRecommend(next as ConsultAnswers)
    },
    [answers, runRecommend],
  )

  const currentStep = STEP_ORDER[stepIdx]
  const stepOptions = useMemo((): Option<string>[] => {
    switch (currentStep) {
      case "size":
        return SIZE_OPTIONS as Option<string>[]
      case "industry":
        return INDUSTRY_OPTIONS as Option<string>[]
      case "concern":
        return CONCERN_OPTIONS as Option<string>[]
      case "status":
        return STATUS_OPTIONS as Option<string>[]
      default:
        return []
    }
  }, [currentStep])

  if (!ENABLED) return null

  return (
    <>
      {/* 진입 유도 말풍선 */}
      {nudge && !open && (
        <button
          type="button"
          onClick={openPanel}
          className="fixed bottom-36 right-5 z-40 max-w-[15rem] rounded-2xl rounded-br-sm bg-white px-4 py-3 text-left text-sm text-gray-700 shadow-lg ring-1 ring-gray-200 transition hover:ring-primary/40 sm:bottom-40 sm:right-6"
        >
          <span className="block font-bold text-gray-900">1분 상담 도우미</span>
          우리 회사에 맞는 게 뭔지 알려드릴까요?
        </button>
      )}

      {/* 런처 — 카카오톡 버튼 위에 스택 */}
      {!open && (
        <button
          type="button"
          onClick={openPanel}
          aria-label="AI 상담 도우미 열기"
          className="fixed bottom-20 right-5 z-40 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg ring-1 ring-black/5 transition-transform hover:scale-105 sm:bottom-24 sm:right-6"
        >
          <MessageSquareText className="h-5 w-5" />
          <span className="hidden sm:inline">1분 상담</span>
        </button>
      )}

      {/* 상담 패널 */}
      {open && (
        <div className="fixed bottom-5 right-5 z-50 flex w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200 sm:right-6">
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-2">
              <MessageSquareText className="h-5 w-5" />
              <span className="text-sm font-bold">AI 상담 도우미</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="닫기"
              className="rounded-md p-1 text-white/90 transition hover:bg-white/15"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="max-h-[min(30rem,70vh)] overflow-y-auto px-4 py-4">
            <Bubble>
              안녕하세요! 몇 가지만 여쭤보고 <b>우리 회사에 맞는 방법</b>을 안내해 드릴게요. 버튼으로만
              답하시면 됩니다.
            </Bubble>

            {/* 지금까지 고른 답 */}
            {STEP_ORDER.slice(0, stepIdx).map((k) => {
              const v = answers[k]
              if (!v) return null
              return (
                <div key={k} className="mb-2 flex justify-end">
                  <span className="rounded-2xl rounded-br-sm bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                    {optionLabel(k, v)}
                  </span>
                </div>
              )
            })}

            {!result && !loading && (
              <>
                <Bubble>{STEP_QUESTION[currentStep]}</Bubble>
                <div className="mt-2 flex flex-wrap gap-2">
                  {stepOptions.map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => pick(currentStep, o.value)}
                      className="rounded-full border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 transition hover:border-primary hover:bg-primary/5 hover:text-primary"
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
                <StepDots total={STEP_ORDER.length} current={stepIdx} />
              </>
            )}

            {loading && (
              <Bubble>
                <span className="inline-flex items-center gap-2 text-gray-500">
                  <Spinner /> 맞는 방법을 찾고 있어요…
                </span>
              </Bubble>
            )}

            {result && <ResultView rec={result.rec} summary={result.summary} onRestart={restart} />}
          </div>

          <p className="border-t border-gray-100 bg-gray-50 px-4 py-2 text-[11px] leading-relaxed text-gray-400">
            AI가 정리한 참고용 안내입니다. 법적 판단이 아니며, 구체적 사안은 공인노무사 상담을 권장합니다.
          </p>
        </div>
      )}
    </>
  )
}

function ResultView({
  rec,
  summary,
  onRestart,
}: {
  rec: Recommendation
  summary: string
  onRestart: () => void
}) {
  const primary = TARGET_META[rec.primary]
  const alt = rec.alt ? TARGET_META[rec.alt] : null
  const freeHref = rec.freeAnchor
    ? `/services/hr-risk-diagnosis#${rec.freeAnchor}`
    : "/services/hr-risk-diagnosis"

  return (
    <div>
      <Bubble>
        <span className="mb-1 block text-xs font-semibold text-primary">AI가 정리한 안내</span>
        {summary}
      </Bubble>

      <div className="mt-3 rounded-xl border border-primary/20 bg-primary/5 p-3">
        <p className="text-xs font-semibold text-gray-500">추천 서비스</p>
        <p className="mt-0.5 text-base font-extrabold text-gray-900">{primary.label}</p>
        {alt && (
          <p className="mt-1 text-xs text-gray-500">
            함께 보면 좋은 것: <span className="font-semibold">{alt.label}</span>
          </p>
        )}
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {rec.startFree && (
          <Link
            href={freeHref}
            className="rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-bold text-primary-foreground transition hover:bg-primary/90"
          >
            무료 간이진단 먼저 해보기
          </Link>
        )}
        <Link
          href={primary.href}
          className="rounded-lg border border-primary/30 bg-white px-4 py-2.5 text-center text-sm font-bold text-primary transition hover:bg-primary/5"
        >
          {primary.label} 자세히 보기
        </Link>
        <Link
          href="/contact"
          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-center text-sm font-bold text-gray-700 transition hover:bg-gray-50"
        >
          상담 신청하기
        </Link>
        <a
          href={KAKAO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#FEE500] px-4 py-2.5 text-center text-sm font-bold text-[#191919] transition hover:brightness-95"
        >
          카카오톡으로 바로 상담
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="mt-3 w-full text-center text-xs text-gray-400 underline underline-offset-2 transition hover:text-gray-600"
      >
        처음부터 다시 상담
      </button>
    </div>
  )
}

function optionLabel(key: StepKey, value: string): string {
  const map: Record<StepKey, Option<string>[]> = {
    size: SIZE_OPTIONS as Option<string>[],
    industry: INDUSTRY_OPTIONS as Option<string>[],
    concern: CONCERN_OPTIONS as Option<string>[],
    status: STATUS_OPTIONS as Option<string>[],
  }
  return map[key].find((o) => o.value === value)?.label ?? value
}

function Bubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 max-w-[85%] rounded-2xl rounded-bl-sm bg-gray-50 px-3.5 py-2.5 text-sm leading-relaxed text-gray-700">
      {children}
    </div>
  )
}

function StepDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="mt-3 flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all ${
            i === current ? "w-4 bg-primary" : "w-1.5 bg-gray-200"
          }`}
        />
      ))}
    </div>
  )
}

function Spinner() {
  return (
    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-primary" />
  )
}
