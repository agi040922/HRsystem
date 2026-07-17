"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Calculator,
  Clock,
  TrendingDown,
  Gavel,
  MessageCircle,
  HardHat,
  UserCheck,
  Scale,
  Cpu,
  Briefcase,
} from "lucide-react"

/**
 * 홈 — "고객이 자주 찾는 FAIR의 서비스" 카드 그리드.
 * 라벨(좌) + 컬러 아이콘(우) 카드형. 각 카드는 서비스 상세(탭 앵커 포함)로 연결.
 */
const FIELDS: { label: string; href: string; icon: React.ReactNode }[] = [
  { label: "통상임금·평균임금", href: "/services/hr-risk-diagnosis#ordinary-wage", icon: <Calculator /> },
  { label: "포괄임금", href: "/services/payroll-system#pogwal", icon: <Clock /> },
  { label: "임금피크제", href: "/services/payroll-system#peak", icon: <TrendingDown /> },
  { label: "해고·징계", href: "/services/labor-disputes", icon: <Gavel /> },
  { label: "직장 내 괴롭힘", href: "/services/workplace-harassment", icon: <MessageCircle /> },
  { label: "산업안전·중대재해", href: "/services/serious-accident-law", icon: <HardHat /> },
  { label: "프리랜서·3.3", href: "/services/freelancer", icon: <UserCheck /> },
  { label: "근로자 추정제", href: "/services/freelancer#presumption", icon: <Scale /> },
  { label: "인사제도·HR 테크", href: "/services/hr-consulting", icon: <Cpu /> },
  { label: "상시 노무자문", href: "/services/labor-consulting", icon: <Briefcase /> },
]

export default function ServiceFinderSection() {
  return (
    <section className="w-full border-b border-gray-100 bg-white">
      <div className="container-fluid max-w-7xl px-4 py-14 md:py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-gray-900"
        >
          고객이 자주 찾는 FAIR의 서비스
        </motion.h2>

        <div className="mt-8 md:mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {FIELDS.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: (i % 5) * 0.05 }}
            >
              <Link
                href={f.href}
                className="group flex h-full min-h-[6rem] md:min-h-[6.5rem] flex-col justify-between rounded-xl border border-blue-900 bg-white p-4 transition-all hover:border-primary hover:shadow-md"
              >
                <span className="text-sm md:text-[15px] font-semibold leading-snug text-gray-900 transition-colors group-hover:text-primary">
                  {f.label}
                </span>
                <span className="self-end text-primary transition-transform group-hover:scale-110 [&_svg]:h-7 [&_svg]:w-7 md:[&_svg]:h-8 md:[&_svg]:w-8 [&_svg]:stroke-[1.7]">
                  {f.icon}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
