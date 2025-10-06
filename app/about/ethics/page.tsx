"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PageBanner from "@/components/page-banner"
import { motion } from "framer-motion"
import { useTranslations } from 'next-intl'

export default function EthicsPage() {
  const t = useTranslations('ethics')
  // 윤리강령 8개 항목을 번역 파일에서 가져오기
  const ethicsCode = t.raw('principles') as string[]

  return (
    <div className="w-full overflow-x-hidden">
      {/* 페이지 배너 */}
      <PageBanner 
        title={t('title')}
        subtitle={t('subtitle')}
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
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t('title')}</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {t('intro')}
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