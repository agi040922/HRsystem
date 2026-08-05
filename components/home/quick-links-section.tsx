"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Calculator,
  ShieldCheck,
  UserCheck,
  Scale,
  MessageCircle,
  Clock,
  TrendingDown,
} from "lucide-react"

/**
 * 대문 바로 아래 빠른 진입 줄.
 *
 * 원래 대문(hero) 슬라이드마다 붙어 있던 진단·컨설팅 버튼을 이리로 옮겼다.
 * 대문은 2대 축(HR테크 지원센터 · 외국계기업 지원센터)만 보여주고,
 * 개별 진단·컨설팅은 여기서 고른다 — 대문에 누를 것이 다섯 개 이상이면 시선이 흩어진다.
 * ⚠️ 링크를 지우기 전에 대문에 같은 입구가 있는지 확인할 것. 여기가 유일한 입구인 항목이 있다.
 */

const DIAGNOSIS = [
  { href: "/services/hr-risk-diagnosis#ordinary-wage", icon: Calculator, label: "통상임금·평균임금 진단" },
  { href: "/services/hr-risk-diagnosis#safety", icon: ShieldCheck, label: "산업안전 진단" },
  { href: "/services/hr-risk-diagnosis#freelancer", icon: UserCheck, label: "프리랜서 진단" },
]

const CONSULTING = [
  { href: "/services/freelancer#presumption", icon: Scale, label: "근로자 추정제 관련 컨설팅" },
  { href: "/services/workplace-harassment", icon: MessageCircle, label: "직장 내 괴롭힘 조사" },
  { href: "/services/payroll-system#pogwal", icon: Clock, label: "포괄임금 관련 컨설팅" },
  { href: "/services/payroll-system#peak", icon: TrendingDown, label: "임금피크제 관련 컨설팅" },
]

function Row({
  title,
  items,
  accent,
}: {
  title: string
  items: { href: string; icon: React.ComponentType<{ className?: string }>; label: string }[]
  accent: boolean
}) {
  return (
    <div>
      <h3 className="mb-3 break-keep text-sm font-bold text-gray-500">{title}</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => {
          const Icon = it.icon
          return (
            <motion.div
              key={it.href}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.16) }}
            >
              <Link
                href={it.href}
                className={`flex h-full items-center gap-2.5 rounded-xl border p-4 transition-colors ${
                  accent
                    ? "border-primary/25 bg-primary/5 hover:border-primary/50 hover:bg-primary/10"
                    : "border-border/50 bg-white hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0 text-primary" />
                <span className="break-keep text-sm font-semibold leading-snug text-gray-800">
                  {it.label}
                </span>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default function QuickLinksSection() {
  return (
    <section className="w-full bg-white py-10 sm:py-14">
      <div className="container-fluid max-w-6xl space-y-8 px-4">
        <Row title="바로 진단해 보기" items={DIAGNOSIS} accent />
        <Row title="자주 찾는 컨설팅" items={CONSULTING} accent={false} />
      </div>
    </section>
  )
}
