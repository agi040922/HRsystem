"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight, PlayCircle, X } from "lucide-react"
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
      src: "/crm/dashboard-overview.png",
      topLeft: { title: t('slide1.title'), subtitle: t('slide1.subtitle') },
      bottomRight: { text: t('slide1.text'), highlight: t('slide1.highlight') }
    },
    {
      type: "image",
      src: "/crm/advisory-history.png",
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
      src: "/crm/diagnosis-report.png",
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
    <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh] w-full overflow-hidden">
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
      <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 z-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
          className="max-w-sm bg-black/30 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-white/20"
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
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white leading-tight mb-2 whitespace-nowrap">
              {slides[currentSlide].topLeft.title}
            </h2>
            {slides[currentSlide].bottomRight.text && (
              <p className="text-sm md:text-base text-white mb-1 whitespace-nowrap">
                {slides[currentSlide].bottomRight.text}
              </p>
            )}
            {slides[currentSlide].bottomRight.highlight && (
              <p className="text-base md:text-lg font-semibold text-white whitespace-nowrap">
                {slides[currentSlide].bottomRight.highlight}
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* 모바일용 상단 슬라이드 텍스트 */}
      <div className="lg:hidden absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-md">
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
            <h2 className="text-sm sm:text-base font-bold text-white leading-tight mb-1 whitespace-nowrap">
              {slides[currentSlide].topLeft.title}
            </h2>
            {slides[currentSlide].bottomRight.highlight && (
              <p className="text-xs sm:text-sm font-medium text-white/90 whitespace-nowrap">
                {slides[currentSlide].bottomRight.highlight}
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* 중앙 메인 콘텐츠 */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="container-fluid text-center max-w-4xl px-4 pt-28 sm:pt-24 md:pt-16 lg:pt-0">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-2 sm:gap-3 sm:flex-row justify-center items-center"
          >
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto text-sm sm:text-base font-semibold py-2.5 sm:py-3 px-5 sm:px-7">
                {t('quickConsultation')} <ArrowRight className="ml-1.5 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <Link href="/services" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="text-white border-white/80 hover:bg-white hover:text-black backdrop-blur-sm bg-white/10 w-full sm:w-auto text-sm sm:text-base font-semibold py-2.5 sm:py-3 px-5 sm:px-7">
                {t('browseServices')}
              </Button>
            </Link>
            <Button
              onClick={() => setShowVideo(true)}
              variant="outline"
              size="lg"
              className="text-white border-white/80 hover:bg-white hover:text-black backdrop-blur-sm bg-white/10 w-full sm:w-auto text-sm sm:text-base font-semibold py-2.5 sm:py-3 px-5 sm:px-7"
            >
              <PlayCircle className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" /> FAIR CRM 제안서
            </Button>
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
              className="w-full h-full rounded-lg shadow-2xl"
              src="https://www.youtube.com/embed/q4NwtfZE3Fk?autoplay=1&rel=0&cc_load_policy=0&cc_lang_pref=none"
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
