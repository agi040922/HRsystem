import Link from "next/link"
import { ArrowRight } from "lucide-react"

// 서비스 상세 페이지 하단 내부링크 블록 — 뉴스레터 목록으로 연결(SEO 내부링크).
export default function NewsletterLinkBlock() {
  return (
    <section className="mt-8">
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-7">
        <h2 className="text-base sm:text-lg font-bold text-gray-900">
          인사노무 인사이트 더 보기
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          최신 노동법 이슈와 실무 팁을 뉴스레터에서 확인하세요.
        </p>
        <Link
          href="/newsletter"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          뉴스레터 목록 보기
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
