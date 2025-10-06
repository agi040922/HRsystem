"use client"

import { BookOpen } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { getLatestNewsletters } from "@/lib/newsletter"
import type { Newsletter } from "@/lib/newsletter"

// NewsletterGridContent 컴포넌트 - 그리드용
export default function NewsletterGridContent() {
  const [koreanNewsletters, setKoreanNewsletters] = useState<Newsletter[]>([])
  const [englishNewsletters, setEnglishNewsletters] = useState<Newsletter[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadNewsletters() {
      try {
        const { newsletters: allNewsletters } = await getLatestNewsletters(6)
        const korean = allNewsletters.filter(n => n.language === 'ko').slice(0, 3)
        const english = allNewsletters.filter(n => n.language === 'en').slice(0, 3)
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

  const NewsletterRow = ({ newsletters, title }: { newsletters: Newsletter[], title: string }) => (
    <div className="mb-8">
      <h4 className="text-lg font-bold text-gray-900 mb-4">
        {title}
      </h4>
      
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="animate-pulse py-2 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-3 bg-slate-200 rounded w-3/4 mb-1"></div>
                  <div className="h-2 bg-slate-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : newsletters.length > 0 ? (
        <div className="space-y-3">
          {newsletters.map((newsletter, index) => (
            <motion.div
              key={newsletter.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="group py-2 border-b border-gray-100 hover:border-primary/30 transition-colors cursor-pointer"
                   onClick={() => window.open(newsletter.file_url, '_blank')}>
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors duration-200 line-clamp-1 flex-1 mr-4">
                    {newsletter.title}
                  </h5>
                  <div className="text-xs text-gray-500 whitespace-nowrap">
                    {new Date(newsletter.published_date).toLocaleDateString('ko-KR', {
                      year: '2-digit',
                      month: '2-digit',
                      day: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 text-xs">아직 발행된 주간지가 없습니다.</p>
        </div>
      )}
    </div>
  )

  return (
    <div>
      <NewsletterRow 
        newsletters={koreanNewsletters} 
        title="한국어판"
      />
      
      <NewsletterRow 
        newsletters={englishNewsletters} 
        title="영어판"
      />
    </div>
  )
}
