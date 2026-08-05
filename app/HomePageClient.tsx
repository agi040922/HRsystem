"use client"

import HeroSection from "@/components/home/hero-section"
import QuickLinksSection from "@/components/home/quick-links-section"
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
      <QuickLinksSection />
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
