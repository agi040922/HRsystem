"use client"

import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useTranslations } from 'next-intl'

// HeroSection 컴포넌트 - 캐러셀 버전
export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const t = useTranslations('hero')

  const slides = [
    {
      type: "image",
      src: "/crm/diagnosis-report.png",
      variant: "diagnosis",
      topLeft: { title: t('slide1.title'), subtitle: t('slide1.subtitle') },
      bottomRight: { text: t('slide1.text'), highlight: t('slide1.highlight') }
    },
    {
      type: "image",
      src: "/crm/dashboard-overview.png",
      topLeft: { title: t('slide1.title'), subtitle: t('slide1.subtitle') },
      bottomRight: { text: t('slide1.text'), highlight: t('slide1.highlight') }
    },
    {
      type: "image",
      src: "/crm/advisory-history.png",
      variant: "consulting",
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
            className="text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-2 sm:mb-3 md:mb-4 leading-tight"
          >
            {t('partner')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6, ease: "easeOut" }}
            className="text-white text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-5 md:mb-7 leading-relaxed"
          >
            {t('description')}
          </motion.p>
          {/* 두 축으로 들어가는 입구 — 슬라이드가 바뀌어도 고정이다.
              (진단·컨설팅 버튼은 대문 바로 아래 QuickLinksSection 으로 옮겼다) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.8, ease: "easeOut" }}
            className="mx-auto grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
          >
            <Link href="/hr-tech" className="group block">
              <div className="h-full rounded-2xl border border-white/30 bg-white/10 p-5 text-left backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-white/20 sm:p-6">
                <div className="mb-1.5 flex items-center gap-2">
                  <h2 className="break-keep text-base font-bold text-white sm:text-lg">
                    HR테크 지원센터
                  </h2>
                  <ArrowRight className="h-4 w-4 shrink-0 text-white/80 transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="break-keep text-xs leading-relaxed text-white/85 sm:text-sm">
                  FAIR CRM과 자회사 플러스 티 에이아이
                </p>
              </div>
            </Link>
            <Link href="/global-companies" className="group block">
              <div className="h-full rounded-2xl border border-white/30 bg-white/10 p-5 text-left backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-white/20 sm:p-6">
                <div className="mb-1.5 flex items-center gap-2">
                  <h2 className="break-keep text-base font-bold text-white sm:text-lg">
                    외국계기업 지원센터
                  </h2>
                  <ArrowRight className="h-4 w-4 shrink-0 text-white/80 transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="break-keep text-xs leading-relaxed text-white/85 sm:text-sm">
                  노사관계·단체교섭과 HR Compliance 조사
                </p>
              </div>
            </Link>
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

    </section>
  )
}
