/** AI 상담 도우미 선택지 — 버튼으로만 응답(자유입력 없음). */

import type {
  ConsultSize,
  ConsultIndustry,
  ConsultConcern,
  ConsultStatus,
  RecommendTarget,
} from "./types"

export interface Option<T extends string> {
  value: T
  label: string
}

export const SIZE_OPTIONS: Option<ConsultSize>[] = [
  { value: "under5", label: "5인 미만" },
  { value: "small", label: "5~49인" },
  { value: "mid", label: "50~299인" },
  { value: "large", label: "300인 이상" },
]

export const INDUSTRY_OPTIONS: Option<ConsultIndustry>[] = [
  { value: "manufacture_construction", label: "제조·건설" },
  { value: "it_service", label: "IT·서비스" },
  { value: "retail_sales", label: "유통·판매" },
  { value: "medical", label: "병원·의료" },
  { value: "public", label: "공공·기관" },
  { value: "etc", label: "기타" },
]

export const CONCERN_OPTIONS: Option<ConsultConcern>[] = [
  { value: "wage", label: "임금·수당 (통상임금·포괄임금)" },
  { value: "dispute", label: "해고·징계·노동분쟁" },
  { value: "harassment", label: "직장 내 괴롭힘" },
  { value: "safety", label: "산업안전·중대재해" },
  { value: "freelancer", label: "프리랜서·3.3 근로자성" },
  { value: "hr_system", label: "인사제도·평가·성과관리" },
  { value: "overall", label: "전반적으로 점검받고 싶다" },
]

export const STATUS_OPTIONS: Option<ConsultStatus>[] = [
  { value: "no_advisor", label: "자문 노무사가 없습니다" },
  { value: "has_advisor", label: "자문을 받고 있습니다" },
  { value: "internal_only", label: "내부 담당자가 처리합니다" },
  { value: "unknown", label: "잘 모르겠습니다" },
]

/** 추천 서비스 → 표시 라벨·경로. */
export const TARGET_META: Record<RecommendTarget, { label: string; href: string }> = {
  "labor-consulting": { label: "인사노무 관리 자문", href: "/services/labor-consulting" },
  "payroll-system": { label: "급여체계 컨설팅", href: "/services/payroll-system" },
  "hr-consulting": { label: "인사노무 컨설팅 · HR 테크", href: "/services/hr-consulting" },
  "serious-accident-law": { label: "중대재해처벌법 컨설팅", href: "/services/serious-accident-law" },
  "labor-disputes": { label: "노동분쟁 해결", href: "/services/labor-disputes" },
  "workplace-harassment": { label: "직장 내 괴롭힘 조사 수행", href: "/services/workplace-harassment" },
  freelancer: { label: "프리랜서 진단과 관리", href: "/services/freelancer" },
  "hr-risk-diagnosis": { label: "HR 리스크 진단", href: "/services/hr-risk-diagnosis" },
}

export const sizeLabel = (v: ConsultSize) => SIZE_OPTIONS.find((o) => o.value === v)?.label ?? v
export const industryLabel = (v: ConsultIndustry) =>
  INDUSTRY_OPTIONS.find((o) => o.value === v)?.label ?? v
export const concernLabel = (v: ConsultConcern) =>
  CONCERN_OPTIONS.find((o) => o.value === v)?.label ?? v
export const statusLabel = (v: ConsultStatus) => STATUS_OPTIONS.find((o) => o.value === v)?.label ?? v
