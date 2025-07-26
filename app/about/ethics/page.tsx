"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PageBanner from "@/components/page-banner"
import { motion } from "framer-motion"

export default function EthicsPage() {
  // 윤리강령 8개 항목
  const ethicsCode = [
    "정당한 보수를 책정하여 청구합니다.",
    "고객의 모든 정보에 대한 철저한 비밀유지 의무를 이행합니다.",
    "정부지원 컨설팅 및 보조금을 적법하고 정당하게 활용합니다.",
    "법을 준수하고 원칙과 신의에 따라 위임된 업무를 성실하게 수행합니다.",
    "회사의 규모와 계약금액에 관계없이 수임한 모든 일을 성실하게 수행합니다.",
    "책임있는 상담을 위해 무료상담을 지양하며, 고객의 입장에서 최선을 기준으로 상담합니다.",
    "장애인, 기초생활수급자 등 사회적 약자와 지역사회 기여 기업에 대해서는 무료상담을 제공합니다.",
    "하나님의 공의와 사랑을 바탕으로 모든 업무를 수행합니다."
  ]

  return (
    <div className="w-full overflow-x-hidden">
      {/* 페이지 배너 */}
      <PageBanner 
        title="윤리강령"
        subtitle="FAIR인사노무컨설팅이 추구하는 8가지 핵심 가치와 윤리 원칙"
        backgroundImage="/FAIR000.png"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container-fluid max-w-7xl py-8 md:py-12 lg:py-16 xl:py-20"
      >
        {/* 윤리강령 서문 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 md:mb-16"
        >
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">윤리강령</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                FAIR인사노무컨설팅은 다음과 같은 윤리강령을 제정하고 이를 준수합니다.
              </p>
            </div>
          </div>
        </motion.section>

        {/* 윤리강령 8개 항목 - 간단한 리스트 형태 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="px-4 md:px-0"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border p-8 md:p-12">
              <ol className="space-y-6 text-gray-700 list-decimal list-inside">
                {ethicsCode.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-base md:text-lg leading-relaxed"
                  >
                    {item}
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
} 