import type { Metadata } from "next"
import HomePageClient from "./HomePageClient"
import StructuredData from "@/components/seo/structured-data"
import { homeFaqJsonLd, organizationJsonLd, pageMetadata, websiteJsonLd } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "FAIR인사노무컨설팅 | 공인노무사 HR 자문·FAIR CRM",
  path: "/",
  keywords: ["노무 상담", "HR 자문", "FAIR인사노무컨설팅"],
})

export default function NewHomePage() {
  return (
    <>
      <StructuredData data={[organizationJsonLd, websiteJsonLd, homeFaqJsonLd]} />
      <HomePageClient />
    </>
  )
}
