"use client"

import HeroSection from "@/components/home/hero-section"
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
      <HomeNewsletterSection />
      <CrmServicesSection />
      <ProcessSection />
      <CompanyIntroSection />
      <ClientsSection />
      <CtaSection />
    </>
  )
}
