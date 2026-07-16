/**
 * 규칙 기반 서비스 추천 — 순수 함수(오프라인·API 오류에도 항상 동작).
 *
 * 원칙: 법적 판단을 하지 않는다. "~일 수 있습니다" 수준의 안내 문구만 만든다.
 * 고민(concern)이 1차 축이고, 규모·업종·현재 상태가 보정한다.
 */

import type { ConsultAnswers, Recommendation, RecommendTarget } from "./types"

/** 고민 → 기본 추천(주/대안/무료진단 앵커). */
const BY_CONCERN: Record<
  ConsultAnswers["concern"],
  { primary: RecommendTarget; alt?: RecommendTarget; freeAnchor?: Recommendation["freeAnchor"] }
> = {
  wage: { primary: "payroll-system", alt: "labor-consulting", freeAnchor: "ordinary-wage" },
  dispute: { primary: "labor-disputes", alt: "labor-consulting" },
  harassment: { primary: "workplace-harassment", alt: "labor-consulting" },
  safety: { primary: "serious-accident-law", alt: "labor-consulting", freeAnchor: "safety" },
  freelancer: { primary: "freelancer", alt: "labor-consulting", freeAnchor: "freelancer" },
  hr_system: { primary: "hr-consulting", alt: "labor-consulting" },
  overall: { primary: "labor-consulting", alt: "hr-consulting", freeAnchor: "ordinary-wage" },
}

/** 고민별 안내 문구(규칙 폴백용 — LLM 실패 시 그대로 노출). */
const REASON: Record<ConsultAnswers["concern"], string> = {
  wage:
    "임금·수당은 산정 기준을 잘못 잡으면 임금체불·소급지급으로 이어질 수 있습니다. 통상임금·평균임금 산정과 포괄임금 운영을 먼저 점검해 보시길 권합니다.",
  dispute:
    "해고·징계는 절차와 사유 모두 정당해야 하고, 다투어지면 대응 준비가 필요합니다. 사건 대응과 함께 재발 방지를 위한 규정 정비를 함께 보시길 권합니다.",
  harassment:
    "직장 내 괴롭힘은 접수·조사·조치 절차를 법에 맞게 밟는 것이 핵심입니다. 특히 대표·임원이 관련되면 외부 조사기관의 객관적 조사가 필요할 수 있습니다.",
  safety:
    "산업안전·중대재해는 '체계를 만들고 실제로 이행한 기록'이 중요합니다. 안전보건관리체계 구축과 이행 점검부터 살펴보시길 권합니다.",
  freelancer:
    "3.3 프리랜서는 계약서 명칭이 아니라 실제 운영 방식이 근로자성을 좌우합니다. 근로자 추정제 논의도 진행 중이라 진단·계약·증빙을 함께 점검해 보시길 권합니다.",
  hr_system:
    "인사제도는 설계에서 끝나지 않고 현장에서 운영돼야 효과가 납니다. 제도 설계와 이를 담는 시스템까지 함께 보시길 권합니다.",
  overall:
    "전반 점검을 원하시면, 상시 자문으로 취약 지점을 먼저 진단하고 우선순위를 잡는 것이 효율적입니다.",
}

export function recommendPlan(a: ConsultAnswers): Recommendation {
  const base = BY_CONCERN[a.concern]
  let primary = base.primary
  let alt = base.alt
  let reason = REASON[a.concern]

  // 보정 1 — 제조·건설은 안전 리스크 비중이 큼.
  if (a.industry === "manufacture_construction" && a.concern === "overall") {
    alt = "serious-accident-law"
    reason += " 제조·건설 현장은 산업안전 리스크 비중이 커 함께 점검하시면 좋습니다."
  }

  // 보정 2 — 50인 이상은 인사제도·체계 정비 수요가 큼.
  if ((a.size === "mid" || a.size === "large") && a.concern === "hr_system") {
    alt = "labor-consulting"
  }

  // 보정 3 — 5인 미만은 규정 기본기부터.
  if (a.size === "under5" && a.concern === "overall") {
    reason += " 5인 미만이라도 근로계약서·임금명세서 등 기본 서류는 반드시 갖추셔야 합니다."
  }

  // 보정 4 — 자문 노무사가 없으면 상시 자문을 대안으로 제시.
  if (a.status === "no_advisor" && primary !== "labor-consulting") {
    alt = "labor-consulting"
  }

  // 무료 간이진단 우선 권유 — 자문이 없거나/모르거나/전반 점검일 때.
  const startFree =
    !!base.freeAnchor &&
    (a.status === "no_advisor" || a.status === "unknown" || a.concern === "overall" || a.status === "internal_only")

  return {
    primary,
    alt: alt === primary ? undefined : alt,
    reason,
    startFree,
    freeAnchor: base.freeAnchor,
  }
}
