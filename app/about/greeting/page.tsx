"use client"

import Image from "next/image"
import PageBanner from "@/components/page-banner"
import { motion } from "framer-motion"
import { useTranslations } from 'next-intl'

export default function GreetingPage() {
  const t = useTranslations('greeting')
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
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid gap-6 md:gap-8 lg:grid-cols-2 items-center max-w-6xl mx-auto">
            <div className="px-4 md:px-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-primary">
                {t('title')} - {t('subtitle')}
              </h2>
              <div className="mb-6">
                <Image
                  src="/개인 사진.png"
                  alt="대표 공인노무사 정광일 사진"
                  width={180}
                  height={180}
                  className="float-left mr-4 mb-2 sm:w-[220px] sm:h-[220px] sm:mr-6 rounded-lg"
                />
                <div className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  <p className="mb-4">
                    {t('content.paragraph1')}
                  </p>
                  <p className="mb-4">
                    {t('content.paragraph2')}
                  </p>
                  <p className="mb-4">
                    {t('content.paragraph3')}
                  </p>
                  <p className="mb-6">
                    {t('content.paragraph4')}
                  </p>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-right">
                      <span className="font-medium text-foreground">{t('signature')}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 md:px-0">
              <Image
                src="/회사사진.jpg"
                alt="FAIR인사노무컨설팅 사무실 이미지"
                width={500}
                height={400}
                className="object-cover w-full h-auto"
              />
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground italic">
                  "{t('quote')}"
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
} 