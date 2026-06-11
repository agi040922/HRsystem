"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

export default function ProcessSection() {
  const t = useTranslations("process")

  const steps = [
    {
      number: t("steps.step1.number"),
      title: t("steps.step1.title"),
      description: t("steps.step1.description"),
    },
    {
      number: t("steps.step2.number"),
      title: t("steps.step2.title"),
      description: t("steps.step2.description"),
    },
    {
      number: t("steps.step3.number"),
      title: t("steps.step3.title"),
      description: t("steps.step3.description"),
    },
  ]

  return (
    <section id="process" className="w-full bg-slate-50 py-12 sm:py-16 md:py-20">
      <div className="container-fluid max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {t("title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {/* 데스크톱 연결선 */}
          <div
            className="hidden md:block absolute left-[16.66%] right-[16.66%] top-10 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20"
            aria-hidden="true"
          />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg mb-5">
                {step.number}
              </div>
              <div className="bg-white rounded-xl border border-border/50 p-6 shadow-sm w-full">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-primary hover:underline"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
