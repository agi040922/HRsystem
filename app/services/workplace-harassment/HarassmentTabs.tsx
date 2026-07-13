"use client"

import { useEffect, useState } from "react"
import { ChevronDown, ShieldAlert, ListChecks, FolderCheck, Award } from "lucide-react"

const LAST_UPDATED = "2026-07-08"

const PROCEDURES = [
  {
    no: "1",
    title: "사건의 접수",
    summary: "누구든지 신고할 수 있으며, 신고가 없어도 인지하면 접수합니다.",
    points: [
      "법에 따라 누구든지 직장 내 괴롭힘 발생 사실을 신고할 수 있으므로, 신고자를 불문하고 신고가 있으면 사건을 접수합니다.",
      "담당조직(담당자) 직접 신고 외에 온라인 신고센터, 이메일 등 다양한 창구를 보장하고, 신고자의 비밀 보장과 불이익 없음을 미리 공지합니다.",
      "신고가 없더라도 담당조직(담당자)이 발생 사실을 인지하면 사건을 접수할 수 있습니다.",
      "접수 후 지체 없이 조사에 임해야 합니다. 신고에도 조사가 진행되지 않으면 노동청 진정 대상이 되고, 조사 미실시가 인정되면 과태료가 부과될 수 있습니다.",
      "소속 부서장을 통한 접수·상담·조사는 객관적 조사 진행에 어려움이 있을 수 있음을 고려합니다.",
    ],
  },
  {
    no: "2",
    title: "조사 — 상담 · 약식 조사 · 정식 조사",
    summary: "피해자의 의사에 따라 상담으로 방향을 정하고, 약식 또는 정식 조사로 진행합니다.",
    points: [
      "조사자·피조사자는 비밀유지 서약서를 작성하고, 대면조사는 공정성을 위해 조사자 2명 참여를 권고합니다. 조사 순서는 피해자 → 참고인 → 행위자 순이 적정합니다.",
      "조사 중에도 피해자 요청을 확인해 근무장소 변경, 휴가 부여 등 보호조치를 하되, 피해자 의사에 반하는 조치는 금지됩니다.",
      "대표이사가 행위자로 지목된 경우 감사가 직접 조사해 이사회에 보고하는 별도 체계를 갖추는 것을 권고합니다. 사업주·사업경영담당자가 행위자인 경우 사용자의 ‘셀프조사’는 객관성이 부정될 수 있으며, 개정 신고사건 처리지침(2026. 4.)에 따라 근로감독관이 선제적으로 직접 조사할 수 있습니다.",
      "상담: 피해 상황과 피해자의 요구를 파악해 처리방향을 결정합니다. 모든 과정의 비밀유지를 고지하고, 피해자의 이야기를 충분한 시간을 들여 경청하며, 선택 가능한 해결 방식의 객관적 정보를 제공합니다. 심각한 피해는 심리상담·의료지원·법적지원 연계를 검토합니다.",
      "약식 조사: 당사자 간 합의나 분리조치를 위한 절차로, 피해자(또는 피해자가 추천한 참고인) 조사를 최대한 조속히 완료하고 약식 조사 보고서(당사자 관계, 사건 경위, 증거, 피해 정도, 요청사항)를 작성해 사업주에게 보고합니다.",
      "정식 조사: 조사 기간·조사자·조사위원회 구성은 취업규칙으로 규범화해 두는 것이 바람직합니다. 조사자의 중립성과 전문성이 중요하며, 사안이 복잡하면 위원회 방식이나 외부 전문가 참여를 권장합니다.",
    ],
  },
  {
    no: "3",
    title: "사실의 확인 및 조치",
    summary: "확인 결과에 따라 보호조치·합의 이행·징계 등 필요한 조치를 합니다.",
    points: [
      "분리만 요청한 경우: 상담 내용을 신속히 보고해 배치전환 등 보호조치 실행 여부를 판단하고, 일정 기간 행위자의 행동을 관찰합니다.",
      "합의를 원하는 경우: 약식 조사로 괴롭힘이 확인되면 피해자의 요구안(사과, 재발방지 약속, 행위자 배치전환, 교육 등)을 행위자에게 전달하고, 수용하면 이행 후 종결합니다. 결렬 시 재상담 후 정식 조사 여부를 확인합니다.",
      "정식 조사를 한 경우: 괴롭힘 사실이 확인되면 행위자에 대한 징계·근무장소 변경 등 필요한 조치를 하여야 하고, 피해자가 요청하면 근무장소 변경·배치전환·유급휴가 명령 등 적절한 조치를 하여야 합니다(근로기준법 제76조의3 제4항·제5항).",
      "행위자에 대한 징계 등 조치를 하기 전에는 그 조치에 대하여 피해근로자의 의견을 들어야 합니다(근로기준법 제76조의3 제5항 — 2025. 10. 23. 시행 개정으로 명문화). 피해자 의사에 반하는 배치전환은 보호조치로 보기 어렵습니다. 조치 내용이 결정되면 결과를 당사자에게 서면으로 통보합니다.",
      "심의위원회(괴롭힘 인정 여부 심의·권고)와 인사위원회(조치 의결)를 나누어 운영하거나, 사업장 규모에 따라 인사위원회로 통합 운영할 수 있습니다.",
    ],
  },
  {
    no: "4",
    title: "불리한 처우 금지",
    summary: "신고·피해 주장을 이유로 한 불이익은 형사처벌 대상입니다.",
    points: [
      "사용자는 직장 내 괴롭힘 발생 사실을 신고하거나 피해를 주장했음을 이유로 해고나 그 밖의 불리한 처우를 해서는 안 됩니다. 위반 시 3년 이하의 징역 또는 3천만원 이하의 벌금에 처해지며, 민사상 손해배상책임도 집니다.",
      "불리한 처우의 예: 해고 등 신분상실 조치, 부당한 인사조치(징계·정직·감봉·강등·승진 제한), 본인 의사에 반하는 직무 재배치, 평가·임금 차별, 교육훈련 기회 제한, 집단 따돌림·폭행·폭언의 방치 등(남녀고용평등법 제14조 제6항 참고).",
      "신고가 사실로 확인되지 않은 경우에도 불리한 처우는 금지되며, 판례는 불리한 처우 판단에서 피해근로자의 주관적 의사를 가장 중요한 요소로 고려합니다.",
    ],
  },
  {
    no: "5",
    title: "예방조치 및 모니터링",
    summary: "조직문화 개선의 계기로 삼고, 사건 종결 후에도 재발을 살핍니다.",
    points: [
      "사건 종결 후 당사자 신원은 가리고 괴롭힘 행위 상황과 회사의 조치를 전 직원 교육 등으로 공유해 경각심을 높일 수 있습니다. 다만 신원 특정으로 인한 2차 피해 우려가 있으므로 피해근로자의 의사 확인이 선행되어야 합니다.",
      "괴롭힘이 인정되지 않은 경우에도 피해자의 고충이 해소된 것은 아니므로, 상담을 다시 진행해 고충해소 방안을 모색합니다.",
      "사건 종결 후 일정 기간(예: 2년) 동안 반기별로 행위자에 의한 괴롭힘 재발 여부, 보복 등이 발생하지 않는지 주의 깊게 지켜보고 피해자를 지원하는 것이 바람직합니다.",
    ],
  },
]

const CASES = [
  { org: "다국적 기업 제조업", desc: "회식 과정에서의 폭언과 업무수행 과정에서의 위압적 태도로 인한" },
  { org: "다국적 기업 제조업", desc: "대기발령과 성과부진에 대한 질책으로 인한" },
  { org: "국내 대표 의료기기 유통업", desc: "부서 간 업무권한에 대한 갈등과 모욕적인 언행으로 인한" },
  { org: "국립 미술관", desc: "고압적인 업무지시와 휴가신청에 대한 반려로 인한" },
  { org: "시립 도서관", desc: "성희롱과 갑질에 대한" },
  { org: "공공기관(공사)", desc: "사적인 부분에 대한 지속적인 언급과 고압적인 업무지시로 인한" },
]

const STRENGTHS = [
  {
    no: "1",
    title: "경험 많은 베테랑 전문가",
    desc: "27년 실무 경력의 공인노무사(제8회, 1999)로서 김&장 법률사무소 노무사 출신, 법원행정처 전문심리위원 후보자(2025~)이며, 공공기관·기업의 직장 내 괴롭힘 조사 및 심의위원장을 다수 수행했습니다. 특히 고용노동부가 본인의 조사보고서를 인용하여 판단한 사례 등으로 ‘보고서 증거력’이 실제 검증된 전문가입니다.",
  },
  {
    no: "2",
    title: "AI 활용 모의판정문 제시 (의뢰 기관이 동의한 경우에 한함)",
    desc: "조사 결과를 노동위원회·법원이 사용하는 판정문 형식의 ‘모의 판정문’으로 작성해 함께 제시합니다. AI 기반 유사 판례·노동위 사건 분석으로 사실관계와 법리를 교차검증하고, 본 사건이 분쟁으로 비화할 경우의 판단을 사전 시뮬레이션합니다. 이를 통해 ① 조사 결론의 법적 방어력 강화, ② 당사자에 대한 결과 예측 가능성 제공, ③ 후속 징계양정 등 의사결정 리스크의 사전 점검이 가능합니다. (AI는 보조도구이며, 최종 판단은 노무사의 전문적 검토로 확정합니다.)",
  },
  {
    no: "3",
    title: "피해자 심리검사 지원",
    desc: "필요할 경우 피해자의 동의 하에 표준화된 심리검사(우울·불안·직무스트레스 척도 등)와 전문 심리상담기관 연계를 지원합니다. 조사 과정에서의 2차 피해를 예방하고 피해자의 회복을 돕는 동시에, 조직이 책임 있게 대응했다는 절차적 신뢰성을 함께 확보합니다.",
  },
]

const PRINCIPLES = [
  {
    name: "객관성",
    desc: "27년 경력의 베테랑 노무사가 노동위원회·법원의 판단 기준을 선제 적용하여, 고용노동부 진정·민형사 분쟁에서도 효과적인 증거력을 유지합니다.",
  },
  {
    name: "적법성",
    desc: "근로기준법 제76조의2·제76조의3 및 판례 기준에 부합하는 절차를 준수하여, 조사 결과가 법적 분쟁에서 흔들리지 않는 방어 논리가 되도록 합니다.",
  },
  {
    name: "중립성",
    desc: "외부 전문가 관점에서 절차적 정당성을 확보하고, 신고인·피신고인 모두가 결과에 승복할 수 있는 공정성을 담보합니다.",
  },
  {
    name: "비밀유지",
    desc: "엄격한 보안 체계로 사건 확산과 ‘2차 가해’ 리스크를 차단하여, 조직 내부의 불필요한 동요와 평판 손상을 최소화합니다.",
  },
]

const METHODOLOGY = [
  {
    step: "STEP 1",
    title: "조사 범위·전략 수립",
    desc: "신고 요지를 근로기준법상 괴롭힘 요건과 매칭하고, 잠재적 법적 분쟁 지점을 선제 도출하여 조사 범위·질문 전략을 수립합니다.",
  },
  {
    step: "STEP 2",
    title: "구조화된 분리 조사",
    desc: "신고인·피신고인·참고인별로 설계된 질문지를 운용하며 진술의 일관성·구체성을 확인합니다. 피해자 심리상태를 고려하고 필요 시 심리검사·상담기관 연계를 안내합니다.",
  },
  {
    step: "STEP 3",
    title: "물적 증거 대조·분석",
    desc: "메신저·이메일·근태 데이터 등 객관적 자료를 진술과 병치하여, 주관적 주장을 배제한 ‘확정적 사실’을 추출합니다.",
  },
  {
    step: "STEP 4",
    title: "법리 검토·AI 모의판정문 교차검증",
    desc: "근로기준법 제76조의2·제76조의3 요건별로 매칭하고, AI 기반 유사 판례·노동위 사건과 대조하며, 모의 판정문 작성으로 결론의 타당성을 사전 검증합니다.",
  },
  {
    step: "STEP 5",
    title: "조사 결과 보고서 작성",
    desc: "감정적 언어를 배제한 증거 기반 사실관계와 판례 중심 법률 검토를 결합하여, 노동위·법원이 즉시 인용 가능한 수준의 보고서를 제출합니다(모의판정문 첨부 가능).",
  },
]

type TabKey = "procedure" | "cases" | "strengths"

export default function HarassmentTabs() {
  const [active, setActive] = useState<TabKey>("procedure")

  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.replace("#", "")
      if (h === "procedure" || h === "cases" || h === "strengths") setActive(h)
    }
    sync()
    window.addEventListener("hashchange", sync)
    return () => window.removeEventListener("hashchange", sync)
  }, [])

  const select = (key: TabKey) => {
    setActive(key)
    if (typeof window !== "undefined" && window.location.hash !== `#${key}`) {
      window.history.replaceState(null, "", `#${key}`)
    }
  }

  const TABS: { key: TabKey; title: string; desc: string; icon: React.ReactNode }[] = [
    {
      key: "procedure",
      title: "조사 절차",
      desc: "신고 접수부터 조치·모니터링까지 5단계",
      icon: <ListChecks className="h-6 w-6" />,
    },
    {
      key: "cases",
      title: "수행 사례",
      desc: "최근 3년간 대표 수행 사례",
      icon: <FolderCheck className="h-6 w-6" />,
    },
    {
      key: "strengths",
      title: "FAIR 강점",
      desc: "27년 전문성 · AI 모의판정 · 심리지원",
      icon: <Award className="h-6 w-6" />,
    },
  ]

  return (
    <div>
      {/* 선택 상자 — 옆으로 나란히 */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {TABS.map((t) => {
          const isActive = t.key === active
          return (
            <button
              key={t.key}
              id={t.key}
              type="button"
              onClick={() => select(t.key)}
              aria-pressed={isActive}
              className={`scroll-mt-28 flex items-center gap-3 rounded-2xl border p-4 sm:p-5 text-left transition-all ${
                isActive
                  ? "border-primary bg-primary/5 ring-2 ring-primary/30 shadow-sm"
                  : "border-blue-900 bg-white hover:border-primary hover:bg-primary/5"
              }`}
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                  isActive ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                }`}
              >
                {t.icon}
              </div>
              <div className="min-w-0">
                <div className="text-sm sm:text-base font-bold text-gray-900 leading-tight">{t.title}</div>
                <div className="mt-0.5 text-xs sm:text-sm text-muted-foreground">{t.desc}</div>
              </div>
            </button>
          )
        })}
      </div>

      {/* ── 조사 절차 ── */}
      {active === "procedure" && (
        <div className="mt-8">
          {/* 최근 법·지침 개정 반영 */}
          <div className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h3 className="text-sm font-bold text-primary">최근 법·지침 개정 반영</h3>
              <span className="text-xs font-semibold text-primary/80">개정 반영일 · {LAST_UPDATED}</span>
            </div>
            <ul className="space-y-2.5 text-sm leading-relaxed text-gray-700">
              <li className="flex gap-2">
                <span aria-hidden className="mt-0.5 shrink-0 text-primary">•</span>
                <span>
                  <b>근로기준법 제76조의3 개정(2025. 10. 23. 시행)</b> — 사용자는 행위자에 대한 징계 등
                  조치를 하기 <b>전에</b> 그 조치에 대하여 <b>피해근로자의 의견을 들어야 합니다.</b>
                </span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden className="mt-0.5 shrink-0 text-primary">•</span>
                <span>
                  <b>「직장 내 괴롭힘 판단 및 예방·대응 매뉴얼」 개정</b> — 사업주가 행위자로 신고된 사건의{" "}
                  <b>‘셀프조사’를 방지</b>하고, 판단 사례를 조사단계·판단요건·행동유형별로 대폭 보강(괴롭힘
                  인정·불인정 사례 병기).
                </span>
              </li>
              <li className="flex gap-2">
                <span aria-hidden className="mt-0.5 shrink-0 text-primary">•</span>
                <span>
                  <b>직장 내 괴롭힘 신고사건 처리지침 개정(2026. 4.)</b> — 행위자가{" "}
                  <b>사업주·사업경영담당자</b>인 경우 근로감독관이 선제적으로 직접 조사할 수 있습니다.
                </span>
              </li>
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-gray-400">
              참고용 안내이며 개별 사안의 법적 판단을 대체하지 않습니다. 근거: 근로기준법 제76조의3, 고용노동부
              「직장 내 괴롭힘 판단 및 예방·대응 매뉴얼」 및 신고사건 처리지침.
            </p>
          </div>

          {/* 비밀유지 박스 */}
          <div className="mb-8 rounded-2xl border border-red-100 bg-red-50 p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="h-5 w-5 text-red-700 shrink-0" />
              <h3 className="text-sm font-bold text-red-800">비밀유지 — 2차 피해 방지의 핵심</h3>
            </div>
            <p className="text-sm leading-relaxed text-red-700">
              조사자, 조사 내용을 보고받은 사람, 그 밖에 조사 과정에 참여한 사람은 조사 과정에서 알게 된 비밀을
              피해근로자등의 의사에 반하여 다른 사람에게 누설해서는 안 됩니다(2021. 10. 14. 이후 발생 사건부터
              적용, 위반 시 과태료). 신고 내용 자체도 피해근로자등의 동의 없이 제공되어서는 안 되며, 상담 장소
              역시 비밀이 보장되는 공간이어야 합니다.
            </p>
          </div>

          {/* 5단계 절차 (접힘 → 클릭 시 상세) */}
          <div className="space-y-3">
            {PROCEDURES.map((p) => (
              <details key={p.no} className="group rounded-2xl border border-blue-900 bg-white">
                <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-4 [&::-webkit-details-marker]:hidden">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                    {p.no}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-bold text-gray-900">{p.title}</span>
                    <span className="mt-0.5 block text-xs sm:text-sm text-muted-foreground">{p.summary}</span>
                  </span>
                  <ChevronDown
                    aria-hidden
                    className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180"
                  />
                </summary>
                <ul className="space-y-2.5 border-t border-gray-100 px-5 py-4">
                  {p.points.map((point, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-600">
                      <span aria-hidden className="mt-0.5 shrink-0 text-primary">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>
      )}

      {/* ── 수행 사례 ── */}
      {active === "cases" && (
        <div className="mt-8">
          <h3 className="mb-2 text-lg sm:text-xl font-bold text-gray-900">최근 3년간 대표 수행 사례</h3>
          <p className="mb-5 text-sm sm:text-base leading-relaxed text-muted-foreground">
            FAIR인사노무컨설팅이 외부 조사기관으로서 최근 3년간 직접 수행한 대표 직장 내 괴롭힘 조사
            사례입니다. 의뢰 기관의 비밀유지를 위해 업종·기관 유형만 표기합니다.
          </p>
          <div className="space-y-3">
            {CASES.map((c, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-2xl border border-blue-900 bg-white p-4 sm:p-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <div className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {c.org}
                  </div>
                  <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-gray-800">
                    {c.desc} 직장 내 괴롭힘 조사 수행
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-gray-400">
            ※ 상기 사례는 실제 수행한 조사 건을 바탕으로 하며, 비밀유지 의무에 따라 기관명·당사자 등 식별
            정보는 일절 표기하지 않습니다.
          </p>
        </div>
      )}

      {/* ── FAIR 강점 ── */}
      {active === "strengths" && (
        <div className="mt-8 space-y-10">
          {/* 01. 차별화된 3대 강점 */}
          <section>
            <div className="mb-4 flex items-baseline gap-2">
              <span className="text-sm font-bold text-primary">01</span>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">차별화된 3대 강점</h3>
              <span className="text-xs sm:text-sm text-muted-foreground">Key Strengths</span>
            </div>
            <div className="space-y-3">
              {STRENGTHS.map((s) => (
                <div
                  key={s.no}
                  className="flex items-start gap-3 rounded-2xl border border-blue-900 bg-white p-4 sm:p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                    {s.no}
                  </span>
                  <div className="min-w-0">
                    <div className="text-base font-bold text-gray-900">
                      강점 {s.no} · {s.title}
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 02. 조사의 4대 원칙 */}
          <section>
            <div className="mb-4 flex items-baseline gap-2">
              <span className="text-sm font-bold text-primary">02</span>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">조사의 4대 원칙</h3>
              <span className="text-xs sm:text-sm text-muted-foreground">Core Principles</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {PRINCIPLES.map((p) => (
                <div
                  key={p.name}
                  className="rounded-2xl border border-blue-900 bg-white p-4 sm:p-5"
                >
                  <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {p.name}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 03. 5단계 조사 수행 절차 */}
          <section>
            <div className="mb-4 flex items-baseline gap-2">
              <span className="text-sm font-bold text-primary">03</span>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">5단계 조사 수행 절차</h3>
              <span className="text-xs sm:text-sm text-muted-foreground">Methodology</span>
            </div>
            <div className="space-y-3">
              {METHODOLOGY.map((m) => (
                <div
                  key={m.step}
                  className="flex items-start gap-3 rounded-2xl border border-blue-900 bg-white p-4 sm:p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                    {m.step.replace("STEP ", "")}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2">
                      <span className="text-xs font-bold uppercase tracking-wide text-primary">
                        {m.step}
                      </span>
                      <span className="text-base font-bold text-gray-900">{m.title}</span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <p className="text-xs leading-relaxed text-gray-400">
            ※ AI 모의판정문은 조사 결과의 법적 방어력 점검을 돕는 보조도구이며, 최종 판단은 공인노무사의
            전문적 검토로 확정됩니다. 심리검사·상담기관 연계는 피해자의 동의를 전제로 제공됩니다.
          </p>
        </div>
      )}
    </div>
  )
}
