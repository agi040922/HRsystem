"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, CalendarDays, Star } from "lucide-react"
import PageBanner from "@/components/page-banner"
import { motion } from "framer-motion"
import { BoardPost } from "@/lib/supabase"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useTranslations } from 'next-intl'

interface BoardClientPageProps {
  initialPosts: BoardPost[]
  totalCount: number
  currentPage: number
  searchQuery: string
}

export default function BoardClientPage({ 
  initialPosts, 
  totalCount, 
  currentPage, 
  searchQuery 
}: BoardClientPageProps) {
  const t = useTranslations('board')
  const [searchTerm, setSearchTerm] = useState(searchQuery)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (searchTerm) {
      params.set('search', searchTerm)
    } else {
      params.delete('search')
    }
    params.delete('page') // 검색할 때는 첫 페이지로
    router.push(`/board?${params.toString()}`)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    if (page > 1) {
      params.set('page', page.toString())
    } else {
      params.delete('page')
    }
    router.push(`/board?${params.toString()}`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  const totalPages = Math.ceil(totalCount / 9)
  const posts = initialPosts

  return (
    <div className="w-full overflow-x-hidden">
      {/* 페이지 배너 */}
      <PageBanner 
        title={t('title')}
        subtitle={t('subtitle')}
        backgroundImage="/FAIR000.png"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container-fluid max-w-7xl py-4 md:py-6 lg:py-8 xl:py-12"
      >
        {/* 검색 및 통계 섹션 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 md:mb-12"
        >
          

          {/* 검색 폼 */}
          <div className="max-w-md mx-auto px-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input 
                type="search" 
                placeholder={t('search.placeholder')}
                className="flex-grow"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" variant="outline" size="icon">
                <Search className="w-5 h-5" />
                <span className="sr-only">{t('search.button')}</span>
              </Button>
            </form>
          </div>
        </motion.section>

        {/* 게시글 목록 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 md:mb-16 px-4 md:px-0"
        >
          {posts.length > 0 ? (
            <div className="max-w-6xl mx-auto">
              <Card>
                <CardContent className="p-0">
                  {/* 테이블 헤더 */}
                  <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 bg-gray-50 dark:bg-gray-800 border-b font-medium text-sm text-muted-foreground">
                    <div className="col-span-1 text-center">번호</div>
                    <div className="col-span-6">제목</div>
                    <div className="col-span-2 text-center">등차</div>
                    <div className="col-span-2 text-center">작성일</div>
                    <div className="col-span-1 text-center">조회</div>
                  </div>
                  
                  {/* 게시글 목록 */}
                  <div className="divide-y">
                    {posts.map((post, index) => {
                      // 간단한 순차 번호 계산
                      const postNumber = (currentPage - 1) * 9 + index + 1
                      
                      return (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-4 md:px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                          {/* 모바일 레이아웃 */}
                          <div className="md:hidden space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <Link 
                                href={`/board/${post.slug}`}
                                className="flex-1"
                              >
                                <h3 className="font-medium hover:text-blue-600 transition-colors line-clamp-2">
                                  {post.is_featured && (
                                    <Star className="w-4 h-4 inline mr-1 text-yellow-500" />
                                  )}
                                  {post.title}
                                </h3>
                              </Link>
                              <span className="text-sm text-muted-foreground shrink-0">
                                #{postNumber}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{formatDate(post.published_at)}</span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {post.views}
                              </span>
                            </div>
                          </div>

                          {/* 데스크톱 레이아웃 */}
                          <div className="hidden md:contents">
                            {/* 번호 */}
                            <div className="col-span-1 flex items-center justify-center">
                              <span className="text-sm font-medium text-muted-foreground">
                                {postNumber}
                              </span>
                            </div>
                            
                            {/* 제목 */}
                            <div className="col-span-6 flex items-center">
                              <Link 
                                href={`/board/${post.slug}`}
                                className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                              >
                                {post.is_featured && (
                                  <Star className="w-4 h-4 text-yellow-500 shrink-0" />
                                )}
                                <span className="font-medium line-clamp-1">{post.title}</span>
                              </Link>
                            </div>
                            
                            {/* 등차 (작성자) */}
                            <div className="col-span-2 flex items-center justify-center">
                              <span className="text-sm text-muted-foreground">
                                {post.author_name || 'FAIR'}
                              </span>
                            </div>
                            
                            {/* 작성일 */}
                            <div className="col-span-2 flex items-center justify-center">
                              <span className="text-sm text-muted-foreground">
                                {formatDate(post.published_at)}
                              </span>
                            </div>
                            
                            {/* 조회수 */}
                            <div className="col-span-1 flex items-center justify-center">
                              <span className="text-sm text-muted-foreground">
                                {post.views}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-semibold mb-2">
                  {searchQuery ? '검색 결과가 없습니다' : '게시글이 없습니다'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery 
                    ? '다른 검색어로 시도해보세요.' 
                    : '첫 번째 게시글이 곧 업로드될 예정입니다.'
                  }
                </p>
                {searchQuery && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('')
                      router.push('/board')
                    }}
                  >
                    전체 게시글 보기
                  </Button>
                )}
              </div>
            </div>
          )}
        </motion.section>

        {/* 페이징 */}
        {totalPages > 1 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="px-4"
          >
            <div className="flex justify-center gap-2 flex-wrap">
              <Button 
                variant="outline" 
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                이전
              </Button>
              
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else {
                  // 현재 페이지 주변의 페이지들을 표시
                  const start = Math.max(1, currentPage - 2)
                  const end = Math.min(totalPages, start + 4)
                  pageNum = start + i
                  if (pageNum > end) return null
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? "default" : "outline"}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </Button>
                )
              }).filter(Boolean)}
              
              <Button 
                variant="outline" 
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                다음
              </Button>
            </div>
          </motion.section>
        )}
      </motion.div>
    </div>
  )
}
