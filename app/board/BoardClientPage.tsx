"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Eye, CalendarDays } from "lucide-react"
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

  return (
    <Card className="hover:shadow-md transition-shadow h-full">
      <CardHeader>
        <Link href={`/board/${post.slug}`}>
          <CardTitle className="text-lg md:text-xl hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </CardTitle>
        </Link>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
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
      <CardContent className="flex-grow">
        <p className="text-muted-foreground leading-relaxed text-sm">
          {post.excerpt || post.content.substring(0, 100) + '...'}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/board/${post.slug}`} className="w-full">
          <Button variant="outline" className="w-full">자세히 보기</Button>
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
        subtitle="노무법인 [법인명]의 다양한 소식을 전해드립니다"
        backgroundImage="public\FAIR000.png"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container-fluid max-w-7xl py-8 md:py-12 lg:py-16 xl:py-20"
      >
        {/* 검색 섹션 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 md:mb-16"
        >
          <div className="mb-8 max-w-md mx-auto px-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input 
                type="search" 
                placeholder="게시글 검색..." 
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
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery ? '검색 결과가 없습니다.' : '게시글이 없습니다.'}
              </p>
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
                const pageNum = i + 1
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? "default" : "outline"}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </Button>
                )
              })}
              
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

        {/* 관리자 전용 글쓰기 버튼 (조건부 렌더링 필요) */}
        {/* <div className="mt-8 text-right px-4">
          <Link href="/board/new">
            <Button>글쓰기</Button>
          </Link>
        </div> */}
      </motion.div>
    </div>
  )
}
