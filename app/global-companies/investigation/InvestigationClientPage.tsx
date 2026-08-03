"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ScrollText, ShieldCheck, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { INVESTIGATIONS, STEPS, CASES } from "./investigationData"

export default function InvestigationClientPage() {
  return (
    <div className="w-full overflow-x-hidden pt-16">
      {/* Hero */}
      <section className="relative w-full bg-gradient-to-br from-primary/5 via-white to-blue-50 py-14 sm:py-20 md:py-24">
        <div className="container-fluid max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ScrollText className="h-7 w-7" />
            </div>
            <h1 className="mb-4 break-keep text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
              HR Compliance 조사
            </h1>
            <p className="mb-8 break-keep text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
              객관적이고 중립적인 조사로, 기업의 의사결정을 돕습니다. 당사자 어느 쪽에도 속하지
              않는 외부 전문가로서 사실을 확인하고, 회사가 판단할 수 있는 형태의 보고서를
              제출합니다.
            </p>
            <div className="flex flex-col items-start gap-3 sm:flex-row">
              <Link href="/contact">
                <Button size="lg" className="gap-1.5 px-8">
                  조사 상담 신청 <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services/workplace-harassment">
                <Button size="lg" variant="outline" className="px-8">
                  괴롭힘 조사 자세히 보기
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 왜 외부 조사인가 */}
      <section className="w-full bg-white py-12 sm:py-16 md:py-20">
        <div className="container-fluid max-w-4xl px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 break-keep text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl"
          >
            왜 외부 조사인가
          </motion.h2>
          <div className="space-y-5">
            <p className="break-keep text-sm leading-relaxed text-gray-700 sm:text-base">
              사내에서 문제가 제기되면 회사는 두 가지를 동시에 요구받습니다.{" "}
              <b className="text-gray-900">사실을 정확히 확인할 것</b>, 그리고{" "}
              <b className="text-gray-900">그 확인 과정이 공정했다고 인정받을 것</b>입니다.
            </p>
            <p className="break-keep text-sm leading-relaxed text-gray-700 sm:text-base">
              내부 인력이 조사를 맡으면 두 번째가 어렵습니다. 조사자가 당사자와 같은 조직에 속해
              있으면, 결과가 어느 쪽으로 나오든 “처음부터 정해져 있었다”는 반론을 받습니다. 그
              반론은 이후 노동위원회나 법원에서 절차의 하자로 다시 등장합니다.
            </p>
            <p className="break-keep text-sm leading-relaxed text-gray-700 sm:text-base">
              외국계 기업은 여기에 하나가 더 붙습니다.{" "}
              <b className="text-gray-900">본사가 조사 결과를 요구합니다.</b> 글로벌 윤리규정에 따른
              보고 체계가 있고, 한국에서 어떤 절차로 무엇을 확인했는지를 설명할 수 있어야 합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 수행하는 조사 */}
      <section className="w-full bg-slate-50 py-12 sm:py-16 md:py-20">
        <div className="container-fluid max-w-5xl px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-3 break-keep text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl"
          >
            수행하는 조사
          </motion.h2>
          <p className="mb-8 break-keep text-sm leading-relaxed text-muted-foreground sm:text-base">
            조사 유형에 따라 법이 요구하는 것이 다릅니다. 괴롭힘·성희롱은 법이 조사를 의무화하고,
            나머지는 징계 판단의 근거를 확보하기 위한 조사입니다.
          </p>

          <div className="space-y-5">
            {INVESTIGATIONS.map((inv, i) => (
              <motion.div
                key={inv.no}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.2) }}
                className="rounded-2xl border border-border/50 bg-white p-6 sm:p-8"
              >
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold tracking-wider text-primary/60">{inv.no}</span>
                  <h3 className="break-keep text-base font-bold text-gray-900 sm:text-lg">
                    {inv.title}
                  </h3>
                  <span
                    className={
                      inv.mandated
                        ? "rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary"
                        : "rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-500"
                    }
                  >
                    {inv.mandated ? "법정 조사의무" : "징계 판단 근거"}
                  </span>
                </div>

                <p className="mb-1.5 break-keep text-xs font-semibold text-primary sm:text-sm">
                  {inv.basisLabel}
                </p>
                <p className="mb-5 break-keep text-sm leading-relaxed text-gray-700 sm:text-base">
                  {inv.basis}
                </p>

                <ul className="space-y-2.5">
                  {inv.points.map((p, j) => (
                    <li key={j} className="flex gap-2.5">
                      <span aria-hidden className="mt-0.5 shrink-0 text-primary">
                        •
                      </span>
                      <span className="break-keep text-sm leading-relaxed text-gray-700">{p}</span>
                    </li>
                  ))}
                </ul>

                {inv.scopeNote && (
                  <p className="mt-5 break-keep rounded-xl bg-gray-50 p-4 text-xs leading-relaxed text-gray-500 sm:text-sm">
                    <b className="text-gray-700">조사 범위</b> — {inv.scopeNote}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 조사 절차 */}
      <section className="w-full bg-white py-12 sm:py-16 md:py-20">
        <div className="container-fluid max-w-4xl px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 break-keep text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl"
          >
            조사 절차
          </motion.h2>
          <ol className="space-y-5">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.no}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.25) }}
                className="flex gap-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {s.no}
                </span>
                <div className="min-w-0 flex-1 pt-1">
                  <h3 className="mb-1.5 break-keep text-base font-bold text-gray-900 sm:text-lg">
                    {s.title}
                  </h3>
                  <p className="break-keep text-sm leading-relaxed text-gray-700 sm:text-base">
                    {s.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* 수행 실적 */}
      <section className="w-full bg-slate-50 py-12 sm:py-16 md:py-20">
        <div className="container-fluid max-w-5xl px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-3 break-keep text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl"
          >
            수행 실적
          </motion.h2>
          <p className="mb-8 break-keep text-sm leading-relaxed text-muted-foreground sm:text-base">
            FAIR인사노무컨설팅이 외부 조사기관으로서 최근 3년간 직접 수행한 대표{" "}
            <b className="text-gray-700">직장 내 괴롭힘 조사</b> 사례입니다. 의뢰 기관의 비밀유지를
            위해 업종·기관 유형만 표기합니다.
          </p>

          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            {CASES.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.2) }}
                className="rounded-xl border border-border/50 bg-white p-5"
              >
                <p className="mb-1.5 break-keep text-sm font-bold text-gray-900">{c.org}</p>
                <p className="break-keep text-sm leading-relaxed text-muted-foreground">
                  {c.desc}으로 인한 직장 내 괴롭힘 조사 수행
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="mb-2 break-keep text-base font-bold text-gray-900">
                검증된 보고서 증거력
              </h3>
              <p className="break-keep text-sm leading-relaxed text-gray-700">
                공공기관·기업의 직장 내 괴롭힘 조사 및 심의위원장을 다수 수행했으며, 고용노동부가
                본인의 조사보고서를 인용하여 판단한 사례가 있습니다.
              </p>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Scale className="h-5 w-5" />
              </div>
              <h3 className="mb-2 break-keep text-base font-bold text-gray-900">
                27년 경력의 대표 노무사가 직접
              </h3>
              <p className="break-keep text-sm leading-relaxed text-gray-700">
                공인노무사(제8회, 1999), 김앤장 법률사무소 노무사 출신, 법원행정처 전문심리위원
                후보자(2025~). 담당자 배정이나 중간 전달 없이 직접 조사를 수행합니다.
              </p>
            </div>
          </div>

          <p className="mt-6 break-keep text-xs leading-relaxed text-muted-foreground">
            ※ 상기 사례는 실제 수행한 조사 건을 바탕으로 하며, 비밀유지 의무에 따라 기관명·당사자
            등 식별 정보는 표기하지 않습니다.
          </p>
        </div>
      </section>

      {/* 외국계 기업 지원 + CTA */}
      <section className="w-full bg-white py-14 sm:py-20">
        <div className="container-fluid max-w-5xl px-4">
          <h2 className="mb-6 break-keep text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
            외국계 기업을 위한 지원
          </h2>
          <ul className="mb-10 space-y-3">
            {[
              "본사 보고 자료 — 조사 경과와 결과를 본사가 이해할 수 있는 형태로 정리해 드립니다.",
              "기준 정리 — 글로벌 윤리규정과 한국 노동법이 충돌하거나 어긋나는 지점을 먼저 확인합니다.",
              "기록 보관 — 조사 이력과 문서는 FAIR CRM에 남아, 본사 감사나 내부 통제 점검에서 언제든 제시할 수 있습니다.",
            ].map((t, i) => (
              <li key={i} className="flex gap-2.5">
                <span aria-hidden className="mt-0.5 shrink-0 text-primary">
                  •
                </span>
                <span className="break-keep text-sm leading-relaxed text-gray-700 sm:text-base">
                  {t}
                </span>
              </li>
            ))}
          </ul>

          <div className="rounded-2xl bg-primary p-8 text-center text-primary-foreground sm:p-10">
            <h2 className="mb-3 break-keep text-xl font-bold sm:text-2xl md:text-3xl">
              조사 착수 전에 범위부터 정리하십시오
            </h2>
            <p className="mb-6 break-keep text-sm leading-relaxed opacity-90 sm:text-base">
              진행 중인 사안이 있으시면 상담을 통해 무엇을 먼저 확인해야 하는지부터 말씀드립니다.
              범위를 정리하는 것만으로 이후 다툼이 크게 줄어듭니다.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-6 py-3 font-semibold text-primary transition-colors hover:bg-gray-50"
            >
              조사 상담 신청 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <p className="mt-8 break-keep text-xs leading-relaxed text-muted-foreground">
            ※ 본 안내는 공개된 법령을 바탕으로 정리한 일반적 정보이며, 개별 사안의 법적 판단을
            대체하지 않습니다.
          </p>
        </div>
      </section>
    </div>
  )
}
