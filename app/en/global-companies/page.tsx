import type { Metadata } from "next"
import StructuredData from "@/components/seo/structured-data"
import { pageMetadata, servicePageJsonLd, faqJsonLd, SITE_URL, SITE_NAME } from "@/lib/seo"
import EnGlobalCompaniesClientPage from "./EnGlobalCompaniesClientPage"
import { EN_FAQS } from "./enData"

// 국문 짝과 서로를 hreflang 으로 걸어야 성립한다. 한쪽만 걸면 구글이 무시한다.
const KO_PATH = "/global-companies"
const EN_PATH = "/en/global-companies"

export const metadata: Metadata = pageMetadata({
  title: "Korean Labor Law Advisory for Foreign Companies | FAIR HR Consulting",
  description:
    "FAIR HR Consulting advises foreign companies, global headquarters and Korean subsidiaries on Korean employment and labor law — employment contracts, terminations and restructuring, workplace investigations, collective bargaining and HR compliance. 27 years in practice; formerly of Kim & Chang.",
  path: EN_PATH,
  locale: "en",
  alternatePaths: { ko: KO_PATH, en: EN_PATH },
  keywords: [
    "Korean labor law firm",
    "Korean employment lawyer for foreign companies",
    "Korean labor attorney",
    "employment law in Korea",
    "HR compliance Korea",
    "foreign company employment law Korea",
    "termination of employees in Korea",
    "Korean employment contract",
    "workplace investigation Korea",
    "restructuring employees Korea",
    "expatriate employment Korea",
    "local hire Korea",
  ],
})

export default function EnGlobalCompaniesPage() {
  return (
    <>
      <StructuredData
        data={servicePageJsonLd({
          name: "Korean Employment and Labor Advisory for Foreign Companies",
          description:
            "Korean employment and labor law advisory for foreign companies, global headquarters and Korean subsidiaries.",
          path: EN_PATH,
        })}
      />
      {/* 화면의 FAQ 섹션과 같은 EN_FAQS 를 쓴다 — 화면에 없는 FAQ 마크업은 구글 정책 위반 */}
      <StructuredData data={faqJsonLd(EN_FAQS)} />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "FAIR HR Consulting",
          alternateName: [SITE_NAME, "페어인사노무컨설팅"],
          url: new URL(EN_PATH, SITE_URL).toString(),
          areaServed: { "@type": "Country", name: "South Korea" },
          availableLanguage: ["ko", "en"],
          knowsAbout: [
            "Korean Employment Law",
            "Korean Labor Law",
            "Foreign Companies in Korea",
            "HR Compliance",
            "Employment Contracts",
            "Termination and Restructuring",
            "Workplace Investigations",
            "Collective Bargaining",
          ],
        }}
      />
      <EnGlobalCompaniesClientPage />
    </>
  )
}
