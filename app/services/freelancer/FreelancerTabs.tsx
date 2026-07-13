"use client"

import { useEffect, useState } from "react"
import { Scale, ClipboardList, ExternalLink } from "lucide-react"
import { ServiceDonut } from "@/components/service-donut"

const BLOG_URL = "https://blog.naver.com/fairhr_/224326560478"

const STEPS = [
  {
    no: "01",
    color: "#1e40af",
    title: "근로자성 위험에 대한 AI 진단",
    desc: "예/아니오 문항으로 프리랜서 계약의 적합성을 자가진단. 노무사 설계 로직 기반, AI 보조.",
  },
  {
    no: "02",
    color: "#2563eb",
    title: "근로자성 분쟁 예방을 위한 검증된 계약서 생성",
    desc: "27년 경력의 노무사가 검증한 계약서 생성.",
  },
  {
    no: "03",
    color: "#14b8a6",
    title: "근로감독과 분쟁에 대비한 운영 및 증빙자료 관리",
    badges: ["상시 관리 허브", "프리랜서 명부 제공"],
    desc: "수탁자·계약·수수료 상시 관리 + 운영 메뉴얼 + 원천징수 신고서류 작성.",
    highlight: true,
  },
  {
    no: "04",
    color: "#6366f1",
    title: "입증서류 체크",
    desc: "법에 맞는 관리에 필요한 서류 점검.",
  },
  {
    no: "05",
    color: "#0ea5e9",
    title: "T백신 AI 감독관 — 기존 자료 종합 점검",
    desc: "생성·업로드한 위탁계약서와 구인공고, 운영·증빙자료를 판례와 정부의 가이드라인으로 종합 점검하고 위험조항·수정문구를 제시. 비저장·자동삭제.",
  },
  {
    no: "06",
    color: "#8b5cf6",
    title: "법개정과 판례 및 정부의 가이드라인 변경에 따른 업데이트",
    desc: "법·판례 변경을 반영해 다시 진단.",
  },
]

// 근로자 추정제 요약(접이식 섹션)
type Section = { no: string; title: string; sub: string; open?: boolean; body?: string; items?: string[] }
const PRESUMPTION: Section[] = [
  {
    no: "1",
    title: "근로자 추정제란?",
    sub: "일단 ‘근로자’로 간주 → 사업주가 반증",
    open: true,
    body: "노무제공자를 일단 근로자로 간주하고, 사업주가 ‘근로자가 아님’을 입증하도록 책임을 전환하는 제도입니다. 기존에는 종사자가 ‘나는 근로자’임을 스스로 증명해야 했으나, 앞으로는 사업주가 ‘근로자가 아님’을 증명해야 합니다. 약 870만 명의 특수고용·플랫폼·프리랜서 종사자가 직접 영향을 받을 것으로 예상됩니다. 형식상 사업소득(3.3%)이라도 실질이 종속 노동이면 추정 대상이 됩니다.",
  },
  {
    no: "2",
    title: "근로자로 추정되는 4가지 지표 — 하나만 충족해도 추정",
    sub: "지휘·감독 / 근무 구속 / 보수 성격 / 계속·전속성",
    items: [
      "① 지휘·감독 — 상당한 지휘·감독을 받은 사실",
      "② 근무 구속 — 근무시간·장소 지정에 구속된 사실",
      "③ 보수의 성격 — 근로 자체의 대가로서의 보수",
      "④ 계속성·전속성 — 계속성을 가지며 전속성이 인정되는 관계",
    ],
  },
  {
    no: "3",
    title: "사업주가 입증해야 할 4가지 요건 — 모두 충족해야 추정 반박",
    sub: "자율성 / 독립성 / 독립 사업 / 위험 부담",
    items: [
      "① 업무 자율성 — 업무 방법·시간을 노무제공자가 자율적으로 결정",
      "② 사업 독립성 — 상대방의 통상 사업 범위 밖이거나 실질적 편입이 없음",
      "③ 독립 사업 영위 — 같은 분야에서 본인 이름과 계산으로 독립 사업 수행",
      "④ 위험 부담 — 이윤 창출과 손실을 노무제공자가 스스로 부담",
    ],
  },
  {
    no: "4",
    title: "추진 현황",
    sub: "「일하는 사람의 권리에 관한 기본법」 패키지",
    body: "정부는 「일하는 사람의 권리에 관한 기본법」과 함께 패키지로 추진 중이며, 당초 2026년 5월 1일(노동절) 입법을 목표로 설정했습니다. 현재 국회에 다수 법안이 발의된 상태이며, 노·사 입장 차이로 최종 시행 시점은 조정될 가능성이 있습니다.",
  },
  {
    no: "5",
    title: "업종별 영향",
    sub: "플랫폼 운송이 가장 직접적",
    items: [
      "배달·택배·대리운전 — 앱의 배차·동선·단가 통제가 지휘·감독 지표에 정면 부합. 4대보험·산재·최저임금 적용 여지, 사고의 업무상 재해·중대재해 처리 확대.",
      "보험설계사·학습지교사·골프장 캐디 — 전속성·계속성이 비교적 뚜렷. 근로자 인정 시 퇴직금·연차·해고 제한으로 위촉·해촉 관행 변화.",
      "건설·하도급 현장 — 일용·재하도급 구조에서 ‘실질 사용자’ 판정이 쟁점, 원·하청 책임 구분 첨예화.",
      "IT·디자인·콘텐츠 프리랜서 — 재택·자율 작업으로 반증이 용이하나, 특정 발주처에 상주·전속으로 일하는 형태는 추정 대상.",
    ],
  },
  {
    no: "6",
    title: "사업주가 지금 준비해야 할 것",
    sub: "‘독립성’을 계약과 증빙으로 남겨두기",
    items: [
      "현행 계약·지휘체계 점검 — 지휘·감독을 전제하지 않는 독립적 위탁 관계로 정비.",
      "보수 산정 방식의 ‘근로 대가성’ 여부 검토.",
      "산업안전 책임 범위 재정비 — 업무상 재해·중대재해 적용 확대에 대비.",
      "명부·증빙 상시 관리 — 업무 자율성·사업 독립성을 뒷받침하는 자료를 평소에 축적.",
    ],
  },
]

type TabKey = "presumption" | "manual"

export default function FreelancerTabs() {
  const [active, setActive] = useState<TabKey>("presumption")

  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.replace("#", "")
      if (h === "presumption" || h === "manual") setActive(h)
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
      key: "presumption",
      title: "근로자 추정제",
      desc: "다가오는 입증책임 전환, 무엇이 달라지나",
      icon: <Scale className="h-6 w-6" />,
    },
    {
      key: "manual",
      title: "프리랜서 관리 매뉴얼",
      desc: "진단·계약·명부·증빙 6단계 관리",
      icon: <ClipboardList className="h-6 w-6" />,
    },
  ]

  return (
    <div>
      {/* 2개 선택 상자 — 옆으로 나란히 */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
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

      {/* ── 근로자 추정제 ── */}
      {active === "presumption" && (
        <div className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              근로자 추정제 — 무엇이 달라지나
            </h3>
            <a
              href={BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-primary hover:underline"
            >
              블로그 원문 보기 <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <p className="mt-2 mb-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
            ‘일하면 일단 근로자’ — 근로자 추정제 도입 논의가 본격화되면서, 3.3 프리랜서·특수고용·플랫폼
            계약 구조 전반이 재편될 전망입니다. 핵심을 요약합니다.
          </p>

          <div className="space-y-3">
            {PRESUMPTION.map((s) => (
              <details
                key={s.no}
                open={s.open}
                className="group rounded-2xl border border-blue-900 bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-4 [&::-webkit-details-marker]:hidden">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                    {s.no}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-bold text-gray-900">{s.title}</span>
                    <span className="mt-0.5 block text-xs sm:text-sm text-muted-foreground">{s.sub}</span>
                  </span>
                </summary>
                {s.body && (
                  <div className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-600">
                    {s.body}
                  </div>
                )}
                {s.items && (
                  <ul className="space-y-2.5 border-t border-gray-100 px-5 py-4">
                    {s.items.map((x, i) => (
                      <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-600">
                        <span aria-hidden className="mt-0.5 shrink-0 text-primary">•</span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </details>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
            <p className="text-sm leading-relaxed text-gray-700">
              입증책임이 사업주에게 넘어오는 흐름에서 가장 확실한 대비는 <b>‘평소의 관리’</b>입니다.
              오른쪽 <b>프리랜서 관리 매뉴얼</b>의 진단·계약·명부·증빙 6단계가 바로 이 준비를 도와드립니다.
            </p>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-gray-400">
            ※ 근로자 추정제는 입법 논의·추진 단계의 제도로, 구체적 지표·요건과 시행 시기는 확정 과정에서
            달라질 수 있습니다. 참고용 요약이며 개별 사안의 법적 판단을 대체하지 않습니다.
          </p>
        </div>
      )}

      {/* ── 프리랜서 관리 매뉴얼 (현재 내용) ── */}
      {active === "manual" && (
        <div className="mt-8">
          <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-muted-foreground mb-8">
            프리랜서를 법에 맞게 체계적으로 관리해 드립니다. 진단·계약서·명부·준비서류를 한 곳에서 —
            등록된 프리랜서를 계약유형·진단결과·계약상태까지 한 명부에서 상시 관리합니다.
          </p>

          <div className="grid gap-8 lg:gap-10 lg:grid-cols-[minmax(0,360px)_1fr] items-start">
            {/* 순환 다이어그램 */}
            <div className="lg:sticky lg:top-28">
              <ServiceDonut />
            </div>

            {/* 6단계 카드 */}
            <div className="space-y-3.5">
              {STEPS.map((step) => (
                <div
                  key={step.no}
                  className={`flex items-start gap-4 rounded-2xl border p-5 ${
                    step.highlight ? "border-teal-200 bg-teal-50/60" : "border-gray-200 bg-white"
                  }`}
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.no}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-gray-900">{step.title}</h3>
                      {step.badges?.map((b, i) => (
                        <span
                          key={b}
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            i === 0 ? "bg-teal-100 text-teal-700" : "bg-indigo-100 text-indigo-700"
                          }`}
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
