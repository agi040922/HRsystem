"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, CalendarDays, Star } from "lucide-react"
import PageBanner from "@/components/page-banner"
import { motion } from "framer-motion"
import { BoardPost } from "@/lib/supabase"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

// BoardItem 컴포넌트 
interface BoardItemProps {
  post: BoardPost
}

function BoardItem({ post }: BoardItemProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  // excerpt가 없으면 content에서 텍스트만 추출하여 요약 생성
  const getExcerpt = () => {
    if (post.excerpt) {
      return post.excerpt
    }
    
    // HTML 태그를 제거하고 순수 텍스트만 추출
    const textContent = post.content
      .replace(/<[^>]*>/g, ' ') // HTML 태그 제거
      .replace(/\s+/g, ' ') // 연속 공백을 하나로
      .trim()
    
    return textContent.length > 120 
      ? textContent.substring(0, 120) + '...' 
      : textContent
  }

  return (
    <Card className="hover:shadow-md transition-shadow h-full group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link href={`/board/${post.slug}`} className="flex-1">
            <CardTitle className="text-lg md:text-xl hover:text-primary transition-colors line-clamp-2 group-hover:text-primary">
              {post.title}
            </CardTitle>
          </Link>
          {post.is_featured && (
            <Badge variant="secondary" className="shrink-0 text-yellow-600 bg-yellow-50 border-yellow-200">
              <Star className="w-3 h-3 mr-1" />
              추천
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            <span>{formatDate(post.published_at)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{post.views}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow space-y-3">
        {/* 대표 이미지 */}
        {post.featured_image && (
          <div className="w-full h-48 overflow-hidden rounded-lg bg-gray-100">
            <img 
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
        
        {/* 게시글 요약 */}
        <p className="text-muted-foreground leading-relaxed text-sm">
          {getExcerpt()}
        </p>
      </CardContent>

      <CardFooter className="pt-3">
        <Link href={`/board/${post.slug}`} className="w-full">
          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            자세히 보기
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

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

  const totalPages = Math.ceil(totalCount / 9)
  const posts = initialPosts

  return (
    <div className="w-full overflow-x-hidden">
      {/* 페이지 배너 */}
      <PageBanner 
        title="공지사항"
        subtitle="FAIR인사노무컨설팅의 다양한 소식을 전해드립니다"
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
          {/* 통계 정보 */}
          <div className="text-center mb-6 px-4">
            <div className="flex justify-center items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-medium">전체 게시글</span>
                <Badge variant="outline">{totalCount}개</Badge>
              </div>
              {searchQuery && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">검색 결과</span>
                  <Badge variant="outline">{posts.length}개</Badge>
                </div>
              )}
            </div>
          </div>

          {/* 검색 폼 */}
          <div className="max-w-md mx-auto px-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input 
                type="search" 
                placeholder="제목, 내용으로 검색..." 
                className="flex-grow"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" variant="outline" size="icon">
                <Search className="w-5 h-5" />
                <span className="sr-only">검색</span>
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
            <div className="grid gap-6 md:gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BoardItem post={post} />
                </motion.div>
              ))}
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
