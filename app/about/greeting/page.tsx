"use client"

import PageBanner from "@/components/page-banner"
import { motion } from "framer-motion"
import { User } from "lucide-react"
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
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-8 text-primary">
                {t('title')}
              </h2>
              <div className="mb-6">
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
                </div>
              </div>
            </div>
            <div className="px-4 md:px-0">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                {/* 카드 헤더 */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-primary">
                    <User className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{t('profileCard.title')}</h3>
                </div>

                {/* 학력·자격 */}
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  {t('profileCard.credentials')}
                </p>

                {/* 약력 */}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                  {t.rich('profileCard.bio', {
                    b: (chunks) => <span className="font-semibold text-foreground">{chunks}</span>,
                  })}
                </p>

                {/* 주요 활동 */}
                <h4 className="text-base font-semibold text-foreground mb-3">{t('profileCard.activitiesTitle')}</h4>
                <ul className="flex flex-col gap-y-2 text-[13px] sm:text-sm text-muted-foreground">
                  {(t.raw('profileCard.activities') as string[]).map((activity) => (
                    <li key={activity} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 기존 인용 문구 유지 */}
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