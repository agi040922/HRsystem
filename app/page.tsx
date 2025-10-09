"use client"

import type React from "react"
import { Briefcase, FileText, Users } from "lucide-react"
import HeroSection from "@/components/home/hero-section"
import CompanyIntroSection from "@/components/home/company-intro-section"
import ClientsSection from "@/components/home/clients-section"
import NewsNewsletterSection from "@/components/home/news-newsletter-section"
import CtaSection from "@/components/home/cta-section"
import { useTranslations } from 'next-intl'

export default function NewHomePage() {
  const t = useTranslations()

  const services = [
    {
      icon: Briefcase,
      title: t('services.items.globalConsulting.title'),
      description: t('services.items.globalConsulting.description'),
      href: "/services#global-consulting",
    },
    {
      icon: FileText,
      title: t('services.items.overseasDispatch.title'),
      description: t('services.items.overseasDispatch.description'),
      href: "/services#overseas-dispatch",
    },
    {
      icon: Users,
      title: t('services.items.internationalContracts.title'),
      description: t('services.items.internationalContracts.description'),
      href: "/services#international-contracts",
    },
  ]

  return (
    <>
      <HeroSection />
      <CompanyIntroSection />
      <ClientsSection />
      <NewsNewsletterSection />
      <CtaSection />
    </>
  )
}
