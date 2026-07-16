/**
 * 상담 요약(LLM 보조) — 서버 전용.
 *
 * 안전 원칙:
 * - 입력은 선택지(enum) 라벨뿐이다(자유입력·개인정보 없음).
 * - AI는 판정하지 않는다: 법적 확정 표현은 제거·완곡화한다.
 * - 저장하지 않는다: 이 함수는 아무것도 DB에 남기지 않는다.
 * - OPENAI_API_KEY 미설정·오류·타임아웃 시 규칙 문구로 폴백한다(항상 성공 반환).
 */

import OpenAI from "openai"
import type { ConsultAnswers, Recommendation } from "./types"
import { sizeLabel, industryLabel, concernLabel, statusLabel, TARGET_META } from "./options"

export interface ConsultSummary {
  text: string
  /** ai=LLM 생성, rule=폴백(규칙 문구). */
  source: "ai" | "rule"
}

const SYSTEM = [
  "당신은 'FAIR인사노무컨설팅'(27년 경력 공인노무사가 운영하는 인사노무 자문·컨설팅 회사)의 친절한 상담 도우미입니다.",
  "역할: 사용자가 버튼으로 고른 상황(회사 규모·업종·가장 큰 고민·현재 노무 관리 상태)과 추천 서비스를 바탕으로, 2~3문장의 따뜻하고 이해하기 쉬운 안내를 작성합니다.",
  "반드시 지킬 것:",
  "- 법적 판단·확정을 하지 않는다. '위법이다', '무효다', '반드시 ~해야 한다' 같은 단정 표현 금지.",
  "- '위험할 수 있다', '점검이 필요할 수 있다'처럼 가능성으로만 표현한다.",
  "- 추천 서비스가 왜 그 상황에 맞는지 한 문장으로 자연스럽게 녹여 설명한다.",
  "- 과장·허위 효능 표현 금지. 존댓말. 이모지 금지.",
  '출력은 JSON: {"text": "..."} 형식만. text는 140자 이내 한국어.',
].join("\n")

function buildUser(a: ConsultAnswers, rec: Recommendation): string {
  return [
    "[사용자 상황]",
    `회사 규모: ${sizeLabel(a.size)}`,
    `업종: ${industryLabel(a.industry)}`,
    `가장 큰 고민: ${concernLabel(a.concern)}`,
    `현재 노무 관리: ${statusLabel(a.status)}`,
    "",
    "[규칙 기반 추천 결과]",
    `추천 서비스: ${TARGET_META[rec.primary].label}${rec.alt ? ` (대안: ${TARGET_META[rec.alt].label})` : ""}`,
    `근거: ${rec.reason}`,
    "",
    "위 상황과 추천을 사용자에게 2~3문장으로 따뜻하게 안내하세요.",
  ].join("\n")
}

/** LLM 출력 안전 추출 + 단정 표현 완곡화 + 길이 제한. */
function sanitizeSummary(raw: string): string | null {
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return null
  }
  const text = (parsed as { text?: unknown })?.text
  if (typeof text !== "string") return null
  let out = text.replace(/\s+/g, " ").trim()
  if (out.length < 8) return null
  // 모델이 규칙을 어겼을 때의 방어 — 단정 표현 완곡화.
  out = out
    .replace(/위법입니다/g, "위험 요소가 있을 수 있습니다")
    .replace(/불법입니다/g, "위험 요소가 있을 수 있습니다")
    .replace(/무효입니다/g, "효력이 다투어질 수 있습니다")
    .replace(/반드시 (해야|하셔야) 합니다/g, "하시는 것이 좋습니다")
  return out.slice(0, 200)
}

export async function summarizeConsult(
  a: ConsultAnswers,
  rec: Recommendation,
): Promise<ConsultSummary> {
  const key = process.env.OPENAI_API_KEY
  if (!key) return { text: rec.reason, source: "rule" }

  try {
    const openai = new OpenAI({ apiKey: key, timeout: 8000, maxRetries: 1 })
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: buildUser(a, rec) },
      ],
      response_format: { type: "json_object" },
      max_tokens: 300,
      temperature: 0.5,
    })
    const raw = res.choices[0]?.message?.content
    if (raw) {
      const text = sanitizeSummary(raw)
      if (text) return { text, source: "ai" }
    }
  } catch {
    /* 폴백 */
  }
  return { text: rec.reason, source: "rule" }
}
