import Link from "next/link"

/**
 * FAIR INFORMATION 하위 탭 — 외국계 기업 HR 소식 / FAIR 메모.
 *
 * 상단 메뉴는 "FAIR INFORMATION" 하나로 두고 그 안에서 탭으로 나눈다(CEO 지시 2026-08-10).
 * 라우트는 둘로 분리했다 — 탭만으로는 개별 글에 직접 링크를 걸 수 없다.
 */
const TABS = [
  { key: "hr-news", href: "/global-companies/hr-news", label: "외국계 기업 HR 소식" },
  { key: "memo", href: "/global-companies/fair-memo", label: "FAIR 메모" },
] as const

export default function InformationTabs({
  active,
}: {
  active: "hr-news" | "memo"
}) {
  return (
    <nav className="mb-8 flex flex-wrap gap-2" aria-label="FAIR INFORMATION">
      {TABS.map((tab) => {
        const isActive = tab.key === active
        return (
          <Link
            key={tab.key}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? "rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white"
                : "rounded-full border border-border/60 bg-white px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            }
          >
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
