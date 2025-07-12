"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

import { Briefcase, FileText, Users, ArrowRight, Play, Calculator, AlertTriangle, ClipboardCheck, Scale, MessageSquare, Award, Shield, TrendingUp, ChevronLeft, ChevronRight, BookOpen, Download, Globe, Calendar } from "lucide-react"
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
    },
    {
      type: "image",
      src: "/0706/KakaoTalk_20250703_205426353.jpg",
      topLeft: {
        title: "스마트 노무 도구",
        subtitle: "AI 기반 솔루션"
      },
      bottomRight: {
        text: "복잡한 노무업무를 간단하게",
        highlight: "24시간 즉시 해결"
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
    <section className="relative h-[75vh] w-full overflow-hidden">
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
          <div className="absolute top-6 right-6 z-20 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
            <span className="text-white text-sm font-medium">
              {currentSlide + 1} / {slides.length}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 왼쪽 슬라이드 텍스트 상자 */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20">
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
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white leading-tight mb-3">
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

      {/* 중앙 메인 콘텐츠 */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="container-fluid text-center max-w-4xl px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4, ease: "easeOut" }}
            className="text-2xl font-bold tracking-tighter text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 md:mb-6 leading-tight"
          >
            당신의 든든한 파트너
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6, ease: "easeOut" }}
            className="max-w-[90%] sm:max-w-[600px] mx-auto text-white text-sm sm:text-base md:text-lg mb-6 md:mb-8 leading-relaxed"
          >
            FAIR인사노무컨설팅이 전문적인 상담으로 최적의 솔루션을 제공합니다.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-3 sm:flex-row justify-center items-center"
          >
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
                빠른 상담 신청 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="text-white border-white/80 hover:bg-white hover:text-black backdrop-blur-sm bg-white/10 w-full sm:w-auto">
                서비스 둘러보기
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 네비게이션 버튼 */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all duration-300 hover:scale-110 border border-white/20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all duration-300 hover:scale-110 border border-white/20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* 인디케이터 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-3 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              index === currentSlide ? 'bg-primary scale-125' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

// 회사 소개 섹션
function CompanyIntroSection() {
  const strengths = [
    {
      icon: Award,
      title: "200건+ 압도적 승소율",
      description: "노동위원회, 행정심판, 산재사건 등에서 뛰어난 성과",
      highlight: "200건+"
    },
    {
      icon: TrendingUp,
      title: "2005년 설립, 26년차 경험",
      description: "국내외 100여 업체의 신뢰받는 파트너",
      highlight: "26년차"
    },
    {
      icon: Shield,
      title: "김&장 출신 전문성",
      description: "기업 자문 및 컨설팅 경험 20년 이상",
      highlight: "전문성"
    }
  ]

  return (
    <section className="w-full py-16 bg-slate-50">
      <div className="container-fluid max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-primary">FAIR인사노무컨설팅</span>을 선택하는 이유
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            치밀한 논리와 철저한 준비로 고객의 성공을 이끌어온 26년의 경험
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {strengths.map((strength, index) => (
            <motion.div
              key={strength.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full text-center hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-4 rounded-full bg-primary/10">
                      <strength.icon className="w-10 h-10 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary">{strength.highlight}</div>
                    <h3 className="font-semibold text-xl text-gray-900">{strength.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{strength.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            영상으로 만나는 FAIR인사노무컨설팅
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            2005년 설립 이후 기업자문에 컨설팅 개념을 도입하여 새로운 지평을 열었습니다.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=example"
              title="FAIR인사노무컨설팅 회사 소개"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// 노무 도구 섹션
function ToolsSection() {
  const laborTools = [
    {
      icon: ClipboardCheck,
      title: "근로계약서 작성",
      description: "법적 요건을 만족하는 계약서 간편 작성",
      href: "/tools/contract-generator/create",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: AlertTriangle,
      title: "해고 가능성 진단",
      description: "해고 타당성과 절차 적법성 사전 진단",
      href: "/tools/dismissal-checker",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: Calculator,
      title: "퇴직금 계산기",
      description: "정확한 퇴직금 및 각종 수당 계산",
      href: "/tools/severance-calculator",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Scale,
      title: "근로시간 진단",
      description: "근로기준법 준수 여부 점검",
      href: "/tools/working-time-checker",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: MessageSquare,
      title: "AI 노무 상담",
      description: "24시간 AI 챗봇 즉시 상담",
      href: "/tools/ai-consultation",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ]

  return (
    <section className="w-full py-16 bg-white">
      <div className="container-fluid max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            스마트 노무 도구
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            전문가가 개발한 도구로 클릭 몇 번으로 전문가 수준의 결과물을 만들어보세요.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto mb-8">
          {laborTools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link href={tool.href}>
                <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer border-0 shadow-md bg-white">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className={`p-4 rounded-xl ${tool.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                        <tool.icon className={`w-8 h-8 ${tool.color}`} />
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-semibold text-base group-hover:text-primary transition-colors leading-tight">
                          {tool.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-muted-foreground">
            복잡한 사안은 
            <Link href="/contact" className="text-primary hover:underline font-medium mx-1">
              전문가 상담
            </Link>
            을 이용해보세요
          </p>
        </motion.div>
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
      <Card className="hover:shadow-lg transition-all duration-300 h-full flex flex-col group cursor-pointer bg-white shadow-sm">
        <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
          {newsletter.cover_image_url ? (
            <img
              src={newsletter.cover_image_url}
              alt={newsletter.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-700 to-blue-600 flex items-center justify-center relative">
              <div className="text-center p-3">
                <BookOpen className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-white font-bold text-xs line-clamp-2 leading-tight">
                  {newsletter.title}
                </div>
                <div className="text-white/80 text-xs mt-1">
                  {newsletter.language === 'ko' ? '한국어판' : 'English'}
                </div>
              </div>
              
              {/* 장식 패턴 */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full"></div>
                <div className="absolute top-4 right-3 w-1 h-1 bg-white rounded-full"></div>
                <div className="absolute bottom-3 left-4 w-1 h-1 bg-white rounded-full"></div>
                <div className="absolute bottom-2 right-2 w-1 h-1 bg-white rounded-full"></div>
                <div className="absolute top-1/2 left-1 w-1 h-1 bg-white rounded-full"></div>
                <div className="absolute top-1/3 right-1 w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium">
              {newsletter.language === 'ko' ? '한글' : 'ENG'}
              <Globe className="w-3 h-3 ml-1 inline" />
            </div>
          </div>
        </div>
        
        <CardContent className="flex-grow p-3">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(newsletter.published_date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long'
              })}
            </span>
          </div>
          
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {newsletter.title}
          </h3>
          
          {newsletter.description && (
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
              {newsletter.description}
            </p>
          )}
        </CardContent>
        
        <div className="p-3 pt-0 mt-auto">
          <Button 
            onClick={handleDownload}
            className="w-full group-hover:bg-primary/90 transition-colors"
            size="sm"
          >
            <Download className="w-3 h-3 mr-1" />
            다운로드
          </Button>
        </div>
      </Card>
    </motion.div>
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
      <ToolsSection />

      <section id="services-summary" className="w-full py-16 bg-slate-50">
        <div className="container-fluid max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="text-primary">해외기업 자문</span>의 전문가
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              국내외 100여 기업과 함께해온 경험으로, 글로벌 기업의 국내 진출과 운영을 성공적으로 지원합니다.
            </p>
          </motion.div>
          
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto mb-12">
            {services.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                성공적인 해외기업 자문 포트폴리오
              </h3>
              <p className="text-muted-foreground mb-6">
                다국적 기업의 국내 진출부터 현지 법인 운영까지, 다양한 케이스의 성공 사례를 확인해보세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services">
                  <Button size="lg" className="w-full sm:w-auto">
                    포트폴리오 보기
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    해외기업 자문 문의
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="latest-news" className="w-full py-16 bg-white">
        <div className="container-fluid max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">최신 소식 및 공지사항</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              노동 시장의 최신 동향과 FAIR인사노무컨설팅의 주요 소식을 가장 먼저 확인하세요.
            </p>
          </motion.div>
          
          {loading ? (
            <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {[1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse">
                  <Card className="h-full">
                    <CardHeader>
                      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-4 bg-slate-200 rounded"></div>
                        <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : featuredPosts.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-xl transition-shadow duration-300 h-full flex flex-col bg-white shadow-md">
                    <CardHeader className="pb-3">
                      <Link href={`/board/${post.slug}`}>
                        <CardTitle className="text-lg hover:text-primary transition-colors leading-tight line-clamp-2">
                          {post.title}
                        </CardTitle>
                      </Link>
                      <CardDescription className="text-sm">
                        {new Date(post.published_at).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow pb-3">
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                    </CardContent>
                    <div className="p-6 pt-0 mt-auto">
                      <Link href={`/board/${post.slug}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          내용 보기
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">등록된 소식이 없습니다.</p>
            </div>
          )}
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link href="/board">
              <Button size="lg" className="w-full sm:w-auto">더 많은 소식 보기</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <NewsletterSection />

      <section id="contact-cta" className="w-full py-16 bg-slate-50">
        <div className="container-fluid max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              전문가의 도움이 필요하신가요?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              망설이지 말고 지금 바로 FAIR인사노무컨설팅에 문의하세요.
              <br />
              전화 상담:{" "}
              <a href="tel:02-1234-5678" className="text-primary hover:underline font-medium">
                02-1234-5678
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

      <section id="location-summary" className="w-full py-16 bg-white">
        <div className="container-fluid max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">오시는 길</h2>
            <p className="text-lg text-muted-foreground">
              편리한 교통과 쾌적한 환경에서 최고의 상담 서비스를 제공합니다.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-full max-w-6xl h-[400px] md:h-[500px] mb-6"
          >
            <KakaoMap
              latitude={37.5012743}
              longitude={127.039585}
              level={4}
              markerText="FAIR인사노무컨설팅 (역삼역 5번 출구 인근)"
              className="w-full h-full rounded-xl shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <div className="bg-slate-50 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-lg font-medium text-gray-900 mb-2">
                서울특별시 강남구 테헤란로 123, 4층
              </p>
              <p className="text-muted-foreground">
                지하철 2호선 역삼역 5번 출구 도보 5분
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
