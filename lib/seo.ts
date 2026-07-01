import type { Metadata } from "next"

export const SITE_URL = "https://www.fairhr.net"
export const SITE_NAME = "FAIR인사노무컨설팅"
export const SITE_DESCRIPTION =
  "27년 경력 공인노무사가 임금·근로시간·해고·산업안전·중대재해 리스크를 진단하고, FAIR CRM으로 자문 이력과 현장 기록을 관리합니다."

export const SEO_KEYWORDS = [
  "인사노무컨설팅",
  "공인노무사",
  "노무법인",
  "HR 시스템",
  "FAIR CRM",
  "근로계약서",
  "해고 정당성",
  "임금체불",
  "근로시간",
  "산업안전",
  "중대재해처벌법",
]

export function pageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  keywords = [],
}: {
  title: string
  description?: string
  path?: string
  keywords?: string[]
}): Metadata {
  const url = new URL(path, SITE_URL).toString()

  return {
    title,
    description,
    keywords: [...SEO_KEYWORDS, ...keywords],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "ko_KR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LegalService"],
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  telephone: "02-387-9869",
  email: "fairhr@nate.com",
  areaServed: "KR",
  inLanguage: "ko-KR",
  knowsAbout: [
    "인사노무 자문",
    "임금 및 근로시간 관리",
    "해고 정당성 검토",
    "산업안전보건 관리체계",
    "중대재해처벌법 대응",
    "HR SaaS 및 자문 이력 관리",
  ],
}

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "ko-KR",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/board?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
}

export const homeFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "FAIR인사노무컨설팅은 어떤 HR 리스크를 점검하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "임금·근로시간·해고·근로계약·산업안전·중대재해 리스크를 공인노무사 관점에서 진단하고 개선 실행 항목을 제안합니다.",
      },
    },
    {
      "@type": "Question",
      name: "FAIR CRM은 무엇을 관리하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "자문 이력, 노무 진단, 안전보건 점검, 보고서와 후속 조치 기록을 한 곳에서 관리해 반복 이슈와 증빙 공백을 줄입니다.",
      },
    },
    {
      "@type": "Question",
      name: "상담은 어떻게 신청하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "웹사이트 문의 페이지에서 회사 규모와 필요한 자문 영역을 남기면 FAIR인사노무컨설팅이 검토 후 연락합니다.",
      },
    },
  ],
}

export const fairCrmSoftwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "FAIR CRM",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE_URL}/fair-crm`,
  description:
    "인사노무 자문 이력, HR 진단, 산업안전 점검과 보고서를 통합 관리하는 FAIR인사노무컨설팅의 HR 관리 플랫폼입니다.",
  provider: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "ko-KR",
}
