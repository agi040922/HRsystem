"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PageBanner from "@/components/page-banner"
import { motion } from "framer-motion"
import { useTranslations } from 'next-intl'

export default function ProfilePage() {
  const t = useTranslations('profile')
  // 실제 정광일 대표 정보 데이터
  const representativeInfo = {
    name: t('name'),
    position: t('position'),
    image: "/개인 사진.png",
    introduction: t('introduction'),
    
    // 학력 정보
    education: t.raw('education') as string[],
    
    // 경력 정보
    career: t.raw('career') as string[],
    
    // 자격 및 면허
    licenses: t.raw('licenses') as string[],
    
    // 강의 경력
    lectures: t.raw('lectures') as string[],
    
    // 저술 및 출판
    publications: t.raw('publications') as string[],
    
    // 언론 활동
    media: t.raw('media') as string[],
    
    // 연구 실적
    research: t.raw('research') as string[],
    
    // 강의 사진
    lectureImages: t.raw('lectureImages') as Array<{src: string, title: string, date: string, location: string}>
  }

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
        {/* 프로필 헤더 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 md:mb-16"
        >
          {/* 기본 정보 */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 max-w-4xl mx-auto mb-12 px-4">
            <div className="flex-shrink-0">
              <Image
                src={representativeInfo.image}
                alt={representativeInfo.name}
                width={200}
                height={200}
                className="object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{representativeInfo.name}</h2>
              <p className="text-lg text-primary font-medium mb-4">{representativeInfo.position}</p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {representativeInfo.introduction}
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {representativeInfo.licenses.map((license, index) => (
                  <Badge key={index} variant="secondary">{license}</Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* 학력 및 경력 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 md:mb-16 px-4 md:px-0"
        >
          <div className="grid gap-6 md:gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
            {/* 학력 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{t('sections.education.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {representativeInfo.education.map((edu, index) => (
                    <li key={index} className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-3">
                      {edu}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* 주요 경력 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{t('sections.career.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {representativeInfo.career.map((career, index) => (
                    <li key={index} className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-3">
                      {career}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* 강의 경력 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 md:mb-16 px-4 md:px-0"
        >
          <Card className="max-w-6xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl">{t('sections.lectures.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {representativeInfo.lectures.map((lecture, index) => (
                  <div key={index} className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-3">
                    {lecture}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* 강의 활동 사진 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 md:mb-16 px-4 md:px-0"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-center text-primary">
            {t('sections.lecturePhotos.title')}
          </h2>
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {representativeInfo.lectureImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative group"
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-48"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <h4 className="font-medium text-sm mb-1">{image.title}</h4>
                    <p className="text-xs text-gray-300">{image.date}</p>
                    <p className="text-xs text-gray-400">{image.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 저술 및 언론 활동 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 md:mb-16 px-4 md:px-0"
        >
          <div className="grid gap-6 md:gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
            {/* 저술 및 출판 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{t('sections.publications.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {representativeInfo.publications.map((pub, index) => (
                    <li key={index} className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-3">
                      {pub}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* 언론 활동 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{t('sections.media.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {representativeInfo.media.map((media, index) => (
                    <li key={index} className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-3">
                      {media}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* 연구 실적 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="px-4 md:px-0"
        >
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl text-center">{t('sections.research.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {representativeInfo.research.map((research, index) => (
                  <div key={index} className="text-center md:text-left p-3 bg-primary/5 rounded-lg">
                    <span className="text-sm font-medium text-foreground">{research}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </motion.div>
    </div>
  )
} 