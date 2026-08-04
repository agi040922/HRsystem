"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PLUSTAI_PRODUCTS, PLUSTAI_PORTAL } from "./plustaiData"

export default function PlustaiClientPage() {
  return (
    <div className="w-full overflow-x-hidden pt-16">
      {/* Hero */}
      <section className="relative w-full bg-gradient-to-br from-primary/5 via-white to-blue-50 py-16 sm:py-20 md:py-28">
        <div className="container-fluid max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:text-sm">
              FAIR인사노무컨설팅 자회사
            </span>
            <h1 className="mb-4 break-keep text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              플러스 티 에이아이 (PlusTAI)
            </h1>
            <p className="mb-8 break-keep text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
              사업주가 <b className="text-gray-700">스스로 HR 리스크를 진단하고</b> 법에 맞게
              정비하도록 돕는 AI 백신 시리즈를 운영합니다. 자문을 받기 전에 우리 회사의 상태부터
              확인할 수 있게 하는 것이 목적입니다.
            </p>
            <div className="flex flex-col items-start gap-3 sm:flex-row">
              <a href={PLUSTAI_PORTAL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-1.5 px-8">
                  플러스 티 에이아이 방문 <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
              <Link href="/fair-crm">
                <Button size="lg" variant="outline" className="px-8">
                  FAIR CRM 보기
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 자회사 소개 */}
      <section className="w-full bg-white py-12 sm:py-16 md:py-20">
        <div className="container-fluid max-w-4xl px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 break-keep text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl"
          >
            자문과 제품, 두 방향에서
          </motion.h2>
          <div className="space-y-5">
            <p className="break-keep text-sm leading-relaxed text-gray-700 sm:text-base">
              인사노무 문제는 대부분 <b className="text-gray-900">터지고 나서</b> 자문을 찾습니다.
              그런데 정작 필요한 것은 그 전에 우리 회사가 어디가 취약한지 아는 일입니다.
            </p>
            <p className="break-keep text-sm leading-relaxed text-gray-700 sm:text-base">
              FAIR인사노무컨설팅의 노하우와 경험을 바탕으로 HR테크를 구현하기 위해{" "}
              <b className="text-gray-900">플러스 티 에이아이</b>를 설립하게 되었습니다. 진단은
              제품이 하고, 판단이 필요한 지점은 노무사가 이어받습니다.
            </p>
            <p className="break-keep text-sm leading-relaxed text-gray-700 sm:text-base">
              플러스 티 에이아이는 <b className="text-gray-900">독립된 자회사</b>로 운영되며, 각
              서비스는 별도 사이트에서 제공됩니다.
            </p>
          </div>
        </div>
      </section>

      {/* 제품 라인업 */}
      <section className="w-full bg-slate-50 py-12 sm:py-16 md:py-20">
        <div className="container-fluid max-w-5xl px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-3 break-keep text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl"
          >
            제품 라인업
          </motion.h2>
          <p className="mb-8 break-keep text-sm leading-relaxed text-muted-foreground sm:text-base">
            각 이름을 누르면 해당 서비스로 이동합니다.
          </p>

          <div className="space-y-5">
            {PLUSTAI_PRODUCTS.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.2) }}
                className="group block rounded-2xl border border-border/50 bg-white p-6 transition-colors hover:border-primary/40 hover:bg-primary/5 sm:p-8"
              >
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  <h3 className="break-keep text-lg font-bold text-gray-900 sm:text-xl">
                    {p.name}
                  </h3>
                  <ExternalLink className="h-4 w-4 shrink-0 text-primary/60 transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="mb-4 break-keep text-xs font-semibold text-primary sm:text-sm">
                  {p.tagline}
                </p>
                <p className="mb-5 break-keep text-sm leading-relaxed text-gray-700 sm:text-base">
                  {p.desc}
                </p>
                <ul className="space-y-2.5">
                  {p.points.map((pt, j) => (
                    <li key={j} className="flex gap-2.5">
                      <span aria-hidden className="mt-0.5 shrink-0 text-primary">
                        •
                      </span>
                      <span className="break-keep text-sm leading-relaxed text-muted-foreground">
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.a>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-7">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="mb-2 break-keep text-base font-bold text-gray-900 sm:text-lg">
              준비 중인 서비스가 더 있습니다
            </h3>
            <p className="break-keep text-sm leading-relaxed text-gray-700">
              위 두 서비스 외에도 인사노무 분야별 진단 서비스를 준비하고 있습니다. 공개되는 대로
              이곳에 안내드립니다.
            </p>
            <a
              href={PLUSTAI_PORTAL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              플러스 티 에이아이 전체 서비스 보기
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-white py-14 sm:py-20">
        <div className="container-fluid max-w-5xl px-4">
          <div className="rounded-2xl bg-primary p-8 text-center text-primary-foreground sm:p-10">
            <h2 className="mb-3 break-keep text-xl font-bold sm:text-2xl md:text-3xl">
              진단 결과를 어떻게 볼지 모르시겠다면
            </h2>
            <p className="mb-6 break-keep text-sm leading-relaxed opacity-90 sm:text-base">
              진단은 출발점입니다. 결과를 두고 무엇을 먼저 정리해야 하는지는 FAIR인사노무컨설팅이
              상담으로 말씀드립니다.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-6 py-3 font-semibold text-primary transition-colors hover:bg-gray-50"
            >
              상담 신청 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
