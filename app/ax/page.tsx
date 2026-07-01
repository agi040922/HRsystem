"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  GitBranch,
  ShieldCheck,
  UsersRound,
  Workflow,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const moduleIcons = [FileCheck2, UsersRound, Workflow, BarChart3]
const layerIcons = [Building2, GitBranch, ShieldCheck]

type Metric = {
  value: string
  label: string
}

type PainPoint = {
  label: string
  title: string
  description: string
}

type ModuleItem = {
  title: string
  description: string
  points: string[]
}

type LayerItem = {
  title: string
  description: string
}

type WorkflowStep = {
  period: string
  title: string
  description: string
  output: string
}

export default function AxPage() {
  const t = useTranslations("ax")
  const metrics = t.raw("hero.metrics") as Metric[]
  const painPoints = t.raw("pain.items") as PainPoint[]
  const modules = t.raw("modules.items") as ModuleItem[]
  const layers = t.raw("architecture.layers") as LayerItem[]
  const steps = t.raw("workflow.steps") as WorkflowStep[]

  return (
    <div className="w-full overflow-x-hidden bg-white text-slate-950">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container-fluid max-w-7xl px-4 py-16 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                <ClipboardCheck className="h-3.5 w-3.5 text-primary" />
                {t("hero.badge")}
              </span>
              <h1 className="mt-6 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
                {t("hero.title")}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                {t("hero.subtitle")}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact">
                  <Button size="lg" className="w-full gap-2 px-7 sm:w-auto">
                    {t("hero.ctaPrimary")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#process">
                  <Button size="lg" variant="outline" className="w-full px-7 sm:w-auto">
                    {t("hero.ctaSecondary")}
                  </Button>
                </Link>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {metrics.map((metric) => (
                  <div key={metric.label} className="border-l border-slate-200 pl-4">
                    <div className="text-2xl font-bold text-slate-950">{metric.value}</div>
                    <div className="mt-1 text-sm leading-5 text-slate-500">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/70 md:p-6">
              <div className="rounded-3xl border border-slate-200 bg-slate-950 p-5 text-white">
                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200">{t("dashboard.eyebrow")}</p>
                    <h2 className="mt-2 text-xl font-bold">{t("dashboard.title")}</h2>
                  </div>
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200">
                    {t("dashboard.status")}
                  </span>
                </div>
                <div className="mt-5 space-y-3">
                  {(t.raw("dashboard.queue") as string[]).map((item, idx) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-950">
                          {idx + 1}
                        </div>
                        <span className="text-sm font-semibold text-slate-100">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl bg-white p-4 text-slate-900">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{t("dashboard.noteLabel")}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{t("dashboard.note")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-fluid max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <span className="text-sm font-semibold text-primary">{t("pain.eyebrow")}</span>
              <h2 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl md:text-4xl">{t("pain.title")}</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">{t("pain.subtitle")}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {painPoints.map((item, idx) => (
                <article key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">0{idx + 1} · {item.label}</p>
                  <h3 className="mt-4 text-lg font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="modules" className="bg-slate-50 py-16 md:py-24">
        <div className="container-fluid max-w-7xl px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="text-sm font-semibold text-primary">{t("modules.eyebrow")}</span>
            <h2 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl md:text-4xl">{t("modules.title")}</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">{t("modules.subtitle")}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {modules.map((item, idx) => {
              const Icon = moduleIcons[idx] ?? FileCheck2
              return (
                <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-900">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                  <ul className="mt-5 space-y-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-fluid max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="text-sm font-semibold text-primary">{t("architecture.eyebrow")}</span>
              <h2 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl md:text-4xl">{t("architecture.title")}</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">{t("architecture.subtitle")}</p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-4 md:p-6">
              <div className="grid gap-4 md:grid-cols-3">
                {layers.map((layer, idx) => {
                  const Icon = layerIcons[idx] ?? Building2
                  return (
                    <div key={layer.title} className="rounded-3xl border border-slate-200 bg-white p-6">
                      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-bold text-slate-950">{layer.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{layer.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="bg-slate-950 py-16 text-white md:py-24">
        <div className="container-fluid max-w-7xl px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="text-sm font-semibold text-blue-200">{t("workflow.eyebrow")}</span>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl md:text-4xl">{t("workflow.title")}</h2>
            <p className="mt-4 text-base leading-8 text-slate-300">{t("workflow.subtitle")}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {steps.map((step, idx) => (
              <div key={step.title} className="rounded-3xl border border-white/10 bg-white/[0.05] p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-950">
                    {idx + 1}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">{step.period}</span>
                </div>
                <h3 className="font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{step.description}</p>
                <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-5 text-blue-100">{step.output}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-fluid max-w-5xl px-4">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-center md:p-12">
            <span className="text-sm font-semibold text-primary">{t("cta.eyebrow")}</span>
            <h2 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl md:text-4xl">{t("cta.title")}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">{t("cta.subtitle")}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact">
                <Button size="lg" className="w-full gap-2 px-8 sm:w-auto">
                  {t("cta.primary")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/fair-crm">
                <Button size="lg" variant="outline" className="w-full px-8 sm:w-auto">
                  {t("cta.secondary")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
