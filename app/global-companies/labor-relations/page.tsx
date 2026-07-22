import type { Metadata } from "next"
import StructuredData from "@/components/seo/structured-data"
import { pageMetadata, servicePageJsonLd } from "@/lib/seo"
import LaborRelationsClientPage from "./LaborRelationsClientPage"

export const metadata: Metadata = pageMetadata({
  title: "단체교섭 및 노사관계 지원 | 외국계기업 지원센터",
  description:
    "외국계 기업의 노사관계 파트너로 걸어온 27년. 제조·IT·물류·제약·의료기기·소비재·금융 등 외국인투자기업의 단체교섭에 교섭위원·교섭 전략·특별 자문으로 참여해 왔습니다.",
  path: "/global-companies/labor-relations",
  keywords: [
    "단체교섭 자문",
    "외국계기업 노사관계",
    "교섭위원",
    "단체협약",
    "노동조합 설립 대응",
  ],
})

export default function LaborRelationsPage() {
  return (
    <>
      <StructuredData
        data={servicePageJsonLd({
          name: "단체교섭 및 노사관계 지원",
          description:
            "외국인투자기업의 단체교섭과 노사관계를 교섭위원·교섭 전략·특별 자문으로 지원합니다",
          path: "/global-companies/labor-relations",
        })}
      />
      <LaborRelationsClientPage />
    </>
  )
}
