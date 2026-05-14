"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ClipboardList,
  FileSearch,
  ShieldCheck,
  BarChart3,
  Bell,
  Lock,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

const CRM_LOGIN_URL = "https://efm.fairhr.net"

type IntroItem = { title: string; description: string }
type FeatureItem = { emoji: string; title: string; description: string }

const FEATURE_ICONS = [
  { Icon: ClipboardList, color: "bg-primary/10 text-primary" },
  { Icon: FileSearch, color: "bg-amber-100 text-amber-600" },
  { Icon: ShieldCheck, color: "bg-blue-100 text-blue-600" },
  { Icon: BarChart3, color: "bg-emerald-100 text-emerald-600" },
  { Icon: Bell, color: "bg-rose-100 text-rose-600" },
  { Icon: Lock, color: "bg-slate-200 text-slate-700" },
]
type PricingPlan = {
  name: string
  price: string
  target: string
  features: string[]
  highlight?: boolean
}
type ProcessStep = { number: string; title: string; description: string }
type CaseItem = { industry: string; size: string; result: string }

export default function FairCrmPage() {
  const t = useTranslations("fairCrm")

  const introItems = t.raw("intro.items") as IntroItem[]
  const featureItems = t.raw("features.items") as FeatureItem[]
  const pricingPlans = t.raw("pricing.plans") as PricingPlan[]
  const processSteps = t.raw("process.steps") as ProcessStep[]
  const caseItems = t.raw("cases.items") as CaseItem[]

  return (
    <div className="w-full overflow-x-hidden pt-16">
      {/* Hero */}
      <section
        id="intro"
        className="relative w-full bg-gradient-to-br from-primary/5 via-white to-blue-50 py-16 sm:py-20 md:py-28"
      >
        <div className="container-fluid max-w-7xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-4">
              {t("hero.badge")}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {t("hero.title")}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/contact">
                <Button size="lg" className="px-8">
                  {t("hero.ctaPrimary")}
                </Button>
              </Link>
              <a href={CRM_LOGIN_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="px-8 gap-1.5">
                  {t("hero.ctaSecondary")}
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro — why FAIR CRM */}
      <section className="w-full bg-white py-12 sm:py-16 md:py-20">
        <div className="container-fluid max-w-7xl px-4">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("intro.title")}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("intro.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {introItems.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl border border-border/50 bg-slate-50 p-6 sm:p-8"
              >
                <div className="text-3xl font-bold text-primary/30 mb-3">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Slideshow */}
      <section className="w-full bg-white py-12 sm:py-16 md:py-20">
        <div className="container-fluid max-w-5xl px-4">
          <FeatureSlideshow />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="w-full bg-slate-50 py-12 sm:py-16 md:py-20">
        <div className="container-fluid max-w-7xl px-4">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("features.title")}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("features.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureItems.map((item, idx) => {
              const { Icon, color } = FEATURE_ICONS[idx % FEATURE_ICONS.length]
              return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                className="rounded-2xl border border-border/50 bg-white p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${color}`}
                  aria-hidden="true"
                >
                  <Icon className="w-6 h-6" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="w-full bg-white py-12 sm:py-16 md:py-20">
        <div className="container-fluid max-w-7xl px-4">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("pricing.title")}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("pricing.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative rounded-2xl border p-6 sm:p-8 flex flex-col ${
                  plan.highlight
                    ? "border-primary bg-primary/5 shadow-lg md:scale-105"
                    : "border-border/50 bg-white shadow-sm"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    Recommended
                  </span>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">{plan.target}</p>
                <div className="text-2xl font-bold text-primary mb-6">{plan.price}</div>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button
                    variant={plan.highlight ? "default" : "outline"}
                    className="w-full"
                  >
                    {t("pricing.cta")}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-6">
            {t("pricing.note")}
          </p>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="w-full bg-slate-50 py-12 sm:py-16 md:py-20">
        <div className="container-fluid max-w-7xl px-4">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("process.title")}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("process.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="w-full bg-white py-12 sm:py-16 md:py-20">
        <div className="container-fluid max-w-7xl px-4">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("cases.title")}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("cases.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseItems.map((item, idx) => (
              <motion.div
                key={item.industry}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl border border-border/50 bg-slate-50 p-6 sm:p-7"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-primary">
                    {item.industry}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.size}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{item.result}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Gallery */}
      <section className="w-full bg-slate-50 py-12 sm:py-16 md:py-20">
        <div className="container-fluid max-w-7xl px-4">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("screenshots.title")}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("screenshots.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { src: "/crm/dashboard-overview.png", label: t("screenshots.dashboard") },
              { src: "/crm/advisory-history.png", label: t("screenshots.advisory") },
              { src: "/crm/diagnosis-report.png", label: t("screenshots.diagnosis") },
              { src: "/crm/safety-dashboard.png", label: t("screenshots.safety") },
            ].map((shot) => (
              <motion.figure
                key={shot.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl overflow-hidden border border-border/50 bg-white shadow-sm"
              >
                <img src={shot.src} alt={shot.label} className="w-full h-auto object-cover" />
                <figcaption className="px-4 py-3 text-sm font-medium text-gray-700 border-t border-border/50">
                  {shot.label}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full bg-primary py-16 sm:py-20">
        <div className="container-fluid max-w-4xl px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
            {t("cta.title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="px-8">
                {t("cta.ctaPrimary")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href={CRM_LOGIN_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="px-8 gap-1.5 bg-transparent border-white text-white hover:bg-white hover:text-primary"
              >
                {t("cta.ctaSecondary")}
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

const SLIDESHOW_IMAGES = [
  "/crm/dashboard-overview.png",
  "/crm/advisory-history.png",
  "/crm/safety-dashboard.png",
  "/crm/diagnosis-report.png",
  "/crm/login.png",
]

function FeatureSlideshow() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDESHOW_IMAGES.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl border border-border/50 aspect-video bg-slate-100 relative">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={SLIDESHOW_IMAGES[current]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {SLIDESHOW_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              idx === current ? "bg-primary scale-125" : "bg-white/60 hover:bg-white"
            }`}
            aria-label={`슬라이드 ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
