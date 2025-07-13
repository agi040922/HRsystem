import ContactPageClient from "./ContactPageClient"

export const metadata = {
  title: "상담문의 | FAIR인사노무컨설팅",
  description: "온라인 상담 신청 또는 전화, 이메일로 문의하세요. 26년차 베테랑 노무사가 직접 상담해드립니다.",
}

// 동적 렌더링 강제 (FileList API로 인한 SSG 오류 방지)
export const dynamic = 'force-dynamic'

export default function ContactPage() {
  return <ContactPageClient />
}
