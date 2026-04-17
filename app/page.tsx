"use client"

import HeroSection from "@/components/home/hero-section"
import CrmServicesSection from "@/components/home/crm-services-section"
import ProcessSection from "@/components/home/process-section"
import CompanyIntroSection from "@/components/home/company-intro-section"
import ClientsSection from "@/components/home/clients-section"
import NewsNewsletterSection from "@/components/home/news-newsletter-section"
import CtaSection from "@/components/home/cta-section"

export default function NewHomePage() {
  return (
    <>
      <HeroSection />
      <CrmServicesSection />
      <ProcessSection />
      <CompanyIntroSection />
      <ClientsSection />
      <NewsNewsletterSection />
      <CtaSection />
    </>
  )
}
