"use client"

import { useEffect, useState } from "react"
import { Calculator, ShieldCheck, UserCheck } from "lucide-react"
import OrdinaryWageCalc from "./OrdinaryWageCalc"
import SafetyQuickDiagnosis from "./SafetyQuickDiagnosis"
import FreelancerQuickDiagnosis from "./FreelancerQuickDiagnosis"

type TabKey = "ordinary-wage" | "safety" | "freelancer"

const TABS: {
  key: TabKey
  no: string
  short: string
  title: string
  desc: string
  icon: React.ReactNode
  Component: React.ComponentType
}[] = [
  {
    key: "ordinary-wage",
    no: "1",
    short: "통상임금·평균임금",
    title: "통상임금과 평균임금 간이 진단",
    desc: "임금항목별로 통상임금·평균임금 산입 여부를 5대 기준에 따라 자동 판정합니다. (FAIR CRM 판단기)",
    icon: <Calculator className="h-6 w-6" />,
    Component: OrdinaryWageCalc,
  },
  {
    key: "safety",
    no: "2",
    short: "산업안전",
    title: "산업안전 간이진단",
    desc: "핵심 안전보건 의무 10가지를 이행하고 있는지 ‘예/아니오’로 점검합니다.",
    icon: <ShieldCheck className="h-6 w-6" />,
    Component: SafetyQuickDiagnosis,
  },
  {
    key: "freelancer",
    no: "3",
    short: "프리랜서 근로자성",
    title: "프리랜서 근로자성 간이 진단",
    desc: "업무 방식 6가지 문항으로 3.3 프리랜서 관계의 근로자성 위험을 점검합니다.",
    icon: <UserCheck className="h-6 w-6" />,
    Component: FreelancerQuickDiagnosis,
  },
]

export default function DiagnosisTabs() {
  const [active, setActive] = useState<TabKey>("ordinary-wage")

  // 히어로 버튼 등에서 넘어온 해시(#ordinary-wage/#safety/#freelancer)로 탭 선택
  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.replace("#", "")
      if (h === "ordinary-wage" || h === "safety" || h === "freelancer") {
        setActive(h)
      }
    }
    sync()
    window.addEventListener("hashchange", sync)
    return () => window.removeEventListener("hashchange", sync)
  }, [])

  const activeTab = TABS.find((t) => t.key === active) ?? TABS[0]
  const ActiveComponent = activeTab.Component

  const select = (key: TabKey) => {
    setActive(key)
    // 주소 해시도 갱신(뒤로가기·공유 시 동일 탭 유지)
    if (typeof window !== "undefined" && window.location.hash !== `#${key}`) {
      window.history.replaceState(null, "", `#${key}`)
    }
  }

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
              className={`scroll-mt-28 flex flex-col items-center gap-2 rounded-2xl border p-5 text-center transition-all ${
                isActive
                  ? "border-primary bg-primary/5 ring-2 ring-primary/30 shadow-sm"
                  : "border-blue-900 bg-white hover:border-primary hover:bg-primary/5"
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                  isActive ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                }`}
              >
                {t.icon}
              </div>
              <div>
                <div className="text-xs font-medium text-primary">진단 {t.no}</div>
                <div className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                  {t.short}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* 선택된 진단 내용 */}
      <div className="mt-8">
        <div className="mb-5 flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {activeTab.icon}
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              <span className="mr-1.5 text-primary">{activeTab.no}.</span>
              {activeTab.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{activeTab.desc}</p>
          </div>
        </div>
        <ActiveComponent />
      </div>
    </div>
  )
}
