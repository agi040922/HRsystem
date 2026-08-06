/**
 * 홈 — 고객유형별 지그재그 섹션의 시각물(인라인 SVG 목업).
 *
 * 사진 대신 SVG를 쓰는 이유(운영자 확정 2026-08-06):
 *  - 적합한 실사진이 없고, 스톡 사진은 신뢰도를 떨어뜨린다.
 *  - 벡터라 모바일·레티나에서 깨지지 않고 파일 용량이 0에 가깝다.
 *  - 고객사 로고는 하단 ClientsSection 에서 이미 노출하므로 여기서는 쓰지 않는다(중복 금지).
 *
 * 4번째 블록(HR테크)만 실제 제품 화면(/crm/dashboard-overview.png)을 쓴다 — 실물이 가장 강하다.
 */

const INK = "#0B2545"
const BLUE = "#2563EB"
const SOFT = "#EFF6FF"
const LINE = "#CBD5E1"
const MUTED = "#94A3B8"

/** 모든 목업 공통 프레임 — 연한 배경 + 라운드. */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 640 360"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-hidden="true"
    >
      <rect width="640" height="360" rx="16" fill="#F8FAFC" />
      {children}
    </svg>
  )
}

/** 본문 자리표시 줄 — 실제 문구를 넣지 않아 오인 소지를 없앤다. */
function Lines({ x, y, w, n, gap = 13 }: { x: number; y: number; w: number; n: number; gap?: number }) {
  return (
    <>
      {Array.from({ length: n }).map((_, i) => (
        <rect
          key={i}
          x={x}
          y={y + i * gap}
          width={i === n - 1 ? w * 0.6 : w}
          height="5"
          rx="2.5"
          fill={LINE}
        />
      ))}
    </>
  )
}

/** ① 외국계기업 — 본사 정책과 한국 노동법 사이를 잇는다. */
export function GlobalHqVisual() {
  return (
    <Frame>
      {/* 좌: 글로벌 본사 */}
      <rect x="40" y="70" width="200" height="220" rx="12" fill="#fff" stroke={LINE} />
      <rect x="40" y="70" width="200" height="34" rx="12" fill={INK} />
      <rect x="40" y="92" width="200" height="12" fill={INK} />
      <text x="60" y="92" fill="#fff" fontSize="13" fontWeight="700" fontFamily="sans-serif">
        GLOBAL HQ
      </text>
      <text x="60" y="132" fill={MUTED} fontSize="10" fontFamily="sans-serif">
        Global HR Policy
      </text>
      <Lines x={60} y={146} w={160} n={6} />

      {/* 우: 한국 법인 */}
      <rect x="400" y="70" width="200" height="220" rx="12" fill="#fff" stroke={LINE} />
      <rect x="400" y="70" width="200" height="34" rx="12" fill={BLUE} />
      <rect x="400" y="92" width="200" height="12" fill={BLUE} />
      <text x="420" y="92" fill="#fff" fontSize="13" fontWeight="700" fontFamily="sans-serif">
        KOREA
      </text>
      <text x="420" y="132" fill={MUTED} fontSize="10" fontFamily="sans-serif">
        근로기준법 · 노동위원회
      </text>
      <Lines x={420} y={146} w={160} n={6} />

      {/* 중앙: FAIR 가 사이를 잇는다 */}
      <line x1="248" y1="180" x2="288" y2="180" stroke={MUTED} strokeWidth="2" strokeDasharray="4 4" />
      <line x1="352" y1="180" x2="392" y2="180" stroke={MUTED} strokeWidth="2" strokeDasharray="4 4" />
      <circle cx="320" cy="180" r="34" fill={SOFT} stroke={BLUE} strokeWidth="2" />
      <text
        x="320"
        y="185"
        fill={BLUE}
        fontSize="15"
        fontWeight="800"
        fontFamily="sans-serif"
        textAnchor="middle"
      >
        FAIR
      </text>

      {/* 양방향 표시 */}
      <path d="M288 180 l-8 -4 v8 z" fill={MUTED} />
      <path d="M352 180 l8 -4 v8 z" fill={MUTED} />
    </Frame>
  )
}

/** ② 프리랜서·근로자 추정제 — 위험도 진단과 입증자료. */
export function DiagnosisVisual() {
  return (
    <Frame>
      <rect x="70" y="46" width="500" height="268" rx="14" fill="#fff" stroke={LINE} />

      {/* 헤더 */}
      <text x="98" y="86" fill={INK} fontSize="15" fontWeight="700" fontFamily="sans-serif">
        근로자성 진단 결과
      </text>

      {/* 위험도 3구간 게이지 */}
      <rect x="98" y="104" width="140" height="10" rx="5" fill="#DCFCE7" />
      <rect x="244" y="104" width="140" height="10" rx="5" fill="#FEF3C7" />
      <rect x="390" y="104" width="152" height="10" rx="5" fill="#FEE2E2" />
      <text x="98" y="132" fill={MUTED} fontSize="10" fontFamily="sans-serif">낮음</text>
      <text x="290" y="132" fill={MUTED} fontSize="10" fontFamily="sans-serif">보통</text>
      <text x="512" y="132" fill={MUTED} fontSize="10" fontFamily="sans-serif">높음</text>
      {/* 지시침 — 특정 판정으로 읽히지 않도록 중간 구간에 둔다 */}
      <path d="M300 96 l-7 -12 h14 z" fill={INK} />

      {/* 점검 항목 */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx="106" cy={168 + i * 30} r="7" fill={SOFT} stroke={BLUE} strokeWidth="1.5" />
          <path
            d={`M102.5 ${168 + i * 30} l2.5 2.5 l4.5 -5`}
            stroke={BLUE}
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          <rect x="122" y={164 + i * 30} width={280 - i * 26} height="6" rx="3" fill={LINE} />
        </g>
      ))}

      {/* 입증자료 배지 */}
      <rect x="418" y="158" width="124" height="112" rx="10" fill={SOFT} stroke={BLUE} strokeDasharray="4 4" />
      <rect x="440" y="178" width="80" height="56" rx="6" fill="#fff" stroke={BLUE} />
      <rect x="452" y="192" width="56" height="4" rx="2" fill={LINE} />
      <rect x="452" y="202" width="56" height="4" rx="2" fill={LINE} />
      <rect x="452" y="212" width="36" height="4" rx="2" fill={LINE} />
      <text
        x="480"
        y="256"
        fill={BLUE}
        fontSize="11"
        fontWeight="700"
        fontFamily="sans-serif"
        textAnchor="middle"
      >
        입증자료
      </text>
    </Frame>
  )
}

/** ③ 분쟁·근로감독 — 대응 단계. */
export function DisputeVisual() {
  const steps = ["사건 발생", "사실조사", "노동위원회", "판정·이행"]
  return (
    <Frame>
      {/* 배경 서류 */}
      <rect x="86" y="52" width="180" height="150" rx="10" fill="#fff" stroke={LINE} transform="rotate(-5 176 127)" />
      <rect x="110" y="44" width="180" height="150" rx="10" fill="#fff" stroke={LINE} />
      <rect x="130" y="70" width="120" height="6" rx="3" fill={INK} />
      <Lines x={130} y={88} w={140} n={5} gap={14} />

      <rect x="330" y="44" width="224" height="150" rx="10" fill="#fff" stroke={LINE} />
      <rect x="350" y="70" width="90" height="6" rx="3" fill={BLUE} />
      <Lines x={350} y={88} w={184} n={5} gap={14} />

      {/* 진행 단계 */}
      <line x1="86" y1="272" x2="554" y2="272" stroke={LINE} strokeWidth="2" />
      {steps.map((s, i) => {
        const cx = 86 + i * 156
        const done = i < 3
        return (
          <g key={s}>
            <circle cx={cx} cy="272" r="12" fill={done ? BLUE : "#fff"} stroke={BLUE} strokeWidth="2" />
            {done && (
              <path
                d={`M${cx - 5} 272 l3.5 3.5 l6.5 -7`}
                stroke="#fff"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            )}
            <text
              x={cx}
              y="308"
              fill={INK}
              fontSize="12"
              fontWeight="600"
              fontFamily="sans-serif"
              textAnchor={i === 0 ? "start" : i === steps.length - 1 ? "end" : "middle"}
            >
              {s}
            </text>
          </g>
        )
      })}
    </Frame>
  )
}
