"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Database, Cpu } from "lucide-react"
import TechCycle from "@/components/plustai/tech-cycle"

// HR테크 지원센터 소개 — 두 축(FAIR CRM · 플러스 티 에이아이)의 **관계**를 설명하는 자리다.
// 각 축의 자세한 내용은 하위 페이지가 맡는다(/fair-crm, /plustai).
const AXES = [
  {
    href: "/fair-crm",
    icon: Database,
    name: "FAIR CRM",
    role: "쌓는 쪽",
    desc: "자문 이력, 노무 진단, 산업안전 점검과 보고서를 한 곳에 기록으로 남기는 플랫폼입니다. 27년 경력 공인노무사가 직접 운영합니다.",
  },
  {
    href: "/plustai",
    icon: Cpu,
    name: "플러스 티 에이아이",
    role: "만드는 쪽",
    desc: "FAIR의 노하우와 경험을 바탕으로 HR테크를 구현하기 위해 설립한 자회사입니다. 사업주가 스스로 HR 리스크를 진단하는 AI 백신 시리즈를 만듭니다.",
  },
]

export default function HrTechClientPage() {
  return (
    <div className="w-full overflow-x-hidden pt-16">
      {/* Hero — 관계 도식과 함께 */}
      <section className="relative w-full bg-gradient-to-br from-primary/5 via-white to-blue-50 py-16 sm:py-20 md:py-28">
        <div className="container-fluid flex max-w-7xl flex-col items-center justify-center gap-10 px-4 lg:flex-row lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:text-sm">
              HR테크 지원센터
            </span>
            <h1 className="mb-4 break-keep text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              기술이 플랫폼이 되고, 플랫폼이 다시 기술이 됩니다
            </h1>
            <p className="mb-4 break-keep text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
              FAIR의 HR테크는 두 축으로 움직입니다.{" "}
              <b className="text-gray-700">FAIR CRM</b>은 자문 이력과 진단·안전보건 기록을 한 곳에
              쌓는 플랫폼이고, 자회사{" "}
              <b className="text-gray-700">플러스 티 에이아이</b>는 사업주가 스스로 진단하는 AI
              서비스를 만듭니다.
            </p>
            <p className="mb-8 break-keep text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
              플러스 티 에이아이가 만든 진단 기술이 FAIR CRM으로 들어가고, FAIR CRM에 쌓인 현장이
              다시 진단 기준을 다듬습니다. 두 축이 서로를 채우는 구조입니다.
            </p>
            <div className="flex flex-col items-start gap-3 sm:flex-row">
              <Link
                href="/fair-crm"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                FAIR CRM 보기 <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/plustai"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-6 py-3 font-semibold text-gray-800 transition-colors hover:bg-gray-50"
              >
                플러스 티 에이아이 보기
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-[360px] lg:shrink-0"
          >
            <TechCycle />
          </motion.div>
        </div>
      </section>

      {/* 두 축 */}
      <section className="w-full bg-white py-12 sm:py-16 md:py-20">
        <div className="container-fluid max-w-5xl px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-3 break-keep text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl"
          >
            두 축이 하는 일
          </motion.h2>
          <p className="mb-8 break-keep text-sm leading-relaxed text-muted-foreground sm:text-base">
            각 이름을 누르면 자세한 소개로 이동합니다.
          </p>

          <div className="grid gap-5 sm:grid-cols-2">
            {AXES.map((a, i) => {
              const Icon = a.icon
              return (
                <motion.div
                  key={a.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.2) }}
                >
                  <Link
                    href={a.href}
                    className="group block h-full rounded-2xl border border-border/50 bg-white p-6 transition-colors hover:border-primary/40 hover:bg-primary/5 sm:p-8"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="break-keep text-lg font-bold text-gray-900 sm:text-xl">
                        {a.name}
                      </h3>
                      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-500">
                        {a.role}
                      </span>
                    </div>
                    <p className="mb-4 break-keep text-sm leading-relaxed text-gray-700">
                      {a.desc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      자세히 보기
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-white pb-14 sm:pb-20">
        <div className="container-fluid max-w-5xl px-4">
          <div className="rounded-2xl bg-primary p-8 text-center text-primary-foreground sm:p-10">
            <h2 className="mb-3 break-keep text-xl font-bold sm:text-2xl md:text-3xl">
              어느 쪽이 필요한지 모르시겠다면
            </h2>
            <p className="mb-6 break-keep text-sm leading-relaxed opacity-90 sm:text-base">
              회사 상황을 알려주시면 진단부터 할지, 기록 체계부터 세울지 말씀드립니다.
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
