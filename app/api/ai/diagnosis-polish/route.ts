import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import {
  computeQuickDiag,
  getQuickDiagConfig,
  isQuickDiagKind,
  type QuickDiagAnswer,
  type QuickDiagKind,
} from '@/lib/quickDiagnosis'

// 간이진단 결과 'AI 다듬기' — 비로그인 공개.
// 등급·점수·위험신호는 규칙 결과가 권위이며, AI는 그 결과를 읽기 쉽게 재서술만 한다.
// 응답·IP는 어디에도 영구 저장하지 않는다(아래 캐시·레이트리밋은 인메모리, 요청 처리용).

const ANSWER_VALUES: QuickDiagAnswer[] = ['예', '아니오']

const SYSTEM_PROMPT = `당신은 한국어 노무 진단 결과를 더 읽기 쉽게 ‘다듬는’ 편집자입니다.
규칙(로직)이 이미 산출한 진단 결과의 내용을 바꾸지 않고 문장만 자연스럽게 정리합니다.

절대 원칙:
1. 새로운 조언·제안·해결책("이렇게 바꾸세요", "○○를 하세요" 등)을 절대 추가하지 마세요.
2. 제공된 내용에 없는 사실·판단·수치를 만들지 마세요.
3. 등급·점수·위험 신호를 바꾸거나 다시 판정하지 마세요. 규칙 결과가 유일한 사실입니다.
4. 제공된 항목(등급·위험 신호 문구)만 활용해 2~4문장의 매끄러운 한 단락으로 정리하세요.
5. 단정적 법률 판단을 내리지 말고("~로 해석될 가능성이 높습니다" 계열 유지), 진단 결과를 차분히 설명하는 존댓말 톤을 유지하세요.
6. 출력은 JSON 객체 하나만: {"polished":"다듬은 단락"}`

// 다듬기는 ‘재서술만’이어야 한다. AI가 새로 만든 ‘명령형 조언/권고’를 탐지해 폐기한다.
// 등급 재서술(위험이 낮음/높음 등)은 허용 — 규칙 결과의 재진술이므로 차단하지 않는다.
const ADVICE_MARKERS: RegExp[] = [
  /하세요/,
  /하십시오/,
  /하시기\s*바랍/,
  /하시길/,
  /권장/,
  /권고/,
  /바꾸(세요|시면|는 것)/,
  /정리하(세요|시면)/,
  /검토를?\s*권/,
  /조치(를|가\s*필요)/,
  /개선(하|이\s*필요|을\s*검토)/,
  /추천(합니다|드립니다)/,
]

function looksLikeAdvice(text: string): boolean {
  return ADVICE_MARKERS.some((re) => re.test(text))
}

/** {"polished": string} 만 안전 추출. 비정상 입력은 빈 문자열. 최대 1200자. */
function sanitizePolished(raw: unknown): string {
  if (!raw || typeof raw !== 'object') return ''
  const value = (raw as { polished?: unknown }).polished
  return typeof value === 'string' ? value.slice(0, 1200).trim() : ''
}

// 인메모리 캐시 — 서버리스 인스턴스별로만 유지되며(인스턴스 간 공유·영속 없음),
// 같은 답변 조합의 반복 호출에서 OpenAI 호출을 줄이는 용도다.
const CACHE = new Map<string, string>()
const CACHE_MAX = 300

// 인메모리 호출 제한 — IP당 시간당 20회. 인스턴스별이며 영구 저장하지 않는다.
const RATE_LIMIT = 20
const RATE_WINDOW_MS = 60 * 60 * 1000
const HITS = new Map<string, { count: number; resetAt: number }>()

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip')?.trim() || 'unknown'
}

function overRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = HITS.get(ip)
  if (!entry || now >= entry.resetAt) {
    // 만료된 항목 정리 (메모리 누수 방지)
    if (HITS.size > 1000) {
      for (const [key, value] of HITS) if (now >= value.resetAt) HITS.delete(key)
    }
    HITS.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }
  entry.count += 1
  return entry.count > RATE_LIMIT
}

/** 캐시 키 = kind + 문항 id 정렬 순의 응답 비트(위험 응답 1). */
function cacheKey(kind: QuickDiagKind, answers: Record<string, QuickDiagAnswer>): string {
  const config = getQuickDiagConfig(kind)
  const bits = config.questions
    .map((q) => q.id)
    .sort()
    .map((id) => (answers[id] === config.riskAnswer ? '1' : '0'))
    .join('')
  return `${kind}:${bits}`
}

const NOTE =
  '등급·위험신호는 위의 규칙 기반 결과가 기준이며, AI는 문장을 다듬는 보조 역할만 합니다. AI는 실수할 수 있습니다.'

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { kind?: unknown; answers?: unknown }

    if (!isQuickDiagKind(body.kind)) {
      return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })
    }
    const kind = body.kind
    const config = getQuickDiagConfig(kind)

    const rawAnswers = body.answers
    if (!rawAnswers || typeof rawAnswers !== 'object' || Array.isArray(rawAnswers)) {
      return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })
    }
    const entries = Object.entries(rawAnswers as Record<string, unknown>)
    // 문항 id 완전 일치 + 응답값 화이트리스트
    if (entries.length !== config.questions.length) {
      return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })
    }
    const answers: Record<string, QuickDiagAnswer> = {}
    for (const q of config.questions) {
      const value = (rawAnswers as Record<string, unknown>)[q.id]
      if (typeof value !== 'string' || !ANSWER_VALUES.includes(value as QuickDiagAnswer)) {
        return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })
      }
      answers[q.id] = value as QuickDiagAnswer
    }

    // 미설정이면 조용히 숨김(로컬 dev 경로). 500을 내지 않는다.
    // 클라이언트는 요청 시점에 만든다 — 모듈 스코프 생성은 키 부재 시 import 단계에서 throw 한다.
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ available: false })
    }

    const key = cacheKey(kind, answers)
    const cached = CACHE.get(key)
    if (cached) {
      return NextResponse.json({ available: true, polished: cached, note: NOTE })
    }

    if (overRateLimit(clientIp(request))) {
      return NextResponse.json({ available: false }, { status: 429 })
    }

    // 클라이언트가 보낸 등급은 신뢰하지 않고 서버에서 규칙 결과를 재계산한다.
    const rule = computeQuickDiag(kind, answers)
    const signals =
      rule.signals
        .map((s) => `- ${s.area ? `[${s.area}] ` : ''}${s.text} (사유: ${s.reason})`)
        .join('\n') || '(위험 신호 없음)'
    const userPrompt = [
      `[진단] ${rule.title}`,
      `[등급] ${rule.label}`,
      `[헤드라인] ${rule.head}`,
      `[위험 신호]`,
      signals,
    ].join('\n')

    const openai = new OpenAI({ apiKey })
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0,
      max_tokens: 700,
      response_format: { type: 'json_object' },
    })

    const raw = completion.choices[0]?.message?.content
    if (!raw) return NextResponse.json({ available: false })

    let parsed: unknown
    try {
      parsed = JSON.parse(raw)
    } catch {
      return NextResponse.json({ available: false })
    }

    const polished = sanitizePolished(parsed)
    // 빈 응답 / 재서술이 아닌 새 조언이 섞이면 폐기 — 규칙 결과만 표시한다.
    if (!polished || looksLikeAdvice(polished)) {
      return NextResponse.json({ available: false })
    }

    if (CACHE.size >= CACHE_MAX) CACHE.clear()
    CACHE.set(key, polished)

    return NextResponse.json({ available: true, polished, note: NOTE })
  } catch {
    // 실패 시에도 박스를 숨기게 available:false 로 응답(규칙 결과가 이미 화면에 있음).
    return NextResponse.json({ available: false })
  }
}
