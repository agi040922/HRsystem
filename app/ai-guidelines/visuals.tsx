"use client"

import Image from "next/image"
import {
  ArrowDown,
  Check,
  FileText,
  Info,
  Lock,
  Sparkles,
  Trash2,
  X,
} from "lucide-react"

/**
 * 가이드라인 각 절 옆에 놓는 시각 목업.
 *
 * ⚠️ 여기 그림들은 **실제 화면에서 일어나는 일을 그린 것**이다. 장식이 아니다.
 *    예를 들어 「AI 생성」 배지는 산업안전 감독관 리포트에 실제로 붙어 있는 배지다.
 *    실제 동작이 바뀌면 이 그림도 함께 고쳐야 한다. 그림만 그럴듯하게 두면
 *    가이드라인 본문과 마찬가지로 흠결이 된다.
 * ⚠️ 외부 이미지를 쓰지 않는다(조직도 1장 제외). 전부 마크업이라 다크·확대에도 깨지지 않는다.
 */

/* ── 공통 조각 ─────────────────────────────────────── */

/** 흰 카드 — 목업의 기본 단위 */
function Card({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl bg-white p-5 shadow-[0_10px_40px_-12px_rgba(15,23,42,0.25)] ring-1 ring-black/5 ${className}`}
    >
      {children}
    </div>
  )
}

/** 본문을 대신하는 회색 줄 — 글자를 읽히게 하지 않고 형태만 보여 준다 */
function Lines({ widths }: { widths: string[] }) {
  return (
    <div className="space-y-2">
      {widths.map((w, i) => (
        <div key={i} className="h-2 rounded-full bg-gray-200" style={{ width: w }} />
      ))}
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.6875rem] font-semibold uppercase tracking-wider text-gray-400">
      {children}
    </p>
  )
}

/* ── 1. FAIR AI란 무엇인가 — 규칙이 판정하고 AI가 설명한다 ── */

export function VisualWhat() {
  return (
    <div className="space-y-3">
      <Card>
        <Label>진단 응답</Label>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["예", "아니오", "예", "예", "아니오", "예"].map((v, i) => (
            <span
              key={i}
              className={`rounded-md px-2 py-1 text-xs font-semibold ${
                v === "예" ? "bg-gray-100 text-gray-700" : "bg-gray-50 text-gray-400"
              }`}
            >
              {v}
            </span>
          ))}
        </div>
      </Card>

      <div className="flex justify-center">
        <ArrowDown aria-hidden className="h-4 w-4 text-indigo-400" />
      </div>

      <div className="rounded-2xl bg-[#0f2544] p-5 text-white shadow-[0_10px_40px_-12px_rgba(15,37,68,0.6)]">
        <div className="flex items-center gap-2">
          <Lock aria-hidden className="h-4 w-4 text-indigo-300" />
          <p className="text-sm font-bold">규칙 엔진</p>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-indigo-200">
          공인노무사가 설계 · 문서 검수 후 코드에 고정
        </p>
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-red-400" />
          <span className="text-sm font-bold">위험</span>
          <span className="ml-auto text-[0.6875rem] text-indigo-200">판정 = 규칙</span>
        </div>
      </div>

      <div className="flex justify-center">
        <ArrowDown aria-hidden className="h-4 w-4 text-indigo-400" />
      </div>

      <Card>
        <div className="mb-3 flex items-center gap-2">
          <Sparkles aria-hidden className="h-4 w-4 text-amber-500" />
          <p className="text-sm font-bold text-gray-900">설명문</p>
          <span className="ml-auto rounded-md bg-amber-50 px-2 py-0.5 text-[0.6875rem] font-semibold text-amber-700 ring-1 ring-amber-200">
            AI 생성
          </span>
        </div>
        <Lines widths={["100%", "92%", "68%"]} />
      </Card>
    </div>
  )
}

/* ── 2. 어디에 쓰고, 어디에 쓰지 않는가 ── */

export function VisualWhere() {
  return (
    <div className="space-y-4">
      <Card>
        <div className="mb-4 flex items-center gap-2">
          <Sparkles aria-hidden className="h-4 w-4 text-indigo-500" />
          <p className="text-sm font-bold text-gray-900">AI가 맡는 일</p>
        </div>
        <ul className="space-y-2.5">
          {["진단 결과 설명", "계약서·서류 점검", "법령·판례 확인", "내부 업무 보조"].map((t) => (
            <li key={t} className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-50">
                <Check aria-hidden className="h-3 w-3 text-indigo-600" />
              </span>
              <span className="text-sm text-gray-700">{t}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="!bg-[#0f2544] !ring-white/10">
        <div className="mb-4 flex items-center gap-2">
          <Lock aria-hidden className="h-4 w-4 text-indigo-300" />
          <p className="text-sm font-bold text-white">사람이 쥐고 있는 일</p>
        </div>
        <ul className="space-y-2.5">
          {["진단 등급·위험 판정", "법적 판단·의견서 결론", "대외 발신 승인"].map((t) => (
            <li key={t} className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10">
                <Check aria-hidden className="h-3 w-3 text-indigo-200" />
              </span>
              <span className="text-sm text-indigo-100">{t}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

/* ── 3. 사람이 어떻게 관리·감독하는가 — 실제 공표한 조직도 ── */

export function VisualSupervision() {
  return (
    <figure className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_40px_-12px_rgba(15,23,42,0.25)] ring-1 ring-black/5">
      <Image
        src="/ai/ai-org-chart.png"
        alt="FAIR AI 에이전트 조직도 — 대표(CEO)가 최종 결정·검수·대외 발신을 승인하고, 총괄 AI는 결재권이 없으며, AI 감사팀이 전 좌석을 독립 사후 감사한다"
        width={1600}
        height={1200}
        className="h-auto w-full"
      />
      <figcaption className="border-t border-gray-100 px-4 py-3 text-xs leading-relaxed text-gray-500">
        AI 에이전트 조직 — 직무기술서(JD)·전결규정·독립 감사로 운영합니다.
      </figcaption>
    </figure>
  )
}

/* ── 4. 고객 자료를 어떻게 다루는가 ── */

export function VisualData() {
  return (
    <Card>
      <Label>계약서 AI 점검</Label>

      <div className="mt-3 flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2.5">
        <FileText aria-hidden className="h-4 w-4 shrink-0 text-gray-400" />
        <span className="truncate text-sm text-gray-700">위탁계약서.pdf</span>
      </div>

      <div className="mt-4 space-y-3">
        {[
          ["개인정보 가림", "이름·연락처를 지운 뒤 처리"],
          ["분석", "위험 조항 확인"],
        ].map(([k, v], i) => (
          <div key={k} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-[0.6875rem] font-bold text-white">
                {i + 1}
              </span>
              <span className="mt-1 w-px flex-1 bg-indigo-100" />
            </div>
            <div className="pb-1">
              <p className="text-sm font-semibold text-gray-900">{k}</p>
              <p className="text-xs text-gray-500">{v}</p>
            </div>
          </div>
        ))}

        <div className="flex gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50">
            <Trash2 aria-hidden className="h-3.5 w-3.5 text-red-500" />
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-900">자동 삭제</p>
            <p className="text-xs text-gray-500">원본 파일·추출한 글자 — 저장하지 않음</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-indigo-50 px-3 py-2.5">
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-indigo-600">
          <Check aria-hidden className="h-2.5 w-2.5 text-white" />
        </span>
        <span className="text-xs font-medium text-indigo-900">
          분석 결과만 저장 — 이용자가 선택할 때
        </span>
      </div>
    </Card>
  )
}

/* ── 5. AI를 쓴다는 사실을 알립니다 ── */

export function VisualNotice() {
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-2.5 rounded-2xl bg-white/80 px-4 py-3 ring-1 ring-black/5">
        <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
        <p className="text-xs leading-relaxed text-gray-700">
          이 진단은 AI가 보조로 쓰입니다. 시작 전에 알려 드립니다.
        </p>
      </div>

      <Card>
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="text-sm font-bold text-gray-900">진단 리포트</p>
          <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[0.6875rem] font-semibold text-amber-700 ring-1 ring-amber-200">
            AI 생성
          </span>
        </div>
        <Lines widths={["100%", "88%", "94%", "60%"]} />

        <div className="mt-4 rounded-xl bg-gray-50 px-3 py-2.5">
          <p className="text-[0.6875rem] leading-relaxed text-gray-500">
            판정·등급·권고는 규칙이 낸 결과입니다. 위 문장은 그 결과를 읽기 쉽게 다듬은
            것으로, 참고용이며 법적 판단이 아닙니다.
          </p>
        </div>

        <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
          <span className="text-[0.6875rem] text-gray-400">근거</span>
          <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[0.6875rem] font-medium text-gray-600">
            산안법 제36조
          </span>
          <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[0.6875rem] font-medium text-gray-600">
            진단 문항 12
          </span>
        </div>
      </Card>
    </div>
  )
}

/* ── 6. 우리가 하지 않는 것 ── */

export function VisualNotDoing({ items }: { items: string[] }) {
  return (
    <Card>
      <ul className="space-y-3.5">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50">
              <X aria-hidden className="h-3 w-3 text-red-500" />
            </span>
            <span className="break-keep text-sm leading-relaxed text-gray-700">{t}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
