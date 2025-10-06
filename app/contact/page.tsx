"use client"

import ContactPageClient from "./ContactPageClient"

// Note: metadata는 서버 컴포넌트에서만 사용 가능
// 클라이언트 컴포넌트에서는 Head 또는 다른 방법 사용 필요

export default function ContactPage() {
  return <ContactPageClient />
}
