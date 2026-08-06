"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ShieldCheck, ScrollText, Users } from "lucide-react"
import { GUIDELINE_SECTIONS } from "./sections"

/**
 * FAIR AI 사용 가이드라인 — 대외 공표본.
 *
 * ⚠️ 이 문서는 **밖에 한 약속**이다. 여기 적힌 것과 실제 코드·운영이 어긋나면
 *    그 자체가 흠결이 된다. 문구를 고치기 전에 반드시 실제 동작을 확인할 것.
 * ⚠️ 절의 제목·id 는 `sections.ts` 가 단일 출처다(상단 메뉴가 같은 값을 쓴다).
 * ⚠️ 법 시행일은 적지 않았다 — 부칙 원문 조회에 2회 실패했다. 확인 전에는 날짜를 쓰지 말 것.
 */

const NOT_DOING = [
  "AI가 법적 판단을 대신하지 않습니다",
  "고객 자료를 AI 모델 학습에 쓰지 않습니다",
  "확인되지 않은 조문·판례를 인용하지 않습니다",
  "단정적인 위법 판단을 만들지 않습니다",
  "사람의 검수 없이 대외로 내보내지 않습니다",
]

const GUARDS = [
  ["단정 표현 자동 차단", "AI가 “위법입니다” 같은 단정을 쓰면 발행 전에 걸러 바꿉니다."],
  ["근거 없는 지적 폐기", "AI가 규칙에 없는 새 조언을 만들어 내면 그 결과 전체를 버립니다."],
  ["법령 근거 확인", "허용된 조문 밖을 인용하면 근거 등급을 낮춰 표시합니다."],
  ["사람 검토 강제", "위험이 높거나 확인되지 않은 항목은 사람 검토 표시를 끌 수 없습니다."],
  ["발송 차단", "검증을 통과하지 못한 산출물은 밖으로 나가지 않습니다."],
]

const S = Object.fromEntries(GUIDELINE_SECTIONS.map((s) => [s.id, s.title]))

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mt-14 scroll-mt-24 first:mt-0 sm:mt-20"
    >
      <h2 className="mb-5 break-keep text-xl font-bold text-gray-900 sm:text-2xl md:text-[1.75rem]">
        {S[id]}
      </h2>
      <div className="space-y-4">{children}</div>
    </motion.section>
  )
}

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="break-keep text-[1.0625rem] leading-[1.9] text-gray-700">{children}</p>
)

export default function AiGuidelinesClientPage() {
  return (
    <div className="w-full overflow-x-hidden pt-16">
      <header className="w-full bg-gray-50">
        <div className="container-fluid max-w-4xl px-4 py-14 text-center md:py-20">
          <span className="mb-5 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:text-sm">
            FAIR인사노무컨설팅 · 플러스 티 에이아이
          </span>
          <h1 className="mx-auto max-w-3xl break-keep text-[1.75rem] font-bold leading-[1.45] tracking-tight text-gray-900 sm:text-[2.125rem] md:text-[2.5rem]">
            FAIR AI 사용 가이드라인
          </h1>
          <p className="mx-auto mt-6 max-w-2xl break-keep text-[1.0625rem] leading-[1.9] text-gray-600">
            우리가 인사노무 업무에 AI를 어떻게 쓰는지, 무엇은 하지 않는지 밝힙니다.
          </p>
        </div>
      </header>

      <article className="container-fluid max-w-3xl px-4 py-14 md:py-20">
        {/* 목차 — 상단 메뉴와 같은 목록 */}
        <nav aria-label="목차" className="mb-14 rounded-2xl border border-border/50 bg-white p-6">
          <ul className="space-y-2.5">
            {GUIDELINE_SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="group inline-flex items-start gap-2 break-keep text-[1.0625rem] leading-[1.7] text-gray-700 hover:text-primary"
                >
                  <span aria-hidden className="mt-1.5 shrink-0 text-primary">
                    •
                  </span>
                  <span className="group-hover:underline">{s.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Section id="rules">
          <P>
            우리 서비스에서 <b className="text-gray-900">결과를 정하는 것은 AI가 아닙니다.</b>
          </P>
          <P>
            진단 등급, 위험 판정, 이행 여부 같은 결론은 공인노무사가 설계한 규칙이 냅니다. AI는
            그 결론을 읽기 쉽게 다듬고, 관련 자료를 찾아 붙이는 일을 합니다. 그래서 같은 답변을
            두 번 넣으면 같은 결론이 나오고, 왜 그렇게 나왔는지도 규칙을 따라가면 설명됩니다.
          </P>
          <P>
            판정 기준은 대표 공인노무사의 27년 실무에서 나온 것입니다. 산업안전 진단 문항과
            경영책임자 의무 판정 기준, 노무관리 진단 문항, 파견 판단 요소, 프리랜서 근로자성
            지표, 평균임금 판단 기준 — 모두 <b className="text-gray-900">문서로 검수받아 코드에
            고정</b>되어 있고, 바뀔 때마다 기록이 남습니다.
          </P>
        </Section>

        <Section id="learning">
          <P>
            AI를 업무에 쓰는 방법은 크게 두 가지입니다. 하나는 모델 자체를 우리 데이터로 다시
            훈련시키는 것이고, 다른 하나는 필요할 때 우리 자료를 찾아 읽고 그 근거로 답하게 하는
            것입니다. <b className="text-gray-900">우리는 뒤의 방식을 씁니다.</b>
          </P>
          <P>
            법률 지식은 모델을 훈련시킨다고 정확해지지 않습니다. 오히려 조문을 정확히 외우지
            못한 채 그럴듯하게 지어내고, 법이 바뀌면 다시 훈련해야 하며, 근거를 제시하지
            못합니다. 판례·법령·자문 이력을 그때그때 찾아 읽고 출처를 붙이는 방식이라야 자료를
            고치는 즉시 반영되고 근거가 남습니다.
          </P>
          <P>
            이 선택에는 또 하나의 뜻이 있습니다.{" "}
            <b className="text-gray-900">고객의 자료가 모델 학습에 들어가지 않습니다.</b>
          </P>
        </Section>

        <Section id="supervision">
          <P>
            AI에게 일을 맡기되 <b className="text-gray-900">결정과 검수는 사람이 합니다.</b> 우리는
            이를 조직으로 만들어 운영합니다.
          </P>

          <figure className="my-8 overflow-hidden rounded-2xl border border-border/50 bg-white">
            <Image
              src="/ai/ai-org-chart.png"
              alt="FAIR AI 에이전트 조직도 — 대표(CEO)가 최종 결정·검수·대외 발신을 승인하고, 총괄 AI는 결재권이 없으며, AI 감사팀이 전 좌석을 독립 사후 감사한다"
              width={1600}
              height={1200}
              className="h-auto w-full"
            />
            <figcaption className="border-t border-border/50 px-4 py-3 text-sm text-muted-foreground">
              AI 에이전트 조직 — 직무기술서(JD)·전결규정·독립 감사로 운영합니다.
            </figcaption>
          </figure>

          <ul className="space-y-3">
            {[
              ["대표(CEO)", "최종 결정, 최종 검수, 대외 발신 승인"],
              ["총괄 AI", "지시 분배와 산출물 검수 — 결재권이 없습니다"],
              ["AI 감사팀", "전 좌석 독립 사후 감사"],
              ["리스크·재무", "보안·준법 점검"],
              ["외부 위촉 AI", "좌석이 아니며, 고위험 사안에만 투입해 반대 의견을 냅니다"],
            ].map(([k, v]) => (
              <li key={k} className="flex gap-3">
                <span aria-hidden className="mt-0.5 shrink-0 text-primary">
                  •
                </span>
                <span className="break-keep text-[1.0625rem] leading-[1.9] text-gray-700">
                  <b className="text-gray-900">{k}</b> — {v}
                </span>
              </li>
            ))}
          </ul>

          <P>
            모든 좌석은 직무기술서와 전결규정으로 권한과 금지사항이 정의되어 있고, 대외 발신은
            대표 승인 후에만 이루어집니다.
          </P>

          <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-7">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="mb-2 break-keep text-base font-bold text-gray-900 sm:text-lg">
              AI 관리·감독 책임자
            </h3>
            <p className="break-keep text-[1.0625rem] leading-[1.9] text-gray-700">
              정광일 · 대표 공인노무사
              <br />
              <a href="mailto:fairhr@nate.com" className="text-primary hover:underline">
                fairhr@nate.com
              </a>{" "}
              ·{" "}
              <a href="tel:02-387-9869" className="text-primary hover:underline">
                02-387-9869
              </a>
            </p>
          </div>
        </Section>

        <Section id="risk">
          <P>
            조직 위에, 프로그램 자체에도 장치를 두었습니다. 사람이 매번 확인하지 않아도 어긋난
            결과가 밖으로 나가지 못하게 하기 위해서입니다.
          </P>
          <div className="mt-6 space-y-4">
            {GUARDS.map(([title, desc], i) => (
              <div key={title} className="rounded-2xl border border-border/50 bg-white p-5 sm:p-6">
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="text-xs font-bold tracking-wider text-primary/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="break-keep text-base font-bold text-gray-900">{title}</h3>
                </div>
                <p className="break-keep text-[1.0625rem] leading-[1.85] text-gray-700">{desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="explain">
          <P>
            판정 기준은 공개되어 있습니다. 진단 문항과 판정 규칙, 9대 이행점검 기준은 문서로
            확인하실 수 있고, 결과 화면에도 어느 기준에서 그 결론이 나왔는지 함께 표시합니다.
          </P>
          <P>
            학습용 데이터에 관해서는 밝힐 것이 없습니다.{" "}
            <b className="text-gray-900">우리는 모델을 학습시키지 않기 때문입니다.</b> AI는 우리가
            제공한 자료를 그때그때 읽을 뿐입니다.
          </P>
          <P>
            AI가 만든 결과에는 <b className="text-gray-900">참고용이며 법적 판단이 아니라는
            안내</b>를 항상 함께 둡니다. 진단·상담 화면에서는 시작하기 전에 AI가 보조로 쓰인다는
            사실을 알리고, AI가 만든 문장에는 AI 표시를 붙입니다. 결과에 이견이 있으시면 알려
            주십시오. 사람이 다시 확인해 답변드립니다.
          </P>
        </Section>

        <Section id="data">
          <P>
            <b className="text-gray-900">필요 최소한만 저장하고, 개인정보는 가린 뒤 처리합니다.</b>
          </P>
          <P>
            계약서를 올려 점검받는 기능은 문서 보관 서비스가 아닙니다. 원본 파일과 추출한 글자는
            저장하지 않고, 분석이 끝나면 자동으로 지웁니다. 분석 결과만, 이용자가 선택할 때
            저장합니다. 이 원칙은 개발 규칙으로 못박혀 있으며 이를 어기는 구현은 금지되어
            있습니다.
          </P>
          <P>
            AI 처리는 외부 AI 제공사에 위탁합니다. 위탁받는 곳과 항목은 각 서비스의 개인정보
            처리방침에 적어 두었으며, 바뀌면 함께 고칩니다.
          </P>
          <P>
            AI를 어떻게 설계하고 무엇을 검수했는지는 <b className="text-gray-900">기록으로
            남깁니다.</b> 설계 문서와 노무사 검수 기록을 보관하며, 판정 기준이 바뀌면 언제 무엇이
            바뀌었는지 확인할 수 있습니다.
          </P>
        </Section>

        <Section id="limits">
          <P>
            모든 서비스에 AI를 쓰는 것은 아닙니다. 예를 들어{" "}
            <b className="text-gray-900">고객사 전용 성과관리 시스템에는 생성형 AI를 사용하지
            않습니다.</b> 평가 등급은 사람이 입력한 결과를 정해진 규칙표로 집계해 산출하며, 이
            과정에 AI가 관여하지 않습니다. AI를 쓰지 않던 곳에 새로 도입할 때에는, 그 사실을 먼저
            알리고 이 가이드라인을 고칩니다.
          </P>
          <ul className="mt-6 space-y-3">
            {NOT_DOING.map((t) => (
              <li key={t} className="flex gap-3">
                <ShieldCheck aria-hidden className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <span className="break-keep text-[1.0625rem] leading-[1.9] text-gray-700">{t}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* 문의 — 목차에는 넣지 않는다(내용이 아니라 창구) */}
        <div className="mt-16 rounded-2xl bg-primary p-8 text-center text-primary-foreground sm:p-10">
          <h2 className="mb-3 break-keep text-xl font-bold sm:text-2xl">문의와 이의제기</h2>
          <p className="mb-6 break-keep text-sm leading-relaxed opacity-90 sm:text-base">
            AI 활용에 관한 문의나 이의가 있으시면 알려 주십시오. 확인해 답변드립니다.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-6 py-3 font-semibold text-primary transition-colors hover:bg-gray-50"
            >
              문의하기 <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/hr-tech"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/70 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              HR테크 지원센터
            </Link>
          </div>
        </div>

        <p className="mt-12 break-keep border-t border-border/50 pt-6 text-sm leading-relaxed text-muted-foreground">
          <ScrollText aria-hidden className="mr-1.5 inline h-4 w-4" />
          본 가이드라인은 관련 법령과 서비스 변경에 따라 갱신합니다. 개별 사안의 법적 판단을
          대체하지 않습니다. · 최종 갱신 2026년 8월 6일
        </p>
      </article>
    </div>
  )
}
