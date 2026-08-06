"use client"

import HeroSection from "@/components/home/hero-section"
import WhyFairSection from "@/components/home/why-fair-section"
import AudienceSection from "@/components/home/audience-section"
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
      {/* 히어로 → "왜 FAIR인가"(회사 정체) → "어떤 상황이신가요"(고객유형별 서비스) 순.
          기존 ServiceFinderSection(아이콘 10개)은 AudienceSection 이 흡수했다. */}
      <WhyFairSection />
      <AudienceSection />
      <HomeNewsletterSection />
      <CrmServicesSection />
      <ProcessSection />
      <CompanyIntroSection />
      <ClientsSection />
      <CtaSection />
    </>
  )
}
