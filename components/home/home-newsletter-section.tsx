"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { NEWSLETTER_POSTS } from "@/lib/newsletterPosts"

/**
 * 홈 — Hero 바로 아래 노출되는 "뉴스레터" 미리보기.
 * 최신 글 3개를 카드로 보여주고, 클릭하면 해당 글 상세로 이동한다.
 * 데이터는 lib/newsletterPosts.ts(정적)에서 가져온다 — DB 불필요.
 */
export default function HomeNewsletterSection() {
  const posts = [...NEWSLETTER_POSTS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3)

  if (posts.length === 0) return null

  return (
    <section id="newsletter-preview" className="w-full border-b border-gray-100 bg-gray-50">
      <div className="container-fluid max-w-7xl py-14 md:py-20">
        <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between gap-4"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">FAIR 뉴스레터</h2>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              인사노무 리스크를 법·판례 중심으로 쉽게 정리해 전합니다.
            </p>
          </div>
          <Link
            href="/newsletter"
            className="shrink-0 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            전체 보기 →
          </Link>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="h-full"
            >
              <Link
                href={`/newsletter/${p.slug}`}
                className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-7 md:p-8 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <p className="text-sm font-bold text-primary">뉴스레터</p>
                <h3 className="mt-4 line-clamp-2 text-xl md:text-[22px] font-bold leading-snug text-gray-900">
                  {p.title}
                </h3>
                <p className="mt-3 line-clamp-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                  {p.summary}
                </p>
                <time dateTime={p.date} className="mt-6 block text-sm text-gray-400">
                  {p.date.replace(/-/g, ".")}
                </time>
              </Link>
            </motion.div>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
