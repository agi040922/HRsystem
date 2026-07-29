// 비로그인 간이진단 3종(프리랜서·산업안전·도급적합성)의 문항·등급 로직 단일 출처.
// 클라이언트 컴포넌트와 서버(app/api/ai/diagnosis-polish)가 같은 데이터를 쓰기 위해 분리했다.
// 문항 텍스트·가중치·등급 임계값은 기존 컴포넌트에서 그대로 옮긴 것이며 변경하지 않는다.

export type QuickDiagKind = "freelancer" | "safety" | "subcontract"

export type QuickDiagAnswer = "예" | "아니오"
export type QuickDiagAnswers = Partial<Record<string, QuickDiagAnswer>>

export interface QuickDiagGrade {
  g: string
  label: string
  head: string
}

/** 문항 공통 형태. `area`(지표 구분)는 산업안전 진단에만 있다. */
export interface QuickDiagQuestion {
  id: string
  core: boolean
  weight: number
  text: string
  reason: string
  area?: string
}

// ── 1) 프리랜서 근로자성 간이진단 ────────────────────────────────────────
// 업무 6문항 → "예" = 위험 신호.

export type FreelancerQuestion = { id: string; core: boolean; weight: number; text: string; reason: string }

export const FREELANCER_QUESTIONS: FreelancerQuestion[] = [
  { id: "w1", core: true, weight: 2, text: "업무 방법을 구체적으로 지시하거나, 카톡·메신저 등으로 수시로 업무 지시를 하나요?", reason: "사업주가 업무 방법을 구체적이고 수시로 지시하면 근로자로 해석될 가능성이 높아집니다." },
  { id: "w2", core: true, weight: 2, text: "정해진 출퇴근 시간이 있고, 프리랜서가 그 시간에 맞춰 일해야 하나요?", reason: "정해진 출퇴근 시간에 맞춰 일하는 점은 근로자의 대표적 특징입니다." },
  { id: "w3", core: false, weight: 1, text: "회사가 지정한 장소(사무실 등)에 나와서 일해야 하나요?", reason: "지정된 장소 출근이 의무인 경우 근로자로 해석될 가능성이 높아집니다." },
  { id: "w4", core: false, weight: 1, text: "회사 직원처럼 휴가·근태·인사평가 규정을 적용받나요?", reason: "직원처럼 근태·인사평가 규정을 적용하면 독립적 프리랜서에 적합하지 않습니다." },
  { id: "w5", core: false, weight: 1, text: "자신이 직접 해야 하며, 다른 사람을 써서 대신 처리하면 안 되나요?", reason: "본인이 직접 해야 하고 대체가 안 되는 점은 사용종속성을 전제로 한 근로제공으로 해석될 수 있습니다." },
  { id: "w6", core: true, weight: 2, text: "일의 양·결과와 상관없이 매달 고정된 금액(고정급)을 지급하나요?", reason: "실적(결과)과 무관한 고정급 지급은 임금성·종속성의 강한 징표입니다." },
]

export const FREELANCER_MAX = FREELANCER_QUESTIONS.reduce((s, q) => s + q.weight, 0)

export function freelancerGrade(total: number, core: number): QuickDiagGrade {
  if (core >= 2 || total >= 5) return { g: "🔴", label: "🔴 친화도 하 (위험)", head: "적법한 프리랜서 계약으로 인정되지 않을 위험이 높습니다. 계약서만으로는 해결되지 않으며, 운영방식 개선 또는 근로계약 전환을 검토해 보시기 바랍니다." }
  if (core >= 1 || total >= 3) return { g: "🟡", label: "🟡 친화도 중 (주의)", head: "일부 위험 신호가 있습니다. 표시된 항목을 개선하면 안전 구간으로 이동할 수 있습니다." }
  return { g: "🟢", label: "🟢 친화도 상 (양호)", head: "독립적 프리랜서 관계에 가깝습니다. 계약서·지급증빙으로 현 상태를 유지·관리하시기 바랍니다." }
}

// ── 2) 산업안전 간이진단 ─────────────────────────────────────────────────
// 이행 확인 10문항 → "아니오" = 위험(미이행).

export type SafetyQuestion = { id: string; area: string; core: boolean; weight: number; text: string; reason: string }

export const SAFETY_QUESTIONS: SafetyQuestion[] = [
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

export const SAFETY_MAX = SAFETY_QUESTIONS.reduce((s, q) => s + q.weight, 0)

export function safetyGrade(total: number, core: number): QuickDiagGrade {
  const ratio = SAFETY_MAX > 0 ? total / SAFETY_MAX : 0
  if (core >= 2 || ratio >= 0.45) return { g: "🔴", label: "🔴 위험", head: "확인이 필요한 핵심 항목이 여럿입니다. 전체 진단으로 정확히 점검하고, 산업안전 전문가·노무사 상담을 권장합니다." }
  if (core >= 1 || ratio >= 0.2) return { g: "🟡", label: "🟡 주의", head: "일부 항목은 이행·증빙 확인이 필요해 보입니다. 표시된 항목을 점검·보완하고, 정확한 확인은 전체 진단으로 받아 보시길 권합니다." }
  return { g: "🟢", label: "🟢 양호", head: "핵심 안전보건 의무를 대체로 이행하고 있는 것으로 보입니다. 다만 간이진단은 10개 문항만 확인하므로, 전체 진단으로 세부 항목까지 점검해 보시길 권합니다." }
}

// ── 3) 도급적합성 간이진단 ───────────────────────────────────────────────
// 도급백신 진단 15문항 중 현장 핵심 6문항. "예" = 위험 신호.

export type SubcontractQuestion = { id: string; core: boolean; weight: number; text: string; reason: string }

export const SUBCONTRACT_QUESTIONS: SubcontractQuestion[] = [
  { id: "s1", core: true, weight: 2, text: "원청 직원이 수급업체 근로자에게 직접 업무·작업 지시를 하나요? (구두, 메신저, 작업지시서 등)", reason: "원청이 수급업체 근로자에게 직접 상당한 지휘·명령을 하는 것은 근로자파견의 핵심 요소로 해석될 가능성이 높습니다(대법원 5요소 ①)." },
  { id: "s2", core: false, weight: 1, text: "원청이 수급업체 근로자의 출퇴근·근태를 관리하거나 보고받나요?", reason: "원청이 근태를 관리·보고받는 것은 지휘·명령과 인사노무 관여의 징표가 될 수 있습니다." },
  { id: "s3", core: true, weight: 2, text: "원청 근로자와 같은 라인·공간에서 혼재되어 하나의 작업집단처럼 일하나요? (컨베이어 연동, 공정 혼재 등)", reason: "원청 근로자와 혼재되어 공동작업하는 것은 원청 사업에 실질적으로 편입된 것으로 해석될 가능성이 높습니다(대법원 5요소 ②)." },
  { id: "s4", core: false, weight: 1, text: "수급업체 인력의 채용·교체·배치에 원청이 관여하나요? (특정인 지정, 교체 요구, 승인 등)", reason: "인력의 선발·교체·배치에 원청이 관여하는 것은 인사노무 권한을 원청이 행사한 것으로 해석될 가능성이 높습니다(대법원 5요소 ③)." },
  { id: "s5", core: true, weight: 2, text: "도급대금이 일의 완성·성과가 아니라 투입 인원수×단가(공수) 방식으로 산정되나요?", reason: "인원수·근로시간(공수) 기준 대금 산정은 결과물에 대한 대가가 아니라 노무 제공의 대가로 해석될 가능성이 높습니다(대법원 5요소 ④)." },
  { id: "s6", core: false, weight: 1, text: "수급업체의 현장 관리자(현장대리인)가 없거나, 있어도 실질적 지휘를 하지 않나요?", reason: "수급업체 현장대리인이 없거나 형식적이면 실제 지휘가 원청에서 나온 것으로 해석될 가능성이 높아집니다." },
]

export function subcontractGrade(total: number, core: number): QuickDiagGrade {
  if (core >= 2 || total >= 5) return { g: "🔴", label: "🔴 도급 적합도 하 (위험)", head: "실질이 근로자파견(위장도급)으로 해석될 가능성이 높은 신호가 확인됩니다. 계약서 문구만으로는 해결되지 않으며, 작업지시 경로·정산방식·인원관리 개선 또는 도급구조 재설계 검토를 권장합니다. 개정 노조법상 원청 사용자성도 함께 검토가 필요할 수 있습니다." }
  if (core >= 1 || total >= 3) return { g: "🟡", label: "🟡 도급 적합도 중 (주의)", head: "일부 위험 신호가 있습니다. 표시된 항목을 개선하면 안전 구간으로 이동할 수 있습니다." }
  return { g: "🟢", label: "🟢 도급 적합도 상 (양호)", head: "진정한 도급 관계에 가깝습니다. 현재의 운영 방식(원청 불개입·수급업체 독립)을 계약서·작업지시 경로·정산증빙으로 유지·관리하시기 바랍니다. 다만 개정 노조법상 사용자성·교섭의무는 별개 쟁점이므로 등급과 무관하게 별도 검토가 필요할 수 있습니다." }
}

// ── 서버·클라이언트 공용 헬퍼 ────────────────────────────────────────────

export interface QuickDiagConfig {
  /** 결과 화면 상단에 쓰는 진단 이름(AI 프롬프트 문맥용) */
  title: string
  questions: QuickDiagQuestion[]
  grade: (total: number, core: number) => QuickDiagGrade
  /** 위험 신호로 계산되는 응답값 (산업안전만 "아니오") */
  riskAnswer: QuickDiagAnswer
}

const CONFIGS: Record<QuickDiagKind, QuickDiagConfig> = {
  freelancer: {
    title: "프리랜서 근로자성 간이진단 (업무 6문항)",
    questions: FREELANCER_QUESTIONS,
    grade: freelancerGrade,
    riskAnswer: "예",
  },
  safety: {
    title: "산업안전 간이진단 (이행 확인 10문항)",
    questions: SAFETY_QUESTIONS,
    grade: safetyGrade,
    riskAnswer: "아니오",
  },
  subcontract: {
    title: "도급적합성 간이진단 (현장 6문항)",
    questions: SUBCONTRACT_QUESTIONS,
    grade: subcontractGrade,
    riskAnswer: "예",
  },
}

export function isQuickDiagKind(value: unknown): value is QuickDiagKind {
  return value === "freelancer" || value === "safety" || value === "subcontract"
}

export function getQuickDiagConfig(kind: QuickDiagKind): QuickDiagConfig {
  return CONFIGS[kind]
}

/** 규칙 기반 결과 재계산 — 클라이언트가 보낸 등급을 신뢰하지 않기 위해 서버에서 다시 계산한다. */
export function computeQuickDiag(kind: QuickDiagKind, answers: Record<string, QuickDiagAnswer>) {
  const config = getQuickDiagConfig(kind)
  let total = 0
  let core = 0
  const signals: QuickDiagQuestion[] = []
  for (const q of config.questions) {
    if (answers[q.id] === config.riskAnswer) {
      total += q.weight
      if (q.core) core += 1
      signals.push(q)
    }
  }
  return { ...config.grade(total, core), signals, title: config.title }
}
