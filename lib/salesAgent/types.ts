/**
 * AI 상담 도우미(세일즈 에이전트) 공용 타입 — FAIR인사노무컨설팅.
 *
 * 설계 원칙(프리랜서 백신 패턴 이식):
 * - 최소저장: 상담 대화 내용을 저장하지 않는다.
 * - AI는 판정하지 않는다: 법적 결론을 확정하지 않고 안내·요약만 한다.
 * - 가이드된 선택: 사용자는 버튼으로만 응답한다(자유입력 없음 → 개인정보 유입 차단).
 * - 규칙 추천이 우선, LLM 요약은 보조(실패 시 규칙 문구로 폴백).
 */

/** 회사 규모 — 적용 법령·서비스 추천 근거. */
export type ConsultSize = "under5" | "small" | "mid" | "large"

/** 업종(회사 단위 사업정보, 개인정보 아님). */
export type ConsultIndustry =
  | "manufacture_construction"
  | "it_service"
  | "retail_sales"
  | "medical"
  | "public"
  | "etc"

/** 가장 큰 고민 — 서비스 추천의 핵심 축. */
export type ConsultConcern =
  | "wage" // 임금·수당(통상임금·포괄임금)
  | "dispute" // 해고·징계·노동분쟁
  | "harassment" // 직장 내 괴롭힘
  | "safety" // 산업안전·중대재해
  | "freelancer" // 프리랜서·3.3 근로자성
  | "hr_system" // 인사제도·평가·성과관리
  | "overall" // 전반 점검

/** 현재 노무 관리 상태. */
export type ConsultStatus = "no_advisor" | "has_advisor" | "internal_only" | "unknown"

export interface ConsultAnswers {
  size: ConsultSize
  industry: ConsultIndustry
  concern: ConsultConcern
  status: ConsultStatus
}

/** 추천 대상 — FAIR 서비스 슬러그. */
export type RecommendTarget =
  | "labor-consulting"
  | "payroll-system"
  | "hr-consulting"
  | "serious-accident-law"
  | "labor-disputes"
  | "workplace-harassment"
  | "freelancer"
  | "hr-risk-diagnosis"

export interface Recommendation {
  /** 1순위 추천 서비스. */
  primary: RecommendTarget
  /** 대안(있으면). */
  alt?: RecommendTarget
  /** 추천 근거(사용자에게 보여줄 한두 문장). */
  reason: string
  /** 무료 간이진단부터 먼저 권하는지. */
  startFree: boolean
  /** 무료 간이진단 링크의 해시(통상임금/산업안전/프리랜서). */
  freeAnchor?: "ordinary-wage" | "safety" | "freelancer"
}
