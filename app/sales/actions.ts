"use server"

/**
 * AI 상담 도우미 서버 액션.
 *
 * - 저장하지 않는다(no-store): 상담 응답·요약을 DB에 남기지 않는다.
 * - 클라이언트 값을 신뢰하지 않는다: enum 검증 후 서버에서 규칙 추천을 재계산한다.
 * - LLM 요약은 보조. 실패해도 규칙 추천은 항상 반환한다.
 */

import { recommendPlan } from "@/lib/salesAgent/recommend"
import { summarizeConsult } from "@/lib/salesAgent/summarize"
import type {
  ConsultAnswers,
  ConsultSize,
  ConsultIndustry,
  ConsultConcern,
  ConsultStatus,
  Recommendation,
} from "@/lib/salesAgent/types"

const SIZES: ConsultSize[] = ["under5", "small", "mid", "large"]
const INDUSTRIES: ConsultIndustry[] = [
  "manufacture_construction",
  "it_service",
  "retail_sales",
  "medical",
  "public",
  "etc",
]
const CONCERNS: ConsultConcern[] = [
  "wage",
  "dispute",
  "harassment",
  "safety",
  "freelancer",
  "hr_system",
  "overall",
]
const STATUSES: ConsultStatus[] = ["no_advisor", "has_advisor", "internal_only", "unknown"]

/** 허용된 enum 값만 통과. 하나라도 어긋나면 null. */
function parseAnswers(input: unknown): ConsultAnswers | null {
  if (!input || typeof input !== "object") return null
  const o = input as Record<string, unknown>
  const size = o.size as ConsultSize
  const industry = o.industry as ConsultIndustry
  const concern = o.concern as ConsultConcern
  const status = o.status as ConsultStatus
  if (
    !SIZES.includes(size) ||
    !INDUSTRIES.includes(industry) ||
    !CONCERNS.includes(concern) ||
    !STATUSES.includes(status)
  ) {
    return null
  }
  return { size, industry, concern, status }
}

export async function consultSummary(input: unknown): Promise<
  | { ok: true; recommendation: Recommendation; summary: string; summarySource: "ai" | "rule" }
  | { ok: false; reason: "invalid" }
> {
  const answers = parseAnswers(input)
  if (!answers) return { ok: false, reason: "invalid" }

  const recommendation = recommendPlan(answers)
  const summary = await summarizeConsult(answers, recommendation)
  return {
    ok: true,
    recommendation,
    summary: summary.text,
    summarySource: summary.source,
  }
}
