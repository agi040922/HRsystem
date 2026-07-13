"use client"

// 카카오톡 오픈채팅 1:1 상담 — 모든 페이지 우측 하단 고정 플로팅 버튼
const KAKAO_OPENCHAT_URL = "https://open.kakao.com/o/smv8tNDi"

export default function KakaoChatButton() {
  return (
    <a
      href={KAKAO_OPENCHAT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="카카오톡으로 상담하기"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#FEE500] px-4 py-3 shadow-lg ring-1 ring-black/5 transition-transform hover:scale-105 sm:bottom-6 sm:right-6 sm:px-5 sm:py-3.5"
    >
      {/* 주의 환기용 은은한 물결 효과 */}
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#FEE500] opacity-40 group-hover:opacity-0" />

      {/* 카카오톡 말풍선 아이콘 */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6 shrink-0 fill-[#3C1E1E]"
      >
        <path d="M12 3C6.48 3 2 6.62 2 10.8c0 2.7 1.86 5.07 4.66 6.42-.15.53-.98 3.4-1.01 3.62 0 0-.02.17.09.24.11.07.24.02.24.02.32-.04 3.7-2.42 4.28-2.83.56.08 1.14.13 1.74.13 5.52 0 10-3.62 10-7.8C22 6.62 17.52 3 12 3z" />
      </svg>

      <span className="text-sm font-bold text-[#3C1E1E] sm:text-base">카카오톡 상담</span>
    </a>
  )
}
