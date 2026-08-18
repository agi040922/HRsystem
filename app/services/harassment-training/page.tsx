import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, GraduationCap, Star, Users, Clock } from "lucide-react"
import PageBanner from "@/components/page-banner"
import StructuredData from "@/components/seo/structured-data"
import NewsletterLinkBlock from "@/components/newsletter-link-block"
import { pageMetadata, servicePageJsonLd } from "@/lib/seo"

/**
 * 직장 내 괴롭힘 예방교육 — 직장 내 괴롭힘 센터의 네 번째 장 (CEO 지시 2026-08-13).
 *
 * 조사(/services/workplace-harassment)와 분리한 이유: 조사는 사후 대응, 교육은 사전 예방으로
 * 대상·시점·산출물이 다르다. 같은 페이지의 탭으로 넣으면 "조사 회사"로만 읽힌다.
 *
 * ⚠️ 실적 표기 원칙
 *  - 강의료 수령액은 **절대 싣지 않는다.** 대표 개인 수입 정보이고, 공개하면 향후 견적의
 *    기준가로 굳는다. (원자료에는 있으나 의도적으로 제외했다.)
 *  - 기관명은 **이미 고객사로 공개된 곳만 실명**을 쓴다(에쓰오일토탈윤활유 — CEO 지시).
 *    고용노동교육원 파견 건의 사업장은 제3자라 업종·유형으로만 적는다.
 *    조사 사례(HarassmentTabs 의 CASES)가 전부 익명인 것과 같은 기준이다.
 *  - 만족도는 **표본(수행 3회)을 함께 밝힌다.** 표본 없는 평균은 부풀리기가 된다.
 *
 * ⚠️ 법적 서술 주의 — 괴롭힘 예방교육을 "법정 의무교육"이라고 쓰지 않는다.
 *    성희롱 예방교육과 근거가 다르다. 단정 표현을 넣지 말 것.
 */

export const metadata: Metadata = pageMetadata({
  title: "직장 내 괴롭힘 예방교육 | 사업장 현장 교육과 수행 사례",
  description:
    "사업장으로 찾아가는 직장 내 괴롭힘 예방교육. 관리자와 전 직원을 대상으로 1~2시간 과정으로 진행하며, 고용노동교육원 의뢰 수행 사례와 성희롱 예방교육 병행 이력을 안내합니다.",
  path: "/services/harassment-training",
  keywords: [
    "직장 내 괴롭힘 예방교육",
    "괴롭힘 예방교육",
    "성희롱 예방교육",
    "찾아가는 예방교육",
    "사업장 현장교육",
    "노무사 강의",
  ],
})

/** 최근 수행 사례. 날짜는 원자료(강의 실적) 기준. */
const RECENT = [
  {
    org: "에쓰오일토탈윤활유",
    note: "직장 내 괴롭힘 예방교육",
    when: "",
  },
  {
    org: "지방공기업(도시공사)",
    note: "직장 내 괴롭힘 예방교육 · 1시간",
    when: "2026.04",
  },
  {
    org: "사회복지법인(시니어클럽)",
    note: "직장 내 괴롭힘 예방교육 · 성희롱 예방교육 병행 · 2시간 (2회)",
    when: "2026.05",
  },
  {
    org: "수산업 사업장",
    note: "직장 내 괴롭힘 예방교육 · 1시간",
    when: "2026.05",
  },
  {
    org: "제조업 사업장 (고용노동교육원 의뢰)",
    note: "직장 내 괴롭힘 예방교육 · 양일 과정",
    when: "2025.10",
  },
]

/**
 * 교육 구성.
 *
 * ⚠️ **고용노동교육원(KELI) 강의안을 옮긴 것이 아니다.** 그 자료는 표지에 "교육원의 동의
 *    없이는 임의로 변경·복사·활용할 수 없음"이 명시돼 있어 인용·복제하지 않았다.
 *    여기 적힌 것은 **법령·판례·정부 통계 같은 공개 사실을 우리 구성으로 다시 쓴 것**이며,
 *    슬라이드 문구·이미지·목차 표현을 가져오지 않았다. 교육원 자료를 근거로 표시하지도 않는다.
 * ⚠️ 법적 서술은 단정하지 않는다("…로 이어질 수 있습니다" 수준).
 */
const CURRICULUM = [
  {
    name: "기본 과정",
    target: "전 직원 · 1시간",
    items: [
      {
        title: "왜 지금 이 교육인가",
        desc: "고용노동부 「2024년 직장 내 괴롭힘 금지제도 실태조사」로 본 실태 — 가해자의 절반 이상이 상사였고, 가장 많은 유형은 폭언·따돌림이었습니다. 남의 일이 아니라는 것부터 확인합니다.",
      },
      {
        title: "무엇이 괴롭힘인가 — 세 가지 요건",
        desc: "지위 또는 관계의 우위를 이용했는가, 업무상 적정범위를 넘었는가, 신체적·정신적 고통을 주거나 근무환경을 악화시켰는가. 근로기준법 제76조의2의 요건을 사례로 풀어 봅니다.",
      },
      {
        title: "정당한 업무지시와 무엇이 다른가",
        desc: "실무에서 가장 많이 부딪히는 지점입니다. 지시의 목적·방식·반복성·표현을 놓고 경계 사례를 함께 봅니다.",
      },
      {
        title: "신고하면 어떤 절차가 진행되나",
        desc: "접수 · 조사 · 조치 · 모니터링의 흐름과, 신고자·피해자에게 불리한 처우가 금지된다는 점을 확인합니다.",
      },
    ],
  },
  {
    name: "관리자 과정",
    target: "관리자 포함 · 2시간",
    items: [
      {
        title: "기본 과정 전체 포함",
        desc: "요건·경계·절차를 먼저 공유한 뒤 관리자 관점으로 넘어갑니다.",
      },
      {
        title: "회사와 관리자에게 남는 책임",
        desc: "예방·중단 조치를 하지 않으면 사용자의 조치의무 위반이 문제될 수 있고, 인격권 침해를 이유로 손해배상 책임이 다투어질 수 있습니다. 산업재해로 이어지는 경우도 있습니다.",
      },
      {
        title: "신고를 받은 관리자가 할 일과 하지 말아야 할 일",
        desc: "먼저 판단하지 않기, 당사자 분리, 비밀 유지, 2차 가해 차단. 초기 대응에서 무너지면 이후 조사가 흔들립니다.",
      },
      {
        title: "취업규칙과 사내 절차 점검",
        desc: "근로기준법 제93조에 따라 취업규칙에 예방·대응에 관한 사항을 정하게 되어 있습니다. 우리 회사 규정이 실제로 작동하는지 함께 확인합니다.",
      },
      {
        title: "성희롱 예방교육 병행 (선택)",
        desc: "성희롱과 괴롭힘은 근거 법률과 판단 기준이 다릅니다. 같은 자리에서 경계를 정리하면 관리자가 헷갈리지 않습니다.",
      },
    ],
  },
]

/** 성희롱 예방교육 강사 이력 — 프로필(about.json)에 기재된 내용과 같은 출처. */
const SEXUAL_HARASSMENT = [
  "성희롱 예방교육 전문 강사 — 중앙일보, 맥그로힐코리아, Standards & Poors 등",
  "성희롱 예방교육 강사 (자격)",
  "성희롱 예방교육 강사과정 수료",
]

export default function HarassmentTrainingPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <StructuredData
        data={servicePageJsonLd({
          name: "직장 내 괴롭힘 예방교육",
          description: "사업장으로 찾아가는 직장 내 괴롭힘 예방교육. 관리자·전 직원 대상 1~2시간 과정",
          path: "/services/harassment-training",
        })}
      />
      <PageBanner
        title="직장 내 괴롭힘 예방교육"
        subtitle="사건이 생기기 전에 — 사업장으로 찾아가는 예방교육"
        backgroundImage="/FAIR000.png"
      />

      <div className="mx-auto max-w-5xl py-10 md:py-14 lg:py-16 px-4">
        <div className="mb-6">
          <Link href="/services/workplace-harassment">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              직장 내 괴롭힘 조사 수행
            </Button>
          </Link>
        </div>

        {/* 왜 필요한가 */}
        <section className="mb-12">
          <h2 className="break-keep text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            조사보다 교육이 먼저입니다
          </h2>
          <p className="break-keep text-sm sm:text-base leading-relaxed text-gray-700">
            직장 내 괴롭힘은 신고가 들어온 뒤에 다루면 이미 비용이 큽니다. 조사·판정·조치에
            시간이 들고, 결과가 어느 쪽으로 나오든 조직에 흔적이 남습니다.
          </p>
          <p className="break-keep mt-4 text-sm sm:text-base leading-relaxed text-gray-700">
            예방교육은 <b>무엇이 괴롭힘에 해당하는지</b>, <b>관리자의 정당한 업무지시와 어떻게
            구분되는지</b>, <b>신고가 들어오면 회사가 무엇을 해야 하는지</b>를 미리 맞추는
            자리입니다. 특히 관리자가 기준을 모르면, 악의가 없어도 사건이 생깁니다.
          </p>
          <p className="break-keep mt-4 text-sm sm:text-base leading-relaxed text-gray-700">
            FAIR인사노무컨설팅은 <b>실제로 괴롭힘 사건을 조사하는 노무사</b>가 직접 강의합니다.
            조사에서 무엇이 쟁점이 되는지 아는 사람이 가르치는 것과, 교재만 읽는 것은 다릅니다.
          </p>
        </section>

        {/* 교육 개요 */}
        <section className="mb-12">
          <h2 className="break-keep text-xl sm:text-2xl font-bold text-gray-900 mb-6">교육 개요</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-blue-900/20 bg-white p-5">
              <Users className="h-6 w-6 text-primary" />
              <h3 className="mt-3 font-bold text-gray-900">대상</h3>
              <p className="mt-1 break-keep text-sm leading-relaxed text-muted-foreground">
                전 직원 과정과 관리자 과정으로 나누어 진행할 수 있습니다.
              </p>
            </div>
            <div className="rounded-2xl border border-blue-900/20 bg-white p-5">
              <Clock className="h-6 w-6 text-primary" />
              <h3 className="mt-3 font-bold text-gray-900">시간</h3>
              <p className="mt-1 break-keep text-sm leading-relaxed text-muted-foreground">
                1~2시간 과정이 일반적이며, 사안에 따라 양일 과정으로 진행한 사례도 있습니다.
              </p>
            </div>
            <div className="rounded-2xl border border-blue-900/20 bg-white p-5">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h3 className="mt-3 font-bold text-gray-900">방식</h3>
              <p className="mt-1 break-keep text-sm leading-relaxed text-muted-foreground">
                사업장으로 찾아가는 현장 교육. 성희롱 예방교육을 함께 진행할 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 커리큘럼 */}
        <section className="mb-12">
          <h2 className="break-keep text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            무엇을 다루나
          </h2>
          <p className="break-keep text-sm text-muted-foreground mb-6">
            사업장 사정에 맞춰 조정하며, 아래는 표준 구성입니다.
          </p>

          <div className="space-y-8">
            {CURRICULUM.map((course) => (
              <div key={course.name}>
                <div className="mb-4 flex flex-wrap items-baseline gap-2">
                  <h3 className="break-keep text-lg font-bold text-gray-900">{course.name}</h3>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {course.target}
                  </span>
                </div>
                <ol className="space-y-3">
                  {course.items.map((it, i) => (
                    <li
                      key={it.title}
                      className="flex gap-4 rounded-xl border border-border/60 bg-white px-5 py-4"
                    >
                      <span className="shrink-0 text-sm font-bold text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <p className="break-keep font-semibold text-gray-900">{it.title}</p>
                        <p className="break-keep mt-1 text-sm leading-relaxed text-muted-foreground">
                          {it.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* 만족도 */}
        <section className="mb-12">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline gap-3">
              <Star className="h-6 w-6 text-primary" />
              <span className="text-3xl font-bold text-gray-900">4.49</span>
              <span className="text-sm text-muted-foreground">/ 5점</span>
            </div>
            <p className="break-keep mt-3 text-sm leading-relaxed text-gray-700">
              고용노동교육원 「찾아가는 직장 내 괴롭힘 예방교육 사업장 현장지원과정」에서 받은
              <b> 강사 만족도 평균</b>입니다. <b>2026년 수행 3회 기준</b>(4.63 · 4.53 · 4.32)이며,
              해당 과정에 한정된 수치입니다.
            </p>
          </div>
        </section>

        {/* 수행 사례 */}
        <section className="mb-12">
          <h2 className="break-keep text-xl sm:text-2xl font-bold text-gray-900 mb-2">수행 사례</h2>
          <p className="break-keep text-sm text-muted-foreground mb-6">
            아래는 이력 기준이며, 고용노동교육원 의뢰로 수행한 사업장은 업종·유형으로만 표기했습니다.
          </p>
          <ul className="space-y-3">
            {RECENT.map((c) => (
              <li
                key={`${c.org}-${c.when}-${c.note}`}
                className="flex flex-wrap items-baseline justify-between gap-2 rounded-xl border border-border/60 bg-white px-5 py-4"
              >
                <div className="min-w-0">
                  <p className="break-keep font-semibold text-gray-900">{c.org}</p>
                  <p className="break-keep mt-0.5 text-sm text-muted-foreground">{c.note}</p>
                </div>
                {c.when && (
                  <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {c.when}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* 성희롱 예방교육 */}
        <section className="mb-12">
          <h2 className="break-keep text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            성희롱 예방교육도 함께 진행합니다
          </h2>
          <p className="break-keep text-sm sm:text-base leading-relaxed text-gray-700 mb-5">
            성희롱 예방교육은 법에 따라 정기적으로 실시해야 하는 교육입니다. 괴롭힘 예방교육과
            같은 자리에서 진행하면 시간과 비용이 절약되고, 두 문제의 경계를 함께 정리할 수 있습니다.
            실제로 두 과정을 함께 진행한 사업장이 있습니다.
          </p>
          <ul className="space-y-2.5">
            {SEXUAL_HARASSMENT.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span aria-hidden className="mt-0.5 shrink-0 text-primary">
                  •
                </span>
                <span className="break-keep text-sm sm:text-base leading-relaxed text-gray-700">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="mt-10">
          <div className="rounded-2xl bg-primary text-primary-foreground p-6 sm:p-8 text-center">
            <h2 className="break-keep text-xl sm:text-2xl font-bold mb-2">
              사업장으로 찾아가는 예방교육
            </h2>
            <p className="break-keep text-sm sm:text-base opacity-90 mb-5 leading-relaxed">
              인원과 시간, 관리자 과정 포함 여부를 알려주시면 구성과 일정을 안내드립니다.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              교육 문의하기 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <p className="mt-8 text-xs leading-relaxed text-gray-400">
          ※ 수행 사례와 만족도는 이력 기준이며, 개별 사업장의 교육 효과를 보장하는 내용이 아닙니다.
          교육 구성과 시간은 사업장 상황에 따라 조정됩니다.
        </p>

        <NewsletterLinkBlock />
      </div>
    </div>
  )
}
