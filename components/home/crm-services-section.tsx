"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ClipboardList, FileSearch, ShieldCheck } from "lucide-react"
import { useTranslations } from "next-intl"

export default function CrmServicesSection() {
  const t = useTranslations("crmServices")

  const cards = [
    {
      Icon: ClipboardList,
      image: "/crm/advisory-history.png",
      title: t("cards.advisory.title"),
      description: t("cards.advisory.description"),
      accent: "from-primary/10 to-primary/5",
      iconBg: "bg-primary/10 text-primary",
    },
    {
      Icon: FileSearch,
      image: "/crm/diagnosis-report.png",
      title: t("cards.diagnosis.title"),
      description: t("cards.diagnosis.description"),
      accent: "from-amber-100 to-amber-50",
      iconBg: "bg-amber-100 text-amber-600",
    },
    {
      Icon: ShieldCheck,
      image: "/crm/safety-dashboard.png",
      title: t("cards.safety.title"),
      description: t("cards.safety.description"),
      accent: "from-blue-100 to-blue-50",
      iconBg: "bg-blue-100 text-blue-600",
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
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${card.iconBg}`}
                    aria-hidden="true"
                  >
                    <card.Icon className="w-6 h-6" strokeWidth={1.75} />
                  </div>
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
