"use client"

import { useEffect, useRef } from "react"

/**
 * 유튜브 영상 플레이어 — **자막이 뜨지 않게** 띄운다.
 *
 * ⚠️ **일반 `<iframe>` 으로 되돌리지 말 것.**
 *    URL 옵션 `cc_load_policy=0` 만으로는 **시청 계정의 '자막 항상 표시' 설정을
 *    이기지 못한다.** 우리 영상에는 만든 자막이 없어 켜지면 유튜브 **자동 자막**이
 *    나오는데, 노무 용어를 자주 틀리게 받아써서 그대로 내보낼 수 없다.
 *    그래서 IFrame Player API 로 `unloadModule("captions")` 해 모듈 자체를 내린다.
 *
 *    사내 표준이다 — 프리랜서·산업안전 백신(ManualVideoButton), 글로벌 포털
 *    (GuideVideo), 이 저장소의 hero-section·FairCrmClientPage 가 모두 같은 방식이다.
 *
 * `host` 는 nocookie 로 둔다. Player API 기본은 youtube.com 이라 그냥 두면
 * 재생 전에도 추적 쿠키가 붙는다.
 */
export function YouTubeVideo({
  videoId,
  title,
  className,
}: {
  videoId: string
  title: string
  className?: string
}) {
  const hostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let player: any = null
    let cancelled = false

    // 자막 모듈은 'captions' 또는 'cc' 로 불린다. 모듈 언로드에 더해 트랙을 비우고,
    // 상태가 바뀔 때마다(재생 시작 등) 다시 적용해 재등장을 막는다.
    const off = (target: any) => {
      for (const m of ["captions", "cc"]) {
        try { target.unloadModule(m) } catch {}
        try { target.setOption(m, "track", {}) } catch {}
      }
    }

    const init = () => {
      const YT = (window as any).YT
      if (cancelled || !YT?.Player || !hostRef.current) return
      player = new YT.Player(hostRef.current, {
        host: "https://www.youtube-nocookie.com",
        videoId,
        width: "100%",
        height: "100%",
        // 자동재생하지 않는다 — 소개 페이지라 방문자가 눌러서 본다.
        playerVars: { rel: 0, cc_load_policy: 0, playsinline: 1 },
        events: {
          onReady: (e: any) => off(e.target),
          onApiChange: (e: any) => off(e.target),
          onStateChange: (e: any) => off(e.target),
        },
      })
    }

    if ((window as any).YT?.Player) {
      init()
    } else {
      const prev = (window as any).onYouTubeIframeAPIReady
      ;(window as any).onYouTubeIframeAPIReady = () => {
        if (typeof prev === "function") prev()
        init()
      }
      if (!document.getElementById("yt-iframe-api")) {
        const tag = document.createElement("script")
        tag.id = "yt-iframe-api"
        tag.src = "https://www.youtube.com/iframe_api"
        document.body.appendChild(tag)
      }
    }

    return () => {
      cancelled = true
      try { player?.destroy?.() } catch {}
    }
  }, [videoId])

  return (
    <div
      role="region"
      aria-label={title}
      className={`aspect-video w-full overflow-hidden rounded-2xl bg-gray-900 shadow-xl ring-1 ring-black/5 ${className ?? ""}`}
    >
      <div ref={hostRef} className="h-full w-full" />
    </div>
  )
}
