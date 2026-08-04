// 영문 랜딩페이지 데이터 단일 출처 (/en/global-companies).
//
// ⚠️ 원칙
//  - 이 페이지는 해외 본사·외국인 인사담당자가 읽는 대외 문서다. 기계번역체를 쓰지 않는다.
//  - 국문 `/global-companies` 의 번역이 아니라 **같은 사실을 영어권 독자에게 맞게 다시 쓴 것**이다.
//    (그대로 번역하면 hreflang 쌍으로는 맞지만 읽히지 않는다.)
//  - 실적 표현은 전부 과거·누적형(이력 기준)으로 쓴다.
//  - FAQ 답변은 **이번 세션에서 원문을 확인한 조문만** 근거로 삼았다:
//    근로기준법 제76조의3, 남녀고용평등법 제14조, 노동조합법 제2조 제2호 후단.
//    취업규칙 작성 기준 인원(10인 이상), 대표이사의 근로자성(실질 판단), 철수 시 보상은
//    **CEO(노무사) 확인으로 추가**했다(2026-08-04). 철수 시 위로금은 법정 의무가 아니라
//    관행이므로 customary practice 로 쓴다 — requirement 로 바꾸지 말 것.

export type EnProblem = { q: string }

/** 외국계 본사·한국법인이 실제로 부딪히는 질문 — 검색어이자 페이지의 진입 후크 */
export const EN_PROBLEMS: EnProblem[] = [
  { q: "Can we apply our global PIP to employees in Korea as it stands?" },
  { q: "Headquarters has decided on a termination — how is that carried out under Korean law?" },
  { q: "Our global rules of employment conflict with the Korean ones. Which governs?" },
  { q: "A harassment complaint has been filed. How do we report it to headquarters?" },
  { q: "How should local hire and expatriate contracts differ?" },
  { q: "What does a workforce reduction or subsidiary closure in Korea actually require?" },
  { q: "Can our overseas investigation team interview Korean employees directly?" },
  { q: "Where is the line between an executive and an employee under Korean law?" },
]

export type EnService = { title: string; desc: string }

export const EN_SERVICES: EnService[] = [
  {
    title: "Ongoing HR & labor advisory",
    desc: "Day-to-day advice for the Korean entity, with a single point of contact rather than a rotating account team.",
  },
  {
    title: "Employment contracts & rules of employment",
    desc: "Drafting and review in Korean and English, including where a global template has to be reconciled with Korean law.",
  },
  {
    title: "Termination, PIP and restructuring",
    desc: "Assessment of grounds and procedure before a decision is executed, not after it is challenged.",
  },
  {
    title: "Workplace investigations",
    desc: "Neutral external fact-finding on harassment, sexual harassment, policy breaches, trade secrets and non-compete obligations.",
  },
  {
    title: "Collective bargaining & labor relations",
    desc: "First response when a union is formed, bargaining strategy and agenda management, works council operation.",
  },
  {
    title: "Labor Relations Commission & MOEL matters",
    desc: "Representation in unfair dismissal and unfair labor practice cases, and in labor inspections.",
  },
  {
    title: "HR compliance review",
    desc: "Working hours, pay structure and HR systems examined before they become disputes.",
  },
  {
    title: "Reporting to headquarters",
    desc: "Written opinions and case summaries in English, prepared so that headquarters can follow what was decided and why.",
  },
]

export type EnReason = { no: string; title: string; desc: string }

export const EN_REASONS: EnReason[] = [
  {
    no: "01",
    title: "Beyond document compliance",
    desc: "Advisory marketed to foreign companies often stops at English-language contracts and work rules. The moment a union is formed and the first bargaining session opens calls for something else entirely. FAIR has handled more than 200 labor cases and Labor Relations Commission matters directly.",
  },
  {
    no: "02",
    title: "The managing attorney answers, not an account team",
    desc: "Large firms are strong on major matters but expensive, and every routine question waits in a queue. At FAIR the managing labor attorney — 27 years in practice, formerly of Kim & Chang — responds directly.",
  },
  {
    no: "03",
    title: "A record headquarters can rely on",
    desc: "What a global head office asks of its Korean entity is not only the outcome but the governance behind it: on what basis, when, and what was decided. Advisory history, diagnostic reports and policy changes accumulate in FAIR CRM and can be produced for an internal audit at any time.",
  },
  {
    no: "04",
    title: "The same person in peacetime and in a dispute",
    desc: "Payroll and HR outsourcing handles defined procedures accurately, but cannot supply a legal judgment the day a union files a demand or an inspection begins. FAIR maintains the policies in ordinary times and acts as representative when a matter becomes contentious.",
  },
]

export type EnFaq = { q: string; a: string }

// ⚠️ 아래 답변은 원문을 확인한 조문에만 근거한다. 단정 표현을 피하고 일반적 안내로 쓴다.
export const EN_FAQS: EnFaq[] = [
  {
    q: "Does Korean labor law apply to a foreign-invested company in Korea?",
    a: "As a rule, a company that employs workers and operates a business in Korea is subject to Korean labor and employment legislation regardless of where its parent is incorporated. In practice, the work is to identify in advance where a global HR policy and Korean law diverge, and to reconcile them before a decision has to be executed.",
  },
  {
    q: "Is at-will employment recognised in Korea?",
    a: "No. Korean law does not permit termination at will. Dismissal requires justifiable cause and a procedure that can be demonstrated afterwards. A decision taken at headquarters on a global standard therefore has to be re-examined against Korean requirements before it is carried out in Korea.",
  },
  {
    q: "A harassment complaint has been filed. What is the company required to do?",
    a: "Article 76-3(2) of the Labor Standards Act requires the employer, upon receiving a report or becoming aware of workplace harassment, to conduct an objective investigation without delay to establish the facts. Article 14(2) of the Equal Employment Opportunity Act imposes a corresponding duty for sexual harassment, and additionally requires that the complainant not be made to feel sexual humiliation during the investigation. The investigation is a legal obligation, not a management option.",
  },
  {
    q: "Can our overseas investigation team interview Korean employees directly?",
    a: "There is no blanket prohibition, but two points deserve attention. Participants in an investigation are subject to confidentiality obligations under the provisions above, and an investigator who belongs to the same organisation as a party will have the fairness of the outcome questioned later. Where the employer itself is the subject of the report, an external investigator is the safer course.",
  },
  {
    q: "We use subcontractors in Korea. Could we be required to bargain with their union?",
    a: "Possibly. Under the amended Trade Union and Labor Relations Adjustment Act, effective 10 March 2026, a party that is not the employer under the employment contract may still be treated as an employer under that Act, within the scope of the working conditions it substantially and concretely controls and determines. If your company uses subcontracted or in-house partner labour, the question worth answering now is which working conditions you are in fact deciding.",
  },
  {
    q: "Do we need rules of employment for our Korean entity?",
    a: "Yes, where the business ordinarily employs 10 or more workers. The obligation applies to a foreign-invested company on the same terms as to any other employer in Korea. The question that follows in practice is which parts of a global policy can be carried into the Korean rules of employment and which cannot.",
  },
  {
    q: "Is the representative director of a Korean subsidiary an employee?",
    a: "Not determined by title alone. The assessment follows the substance of the relationship rather than the registered position, so a person appointed as a representative director or officer may still be found to be an employee. What matters is how the role is actually performed — whether the person is subject to direction and supervision, how working time is set, how remuneration is determined. This is worth establishing before a departure or termination is arranged, not after.",
  },
  {
    q: "What do we owe employees when closing or downsizing a Korean subsidiary?",
    a: "It depends on how the separations are carried out — the requirements differ between a dismissal for managerial reasons and a separation by agreement. Beyond statutory entitlements, the customary practice in Korea is to consult the employee representative or hold employee meetings and then pay an ex gratia settlement. That consultation is not a formality; planning it before any announcement is usually what determines whether the process holds together.",
  },
  {
    q: "Is a consultation available before we enter into an advisory agreement?",
    a: "Yes. Describe the situation and we will tell you what should be examined first. Where a matter is already underway, clarifying the scope at the outset materially reduces what has to be argued later.",
  },
]
