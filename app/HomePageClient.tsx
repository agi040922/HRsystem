"use client"

import HeroSection from "@/components/home/hero-section"
import WhyFairSection from "@/components/home/why-fair-section"
import AudienceSection from "@/components/home/audience-section"
import ServiceFinderSection from "@/components/home/service-finder-section"
import HomeNewsletterSection from "@/components/home/home-newsletter-section"
import CrmServicesSection from "@/components/home/crm-services-section"
import ProcessSection from "@/components/home/process-section"
import CompanyIntroSection from "@/components/home/company-intro-section"
import ClientsSection from "@/components/home/clients-section"
import CtaSection from "@/components/home/cta-section"

export default function NewHomePage() {
  return (
    <>
      <HeroSection />
      {/* 히어로 → "왜 FAIR인가"(회사 정체) → "어떤 상황이신가요"(상황별 스토리)
          → 서비스 바로가기 그리드(이미 아는 고객용 색인) 순.
          그리드는 원래 히어로 바로 뒤에 있었는데, 회사 설명보다 메뉴판이 먼저 나오는
          문제가 있어 지그재그 아래로 내렸다. 링크 중복은 의도된 것(역할이 다름). */}
      <WhyFairSection />
      <AudienceSection />
      <ServiceFinderSection />
      <HomeNewsletterSection />
      <CrmServicesSection />
      <ProcessSection />
      <CompanyIntroSection />
      <ClientsSection />
      <CtaSection />
    </>
  )
}
