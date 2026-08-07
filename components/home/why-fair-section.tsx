"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Globe2, Cpu, Scale } from "lucide-react"

/**
 * 홈 — 히어로 바로 다음에 오는 "왜 FAIR인가" 섹션.
 *
 * 개편 배경(운영자 지시 2026-08-06): 기존 홈은 히어로 다음에 곧바로 서비스 아이콘이
 * 나와서, 방문자가 "이 회사가 누구인지" 모르는 채 메뉴부터 받는 구조였다.
 * 여기서 외국계기업·HR테크 두 갈래를 먼저 선언한 뒤 서비스로 넘긴다.
 *
 * 시각물은 FAIR CRM 이 실제로 동작하는 영상이다(운영자 지시 2026-08-06, 명패 사진 폐기).
 * "HR테크를 직접 만듭니다" 라는 주장을 말로 하지 않고 화면으로 보여주는 게 목적이라
 * 자동재생·무음·루프로 두고 컨트롤은 노출하지 않는다.
 * 고객사 로고는 하단 ClientsSection 에만 두고 여기서는 쓰지 않는다(중복 노출 금지).
 */

const REASONS = [
  {
    icon: Globe2,
    title: "김앤장 출신 대표 노무사",
    body: "외국계기업에 전문화된 서비스를 제공합니다.",
  },
  {
    icon: Cpu,
    title: "경험과 노하우로 HR테크를 실현",
    body: "FAIR인사노무컨설팅이 인사노무 진단·관리 시스템을 직접 개발해 운영합니다.",
  },
  {
    icon: Scale,
    title: "27년의 경험과 노하우",
    body: "입체적으로 문제의 원인을 파악하고, 실제적이고 효과적인 해법을 제시합니다.",
  },
]

export default function WhyFairSection() {
  return (
    <section id="why-fair" className="w-full bg-slate-50 py-14 md:py-20">
      <div className="container-fluid max-w-7xl px-4">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* 사진 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative aspect-video overflow-hidden rounded-2xl border border-border/50 bg-slate-100 shadow-sm"
          >
            <video
              src="/crm/hero-intro.mp4"
              poster="/crm/dashboard-overview.png"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="FAIR CRM 실제 동작 화면"
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* 문구 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-primary">WHY FAIR</p>
            <h2 className="mt-3 text-2xl font-bold leading-snug text-gray-900 [word-break:keep-all] sm:text-3xl md:text-4xl">
              왜 FAIR인사노무컨설팅인가
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground [word-break:keep-all] md:text-lg">
              FAIR인사노무컨설팅은 <strong className="font-semibold text-gray-900">외국계기업</strong>과{" "}
              <strong className="font-semibold text-gray-900">HR테크</strong>에 전문화된 컨설팅 회사입니다.
            </p>

            <ul className="mt-8 space-y-6">
              {REASONS.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 md:text-lg">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground [word-break:keep-all] md:text-base">
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/about/greeting"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline md:text-base"
            >
              회사 소개 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
