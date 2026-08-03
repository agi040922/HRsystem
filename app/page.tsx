import type { Metadata } from "next"
import HomePageClient from "./HomePageClient"
import StructuredData from "@/components/seo/structured-data"
import { homeFaqJsonLd, organizationJsonLd, pageMetadata, websiteJsonLd, SITE_TITLE } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  // ⚠️ 홈 제목은 여기가 최종이다 — layout.tsx 의 title.default 를 덮어쓴다.
  //    lib/seo.ts 의 SITE_TITLE 한 곳만 고치면 layout·홈이 함께 바뀐다.
  title: SITE_TITLE,
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
