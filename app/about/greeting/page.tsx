"use client"

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
        {/* 인사말 — 좌우 전체 폭 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-5xl mx-auto px-4 md:px-0"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-8 text-primary">
            {t('title')}
          </h2>
          <div className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p className="mb-4">{t('content.paragraph1')}</p>
            <p className="mb-4">{t('content.paragraph2')}</p>
            <p className="mb-4">{t('content.paragraph3')}</p>
            <p className="mb-6">{t('content.paragraph4')}</p>
          </div>
        </motion.section>

        {/* 대표 소개 — 인사말 아래 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-5xl mx-auto mt-12 md:mt-16 px-4 md:px-0"
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 text-foreground">
            {t('sectionTitle')}
          </h3>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              {/* 프로필 사진 */}
              <div className="shrink-0 mx-auto sm:mx-0">
                <img
                  src="/개인 사진.png"
                  alt={t('profileCard.name')}
                  className="w-40 h-48 sm:w-44 sm:h-52 object-cover rounded-xl shadow-sm bg-gray-200"
                />
              </div>

              {/* 프로필 내용 */}
              <div className="flex-1 min-w-0">
                <h4 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                  {t('profileCard.name')}
                </h4>

                <p className="text-sm sm:text-base text-muted-foreground mb-3">
                  {t('profileCard.credentials')}
                </p>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                  {t.rich('profileCard.bio', {
                    b: (chunks) => <span className="font-semibold text-foreground">{chunks}</span>,
                  })}
                </p>

                {/* 주요 활동 */}
                <h5 className="text-base font-semibold text-foreground mb-3">
                  {t('profileCard.activitiesTitle')}
                </h5>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-[13px] sm:text-sm text-muted-foreground mb-6">
                  {(t.raw('profileCard.activities') as string[]).map((activity) => (
                    <li key={activity} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>

                {/* 주요 저서 */}
                <h5 className="text-base font-semibold text-foreground mb-3">
                  {t('profileCard.publicationsTitle')}
                </h5>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-[13px] sm:text-sm text-muted-foreground">
                  {(t.raw('profileCard.publications') as string[]).map((book) => (
                    <li key={book} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">·</span>
                      <span>{book}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
}
