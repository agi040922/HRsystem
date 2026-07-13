import { ImageResponse } from "next/og"

// 카카오톡·SNS 공유 시 노출되는 링크 카드 이미지(1200×630) — 빌드 시 정적 생성
export const runtime = "nodejs"
export const alt = "FAIR인사노무컨설팅 — 27년 경력 공인노무사 HR 자문·FAIR CRM"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const FONT = "https://cdn.jsdelivr.net/gh/orioncactus/pretendard/packages/pretendard/dist/public/static"

async function loadFont(url: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    return await res.arrayBuffer()
  } catch {
    return null
  }
}

export default async function OpengraphImage() {
  const [bold, semibold, regular] = await Promise.all([
    loadFont(`${FONT}/Pretendard-Bold.otf`),
    loadFont(`${FONT}/Pretendard-SemiBold.otf`),
    loadFont(`${FONT}/Pretendard-Regular.otf`),
  ])

  const fonts = [
    bold && { name: "Pretendard", data: bold, weight: 700 as const, style: "normal" as const },
    semibold && { name: "Pretendard", data: semibold, weight: 600 as const, style: "normal" as const },
    regular && { name: "Pretendard", data: regular, weight: 400 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 600 | 700; style: "normal" }[]

  const chips = ["통상임금", "근로시간", "부당해고", "산업안전", "중대재해"]

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "Pretendard",
          color: "#FFFFFF",
          backgroundColor: "#0A1B33",
          backgroundImage:
            "radial-gradient(1100px 520px at 88% -12%, rgba(59,130,246,0.55), rgba(59,130,246,0) 60%), linear-gradient(135deg, #0A1B33 0%, #14336B 58%, #1E4FB8 100%)",
        }}
      >
        {/* 상단: 브랜드 로고 + SINCE */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ fontSize: 46, fontWeight: 700, letterSpacing: -1 }}>FAIR</span>
            <span style={{ fontSize: 40, fontWeight: 600, marginLeft: 12, color: "#DCE7FB" }}>
              인사노무컨설팅
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 20px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.35)",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 2,
              color: "#DCE7FB",
            }}
          >
            SINCE 2005
          </div>
        </div>

        {/* 중앙: 카피 */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 27,
              fontWeight: 600,
              color: "#7FB0FF",
              letterSpacing: 0.5,
              marginBottom: 22,
            }}
          >
            27년 경력 공인노무사 · 인사노무 통합 관리 플랫폼
          </div>
          <div style={{ display: "flex", fontSize: 66, fontWeight: 700, lineHeight: 1.22, letterSpacing: -1.5 }}>
            임금·근로시간·해고·산업안전
          </div>
          <div style={{ display: "flex", fontSize: 66, fontWeight: 700, lineHeight: 1.22, letterSpacing: -1.5 }}>
            <span>{"리스크를 "}</span>
            <span style={{ color: "#8FC0FF" }}>한 곳에서</span>
            <span>{" 관리합니다"}</span>
          </div>
        </div>

        {/* 하단: 키워드 칩 + URL */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {chips.map((c) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 18px",
                  marginRight: 12,
                  borderRadius: 12,
                  backgroundColor: "rgba(255,255,255,0.12)",
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#EAF1FF",
                }}
              >
                {c}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 700, color: "#FFFFFF" }}>
            www.fairhr.net
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  )
}
