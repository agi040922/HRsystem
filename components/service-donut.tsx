// 근로자성 분쟁 예방 순환 도넛 (순수 SVG) — 프리랜서 백신 ServiceDonut 이식(라이트 테마)
// AI 진단 → 계약서 생성 → 프리랜서 관리 → 입증서류 체크 → AI 감독관 → 업데이트

const SEGMENTS = [
  { label: "AI 진단", color: "#1e40af" },
  { label: "계약서 생성", color: "#2563eb" },
  { label: "프리랜서 관리", color: "#14b8a6" },
  { label: "입증서류 체크", color: "#6366f1" },
  { label: "AI 감독관", color: "#0ea5e9" },
  { label: "업데이트", color: "#8b5cf6" },
]

const SIZE = 300
const CENTER = SIZE / 2
const R = 95
const STROKE = 30
const C = 2 * Math.PI * R
const N = SEGMENTS.length
const SEG = C / N
const GAP = 14
const LABEL_R = R + STROKE / 2 + 20

function polar(thetaDeg: number, radius: number) {
  const rad = (thetaDeg * Math.PI) / 180
  return { x: CENTER + radius * Math.sin(rad), y: CENTER - radius * Math.cos(rad) }
}

export function ServiceDonut() {
  const trackColor = "#e2e8f0"
  const centerFill = "#1e2761"
  const segLabelFill = "#334155"
  return (
    <svg
      viewBox={`-40 -5 ${SIZE + 80} ${SIZE + 20}`}
      className="mx-auto w-full max-w-[360px]"
      role="img"
      aria-label="근로자성 분쟁 예방 순환: AI 진단, 계약서 생성, 프리랜서 관리, 입증서류 체크, AI 감독관, 업데이트"
    >
      <circle cx={CENTER} cy={CENTER} r={R} fill="none" stroke={trackColor} strokeWidth={STROKE} />
      <g transform={`rotate(-90 ${CENTER} ${CENTER})`}>
        {SEGMENTS.map((s, i) => (
          <circle
            key={s.label}
            cx={CENTER}
            cy={CENTER}
            r={R}
            fill="none"
            stroke={s.color}
            strokeWidth={STROKE}
            strokeLinecap="butt"
            strokeDasharray={`${SEG - GAP} ${C - (SEG - GAP)}`}
            strokeDashoffset={-(SEG * i + GAP / 2)}
          />
        ))}
      </g>
      <text
        x={CENTER}
        y={CENTER + 5}
        textAnchor="middle"
        style={{ fontSize: 16, fontWeight: 700, fill: centerFill }}
      >
        근로자성 분쟁 예방
      </text>
      {SEGMENTS.map((s, i) => {
        const theta = (i + 0.5) * (360 / N)
        const p = polar(theta, LABEL_R)
        const rad = (theta * Math.PI) / 180
        const sin = Math.sin(rad)
        const cos = Math.cos(rad)
        const anchor = sin > 0.1 ? "start" : sin < -0.1 ? "end" : "middle"
        const lines = s.label.split(" ")
        const LINE_H = 14
        let firstDy: number
        if (lines.length === 1) firstDy = 4
        else if (cos < -0.5) firstDy = 4
        else if (cos > 0.5) firstDy = 4 - LINE_H * (lines.length - 1)
        else firstDy = -3
        return (
          <text
            key={s.label}
            x={p.x}
            y={p.y}
            textAnchor={anchor}
            style={{ fontSize: 12, fontWeight: 600, fill: segLabelFill }}
          >
            {lines.map((line, li) => (
              <tspan key={line} x={p.x} dy={li === 0 ? firstDy : LINE_H}>
                {line}
              </tspan>
            ))}
          </text>
        )
      })}
    </svg>
  )
}
