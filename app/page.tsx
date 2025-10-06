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
      title: "해외 인력 파견",
      description: "국제 기업의 인력 파견 및 주재원 노무 관리 전문 서비스",
      href: "/services#overseas-dispatch",
    },
    {
      icon: Users,
      title: "국제 계약 자문",
      description: "해외 진출 기업을 위한 현지 고용 계약 및 노무 규정 자문",
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
