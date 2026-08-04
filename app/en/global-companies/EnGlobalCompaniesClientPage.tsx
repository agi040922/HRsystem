"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Scale, FileText, Landmark, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EN_PROBLEMS, EN_SERVICES, EN_REASONS, EN_FAQS } from "./enData"

const ICONS = [Scale, FileText, Landmark, ShieldCheck]

export default function EnGlobalCompaniesClientPage() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero */}
      <section className="relative w-full bg-gradient-to-br from-primary/5 via-white to-blue-50 py-16 sm:py-20 md:py-28">
        <div className="container-fluid max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:text-sm">
              For Foreign Companies in Korea
            </span>
            <h1 className="mb-4 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              Korean Employment and Labor Advisory for Foreign Companies
            </h1>
            <p className="mb-3 text-lg font-semibold text-primary sm:text-xl">
              Global HR Policy, Compliant in Korea.
            </p>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
              FAIR HR Consulting advises foreign-invested companies, their global headquarters and
              their Korean subsidiaries on Korean employment and labor law — from everyday policy
              questions to union formation, collective bargaining, workplace investigations and
              Labor Relations Commission proceedings.
            </p>
            <div className="flex flex-col items-start gap-3 sm:flex-row">
              <Link href="/contact">
                <Button size="lg" className="gap-1.5 px-8">
                  Request a Consultation <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/global-companies">
                <Button size="lg" variant="outline" className="px-8">
                  한국어 페이지 보기
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problems */}
      <section className="w-full bg-white py-12 sm:py-16 md:py-20">
        <div className="container-fluid max-w-5xl px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-3 text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl"
          >
            Questions we are asked most often
          </motion.h2>
          <p className="mb-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Korean employment law is only half the problem. The other half is headquarters.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {EN_PROBLEMS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.2) }}
                className="rounded-xl border border-border/50 bg-white p-5"
              >
                <p className="text-sm leading-relaxed text-gray-700 sm:text-base">“{p.q}”</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="w-full bg-slate-50 py-12 sm:py-16 md:py-20">
        <div className="container-fluid max-w-6xl px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl"
          >
            Our services
          </motion.h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {EN_SERVICES.map((s, i) => {
              const Icon = ICONS[i % ICONS.length]
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.2) }}
                  className="rounded-2xl border border-border/50 bg-white p-6"
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-gray-900">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why FAIR */}
      <section className="w-full bg-white py-12 sm:py-16 md:py-20">
        <div className="container-fluid max-w-5xl px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl"
          >
            Why FAIR
          </motion.h2>
          <div className="space-y-5">
            {EN_REASONS.map((r, i) => (
              <motion.div
                key={r.no}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.2) }}
                className="rounded-2xl border border-border/50 bg-white p-6 sm:p-8"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-bold tracking-wider text-primary/60">{r.no}</span>
                  <h3 className="text-base font-bold text-gray-900 sm:text-lg">{r.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-700 sm:text-base">{r.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            FAIR HR Consulting&apos;s advisory experience includes foreign-invested companies such
            as Microsoft, GE and CITIBANK.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-slate-50 py-12 sm:py-16 md:py-20">
        <div className="container-fluid max-w-4xl px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-3 text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl"
          >
            Frequently asked questions
          </motion.h2>
          <p className="mb-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
            General information only. It does not substitute for legal assessment of an individual
            matter.
          </p>
          <div className="space-y-4">
            {EN_FAQS.map((f, i) => (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.25) }}
                className="rounded-2xl border border-border/50 bg-white p-6 sm:p-7"
              >
                <h3 className="mb-2.5 text-base font-bold text-gray-900 sm:text-lg">{f.q}</h3>
                <p className="text-sm leading-relaxed text-gray-700 sm:text-base">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-white py-14 sm:py-20">
        <div className="container-fluid max-w-5xl px-4">
          <div className="rounded-2xl bg-primary p-8 text-center text-primary-foreground sm:p-10">
            <h2 className="mb-3 text-xl font-bold sm:text-2xl md:text-3xl">
              Tell us where the matter stands
            </h2>
            <p className="mb-6 text-sm leading-relaxed opacity-90 sm:text-base">
              For urgent employment, termination or workplace investigation matters in Korea, we
              will tell you what needs to be established first. A consultation is available before
              any advisory agreement.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-6 py-3 font-semibold text-primary transition-colors hover:bg-gray-50"
            >
              Request a Consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
            ※ This page provides general information based on publicly available legislation and
            does not substitute for legal assessment of an individual matter.
          </p>
        </div>
      </section>
    </div>
  )
}
