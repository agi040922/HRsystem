import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = pageMetadata({
  title: "상담 문의 | FAIR인사노무컨설팅",
  description:
    "임금·근로시간·해고·산업안전·중대재해·FAIR CRM 도입 상담을 FAIR인사노무컨설팅에 문의하세요.",
  path: "/contact",
  keywords: ["노무 상담 문의", "공인노무사 상담", "HR 컨설팅 문의"],
})

export default function ContactPage() {
  return <ContactPageClient />
}
