"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

import { Briefcase, FileText, Users, ArrowRight, Play, X, Menu, Calculator, AlertTriangle, ClipboardCheck, Scale, MessageSquare, Award, Shield, TrendingUp } from "lucide-react"
import KakaoMap from "@/components/kakao-map"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

// HeroSection 컴포넌트
function HeroSection() {
  return (
    <section className="relative h-[calc(100vh-4rem)] w-full overflow-hidden flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
        영상을 지원하지 않는 브라우저입니다.
      </video>
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="relative z-20 container-fluid text-center max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl font-bold tracking-tighter text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-4 md:mb-6 leading-tight"
        >
          노무 문제, 명쾌한 해결
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-[90%] sm:max-w-[700px] mx-auto text-slate-200 text-sm sm:text-base md:text-lg lg:text-xl mb-6 md:mb-8 leading-relaxed px-4"
        >
          FAIR인사노무컨설팅이 당신의 든든한 파트너가 되어 드리겠습니다.
          <br className="hidden sm:block" />
          전문적인 상담으로 최적의 솔루션을 만나보세요.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col gap-3 sm:flex-row justify-center items-center px-4"
        >
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
              빠른 상담 신청 <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
          <Link href="/services">
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-black w-full sm:w-auto">
              서비스 둘러보기
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// CompanyStrengthSection 컴포넌트 - 회사 강점 섹션 추가
function CompanyStrengthSection() {
  const strengths = [
    {
      icon: Award,
      title: "200건+ 압도적 승소율",
      description: "노동위원회, 행정심판, 산재사건 등에서 뛰어난 성과",
      highlight: "200건+"
    },
    {
      icon: TrendingUp,
      title: "2005년 설립, 19년 경험",
      description: "국내외 100여 업체의 신뢰받는 파트너",
      highlight: "19년"
    },
    {
      icon: Shield,
      title: "김&장 출신 전문성",
      description: "대표 정광일, 연세대 MBA, 제8회 공인노무사",
      highlight: "전문성"
    }
  ]

  return (
    <section className="w-full py-12 md:py-16 bg-gradient-to-br from-blue-50 to-slate-50">
      <div className="container-fluid max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full text-sm text-primary font-medium mb-3">
            <span>🏆</span>
            신뢰받는 이유
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            <span className="text-primary">FAIR인사노무컨설팅</span>을 선택하는 이유
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            치밀한 논리와 철저한 준비로 고객의 성공을 이끌어온 19년의 경험
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {strengths.map((strength, index) => (
            <motion.div
              key={strength.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full text-center hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <strength.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-primary">{strength.highlight}</div>
                    <h3 className="font-semibold text-lg text-gray-900">{strength.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{strength.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ToolsSection 컴포넌트 - 노무 업무 도구 그리드
function ToolsSection() {
  const laborTools = [
    {
      icon: ClipboardCheck,
      title: "근로계약서 작성",
      description: "법적 요건을 만족하는 계약서 간편 작성",
      href: "/tools/contract-generator/create",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      badge: "인기"
    },
    {
      icon: AlertTriangle,
      title: "해고 가능성 진단",
      description: "해고 타당성과 절차 적법성 사전 진단",
      href: "/tools/dismissal-checker",
      color: "text-red-600",
      bgColor: "bg-red-50",
      badge: "정확"
    },
    {
      icon: Calculator,
      title: "퇴직금 계산기",
      description: "정확한 퇴직금 및 각종 수당 계산",
      href: "/tools/severance-calculator",
      color: "text-green-600",
      bgColor: "bg-green-50",
      badge: "즉시"
    },
    {
      icon: Scale,
      title: "근로시간 진단",
      description: "근로기준법 준수 여부 점검",
      href: "/tools/working-time-checker",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      badge: "법적"
    },
    {
      icon: MessageSquare,
      title: "AI 노무 상담",
      description: "24시간 AI 챗봇 즉시 상담",
      href: "/tools/ai-consultation",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      badge: "24H"
    }
  ]

  return (
    <section className="w-full py-8 md:py-12 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container-fluid max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full text-sm text-primary font-medium mb-3">
            <span>🛠️</span>
            스마트 노무 도구
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            복잡한 노무업무를 <span className="text-primary">간단하게</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            전문가가 개발한 도구로 클릭 몇 번으로 전문가 수준의 결과물을 만들어보세요.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 max-w-6xl mx-auto">
          {laborTools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link href={tool.href}>
                <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="relative">
                        <div className={`p-3 rounded-xl ${tool.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                          <tool.icon className={`w-7 h-7 ${tool.color}`} />
                        </div>
                        <span className="absolute -top-1 -right-1 text-xs font-medium bg-primary text-white px-1.5 py-0.5 rounded-full">
                          {tool.badge}
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="font-semibold text-sm md:text-base group-hover:text-primary transition-colors leading-tight">
                          {tool.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
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
          className="text-center mt-6 md:mt-8"
        >
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span>💡</span>
            복잡한 사안은 
            <Link href="/contact" className="text-primary hover:underline font-medium ml-1">
              전문가 상담
            </Link>
            을 이용해보세요
          </div>
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

// FloatingSidebar 컴포넌트
function FloatingSidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed top-1/2 right-4 z-40 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors ${isOpen ? 'hidden' : 'block'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <Menu className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 z-50"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">빠른 메뉴</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                <div className="space-y-3">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <Button className="w-full justify-start" variant="outline">
                      📞 전화 상담 신청
                    </Button>
                  </Link>
                  <Link href="/services" onClick={() => setIsOpen(false)}>
                    <Button className="w-full justify-start" variant="outline">
                      💼 전체 서비스 보기
                    </Button>
                  </Link>
                  <Link href="/board" onClick={() => setIsOpen(false)}>
                    <Button className="w-full justify-start" variant="outline">
                      📰 최신 소식 보기
                    </Button>
                  </Link>
                  <Link href="/qna" onClick={() => setIsOpen(false)}>
                    <Button className="w-full justify-start" variant="outline">
                      ❓ 자주묻는질문
                    </Button>
                  </Link>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20"
                >
                  <h4 className="font-medium text-primary mb-2">긴급 상담이 필요하세요?</h4>
                  <p className="text-xs text-gray-600 mb-3">
                    업무시간: 평일 09:00~18:00
                  </p>
                  <a href="tel:02-1234-5678">
                    <Button size="sm" className="w-full" onClick={() => setIsOpen(false)}>
                      📞 02-1234-5678
                    </Button>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default function HomePage() {
  const services = [
    {
      icon: Briefcase,
      title: "노동법 자문",
      description: "기업 운영에 필요한 노동법률 전반에 대한 자문 서비스 제공",
      href: "/services#labor-consulting",
    },
    {
      icon: FileText,
      title: "급여 아웃소싱",
      description: "정확하고 효율적인 급여 관리 및 4대보험 업무 대행",
      href: "/services#payroll",
    },
    {
      icon: Users,
      title: "인사노무 컨설팅",
      description: "채용부터 퇴직까지 인사관리 시스템 구축 및 전문 컨설팅",
      href: "/services#hr-consulting",
    },
  ]

  const latestPosts = [
    { id: 1, title: "2025년 최저임금 확정 및 주요 변경사항 안내", date: "2025-05-20", href: "/board/1" },
    { id: 2, title: "직장 내 괴롭힘 예방 교육, 이렇게 준비하세요!", date: "2025-05-15", href: "/board/2" },
    { id: 3, title: "주 52시간 근무제 개편안 상세 분석 및 대응 전략", date: "2025-05-10", href: "/board/3" },
  ]

  return (
    <>
      <HeroSection />
      <CompanyStrengthSection />
      <ToolsSection />
      <FloatingSidebar />

      <section id="company-video" className="w-full py-12 md:py-16 lg:py-24 xl:py-32">
        <div className="container-fluid max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12"
          >
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
              회사 소개
            </div>
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl px-4">
              영상으로 만나는 FAIR인사노무컨설팅
            </h2>
            <p className="max-w-[90%] sm:max-w-[900px] text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed px-4">
              2005년 설립 이후 기업자문에 컨설팅 개념을 도입하여 새로운 지평을 열었습니다.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto px-4"
          >
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl group">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=example"
                title="FAIR인사노무컨설팅 회사 소개"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <Play className="w-16 h-16 text-white/80" />
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center mt-6 md:mt-8"
            >
              <Card className="inline-block bg-primary/5 border-primary/20">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center gap-3 justify-center">
                    <Play className="w-5 h-5 text-primary" />
                    <p className="text-sm md:text-base text-muted-foreground">
                      "법률지식을 넘어 문제를 해결할 수 있는 전략을 제공합니다"
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="services-summary" className="w-full py-12 md:py-16 lg:py-24 xl:py-32 bg-slate-50">
        <div className="container-fluid max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12"
          >
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
              핵심 서비스
            </div>
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl px-4">
              전문 노무 솔루션으로 함께합니다
            </h2>
            <p className="max-w-[90%] sm:max-w-[900px] text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed px-4">
              FAIR인사노무컨설팅은 기업과 개인 모두를 위한 다양한 전문 서비스를 제공하여, 복잡한 노무 문제를 명쾌하게
              해결해 드립니다.
            </p>
          </motion.div>
          <div className="grid gap-4 md:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="latest-news" className="w-full py-12 md:py-16 lg:py-24 xl:py-32 bg-slate-50">
        <div className="container-fluid max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl px-4">최신 소식 및 공지사항</h2>
            <p className="max-w-[90%] sm:max-w-[900px] text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed px-4">
              노동 시장의 최신 동향과 FAIR인사노무컨설팅의 주요 소식을 가장 먼저 확인하세요.
            </p>
          </motion.div>
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto">
            {latestPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <CardHeader>
                    <Link href={post.href}>
                      <CardTitle className="text-base sm:text-lg hover:text-primary transition-colors leading-tight">{post.title}</CardTitle>
                    </Link>
                    <CardDescription className="text-sm">{post.date}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto">
                    <Link href={post.href}>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        내용 보기
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-8 md:mt-12 px-4"
          >
            <Link href="/board">
              <Button size="lg" className="w-full sm:w-auto">더 많은 소식 보기</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section id="contact-cta" className="w-full py-12 md:py-16 lg:py-24 xl:py-32 bg-primary/5">
        <div className="container-fluid grid items-center justify-center gap-4 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-3 px-4"
          >
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl leading-tight">전문가의 도움이 필요하신가요?</h2>
            <p className="mx-auto max-w-[90%] sm:max-w-[600px] text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              망설이지 말고 지금 바로 FAIR인사노무컨설팅에 문의하세요.
              <br className="hidden sm:block" />
              전화 상담:{" "}
              <a href="tel:02-1234-5678" className="text-primary hover:underline font-medium">
                02-1234-5678
              </a>
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto w-full max-w-sm space-y-2 px-4"
          >
            <Link href="/contact">
              <Button size="lg" className="w-full">
                온라인 상담 바로가기
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section id="location-summary" className="w-full py-12 md:py-16 lg:py-24 xl:py-32 border-t">
        <div className="container-fluid max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl px-4">오시는 길</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-full max-w-5xl h-[300px] sm:h-[400px] md:h-[500px] px-4"
          >
            <KakaoMap
              latitude={37.5012743}
              longitude={127.039585}
              level={4}
              markerText="FAIR인사노무컨설팅 (역삼역 5번 출구 인근)"
              className="w-full h-full rounded-lg"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-4 md:mt-6 text-muted-foreground text-sm sm:text-base px-4"
          >
            서울특별시 강남구 테헤란로 123, 4층 (역삼역 5번 출구 도보 5분)
          </motion.p>
        </div>
      </section>
    </>
  )
}
