import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"
import ServicesClientPage from "./ServicesClientPage"

export const metadata: Metadata = pageMetadata({
  title: "인사노무 서비스 | 임금·근로시간·해고·산업안전 자문",
  description:
    "FAIR인사노무컨설팅의 임금·근로시간, 해고 정당성, 근로계약, 산업안전·중대재해, HR 자문 서비스를 확인하세요.",
  path: "/services",
  keywords: ["노무 서비스", "임금 컨설팅", "근로시간 관리", "해고 자문", "중대재해 자문"],
})

export default function ServicesPage() {
  return <ServicesClientPage />
}
