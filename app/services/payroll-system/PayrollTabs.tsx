"use client"

import { useEffect, useState } from "react"
import { Calculator, Clock, TrendingDown, ChevronDown } from "lucide-react"
import { getServiceDetail } from "@/lib/serviceDetails"

const CONSULTING = getServiceDetail("payroll-system")!

type Sec = { no: string; title: string; sub: string; open?: boolean; body?: string; items?: string[] }

// 포괄임금 관련 컨설팅 — 고용노동부 지도지침(2026.4) 요약
const POGWAL: Sec[] = [
  {
    no: "1",
    title: "핵심 원칙 — 실제 일한 시간에 따라 보상",
    sub: "포괄임금 약정이 있어도 미달분은 차액 지급",
    open: true,
    body: "사용자는 근로자가 연장·야간·휴일근로를 한 경우, 실제 근로한 시간에 상응하는 법정수당(연장·야간·휴일근로수당)을 산정·지급해야 합니다(근로기준법 제56조). 포괄임금 약정을 체결했더라도, 약정한 금액이 실근로시간 기준으로 산정한 법정수당에 미달하면 그 차액을 반드시 지급해야 합니다. 판례도 포괄임금 오남용을 허용하지 않습니다(대법원 2009. 12. 10. 선고 2008다57852, 2010. 5. 13. 선고 2008다6052 등).",
  },
  {
    no: "2",
    title: "임금대장·임금명세서 ‘구분 기재’ 의무",
    sub: "정액급제·정액수당제로 뭉뚱그리면 안 됩니다",
    items: [
      "임금대장에 근로일수·근로시간수, 기본급·수당 등을 근로자 개인별로 기재해야 합니다(법 제48조제1항, 영 제27조).",
      "임금명세서에도 기본급·각종 수당·상여금·성과금 등을 구성항목별 금액으로 구분 기재해야 합니다(법 제48조제2항, 영 제27조의2).",
      "기본급과 제수당을 구분하지 않는 정액급제, 연장·야간·휴일수당을 구분하지 않는 정액수당제 방식으로 산정·지급하는 것은 허용되지 않습니다.",
    ],
  },
  {
    no: "3",
    title: "신고·감독 처리 — 차액 미지급은 임금체불",
    sub: "실근로시간 기준 법정수당과 비교",
    items: [
      "실제 근로시간에 따른 법정수당이 약정 수당보다 많은데 차액을 지급하지 않았다면 임금체불에 해당합니다.",
      "정액급제 약정은 현행법에 반하므로, 소정근로시간을 특정하고 기본급을 산정한 뒤 법정수당을 다시 산정하도록 시정조치됩니다.",
      "감독 시 사업주가 임금대장·임금명세서를 제대로 작성했는지 반드시 확인합니다.",
    ],
  },
  {
    no: "4",
    title: "대안 — 근로시간 특례 활용과 기록·관리",
    sub: "‘공짜노동’을 없애는 실무 방향",
    items: [
      "근로시간 산정이 어려운 사업장은 사업장 밖 간주근로시간제(법 제58조제1·2항)·재량근로시간제(법 제58조제3항) 등 특례 제도 활용이 바람직합니다.",
      "연차유급휴가수당·연차미사용수당·퇴직금은 임금에 포함해 지급하지 않아야 합니다(퇴직금: 대법원 1998. 3. 24. 선고 96다24699).",
      "연장근로는 개별 동의 또는 사전신청·승인 방식으로 이뤄지도록 하고, 객관적으로 기록된 근로시간에 기초해 임금대장·임금명세서를 작성·교부해야 합니다.",
    ],
  },
]

// 임금피크제 관련 컨설팅 — KOSI 보고서(2022.8) 요약
const PEAK: Sec[] = [
  {
    no: "1",
    title: "임금피크제란 & 유형",
    sub: "정년연장·고용안정 + 인건비 부담 완화",
    open: true,
    body: "임금피크제는 근로자의 정년연장 또는 정년보장으로 고용안정을 도모하면서 사업주의 인건비 부담을 완화하는 제도입니다. ①고용유지형(정년 보장하며 임금 인하·동결), ②정년연장형(정년을 연장하며 임금 조정), ③근로시간 단축형(정년 연장하며 근로시간 단축), ④재고용형(정년퇴직자 재고용하며 임금 조정)으로 구분됩니다.",
  },
  {
    no: "2",
    title: "2022년 대법원 판결의 핵심",
    sub: "‘합리적 이유 없이 나이만 기준’이면 무효",
    items: [
      "고령자고용법 제4조의4 제1항(연령차별 금지)은 강행규정입니다. 합리적 이유 없이 나이만을 기준으로 한 임금피크제는 무효입니다(2022. 5. 26. 대법원 판결).",
      "유효성은 ①도입 목적의 타당성 ②실질적 임금삭감의 폭·기간 ③대상조치(감액에 상응하는 조치)의 적정성 ④감액된 재원이 도입 목적을 위해 사용되었는지를 종합해 개별적으로 판단됩니다.",
    ],
  },
  {
    no: "3",
    title: "‘정년연장형’이라고 모두 유효한 것은 아니다",
    sub: "과도한 감액은 예외적으로 무효",
    items: [
      "정년연장형 임금피크제는 원칙적으로 연령차별에 해당하지 않을 가능성이 높습니다.",
      "다만 비용 절감·직원 퇴출 목적으로 특정 연령의 임금을 과도하게 감액하면 예외적으로 연령차별에 해당할 수 있습니다.",
      "연장된 정년까지 받을 임금총액이 도입 전보다 과도하게 줄어든다면 무효가 될 가능성이 큽니다.",
    ],
  },
  {
    no: "4",
    title: "중소기업 도입 현황",
    sub: "도입률은 낮고 감액률은 높다",
    items: [
      "정년제 도입: 중소기업(300인 미만) 21.0% vs 대기업(300인 이상) 93.8%.",
      "임금피크제 도입(정년제 도입 기업 중): 중소기업 21.8% vs 대기업 52.0%.",
      "최초 임금감액 연령은 중소기업 평균 56.8세, 평균 임금감액률 30% 초과 기업 비중은 중소기업 22.7%로 대기업(10.8%)보다 높음.",
    ],
  },
  {
    no: "5",
    title: "도입·운영 시 점검 사항",
    sub: "절차적 + 실체적 적법성 동시 충족",
    items: [
      "취업규칙 변경의 유효성(불이익 변경 동의 절차 등) 등 절차적 적법성을 확인합니다.",
      "대법원이 제시한 4대 판단기준(목적·삭감 폭·대상조치·재원 사용)을 충족하는지 실체적 적법성을 점검합니다.",
      "특히 임금총액 감소 폭과 감액 재원의 사용처를 면밀히 분석한 뒤 적정한 조치를 설계해야 합니다.",
    ],
  },
]

type TabKey = "consulting" | "pogwal" | "peak"

function Accordion({ items }: { items: { no: string; title: string; summary: string; points?: string[]; body?: string; open?: boolean }[] }) {
  return (
    <div className="space-y-3">
      {items.map((s) => (
        <details key={s.no} open={s.open} className="group rounded-2xl border border-blue-900 bg-white">
          <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-4 [&::-webkit-details-marker]:hidden">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
              {s.no}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-base font-bold text-gray-900">{s.title}</span>
              <span className="mt-0.5 block text-xs sm:text-sm text-muted-foreground">{s.summary}</span>
            </span>
            <ChevronDown aria-hidden className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
          </summary>
          {s.body && (
            <div className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-600">{s.body}</div>
          )}
          {s.points && (
            <ul className="space-y-2.5 border-t border-gray-100 px-5 py-4">
              {s.points.map((point, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-600">
                  <span aria-hidden className="mt-0.5 shrink-0 text-primary">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </details>
      ))}
    </div>
  )
}

export default function PayrollTabs() {
  const [active, setActive] = useState<TabKey>("consulting")

  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.replace("#", "")
      if (h === "consulting" || h === "pogwal" || h === "peak") setActive(h)
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
    { key: "consulting", title: "컨설팅 내용", desc: "통상·평균임금·급여체계 정비", icon: <Calculator className="h-6 w-6" /> },
    { key: "pogwal", title: "포괄임금 관련 컨설팅", desc: "오남용 방지·실근로시간 보상", icon: <Clock className="h-6 w-6" /> },
    { key: "peak", title: "임금피크제 관련 컨설팅", desc: "2022 대법원 판결 대응", icon: <TrendingDown className="h-6 w-6" /> },
  ]

  return (
    <div>
      {/* 3개 선택 상자 — 옆으로 나란히 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
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

      {/* ── 컨설팅 내용 (기존) ── */}
      {active === "consulting" && (
        <div className="mt-8">
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-8">{CONSULTING.intro}</p>
          <Accordion items={CONSULTING.sections.map((s) => ({ no: s.no, title: s.title, summary: s.summary, points: s.points }))} />
        </div>
      )}

      {/* ── 포괄임금 관련 컨설팅 ── */}
      {active === "pogwal" && (
        <div className="mt-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">포괄임금 오남용, 이렇게 대비합니다</h3>
          <p className="mt-2 mb-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
            정부가 ‘공짜노동’ 근절을 위해 포괄임금 오남용 방지 지도지침을 마련했습니다. 핵심은{" "}
            <b>실제 일한 시간에 따라 법정수당을 지급</b>하고, <b>임금대장·명세서를 구분 기재</b>하는 것입니다.
          </p>
          <Accordion items={POGWAL.map((s) => ({ no: s.no, title: s.title, summary: s.sub, body: s.body, points: s.items, open: s.open }))} />
          <p className="mt-4 text-xs leading-relaxed text-gray-400">
            출처 · 고용노동부, 「공짜노동 근절을 위한 포괄임금 오남용 방지 지도 지침」(2026. 4.). 참고용 요약이며 개별
            사안의 법적 판단을 대체하지 않습니다.
          </p>
        </div>
      )}

      {/* ── 임금피크제 관련 컨설팅 ── */}
      {active === "peak" && (
        <div className="mt-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">임금피크제, 2022 대법원 판결 이후</h3>
          <p className="mt-2 mb-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
            ‘합리적 이유 없이 나이만을 기준으로 삼은 임금피크제는 무효’라는 대법원 판결로 현장에 혼란이 생겼습니다.
            도입·운영의 <b>절차적·실체적 적법성</b>을 함께 점검해야 합니다.
          </p>
          <Accordion items={PEAK.map((s) => ({ no: s.no, title: s.title, summary: s.sub, body: s.body, points: s.items, open: s.open }))} />
          <p className="mt-4 text-xs leading-relaxed text-gray-400">
            출처 · 중소벤처기업연구원(KOSI), 황경진·채희태·원용완, 「중소기업 임금피크제 현황 및 시사점」(KOSI 중소기업
            포커스 22-09, 2022. 8. 1.). 참고용 요약이며 개별 사안의 법적 판단을 대체하지 않습니다.
          </p>
        </div>
      )}
    </div>
  )
}
