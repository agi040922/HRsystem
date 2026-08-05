import type { Metadata } from "next"
import StructuredData from "@/components/seo/structured-data"
import { pageMetadata, servicePageJsonLd } from "@/lib/seo"
import HrTechClientPage from "./HrTechClientPage"

// HR테크 지원센터의 첫 화면(소개). 외국계기업 지원센터의 /global-companies 와 같은 자리다.
// 하위: /fair-crm(플랫폼) · /plustai(자회사·기술)
export const metadata: Metadata = pageMetadata({
  title: "HR테크 지원센터 | FAIR CRM과 플러스 티 에이아이",
  description:
    "FAIR의 HR테크는 두 축으로 움직입니다. FAIR CRM은 자문 이력과 진단·안전보건 기록을 쌓는 플랫폼이고, 자회사 플러스 티 에이아이는 사업주가 스스로 진단하는 AI 서비스를 만듭니다. 두 축이 서로를 채우는 구조를 소개합니다.",
  path: "/hr-tech",
  keywords: [
    "HR테크",
    "HR SaaS",
    "인사노무 시스템",
    "노무관리 시스템",
    "HR 솔루션",
    "FAIR CRM",
    "플러스 티 에이아이",
    "HR 리스크 진단",
  ],
})

export default function HrTechPage() {
  return (
    <>
      <StructuredData
        data={servicePageJsonLd({
          name: "HR테크 지원센터",
          description:
            "FAIR CRM 플랫폼과 자회사 플러스 티 에이아이의 AI 진단 서비스로 구성된 HR테크 지원 체계",
          path: "/hr-tech",
        })}
      />
      <HrTechClientPage />
    </>
  )
}
