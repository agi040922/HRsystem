"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Scale, FileText, Landmark, ShieldCheck, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

type Gap = {
  no: string
  title: string
  problem: string
  fair: string
}

// 시장의 빈틈 — 외국계 전문을 표방하는 기존 서비스가 채우지 못하는 지점
const GAPS: Gap[] = [
  {
    no: "01",
    title: "문서 컴플라이언스를 넘어, 노사관계 실전",
    problem:
      "외국계 특화를 표방하는 자문의 주력은 영문 취업규칙·계약서 정비 등 문서 작업에 머무는 경우가 많습니다. 그러나 노동조합이 설립되고 첫 단체교섭이 시작되는 국면은 문서 작업과 전혀 다른 역량을 요구합니다.",
    fair:
      "FAIR는 200건이 넘는 노동사건과 노동위원회 사건을 직접 수행해 왔습니다. 단체교섭 전략, 부당노동행위 방어, 징계·해고 절차까지 실제 분쟁의 현장에서 축적한 판단을 제공합니다.",
  },
  {
    no: "02",
    title: "대형 로펌의 전문성을, 감당 가능한 비용으로",
    problem:
      "중대 사안에 강한 대형 로펌은 시간당 과금과 담당자 배정 구조로 비용 부담이 크고, 일상적인 의사결정마다 회신을 기다려야 하는 한계가 있습니다.",
    fair:
      "김앤장 법률사무소 출신 27년 경력의 대표 노무사가 직접 응대합니다. 담당자 배정이나 중간 전달 없이, 전화·이메일·메신저 어느 채널로 물으셔도 24시간 이내 회신을 원칙으로 합니다.",
  },
  {
    no: "03",
    title: "본사가 신뢰할 수 있는 기록과 추적성",
    problem:
      "글로벌 본사가 한국 법인에 요구하는 것은 결과 보고만이 아니라 '어떤 근거로, 언제, 무엇을 판단했는가'라는 거버넌스입니다. 그러나 자문 이력을 체계적으로 남기는 자문사는 드뭅니다.",
    fair:
      "FAIR CRM에 모든 자문 이력과 진단 보고서, 규정 변경 이력이 자동으로 축적됩니다. 본사 감사나 내부 통제 점검에서 요구되는 기록을 언제든 제시할 수 있습니다.",
  },
  {
    no: "04",
    title: "급여 대행이 대신할 수 없는 판단",
    problem:
      "급여·HR 아웃소싱은 정해진 절차를 정확히 처리하는 데 강점이 있지만, 노조 공문이 접수되거나 근로감독이 시작되는 순간에는 법적 판단과 대응 전략을 제공하지 못합니다.",
    fair:
      "FAIR는 평시에는 규정과 제도를 정비하고, 분쟁이 발생하면 그대로 대리인이 되어 사건을 수행합니다. 평시와 유사시의 담당자가 같다는 점이 대응의 속도와 일관성을 만듭니다.",
  },
]

const FOCUS = [
  {
    icon: <Scale className="h-6 w-6" />,
    title: "노사관계·단체교섭",
    desc: "노동조합 설립 초기 대응, 단체교섭 전략과 의제 관리, 노사협의회 운영",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "본사 커뮤니케이션",
    desc: "한국 노동법과 사건 경과를 본사가 이해할 수 있도록 정리한 보고 자료 지원",
  },
  {
    icon: <Landmark className="h-6 w-6" />,
    title: "글로벌 정책의 현지화",
    desc: "본사 인사정책·윤리규정과 한국 노동법이 충돌하는 지점의 검토와 조정",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "리스크 사전 진단",
    desc: "근로시간·임금체계·인사제도 전반의 법 위반 위험을 분쟁 이전에 점검",
  },
]

export default function GlobalCompaniesClientPage() {
  return (
    <div className="w-full overflow-x-hidden pt-16">
      {/* 인트로 — 카피 화면 */}
      <section className="w-full bg-white py-20 sm:py-28 md:py-36">
        <div className="container-fluid max-w-5xl px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="break-keep text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900"
          >
            전문화된 서비스로
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-2 sm:mt-3 break-keep text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-primary"
          >
            외국계 기업과 함께 걸어 온 27년
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-14 sm:mt-20 md:mt-24 break-keep text-base sm:text-2xl md:text-3xl font-bold text-gray-900"
          >
            외국계 기업을 이해하고 전략을 세우고 실행하는
          </motion.p>
          <motion.p
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-5 sm:mt-7 text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primary"
          >
            FAIR인사노무컨설팅
          </motion.p>
        </div>
      </section>

      {/* Hero */}
      <section className="relative w-full bg-gradient-to-br from-primary/5 via-white to-blue-50 py-16 sm:py-20 md:py-28">
        <div className="container-fluid max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-4">
              외국계기업 지원센터
            </span>
            <h1 className="break-keep text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              전문화된 서비스로 외국계 기업과 함께 걸어 온 27년
            </h1>
            <p className="break-keep text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              FAIR인사노무컨설팅은 Microsoft, GE, CITIBANK를 비롯한 외국인투자기업의 인사노무
              자문을 수행해 왔습니다. 규정 정비와 같은 평시 관리부터 노동조합 설립·단체교섭·
              노동위원회 사건과 같은 유사시 대응까지, 하나의 창구에서 지원합니다.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Link href="/contact">
                <Button size="lg" className="px-8 gap-1.5">
                  자문 상담 신청 <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about/greeting">
                <Button size="lg" variant="outline" className="px-8">
                  대표 노무사 소개
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 지원 영역 */}
      <section className="w-full bg-white py-12 sm:py-16 md:py-20">
        <div className="container-fluid max-w-7xl px-4">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="break-keep text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              외국계 기업이 가장 자주 마주하는 네 가지
            </h2>
            <p className="break-keep text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              한국 법인의 인사담당자와 본사 사이에서 판단이 어려워지는 지점을 중심으로 지원합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FOCUS.map((f, idx) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl border border-border/50 bg-slate-50 p-6 sm:p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  {f.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAIR의 강점 — 시장의 빈틈 */}
      <section className="w-full bg-slate-50 py-12 sm:py-16 md:py-20">
        <div className="container-fluid max-w-7xl px-4">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="break-keep text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              FAIR가 채우는 네 가지 빈틈
            </h2>
            <p className="break-keep text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              외국계 기업을 지원하는 서비스는 많지만, 아래 네 가지를 함께 갖춘 곳은 드뭅니다.
            </p>
          </div>

          <div className="space-y-5">
            {GAPS.map((g, idx) => (
              <motion.div
                key={g.no}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="rounded-2xl border border-border/50 bg-white p-6 sm:p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                  <div className="text-3xl font-bold text-primary/30 shrink-0">{g.no}</div>
                  <div className="min-w-0">
                    <h3 className="break-keep text-lg sm:text-xl font-bold text-gray-900 mb-3">{g.title}</h3>
                    <p className="break-keep text-sm leading-relaxed text-muted-foreground mb-4">
                      {g.problem}
                    </p>
                    <div className="rounded-xl bg-primary/5 p-4 sm:p-5">
                      <p className="text-xs font-bold text-primary mb-1.5">FAIR는 이렇게 합니다</p>
                      <p className="text-sm leading-relaxed text-gray-700">{g.fair}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAIR 노동법 한영사전 — 준비 중 */}
      <section className="w-full bg-white py-12 sm:py-16">
        <div className="container-fluid max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/global-companies/glossary"
              className="group block rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8 transition-colors hover:border-primary/40 hover:bg-primary/10"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BookOpen className="h-7 w-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                      FAIR 노동법 한영사전
                    </h2>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      준비 중
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    인사담당자가 한글 용어를 검색하면 영문 표기와 실무 주의사항을 함께 확인할 수
                    있도록 준비하고 있습니다.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary shrink-0">
                  자세히 보기
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-white py-14 sm:py-20">
        <div className="container-fluid max-w-5xl px-4">
          <div className="rounded-2xl bg-primary text-primary-foreground p-8 sm:p-10 text-center">
            <h2 className="break-keep text-xl sm:text-2xl md:text-3xl font-bold mb-3">
              한국 법인의 노사관계, 든든한 파트너가 되어 드리겠습니다
            </h2>
            <p className="break-keep text-sm sm:text-base opacity-90 mb-6 leading-relaxed">
              현재 상황을 알려주시면 무엇을 먼저 점검해야 하는지부터 말씀드립니다.
              자문 계약 이전에도 상담은 가능합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                상담 신청 <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/fair-crm"
                className="inline-block border border-white/70 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                FAIR CRM 살펴보기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
