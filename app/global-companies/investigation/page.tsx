import type { Metadata } from "next"
import StructuredData from "@/components/seo/structured-data"
import { pageMetadata, servicePageJsonLd } from "@/lib/seo"
import InvestigationClientPage from "./InvestigationClientPage"

export const metadata: Metadata = pageMetadata({
  title: "HR Compliance 조사 | 외국계기업 지원센터",
  description:
    "직장 내 괴롭힘·성희롱, 사내 가이드라인 위반, 영업비밀 유지의무 위반, 경업 및 겸업금지 의무 위반을 중립적인 외부 조사로 확인합니다. 27년 경력 공인노무사가 직접 수행하고, 회사가 판단할 수 있는 형태의 보고서를 제출합니다.",
  path: "/global-companies/investigation",
  keywords: [
    "직장 내 괴롭힘 조사",
    "직장 내 성희롱 조사",
    "외부 조사기관",
    "영업비밀 유출 조사",
    "경업금지 위반",
    "겸업금지 위반",
    "사내 감사 조사",
    "HR 컴플라이언스 조사",
    "외국계기업 노무사",
  ],
})

export default function InvestigationPage() {
  return (
    <>
      <StructuredData
        data={servicePageJsonLd({
          name: "HR Compliance 조사",
          description:
            "직장 내 괴롭힘·성희롱, 사내 가이드라인·영업비밀·경업금지 위반에 대한 중립적 외부 조사와 보고서 작성",
          path: "/global-companies/investigation",
        })}
      />
      <InvestigationClientPage />
    </>
  )
}
