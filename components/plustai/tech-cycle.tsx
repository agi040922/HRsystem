"use client"

/**
 * 플러스 티 에이아이 ↔ FAIR CRM 순환 도식.
 *
 * 두 개의 호(arc)가 하나의 고리를 이루고, 각 호 끝의 화살표가 같은 방향을 가리켜
 * "기술이 플랫폼으로, 플랫폼이 다시 기술로" 돌아가는 관계를 보여준다.
 * ⚠️ 위 라벨 = FAIR CRM(플랫폼), 아래 라벨 = 플러스 티 에이아이(기술력).
 *    색과 라벨이 서로 어긋나면 그림이 거짓말을 하므로 함께 고칠 것.
 */

const CX = 160
const CY = 160
const R = 104 // 고리 반지름(획 중심선)

const CRM = "#2563eb" // 위쪽 호 — FAIR CRM
const PTAI = "#7c3aed" // 아래쪽 호 — 플러스 티 에이아이

/** 각도(도) → 좌표. y가 아래로 증가하므로 각도가 커질수록 시계방향으로 돈다. */
function pt(deg: number, r = R) {
  const rad = (deg * Math.PI) / 180
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)] as const
}

/** 시계방향 호 경로 */
function arc(from: number, to: number, r = R) {
  const [x1, y1] = pt(from, r)
  const [x2, y2] = pt(to, r)
  const large = ((to - from + 360) % 360) > 180 ? 1 : 0
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`
}

/** 호가 끝나는 지점에서 진행 방향(접선)을 향하는 삼각형 화살표 */
function Arrow({ deg, color }: { deg: number; color: string }) {
  const [x, y] = pt(deg)
  return (
    <polygon
      points="0,-11 20,0 0,11"
      fill={color}
      transform={`translate(${x} ${y}) rotate(${deg + 90})`}
    />
  )
}

export default function TechCycle() {
  return (
    <div className="mx-auto w-full max-w-[420px]">
      {/* 위 라벨 — 플랫폼 축 */}
      <div className="mb-3 flex items-center justify-center gap-2 text-center">
        <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: CRM }} />
        <span className="break-keep text-sm font-bold text-gray-900 sm:text-base">
          FAIR CRM의 인사노무 통합 플랫폼
        </span>
      </div>

      <svg
        viewBox="0 0 320 320"
        className="mx-auto h-auto w-full max-w-[320px]"
        role="img"
        aria-label="플러스 티 에이아이의 기술력과 FAIR CRM 인사노무 통합 플랫폼이 서로 순환하는 구조"
      >
        {/* 바탕 고리 — 아주 옅게 깔아 두 호가 하나의 원임을 보여준다 */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#e2e8f0" strokeWidth={26} />

        {/* 돌고 있다는 느낌만 주는 점선 — 느리게 회전 */}
        <circle
          cx={CX}
          cy={CY}
          r={R - 24}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth={1.5}
          strokeDasharray="3 9"
          className="origin-center motion-safe:animate-[spin_24s_linear_infinite]"
        />

        {/* 위쪽 호 — FAIR CRM */}
        <path d={arc(196, 332)} fill="none" stroke={CRM} strokeWidth={26} strokeLinecap="round" />
        <Arrow deg={332} color={CRM} />

        {/* 아래쪽 호 — 플러스 티 에이아이 */}
        <path d={arc(16, 152)} fill="none" stroke={PTAI} strokeWidth={26} strokeLinecap="round" />
        <Arrow deg={152} color={PTAI} />

        {/* 가운데 — 두 축이 만나는 자리 */}
        <circle cx={CX} cy={CY} r={62} fill="#ffffff" />
        <text
          x={CX}
          y={CY - 8}
          textAnchor="middle"
          style={{ fontSize: 22, fontWeight: 800, fill: "#0f172a" }}
        >
          HR테크
        </text>
        <text
          x={CX}
          y={CY + 18}
          textAnchor="middle"
          style={{ fontSize: 13, fontWeight: 600, fill: "#64748b" }}
        >
          선순환 구조
        </text>
      </svg>

      {/* 아래 라벨 — 기술 축 */}
      <div className="mt-3 flex items-center justify-center gap-2 text-center">
        <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: PTAI }} />
        <span className="break-keep text-sm font-bold text-gray-900 sm:text-base">
          자회사 플러스 티 에이아이의 기술력
        </span>
      </div>

      <p className="mt-3 break-keep text-center text-xs leading-relaxed text-muted-foreground">
        기술이 플랫폼이 되고, 플랫폼에 쌓인 현장이 다시 기술로 돌아옵니다.
      </p>
    </div>
  )
}
