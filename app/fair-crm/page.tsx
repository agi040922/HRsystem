import type { Metadata } from "next"
import StructuredData from "@/components/seo/structured-data"
import { fairCrmSoftwareJsonLd, pageMetadata } from "@/lib/seo"
import FairCrmClientPage from "./FairCrmClientPage"

export const metadata: Metadata = pageMetadata({
  title: "FAIR CRM | 인사노무 자문 이력·안전보건 기록 관리 HR 시스템",
  description:
    "FAIR CRM은 자문 이력, 노무 진단, 산업안전 점검, 보고서와 후속 조치 기록을 통합 관리하는 HR 관리 시스템입니다.",
  path: "/fair-crm",
  keywords: ["FAIR CRM", "HR 관리 시스템", "노무 자문 이력", "산업안전 점검"],
})

export default function FairCrmPage() {
  return (
    <>
      <StructuredData data={fairCrmSoftwareJsonLd} />
      <FairCrmClientPage />
    </>
  )
}
