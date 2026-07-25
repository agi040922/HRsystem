"use server"

/**
 * AI 상담 도우미 서버 액션.
 *
 * - 저장하지 않는다(no-store): 상담 응답·요약을 DB에 남기지 않는다.
 *   분석(PostHog)에도 이용자가 고른 응답은 보내지 않는다. 상담 완료 여부와 추천 결과만 기록한다
 *   (개인정보처리방침 제4조 고지와 일치시킬 것).
 * - 클라이언트 값을 신뢰하지 않는다: enum 검증 후 서버에서 규칙 추천을 재계산한다.
 * - LLM 요약은 보조. 실패해도 규칙 추천은 항상 반환한다.
 */

import { getPostHogClient } from "@/lib/posthog-server"
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

/**
 * @param distinctId 브라우저 posthog-js 의 distinct_id. 서버에서 임의의 상수("anonymous")를 쓰면
 *   모든 상담이 한 사람으로 뭉쳐서 "방문 → 상담 완료" 퍼널이 깨지므로, 클라이언트 id 를 받아 쓴다.
 *   id 가 없으면(분석 스크립트 차단·미초기화) 잘못 귀속시키지 않고 이벤트를 보내지 않는다.
 */
export async function consultSummary(
  input: unknown,
  distinctId?: string,
): Promise<
  | { ok: true; recommendation: Recommendation; summary: string; summarySource: "ai" | "rule" }
  | { ok: false; reason: "invalid" }
> {
  const answers = parseAnswers(input)
  if (!answers) return { ok: false, reason: "invalid" }

  const recommendation = recommendPlan(answers)
  const summary = await summarizeConsult(answers, recommendation)

  const posthog = typeof distinctId === "string" && distinctId ? getPostHogClient() : null
  if (posthog) {
    posthog.capture({
      distinctId: distinctId as string,
      event: "sales_consultation_completed",
      // 이용자가 고른 응답(규모·업종·고민·현황)은 보내지 않는다. 개인정보처리방침에서
      // "선택 항목 자체는 저장하지 않는다"고 고지하고 있으므로, 상담 완료 여부와
      // 추천 결과까지만 통계 목적으로 기록한다.
      properties: {
        recommended_service: recommendation.primary,
        summary_source: summary.source,
      },
    })
    await posthog.flush()
  }

  return {
    ok: true,
    recommendation,
    summary: summary.text,
    summarySource: summary.source,
  }
}
