"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight, PlayCircle, X, Calculator, ShieldCheck, UserCheck, Scale, MessageCircle, Clock, TrendingDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useTranslations } from 'next-intl'

// HeroSection 컴포넌트 - 캐러셀 버전
export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const t = useTranslations('hero')

  const slides = [
    {
      type: "image",
      src: "/crm/diagnosis-report.png",
      // 첫 화면은 2대 축 입구만 보여준다. 진단은 다음 화면(아래 슬라이드)으로 넘겼다.
      variant: "centers",
      // 첫 장에만 회사 소개 문장을 쓴다. 나머지 장은 기존 t('partner') 를 그대로 쓴다.
      headline: t('companyHeadline'),
      topLeft: { title: t('slide1.title'), subtitle: t('slide1.subtitle') },
      bottomRight: { text: t('slide1.text'), highlight: t('slide1.highlight') }
    },
    {
      type: "image",
      src: "/crm/dashboard-overview.png",
      variant: "diagnosis",
      topLeft: { title: t('slide1.title'), subtitle: t('slide1.subtitle') },
      bottomRight: { text: t('slide1.text'), highlight: t('slide1.highlight') }
    },
    {
      type: "image",
      src: "/crm/advisory-history.png",
      variant: "consulting",
      headline: t('companyHeadline'),
      topLeft: { title: t('slide1.title'), subtitle: t('slide1.subtitle') },
      bottomRight: { text: t('slide1.text'), highlight: t('slide1.highlight') }
    },
    {
      type: "image",
      src: "/crm/safety-dashboard.png",
      topLeft: { title: t('slide1.title'), subtitle: t('slide1.subtitle') },
      bottomRight: { text: t('slide1.text'), highlight: t('slide1.highlight') }
    },
    {
      type: "image",
      src: "/0706/KakaoTalk_20250703_205419523.jpg",
      topLeft: {
        title: t('slide2.title'),
        subtitle: t('slide2.subtitle')
      },
      bottomRight: {
        text: t('slide2.text'),
        highlight: t('slide2.highlight')
      }
    },
    {
      type: "image", 
      src: "/0706/KakaoTalk_20250703_205422678.jpg",
      topLeft: {
        title: t('slide3.title'),
        subtitle: t('slide3.subtitle')
      },
      bottomRight: {
        text: t('slide3.text'),
        highlight: t('slide3.highlight')
      }
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length, currentSlide])

  // 제안서 영상: 유튜브 자막(CC) 강제 끄기 — IFrame API로 captions 모듈 언로드
  useEffect(() => {
    if (!showVideo) return
    let player: any = null
    const off = (target: any) => {
      try { target.unloadModule("captions") } catch {}
      try { target.unloadModule("cc") } catch {}
      try { target.setOption("captions", "track", {}) } catch {}
    }
    const init = () => {
      const YT = (window as any).YT
      const el = document.getElementById("fair-crm-video")
      if (!YT || !YT.Player || !el) return
      player = new YT.Player("fair-crm-video", {
        events: {
          onReady: (e: any) => off(e.target),
          onApiChange: (e: any) => off(e.target),
          onStateChange: (e: any) => off(e.target),
        },
      })
    }
    if ((window as any).YT && (window as any).YT.Player) {
      init()
    } else {
      if (!document.getElementById("yt-iframe-api")) {
        const tag = document.createElement("script")
        tag.id = "yt-iframe-api"
        tag.src = "https://www.youtube.com/iframe_api"
        document.body.appendChild(tag)
      }
      ;(window as any).onYouTubeIframeAPIReady = init
    }
    return () => { try { player?.destroy?.() } catch {} }
  }, [showVideo])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative h-[64vh] sm:h-[62vh] md:h-[70vh] lg:h-[75vh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {slides[currentSlide].type === "video" ? (
            <>
              <video
                autoPlay
                loop
                muted
                playsInline
                aria-hidden="true"
                className="absolute inset-0 z-0 w-full h-full object-cover scale-110 blur-2xl opacity-80"
              >
                <source src={slides[currentSlide].src} type="video/mp4" />
              </video>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 z-0 w-full h-full object-contain"
              >
                <source src={slides[currentSlide].src} type="video/mp4" />
                {t('videoNotSupported')}
              </video>
            </>
          ) : (
            <>
              <img
                src={slides[currentSlide].src}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 z-0 w-full h-full object-cover scale-110 blur-2xl opacity-80"
              />
              <img
                src={slides[currentSlide].src}
                alt="Hero background"
                className="absolute inset-0 z-0 w-full h-full object-contain"
              />
            </>
          )}
          <div className="absolute inset-0 bg-black/50 z-10" />
          
          {/* 슬라이드 카운터 */}
          <div className="absolute top-3 sm:top-6 right-3 sm:right-6 z-20 bg-black/20 backdrop-blur-sm rounded-full px-2 sm:px-3 py-0.5 sm:py-1 border border-white/20">
            <span className="text-white text-xs sm:text-sm font-medium">
              {currentSlide + 1} / {slides.length}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 왼쪽 슬라이드 텍스트 상자 - 모바일에서는 숨김 */}
      {/* 슬라이드 텍스트 카드 — 가운데 문구와 겹치지 않을 만큼 넓은 화면(2xl≥1536px)에서만 보인다.
          영문은 한글보다 2~3배 길어 그보다 좁은 폭에서는 가운데 H1 과 충돌한다. */}
      <div className="hidden 2xl:block absolute left-8 top-1/2 -translate-y-1/2 z-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
          className="max-w-xs bg-black/30 backdrop-blur-sm rounded-lg p-4 md:p-5 border border-white/20"
        >
          <motion.div
            key={`slide-${currentSlide}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {slides[currentSlide].topLeft.subtitle && (
              <h3 className="text-sm md:text-base text-white mb-2 font-medium">
                {slides[currentSlide].topLeft.subtitle}
              </h3>
            )}
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white leading-tight mb-2">
              {slides[currentSlide].topLeft.title}
            </h2>
            {slides[currentSlide].bottomRight.text && (
              <p className="text-sm md:text-base text-white mb-1">
                {slides[currentSlide].bottomRight.text}
              </p>
            )}
            {slides[currentSlide].bottomRight.highlight && (
              <p className="text-base md:text-lg font-semibold text-white">
                {slides[currentSlide].bottomRight.highlight}
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* 모바일용 상단 슬라이드 텍스트 — 중앙 콘텐츠와 겹쳐 모바일에서는 숨김 */}
      <div className="hidden absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
          className="bg-black/30 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20 text-center"
        >
          <motion.div
            key={`slide-mobile-${currentSlide}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {slides[currentSlide].topLeft.subtitle && (
              <h3 className="text-xs sm:text-sm text-white mb-1 font-medium">
                {slides[currentSlide].topLeft.subtitle}
              </h3>
            )}
            <h2 className="text-sm sm:text-base font-bold text-white leading-tight mb-1">
              {slides[currentSlide].topLeft.title}
            </h2>
            {slides[currentSlide].bottomRight.highlight && (
              <p className="text-xs sm:text-sm font-medium text-white/90">
                {slides[currentSlide].bottomRight.highlight}
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* 중앙 메인 콘텐츠 */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="mx-auto w-full max-w-4xl px-4 text-center pt-6 sm:pt-8 md:pt-16 lg:pt-0">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4, ease: "easeOut" }}
            className="break-keep text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-8 sm:mb-10 md:mb-12 leading-[1.45]"  /* 제목이 두 줄 이상일 때 줄끼리 붙지 않게 — 큰 글자라 1.25 는 답답하다 */
          >
            {(slides[currentSlide] as { headline?: string }).headline ?? t('partner')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6, ease: "easeOut" }}
            className="break-keep text-white text-sm sm:text-base md:text-lg lg:text-xl mb-10 sm:mb-12 md:mb-14 leading-relaxed"
          >
            {t('description')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-2 sm:gap-3 sm:flex-row justify-center items-center"
          >
            {(slides[currentSlide] as { variant?: string }).variant === "centers" ? (
              /* 2대 축 입구 — 파란 계열로 서로 구분한다(밝은 파랑=HR테크, 짙은 남색=외국계) */
              <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <Link href="/hr-tech" className="group block">
                  <div className="h-full rounded-2xl border border-blue-300/60 bg-blue-600/80 p-5 text-left backdrop-blur-sm transition-colors hover:border-blue-200 hover:bg-blue-600 sm:p-6">
                    <div className="mb-1.5 flex items-center gap-2">
                      <h2 className="break-keep text-base font-bold text-white sm:text-lg">
                        HR테크 지원센터
                      </h2>
                      <ArrowRight className="h-4 w-4 shrink-0 text-white/90 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <p className="break-keep text-xs leading-relaxed text-white/90 sm:text-sm">
                      FAIR CRM과 자회사 플러스 티 에이아이
                    </p>
                  </div>
                </Link>
                <Link href="/global-companies" className="group block">
                  <div className="h-full rounded-2xl border border-indigo-300/60 bg-indigo-900/80 p-5 text-left backdrop-blur-sm transition-colors hover:border-indigo-200 hover:bg-indigo-900 sm:p-6">
                    <div className="mb-1.5 flex items-center gap-2">
                      <h2 className="break-keep text-base font-bold text-white sm:text-lg">
                        외국계기업 지원센터
                      </h2>
                      <ArrowRight className="h-4 w-4 shrink-0 text-white/90 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <p className="break-keep text-xs leading-relaxed text-white/90 sm:text-sm">
                      노사관계·단체교섭과 HR Compliance 조사
                    </p>
                  </div>
                </Link>
              </div>
            ) : (slides[currentSlide] as { variant?: string }).variant === "diagnosis" ? (
              <>
                <Link href="/services/hr-risk-diagnosis#ordinary-wage" className="w-full sm:w-auto">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto text-base sm:text-lg font-semibold py-3 sm:py-4 px-6 sm:px-9">
                    <Calculator className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> 통상임금·평균임금 진단
                  </Button>
                </Link>
                <Link href="/services/hr-risk-diagnosis#safety" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="text-white border-white/80 hover:bg-white hover:text-black backdrop-blur-sm bg-white/10 w-full sm:w-auto text-base sm:text-lg font-semibold py-3 sm:py-4 px-6 sm:px-9">
                    <ShieldCheck className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> 산업안전 진단
                  </Button>
                </Link>
                <Link href="/services/hr-risk-diagnosis#freelancer" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="text-white border-white/80 hover:bg-white hover:text-black backdrop-blur-sm bg-white/10 w-full sm:w-auto text-base sm:text-lg font-semibold py-3 sm:py-4 px-6 sm:px-9">
                    <UserCheck className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> 프리랜서 진단
                  </Button>
                </Link>
              </>
            ) : (slides[currentSlide] as { variant?: string }).variant === "consulting" ? (
              <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-md sm:max-w-2xl mx-auto">
                <Link href="/services/freelancer#presumption" className="w-full">
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm md:text-base font-semibold py-3 h-auto min-h-[3rem] whitespace-normal leading-tight">
                    <Scale className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0" /> 근로자 추정제 관련 컨설팅
                  </Button>
                </Link>
                <Link href="/services/workplace-harassment" className="w-full">
                  <Button variant="outline" size="lg" className="w-full text-white border-white/80 hover:bg-white hover:text-black backdrop-blur-sm bg-white/10 text-xs sm:text-sm md:text-base font-semibold py-3 h-auto min-h-[3rem] whitespace-normal leading-tight">
                    <MessageCircle className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0" /> 직장 내 괴롭힘 조사
                  </Button>
                </Link>
                <Link href="/services/payroll-system#pogwal" className="w-full">
                  <Button variant="outline" size="lg" className="w-full text-white border-white/80 hover:bg-white hover:text-black backdrop-blur-sm bg-white/10 text-xs sm:text-sm md:text-base font-semibold py-3 h-auto min-h-[3rem] whitespace-normal leading-tight">
                    <Clock className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0" /> 포괄임금 관련 컨설팅
                  </Button>
                </Link>
                <Link href="/services/payroll-system#peak" className="w-full">
                  <Button variant="outline" size="lg" className="w-full text-white border-white/80 hover:bg-white hover:text-black backdrop-blur-sm bg-white/10 text-xs sm:text-sm md:text-base font-semibold py-3 h-auto min-h-[3rem] whitespace-normal leading-tight">
                    <TrendingDown className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0" /> 임금피크제 관련 컨설팅
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto text-base sm:text-lg font-semibold py-3 sm:py-4 px-6 sm:px-9">
                    {t('quickConsultation')} <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </Link>
                <Link href="/services" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="text-white border-white/80 hover:bg-white hover:text-black backdrop-blur-sm bg-white/10 w-full sm:w-auto text-base sm:text-lg font-semibold py-3 sm:py-4 px-6 sm:px-9">
                    {t('browseServices')}
                  </Button>
                </Link>
                <Button
                  onClick={() => setShowVideo(true)}
                  variant="outline"
                  size="lg"
                  className="text-white border-white/80 hover:bg-white hover:text-black backdrop-blur-sm bg-white/10 w-full sm:w-auto text-base sm:text-lg font-semibold py-3 sm:py-4 px-6 sm:px-9"
                >
                  <PlayCircle className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> FAIR CRM 제안서
                </Button>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* 네비게이션 버튼 */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all duration-300 hover:scale-110 border border-white/20"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all duration-300 hover:scale-110 border border-white/20"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* 인디케이터 */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2 sm:space-x-3 bg-black/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1 sm:py-2 border border-white/20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-500 ${
              index === currentSlide ? 'bg-primary scale-125' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* FAIR CRM 제안서 동영상 모달 */}
      {showVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              aria-label="닫기"
              className="absolute -top-11 right-0 text-white/90 hover:text-white transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <iframe
              id="fair-crm-video"
              className="w-full h-full rounded-lg shadow-2xl"
              src="https://www.youtube.com/embed/q4NwtfZE3Fk?autoplay=1&rel=0&cc_load_policy=0&enablejsapi=1"
              title="FAIR CRM 제안서"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  )
}
