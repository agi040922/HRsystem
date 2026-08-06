import type { Metadata } from "next"
import StructuredData from "@/components/seo/structured-data"
import { pageMetadata, breadcrumbJsonLd, SITE_URL, SITE_NAME } from "@/lib/seo"
import AiGuidelinesClientPage from "./AiGuidelinesClientPage"

export const metadata: Metadata = pageMetadata({
  title: "FAIR AI 사용 가이드라인 | 판정은 규칙, 설명은 AI",
  description:
    "FAIR인사노무컨설팅과 자회사 플러스 티 에이아이가 인사노무 업무에 AI를 어떻게 쓰는지 밝힙니다. 판정은 노무사가 설계한 규칙이 하고 AI는 설명을 다듬습니다. 고객 자료를 모델 학습에 쓰지 않으며, 사람의 관리·감독 체계와 책임자를 공개합니다.",
  path: "/ai-guidelines",
  keywords: [
    "AI 사용 가이드라인",
    "AI 기본법",
    "고영향 인공지능",
    "생성형 AI 표시",
    "AI 거버넌스",
    "HR AI 신뢰",
    "인공지능 윤리",
  ],
})

export default function AiGuidelinesPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbJsonLd([
            { name: "홈", path: "/" },
            { name: "FAIR AI 사용 가이드라인", path: "/ai-guidelines" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "FAIR AI 사용 가이드라인",
            url: new URL("/ai-guidelines", SITE_URL).toString(),
            inLanguage: "ko-KR",
            publisher: { "@id": `${SITE_URL}/#organization` },
            about: {
              "@type": "Thing",
              name: "인공지능 활용 원칙 및 관리·감독 체계",
            },
            // 관리·감독 책임자 — 시행령 제27조①4호 (CEO 확인 2026-08-06)
            maintainer: {
              "@type": "Person",
              name: "정광일",
              jobTitle: "대표 공인노무사",
              email: "fairhr@nate.com",
              telephone: "02-387-9869",
              worksFor: { "@type": "Organization", name: SITE_NAME },
            },
          },
        ]}
      />
      <AiGuidelinesClientPage />
    </>
  )
}
