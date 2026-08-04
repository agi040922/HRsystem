import type { Metadata } from "next"
import StructuredData from "@/components/seo/structured-data"
import { pageMetadata, breadcrumbJsonLd, SITE_URL } from "@/lib/seo"
import PlustaiClientPage from "./PlustaiClientPage"
import { PLUSTAI_PRODUCTS, PLUSTAI_PORTAL } from "./plustaiData"

// HR테크 지원센터의 두 번째 화면 — 자회사 플러스 티 에이아이 소개.
// (첫 번째는 /fair-crm 이다. 외국계기업 지원센터와 대칭 구조.)
export const metadata: Metadata = pageMetadata({
  title: "플러스 티 에이아이 | FAIR 자회사 · HR 리스크 AI 진단 서비스",
  description:
    "플러스 티 에이아이(PlusTAI)는 FAIR인사노무컨설팅의 자회사로, 사업주가 스스로 HR 리스크를 진단하고 정비하도록 돕는 AI 백신 시리즈를 운영합니다. 프리랜서 백신·산업안전 백신을 서비스하고 있습니다.",
  path: "/plustai",
  keywords: [
    "플러스 티 에이아이",
    "PlusTAI",
    "프리랜서 백신",
    "산업안전 백신",
    "HR 리스크 진단",
    "HR테크",
    "AI 노무 진단",
  ],
})

export default function PlustaiPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbJsonLd([
            { name: "홈", path: "/" },
            { name: "HR테크 지원센터", path: "/fair-crm" },
            { name: "플러스 티 에이아이", path: "/plustai" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "플러스 티 에이아이",
            alternateName: ["PlusTAI", "플러스티에이아이"],
            url: PLUSTAI_PORTAL,
            parentOrganization: { "@id": `${SITE_URL}/#organization` },
            // 화면에 실제로 소개한 공개 서비스만 넣는다
            subjectOf: PLUSTAI_PRODUCTS.map((p) => ({
              "@type": "WebSite",
              name: p.name,
              url: p.url,
            })),
          },
        ]}
      />
      <PlustaiClientPage />
    </>
  )
}
