"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Download, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import type { Newsletter } from "@/lib/newsletter"

// NewsletterCard 컴포넌트
interface NewsletterCardProps {
  newsletter: Newsletter
  index: number
}

export default function NewsletterCard({ newsletter, index }: NewsletterCardProps) {
  const handleDownload = () => {
    window.open(newsletter.file_url, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="hover:shadow-md transition-all duration-300 h-full flex flex-col group cursor-pointer bg-white shadow-sm">
        {/* 모바일에서는 이미지 숨김, 데스크톱에서는 표시 */}
        <div className="hidden sm:block aspect-[3/2] relative overflow-hidden rounded-t-lg">
          {newsletter.cover_image_url ? (
            <img
              src={newsletter.cover_image_url}
              alt={newsletter.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-700 to-blue-600 flex items-center justify-center relative">
              <div className="text-center p-1.5">
                <BookOpen className="w-3 h-3 text-white mx-auto mb-0.5" />
                <div className="text-white font-medium text-xs line-clamp-1 leading-tight">
                  {newsletter.title}
                </div>
              </div>
            </div>
          )}
          <div className="absolute top-0.5 right-0.5">
            <div className="bg-white/90 backdrop-blur-sm rounded px-1 py-0.5 text-xs font-medium">
              {newsletter.language === 'ko' ? '한글' : 'ENG'}
            </div>
          </div>
        </div>
        
        <CardContent className="flex-grow p-2 sm:p-1.5">
          {/* 모바일: 언어 태그와 제목만, 데스크톱: 날짜도 포함 */}
          <div className="sm:hidden flex items-center justify-between mb-1">
            <div className="bg-primary/10 text-primary rounded px-1.5 py-0.5 text-xs font-medium">
              {newsletter.language === 'ko' ? '한글' : 'ENG'}
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-0.5 mb-0.5">
            <Calendar className="w-2.5 h-2.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(newsletter.published_date).toLocaleDateString('ko-KR', {
                year: '2-digit',
                month: 'short'
              })}
            </span>
          </div>
          
          <h3 className="font-medium text-sm sm:text-xs mb-1 sm:mb-0.5 line-clamp-1 group-hover:text-primary transition-colors">
            {newsletter.title}
          </h3>
        </CardContent>
        
        <div className="p-2 sm:p-1.5 pt-0">
          <Button 
            onClick={handleDownload}
            className="w-full text-xs py-1 sm:py-0.5 h-8 sm:h-6"
            size="sm"
            variant="outline"
          >
            <Download className="w-3 h-3 sm:w-2.5 sm:h-2.5 mr-1 sm:mr-0.5" />
            다운로드
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
