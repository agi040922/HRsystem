import type { Metadata } from "next"
import StructuredData from "@/components/seo/structured-data"
import { fairCrmSoftwareJsonLd, pageMetadata } from "@/lib/seo"
import FairCrmClientPage from "./FairCrmClientPage"

// FAIR 2대 축 가운데 **HR테크 축의 랜딩페이지**다(CEO 확정 2026-08-04).
// 제품 소개에 그치지 않고 "HR테크"라는 검색어를 이 페이지가 받도록 앞머리에 둔다.
// (외국계 축은 /global-companies · /en/global-companies 가 받는다.)
export const metadata: Metadata = pageMetadata({
  title: "HR테크 FAIR CRM | 인사노무 자문 이력·진단·안전보건 통합 관리",
  description:
    "FAIR CRM은 자문 이력, 노무 진단, 산업안전 점검, 보고서와 후속 조치 기록을 한 곳에서 관리하는 HR테크 플랫폼입니다. 27년 경력 공인노무사가 직접 운영합니다.",
  path: "/fair-crm",
  keywords: [
    "HR테크",
    "HR SaaS",
    "인사노무 시스템",
    "노무관리 시스템",
    "HR 솔루션",
    "FAIR CRM",
    "HR 관리 시스템",
    "노무 자문 이력",
    "산업안전 점검",
  ],
})

export default function FairCrmPage() {
  return (
    <>
      <StructuredData data={fairCrmSoftwareJsonLd} />
      <FairCrmClientPage />
    </>
  )
}
