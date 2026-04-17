"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

export default function CrmServicesSection() {
  const t = useTranslations("crmServices")

  const cards = [
    {
      image: "/crm/advisory-history.png",
      title: t("cards.advisory.title"),
      description: t("cards.advisory.description"),
    },
    {
      image: "/crm/diagnosis-report.png",
      title: t("cards.diagnosis.title"),
      description: t("cards.diagnosis.description"),
    },
    {
      image: "/crm/safety-dashboard.png",
      title: t("cards.safety.title"),
      description: t("cards.safety.description"),
    },
  ]

  return (
    <section id="crm-services" className="w-full bg-white py-12 sm:py-16 md:py-20">
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

        <div className="flex flex-col gap-10 sm:gap-14 md:gap-20">
          {cards.map((card, index) => {
            const isReversed = index % 2 === 1
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-center ${
                  isReversed ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-sm bg-slate-50 aspect-video">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            href="/fair-crm"
            className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-primary hover:underline"
          >
            {t("viewAll")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
