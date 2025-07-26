"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

import { Briefcase, FileText, Users, ArrowRight, Play, MessageSquare, Award, Shield, TrendingUp, ChevronLeft, ChevronRight, BookOpen, Download, Globe, Calendar } from "lucide-react"
import KakaoMap from "@/components/kakao-map"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { getFeaturedPosts } from "@/lib/board"
import { getLatestNewsletters } from "@/lib/newsletter"
import type { BoardPost } from "@/lib/supabase"
import type { Newsletter } from "@/lib/newsletter"

// HeroSection 컴포넌트 - 캐러셀 버전
function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      type: "video",
      src: "/videos/hero-bg.mp4",
      topLeft: {
        title: "노무 문제, 명쾌한 해결",
        subtitle: "FAIR인사노무컨설팅"
      },
      bottomRight: {
        text: "전문적인 상담으로 최적의 솔루션을",
        highlight: "26년차 베테랑 노무사의 전문성"
      }
    },
    {
      type: "image",
      src: "/0706/KakaoTalk_20250703_205419523.jpg",
      topLeft: {
        title: "200건 이상 수행한 사건의 압도적 승소율",
        subtitle: "검증된 실력"
      },
      bottomRight: {
        text: "노동위원회, 행정심판에서",
        highlight: "뛰어난 성과 달성"
      }
    },
    {
      type: "image", 
      src: "/0706/KakaoTalk_20250703_205422678.jpg",
      topLeft: {
        title: "김&장 출신의 전문성",
        subtitle: ""
      },
      bottomRight: {
        text: "",
        highlight: "최고 수준의 전문성"
      }
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 7000)
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
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 z-0 w-full h-full object-cover"
            >
              <source src={slides[currentSlide].src} type="video/mp4" />
              영상을 지원하지 않는 브라우저입니다.
            </video>
          ) : (
            <img
              src={slides[currentSlide].src}
              alt="Hero background"
              className="absolute inset-0 z-0 w-full h-full object-cover"
            />
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
            className="text-sm font-bold tracking-tighter text-white sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-1 sm:mb-2 md:mb-3 leading-tight"
          >
            당신의 든든한 파트너
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6, ease: "easeOut" }}
            className="text-white text-xs sm:text-sm md:text-base mb-1.5 sm:mb-2 md:mb-3 leading-relaxed whitespace-nowrap"
          >
            FAIR인사노무컨설팅이 전문적인 상담으로 최적의 솔루션을 제공합니다.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-1 sm:gap-1.5 md:gap-2 sm:flex-row justify-center items-center"
          >
            <Link href="/contact">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto md:size-lg text-xs py-1 sm:py-1.5 md:py-2 px-3 sm:px-4">
                빠른 상담 신청 <ArrowRight className="ml-1 h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="sm" className="text-white border-white/80 hover:bg-white hover:text-black backdrop-blur-sm bg-white/10 w-full sm:w-auto md:size-lg text-xs py-1 sm:py-1.5 md:py-2 px-3 sm:px-4">
                서비스 둘러보기
              </Button>
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

// 회사 소개 섹션 - 3분할 인터랙티브 디자인
function CompanyIntroSection() {
  const companyCards = [
    {
      title: "200건+ 압도적 승소율",
      subtitle: "검증된 실력",
      description: "노동위원회, 행정심판, 산재사건 등에서 뛰어난 성과를 달성했습니다.",
      image: "/1.png",
      bgColor: "from-blue-900 to-blue-700"
    },
    {
      title: "2005년 설립, 26년차 경험",
      subtitle: "신뢰받는 파트너",
      description: "국내외 100여 업체의 신뢰받는 파트너로서 최적의 솔루션을 제공합니다.",
      image: "/2.png",
      bgColor: "from-slate-900 to-slate-700"
    },
    {
      title: "김&장 출신 전문성",
      subtitle: "최고 수준의 노하우",
      description: "기업 자문 및 컨설팅 경험 20년 이상의 전문성을 바탕으로 합니다.",
      image: "/3.png", 
      bgColor: "from-primary to-primary/80"
    }
  ]

  return (
    <section className="w-full bg-slate-50 overflow-hidden">
      {/* 헤더 */}
      <div className="text-center py-6 sm:py-8 md:py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-primary">FAIR인사노무컨설팅</span>을 선택하는 이유
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            치밀한 논리와 철저한 준비로 고객의 성공을 이끌어온 26년의 경험
          </p>
        </motion.div>
      </div>

      {/* 3분할 카드 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-3 min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
        {companyCards.map((card, index) => (
            <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="group relative overflow-hidden cursor-pointer"
          >
            {/* 배경 이미지 */}
            <div className="absolute inset-0">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* 그라디언트 오버레이 */}
              <div className={`absolute inset-0 bg-gradient-to-t ${card.bgColor} opacity-80 group-hover:opacity-90 transition-opacity duration-500`}></div>
        </div>

            {/* 콘텐츠 */}
            <div className="relative h-full flex flex-col justify-end p-4 sm:p-6 md:p-8 text-white">
              {/* 기본 제목 (항상 보임) */}
              <div className="transform transition-all duration-500">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 leading-tight">
                  {card.title}
          </h3>
                                  <p className="text-sm sm:text-base opacity-90 mb-4">
                  {card.subtitle}
                </p>
          </div>

              {/* 호버 시 나타나는 상세 내용 */}
              <div className="transform transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                <div className="border-t border-white/20 pt-4">
                  <p className="text-sm leading-relaxed opacity-90">
                    {card.description}
                  </p>
                </div>
                      </div>
                      
              {/* 호버 인디케이터 */}
              <div className="absolute top-8 right-8 w-12 h-12 border border-white/30 rounded-full flex items-center justify-center
                           transform transition-all duration-500 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100">
                <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>

            {/* 하단 액센트 라인 */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-500 group-hover:w-full"></div>
            </motion.div>
          ))}
      </div>
    </section>
  )
}

// ServiceCard 컴포넌트
interface ServiceCardProps {
  icon: React.ElementType
  title: string
  description: string
  href: string
  index: number
}

function ServiceCard({ icon: Icon, title, description, href, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Icon className="w-10 h-10 text-primary" />
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className="mb-4 text-base">{description}</CardDescription>
        </CardContent>
        <div className="p-6 pt-0 mt-auto">
          <Link href={href}>
            <Button variant="ghost" className="text-primary hover:text-primary/80 p-0">
              자세히 보기 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  )
}

// NewsletterCard 컴포넌트
interface NewsletterCardProps {
  newsletter: Newsletter
  index: number
}

function NewsletterCard({ newsletter, index }: NewsletterCardProps) {
  const handleDownload = () => {
    window.open(newsletter.file_url, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="hover:shadow-md transition-all duration-300 h-full flex flex-col group cursor-pointer bg-white shadow-sm">
        {/* 모바일에서는 이미지 숨김, 데스크톱에서는 표시 */}
        <div className="hidden sm:block aspect-[3/2] relative overflow-hidden rounded-t-lg">
          {newsletter.cover_image_url ? (
            <img
              src={newsletter.cover_image_url}
              alt={newsletter.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-700 to-blue-600 flex items-center justify-center relative">
              <div className="text-center p-1.5">
                <BookOpen className="w-3 h-3 text-white mx-auto mb-0.5" />
                <div className="text-white font-medium text-xs line-clamp-1 leading-tight">
                  {newsletter.title}
                </div>
              </div>
            </div>
          )}
          <div className="absolute top-0.5 right-0.5">
            <div className="bg-white/90 backdrop-blur-sm rounded px-1 py-0.5 text-xs font-medium">
              {newsletter.language === 'ko' ? '한글' : 'ENG'}
            </div>
          </div>
        </div>
        
        <CardContent className="flex-grow p-2 sm:p-1.5">
          {/* 모바일: 언어 태그와 제목만, 데스크톱: 날짜도 포함 */}
          <div className="sm:hidden flex items-center justify-between mb-1">
            <div className="bg-primary/10 text-primary rounded px-1.5 py-0.5 text-xs font-medium">
              {newsletter.language === 'ko' ? '한글' : 'ENG'}
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-0.5 mb-0.5">
            <Calendar className="w-2.5 h-2.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(newsletter.published_date).toLocaleDateString('ko-KR', {
                year: '2-digit',
                month: 'short'
              })}
            </span>
          </div>
          
          <h3 className="font-medium text-sm sm:text-xs mb-1 sm:mb-0.5 line-clamp-1 group-hover:text-primary transition-colors">
            {newsletter.title}
          </h3>
        </CardContent>
        
        <div className="p-2 sm:p-1.5 pt-0">
          <Button 
            onClick={handleDownload}
            className="w-full text-xs py-1 sm:py-0.5 h-8 sm:h-6"
            size="sm"
            variant="outline"
          >
            <Download className="w-3 h-3 sm:w-2.5 sm:h-2.5 mr-1 sm:mr-0.5" />
            다운로드
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

// NewsletterGridContent 컴포넌트 - 그리드용
function NewsletterGridContent() {
  const [koreanNewsletters, setKoreanNewsletters] = useState<Newsletter[]>([])
  const [englishNewsletters, setEnglishNewsletters] = useState<Newsletter[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadNewsletters() {
      try {
        const { newsletters: allNewsletters } = await getLatestNewsletters(6)
        const korean = allNewsletters.filter(n => n.language === 'ko').slice(0, 3)
        const english = allNewsletters.filter(n => n.language === 'en').slice(0, 3)
        setKoreanNewsletters(korean)
        setEnglishNewsletters(english)
      } catch (error) {
        console.error('Failed to load newsletters:', error)
      } finally {
        setLoading(false)
      }
    }

    loadNewsletters()
  }, [])

  const NewsletterRow = ({ newsletters, title }: { newsletters: Newsletter[], title: string }) => (
    <div className="mb-8">
      <h4 className="text-lg font-bold text-gray-900 mb-4">
        {title}
      </h4>
      
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="animate-pulse py-2 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-3 bg-slate-200 rounded w-3/4 mb-1"></div>
                  <div className="h-2 bg-slate-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : newsletters.length > 0 ? (
        <div className="space-y-3">
          {newsletters.map((newsletter, index) => (
            <motion.div
              key={newsletter.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="group py-2 border-b border-gray-100 hover:border-primary/30 transition-colors cursor-pointer"
                   onClick={() => window.open(newsletter.file_url, '_blank')}>
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors duration-200 line-clamp-1 flex-1 mr-4">
                    {newsletter.title}
                  </h5>
                  <div className="text-xs text-gray-500 whitespace-nowrap">
                    {new Date(newsletter.published_date).toLocaleDateString('ko-KR', {
                      year: '2-digit',
                      month: '2-digit',
                      day: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 text-xs">아직 발행된 주간지가 없습니다.</p>
        </div>
      )}
    </div>
  )

  return (
    <div>
      <NewsletterRow 
        newsletters={koreanNewsletters} 
        title="한국어판"
      />
      
      <NewsletterRow 
        newsletters={englishNewsletters} 
        title="영어판"
      />
    </div>
  )
}

// NewsletterSection 컴포넌트 - 언어별로 구분
function NewsletterSection() {
  const [koreanNewsletters, setKoreanNewsletters] = useState<Newsletter[]>([])
  const [englishNewsletters, setEnglishNewsletters] = useState<Newsletter[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadNewsletters() {
      try {
        const { newsletters: allNewsletters } = await getLatestNewsletters(8)
        const korean = allNewsletters.filter(n => n.language === 'ko').slice(0, 4)
        const english = allNewsletters.filter(n => n.language === 'en').slice(0, 4)
        setKoreanNewsletters(korean)
        setEnglishNewsletters(english)
      } catch (error) {
        console.error('Failed to load newsletters:', error)
      } finally {
        setLoading(false)
      }
    }

    loadNewsletters()
  }, [])

  const NewsletterRow = ({ newsletters, title, language }: { newsletters: Newsletter[], title: string, language: string }) => (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span className="text-primary">{title}</span>
          <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
            {language}
          </span>
        </h3>
        <div className="text-sm text-muted-foreground">
          {newsletters.length > 0 ? `${newsletters.length}개 발행` : '준비중'}
        </div>
      </div>
      
      {loading ? (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="animate-pulse">
              <Card className="h-full">
                <div className="aspect-[4/3] bg-slate-200 rounded-t-lg"></div>
                <CardContent className="p-3">
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : newsletters.length > 0 ? (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {newsletters.map((newsletter, index) => (
            <NewsletterCard key={newsletter.id} newsletter={newsletter} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-slate-50 rounded-lg">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">아직 발행된 주간지가 없습니다.</p>
        </div>
      )}
    </div>
  )

  return (
    <section className="w-full py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="container-fluid max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-primary">노동법</span> 주간지
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            매월 발행되는 전문 노동법 주간지를 무료로 다운로드하세요. 
            <br />
            한글판과 영어판을 모두 제공하여 해외 기업도 쉽게 활용할 수 있습니다.
          </p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <NewsletterRow 
              newsletters={koreanNewsletters} 
              title="한국어판" 
              language="Korean"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <NewsletterRow 
              newsletters={englishNewsletters} 
              title="영어판" 
              language="English"
            />
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              주간지 구독 및 맞춤 자료 문의
            </h3>
            <p className="text-muted-foreground mb-6">
              정기적인 주간지 구독을 원하시거나, 특정 주제에 대한 맞춤 자료가 필요하시다면 언제든 연락주세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  구독 및 자료 문의
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <BookOpen className="w-4 h-4 mr-2" />
                  전문 자료 둘러보기
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function HomePage() {
  const [featuredPosts, setFeaturedPosts] = useState<BoardPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFeaturedPosts() {
      try {
        const { posts } = await getFeaturedPosts(3)
        setFeaturedPosts(posts)
      } catch (error) {
        console.error('Failed to load featured posts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedPosts()
  }, [])

  const services = [
    {
      icon: Briefcase,
      title: "글로벌 기업 자문",
      description: "다국적 기업의 국내 진출 및 운영에 필요한 종합 노무 자문 서비스",
      href: "/services#global-consulting",
    },
    {
      icon: FileText,
      title: "해외 인력 파견",
      description: "국제 기업의 인력 파견 및 주재원 노무 관리 전문 서비스",
      href: "/services#overseas-dispatch",
    },
    {
      icon: Users,
      title: "국제 노무 컨설팅",
      description: "해외 진출 기업의 현지 노무 법규 준수 및 리스크 관리 컨설팅",
      href: "/services#international-consulting",
    },
  ]

  return (
    <>
      <HeroSection />
      <CompanyIntroSection />

      <section id="services-summary" className="w-full py-6 sm:py-8 md:py-12 bg-slate-50">
        <div className="container-fluid max-w-7xl px-4">
                      {/* 메인 헤더 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
              <span className="text-primary">200여 외국계 기업</span>이 선택한 전문가
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8">
              2000년부터 24년간 글로벌 기업들의 신뢰받는 파트너
            </p>
          </motion.div>

          {/* 간단한 통계 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center gap-8 mb-8"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">200+</div>
              <div className="text-sm text-gray-600">외국계 기업</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">24년</div>
              <div className="text-sm text-gray-600">전문 경험</div>
            </div>
          </motion.div>

          {/* 기업 로고 슬라이더 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                함께한 <span className="text-primary">글로벌 기업</span>들
              </h3>
              <p className="text-base text-gray-600">신뢰받는 파트너로 함께 성장해온 기업들</p>
            </div>
            
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 via-white to-blue-50 py-12 -mx-4 md:-mx-8 lg:-mx-16">
              <div className="flex animate-scroll px-8">
                {/* 첫 번째 세트 */}
                <div className="flex space-x-16 min-w-max">
                  <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <img 
                      src="/로고/마이크로소프트.png" 
                      alt="Microsoft" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <img 
                      src="/로고/GE.svg" 
                      alt="GE" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <img 
                      src="/로고/씨티뱅크.jpg" 
                      alt="Citibank" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <img 
                      src="/로고/GSK.jpg" 
                      alt="GSK" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <img 
                      src="/로고/YAMAHA.jpeg" 
                      alt="YAMAHA" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <img 
                      src="/로고/DHLEXPRESS.jpg" 
                      alt="DHL" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <img 
                      src="/로고/J&J.png" 
                      alt="Johnson & Johnson" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <img 
                      src="/로고/GUCCI.png" 
                      alt="GUCCI" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <img 
                      src="/로고/NovartisNovartis.jpg" 
                      alt="Novartis" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <img 
                      src="/로고/Kellogg.svg" 
                      alt="Kellogg" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <img 
                      src="/로고/NHK 서울지국.png" 
                      alt="NHK 서울지국" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                </div>
                
                {/* 두 번째 세트 (무한 스크롤용) */}
                <div className="flex space-x-16 min-w-max ml-16">
                  <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <img 
                      src="/로고/마이크로소프트.png" 
                      alt="Microsoft" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <img 
                      src="/로고/GE.svg" 
                      alt="GE" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <img 
                      src="/로고/씨티뱅크.jpg" 
                      alt="Citibank" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <img 
                      src="/로고/GSK.jpg" 
                      alt="GSK" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <img 
                      src="/로고/YAMAHA.jpeg" 
                      alt="YAMAHA" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <img 
                      src="/로고/DHLEXPRESS.jpg" 
                      alt="DHL" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <img 
                      src="/로고/J&J.png" 
                      alt="Johnson & Johnson" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <img 
                      src="/로고/GUCCI.png" 
                      alt="GUCCI" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <img 
                      src="/로고/NovartisNovartis.jpg" 
                      alt="Novartis" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <img 
                      src="/로고/Kellogg.svg" 
                      alt="Kellogg" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 통합된 공지사항 및 주간지 섹션 */}
      <section id="latest-news-and-newsletter" className="w-full py-6 sm:py-8 md:py-12 bg-white">
        <div className="container-fluid max-w-7xl px-4">
          
          {/* 1:1 그리드 레이아웃 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* 공지사항 영역 (1/2) */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    공지사항
                  </h3>
                  <div className="flex-1 ml-8">
                    <Link href="/board" className="text-sm text-gray-500 hover:text-primary transition-colors">
                      더보기 →
                    </Link>
                  </div>
                </div>
                
                {/* 구분선 */}
                <div className="w-full h-px bg-gray-200 mb-6"></div>
          
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <div key={n} className="animate-pulse flex items-center justify-between py-3">
                        <div className="flex-1">
                          <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : featuredPosts.length > 0 ? (
                  <div className="space-y-4">
                    {featuredPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Link href={`/board/${post.slug}`}>
                          <div className="group py-3 border-b border-gray-100 hover:border-primary/30 transition-colors">
                            <div className="flex items-center justify-between">
                              <h4 className="text-base font-medium text-gray-900 group-hover:text-primary transition-colors duration-200 line-clamp-1 flex-1 mr-4">
                                {post.title}
                              </h4>
                              <div className="text-sm text-gray-500 whitespace-nowrap">
                                {new Date(post.published_at).toLocaleDateString('ko-KR', {
                                  year: '2-digit',
                                  month: '2-digit',
                                  day: '2-digit'
                                })}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileText className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm">등록된 공지사항이 없습니다.</p>
                  </div>
                )}
              </motion.div>
            </div>
          
            {/* 주간지 영역 (1/2) */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    노동법 주간지
                  </h3>
                  <div className="flex-1 ml-8">
                    <Link href="/services" className="text-sm text-gray-500 hover:text-primary transition-colors">
                      더보기 →
                    </Link>
                  </div>
                </div>
                
                {/* 구분선 */}
                <div className="w-full h-px bg-gray-200 mb-6"></div>
                
                                 <NewsletterGridContent />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact-cta" className="w-full py-6 sm:py-8 md:py-12 bg-slate-50">
        <div className="container-fluid max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
              전문가의 도움이 필요하신가요?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8">
              망설이지 말고 지금 바로 FAIR인사노무컨설팅에 문의하세요.
              <br />
              전화 상담:{" "}
              <a href="tel:02-387-9869" className="text-primary hover:underline font-medium">
                02-387-9869
              </a>
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/contact">
                <Button size="lg" className="px-8 py-3">
                  온라인 상담 바로가기
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>


    </>
  )
}
