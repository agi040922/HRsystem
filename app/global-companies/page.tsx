import type { Metadata } from "next"
import StructuredData from "@/components/seo/structured-data"
import { pageMetadata, servicePageJsonLd, faqJsonLd } from "@/lib/seo"
import GlobalCompaniesClientPage from "./GlobalCompaniesClientPage"
import { GLOBAL_FAQS } from "./faqData"

export const metadata: Metadata = pageMetadata({
  title: "외국계기업 지원센터 | 노사관계·단체교섭·본사 커뮤니케이션 지원",
  description:
    "외국인투자기업의 한국 인사노무를 평시 관리부터 노동조합 설립·단체교섭·노동위원회 사건 대응까지 지원합니다. 김앤장 출신 27년 경력 노무사가 직접 자문하고, 모든 이력은 FAIR CRM에 기록으로 남습니다.",
  path: "/global-companies",
  // 영문 짝과 서로를 건다 — 한쪽만 걸면 구글이 hreflang 을 무시한다
  alternatePaths: { ko: "/global-companies", en: "/en/global-companies" },
  keywords: [
    "외국계기업 노무사",
    "외국계기업 노무",
    "외투기업 노무사",
    "외투기업 인사노무",
    "외국계기업 노동조합",
    "노동조합 설립 대응",
    "단체교섭 자문",
    "부당노동행위 대응",
    "노동위원회 대응",
    "글로벌 기업 노무 자문",
    "외국인투자기업 인사노무",
  ],
})

export default function GlobalCompaniesPage() {
  return (
    <>
      <StructuredData
        data={servicePageJsonLd({
          name: "외국계기업 지원센터",
          description:
            "외국인투자기업의 한국 인사노무를 평시 관리부터 노사관계 분쟁 대응까지 지원합니다",
          path: "/global-companies",
        })}
      />
      {/* 화면의 "자주 묻는 질문" 섹션과 같은 GLOBAL_FAQS 를 쓴다 — 둘이 어긋나면 구글 정책 위반 */}
      <StructuredData data={faqJsonLd(GLOBAL_FAQS)} />
      <GlobalCompaniesClientPage />
    </>
  )
}
