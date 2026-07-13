"use client"

import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { useTranslations } from 'next-intl'

const BLOG_URL = "https://blog.naver.com/fairhr"

export default function Footer() {
  const t = useTranslations('footer')
  return (
    <footer className="border-t bg-muted/40 w-full overflow-x-hidden">
      <div className="container-fluid max-w-7xl py-6 md:py-8 text-center md:text-left">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="px-4 md:px-0">
            <h3 className="font-semibold mb-3 text-base md:text-lg">{t('companyName')}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('representative')}: {t('representativeName')}
              <br />
              {t('address')}: {t('addressDetail')}
              <br />
              {t('phone')}: <a href="tel:02-387-9869" className="hover:text-primary">{t('phoneNumber')}</a>
              <br />
              {t('email')}: <a href="mailto:fairhr@nate.com" className="hover:text-primary">{t('emailAddress')}</a>
            </p>
          </div>
          <div className="px-4 md:px-0">
            <h3 className="font-semibold mb-3 text-base md:text-lg">{t('quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about/greeting" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('services')}
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-muted-foreground hover:text-primary transition-colors">
                  뉴스레터
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('contact')}
                </Link>
              </li>
              <li>
                <a
                  href={BLOG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                >
                  네이버 블로그
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
          <div className="px-4 md:px-0 sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold mb-3 text-base md:text-lg">{t('policies')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t text-xs sm:text-sm text-muted-foreground text-center px-4 md:px-0">
          &copy; {new Date().getFullYear()} {t('companyName')}. {t('allRightsReserved')}
        </div>
      </div>
    </footer>
  )
}
