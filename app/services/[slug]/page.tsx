import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronDown } from "lucide-react"
import PageBanner from "@/components/page-banner"
import StructuredData from "@/components/seo/structured-data"
import NewsletterLinkBlock from "@/components/newsletter-link-block"
import { pageMetadata, servicePageJsonLd } from "@/lib/seo"
import { SERVICE_DETAIL_SLUGS, getServiceDetail } from "@/lib/serviceDetails"

export function generateStaticParams() {
  // 전용 페이지가 있는 슬러그는 동적 라우트에서 제외 (hr-consulting, labor-consulting)
  const DEDICATED = ["hr-consulting", "labor-consulting", "payroll-system", "labor-disputes", "yellow-envelope-strategy"]
  return SERVICE_DETAIL_SLUGS.filter((slug) => !DEDICATED.includes(slug)).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const detail = getServiceDetail(slug)
  if (!detail) return { title: "서비스 | FAIR인사노무컨설팅" }
  return pageMetadata({
    title: `${detail.title} | FAIR인사노무컨설팅`,
    description: detail.subtitle,
    path: `/services/${slug}`,
    keywords: ["인사노무", "노무 자문", detail.title],
  })
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const detail = getServiceDetail(slug)
  if (!detail) notFound()

  return (
    <div className="w-full overflow-x-hidden">
      <StructuredData
        data={servicePageJsonLd({
          name: detail.title,
          description: detail.subtitle,
          path: `/services/${slug}`,
        })}
      />
      <PageBanner
        title={detail.title}
        subtitle={detail.subtitle}
        backgroundImage="/FAIR000.png"
      />

      <div className="mx-auto max-w-5xl py-10 md:py-14 lg:py-16 px-4">
        <div className="mb-6">
          <Link href="/services">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              서비스 목록으로
            </Button>
          </Link>
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-8">
          {detail.intro}
        </p>

        {/* 상세 항목 (접힘 → 클릭 시 상세) */}
        <section className="space-y-3">
          {detail.sections.map((s) => (
            <details key={s.no} className="group rounded-2xl border border-gray-200 bg-white">
              <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-4 [&::-webkit-details-marker]:hidden">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                  {s.no}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-bold text-gray-900">{s.title}</span>
                  <span className="mt-0.5 block text-xs sm:text-sm text-muted-foreground">{s.summary}</span>
                </span>
                <ChevronDown
                  aria-hidden
                  className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180"
                />
              </summary>
              <ul className="space-y-2.5 border-t border-gray-100 px-5 py-4">
                {s.points.map((point, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-600">
                    <span aria-hidden className="mt-0.5 shrink-0 text-primary">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </section>

        {/* CTA */}
        <section className="mt-10">
          <div className="rounded-2xl bg-primary text-primary-foreground p-6 sm:p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">{detail.title}, 전문가와 상담하세요</h2>
            <p className="text-sm sm:text-base opacity-90 mb-5">
              27년 경력의 공인노무사가 회사 상황에 맞는 해법을 함께 설계합니다.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              상담 신청하기
            </Link>
          </div>
        </section>

        <NewsletterLinkBlock />
      </div>
    </div>
  )
}
