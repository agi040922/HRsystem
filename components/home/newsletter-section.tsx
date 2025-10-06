"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { getLatestNewsletters } from "@/lib/newsletter"
import type { Newsletter } from "@/lib/newsletter"
import { useTranslations } from 'next-intl'
import NewsletterCard from './newsletter-card'

// NewsletterSection 컴포넌트 - 언어별로 구분
export default function NewsletterSection() {
  const [koreanNewsletters, setKoreanNewsletters] = useState<Newsletter[]>([])
  const [englishNewsletters, setEnglishNewsletters] = useState<Newsletter[]>([])
  const [loading, setLoading] = useState(true)
  const t = useTranslations('newsletter')

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
          {newsletters.length > 0 ? `${newsletters.length}${t('published')}` : t('preparing')}
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
          <p className="text-muted-foreground">{t('noNewsletter')}</p>
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
            <span className="text-primary">{t('title')}</span> {t('titleSuffix')}
          </h2>
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
              title={t('koreanVersion')} 
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
              title={t('englishVersion')} 
              language="English"
            />
          </motion.div>
        </div>
        
      </div>
    </section>
  )
}
