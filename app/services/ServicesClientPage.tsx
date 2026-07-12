"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Briefcase, Calculator, Users, Shield, Scale, MessageCircle, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from 'next-intl'
import PageBanner from "@/components/page-banner"
import Link from "next/link"

const iconMap = {
  "labor-consulting": Briefcase,
  "payroll-system": Calculator,
  "hr-consulting": Users,
  "serious-accident-law": Shield,
  "labor-disputes": Scale,
  "workplace-harassment": MessageCircle
}

export default function ServicesClientPage() {
  const t = useTranslations('services')
  const services = t.raw('services') as Array<{
    id: string
    title: string
    shortDescription: string
    details: string[]
  }>

  const whyChoose = t.raw('whyChoose') as {
    title: string
    subtitle: string
    reasons: Array<{
      title: string
      description: string
    }>
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
        className="container-fluid max-w-7xl py-8 md:py-12 lg:py-16"
      >
        {/* 서비스 목록 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 md:mb-16 px-4 md:px-0"
        >
          <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.id as keyof typeof iconMap] || Briefcase
              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-28"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </div>
                      <CardDescription className="text-base">
                        {service.shortDescription}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {service.id === "workplace-harassment" ? (
                        <Link
                          href="/services/workplace-harassment"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                        >
                          조사 절차 자세히 보기
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      ) : (
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="details" className="border-none">
                            <AccordionTrigger className="text-sm font-medium hover:no-underline">
                              {t('viewDetails')}
                            </AccordionTrigger>
                            <AccordionContent>
                              <ul className="space-y-2 mt-2">
                                {service.details.map((detail, detailIndex) => (
                                  <li key={detailIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* FAIR를 선택하는 이유 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 md:mb-16 px-4 md:px-0"
        >
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {whyChoose.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {whyChoose.subtitle}
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {whyChoose.reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{reason.title}</h3>
                    <p className="text-muted-foreground text-sm">{reason.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA 섹션 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="px-4 md:px-0"
        >
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="text-center py-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {t('cta.title')}
              </h2>
              <p className="text-lg mb-6 opacity-90">
                {t('cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/contact" className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  {t('cta.button')}
                </Link>
                <div className="flex items-center gap-2 text-lg">
                  <span>📞</span>
                  <span>{t('cta.phone')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </motion.div>
    </div>
  )
}
