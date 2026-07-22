"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Handshake } from "lucide-react"
import { Button } from "@/components/ui/button"

type Record = { year: string; text: string }

// 외국계 기업 단체교섭·노사관계 지원 이력 (고객사 비밀유지를 위해 업종·소재 국가만 표기)
const RECORDS: Record[] = [
  { year: "2005", text: "FAIR 인사노무컨설팅 설립" },
  { year: "2007", text: "일본계 제조 회사 단체교섭 교섭위원 참여" },
  { year: "2008", text: "미국계 IT 회사 단체교섭 지원" },
  { year: "2009", text: "유럽계 글로벌 포워딩 회사 단체교섭 전략 및 교섭 지원" },
  { year: "2010", text: "다국적 의료기기 유통 회사 단체교섭 교섭위원 참여" },
  { year: "2012", text: "영국계 제약회사 단체교섭 특별 자문" },
  { year: "2015", text: "다국적 제약회사 단체교섭 특별 자문" },
  { year: "2018", text: "미국계 소비재 회사 단체교섭 교섭위원 참여" },
  { year: "2021", text: "독일계 제조회사 단체교섭 및 조직개편 특별 자문" },
  { year: "2025", text: "다국적 금융회사 단체교섭 전략 특별 자문" },
]

export default function LaborRelationsClientPage() {
  return (
    <div className="w-full overflow-x-hidden pt-16">
      {/* Hero */}
      <section className="relative w-full bg-gradient-to-br from-primary/5 via-white to-blue-50 py-16 sm:py-20 md:py-24">
        <div className="container-fluid max-w-5xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-4">
              단체교섭 및 노사관계 지원
            </span>
            <h1 className="break-keep text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              외국계 기업의 노사관계 파트너로 걸어온 20년
            </h1>
            <p className="break-keep text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              제조·IT·물류·제약·의료기기·소비재·금융까지, 다양한 업종의 외국인투자기업과 함께
              단체교섭 현장을 지나왔습니다. 교섭위원으로 직접 교섭에 참여하기도 하고, 교섭 전략과
              특별 자문으로 뒤에서 지원하기도 했습니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 연혁 */}
      <section className="w-full bg-white py-12 sm:py-16 md:py-20">
        <div className="container-fluid max-w-4xl px-4">
          <div className="text-center mb-8">
            <h2 className="break-keep text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              주요 지원 이력
            </h2>
            <p className="break-keep text-sm text-muted-foreground">
              고객사 비밀유지를 위해 회사명은 밝히지 않고 업종과 소재 국가만 표기합니다.
            </p>
          </div>

          <ol className="relative mx-auto w-fit max-w-full border-l-2 border-primary/15 pl-6 sm:pl-8">
            {RECORDS.map((r, idx) => (
              <motion.li
                key={r.year + r.text}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                className="relative pb-7 last:pb-0"
              >
                <span
                  aria-hidden
                  className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="text-base sm:text-lg font-bold text-primary shrink-0">
                    {r.year}
                  </span>
                  <span className="break-keep mt-0.5 sm:mt-0 text-sm sm:text-base leading-relaxed text-gray-800">
                    {r.text}
                  </span>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-white pb-14 sm:pb-20">
        <div className="container-fluid max-w-4xl px-4">
          <div className="rounded-2xl bg-primary text-primary-foreground p-6 sm:p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
              <Handshake className="h-6 w-6" />
            </div>
            <h2 className="break-keep text-lg sm:text-xl md:text-2xl font-bold mb-3">
              교섭을 앞두고 계시다면, 준비 단계부터 함께하겠습니다
            </h2>
            <p className="break-keep text-sm sm:text-base opacity-90 mb-6 leading-relaxed">
              첫 교섭인지, 갱신 교섭인지에 따라 준비해야 할 것이 다릅니다. 현재 상황을 알려주시면
              무엇부터 점검해야 하는지 말씀드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                자문 상담 신청 <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/global-companies"
                className="inline-block border border-white/70 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                지원센터 소개 보기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
