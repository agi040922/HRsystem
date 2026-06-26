"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, Edit, Trash2, Eye, Calendar, Star, Users, Plus, AlertCircle } from "lucide-react"
import { getAdminBoardPosts, deleteBoardPost } from "@/lib/board"
import { BoardPost } from "@/lib/supabase"

interface AdminBoardListProps {
  currentPage: number
  searchQuery: string
}

export default function AdminBoardList({ currentPage, searchQuery }: AdminBoardListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<BoardPost[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(searchQuery)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [showUnpublishedAlert, setShowUnpublishedAlert] = useState<string | null>(null)

  // 데이터 로드
  const loadPosts = async () => {
    setIsLoading(true)
    try {
      const { posts, count } = await getAdminBoardPosts(currentPage, 10, searchQuery)
      setPosts(posts)
      setTotalCount(count)
    } catch (error) {
      console.error('Failed to load posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [currentPage, searchQuery])

  // 검색 처리
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (searchTerm) {
      params.set('search', searchTerm)
    } else {
      params.delete('search')
    }
    params.delete('page')
    router.push(`/admin/board?${params.toString()}`)
  }

  // 페이지 변경
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    if (page > 1) {
      params.set('page', page.toString())
    } else {
      params.delete('page')
    }
    router.push(`/admin/board?${params.toString()}`)
  }

  // 게시글 삭제
  const handleDelete = async (id: number) => {
    try {
      const { success } = await deleteBoardPost(id)
      if (success) {
        await loadPosts() // 목록 새로고침
        setDeleteId(null)
      } else {
        alert('삭제에 실패했습니다.')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  // 미발행 게시글 보기 처리
  const handleViewUnpublished = (post: BoardPost) => {
    if (!post.is_published) {
      setShowUnpublishedAlert(post.title)
      return
    }
    // 발행된 게시글은 새 창에서 열기
    window.open(`/board/${post.slug}`, '_blank')
  }

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const totalPages = Math.ceil(totalCount / 10)

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">게시글을 불러오는 중...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* 미발행 게시글 알림 */}
      {showUnpublishedAlert && (
        <Alert className="border-orange-200 text-orange-800 bg-orange-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <div>
              '<strong>{showUnpublishedAlert}</strong>' 게시글은 아직 발행되지 않았습니다. 
              사용자가 볼 수 있도록 하려면 "수정" 버튼을 눌러서 발행 상태를 변경해주세요.
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowUnpublishedAlert(null)}
              className="ml-4 shrink-0"
            >
              확인
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* 검색 */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="search"
              placeholder="제목, 내용으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Search className="w-4 h-4 mr-2" />
              검색
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">전체 게시글</p>
                <p className="text-2xl font-bold">{totalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium">추천 게시글</p>
                <p className="text-2xl font-bold">
                  {posts.filter(p => p.is_featured).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">총 조회수</p>
                <p className="text-2xl font-bold">
                  {posts.reduce((sum, p) => sum + p.views, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 게시글 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>게시글 목록</CardTitle>
        </CardHeader>
        <CardContent>
          {posts.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>제목</TableHead>
                      <TableHead className="w-20">상태</TableHead>
                      <TableHead className="w-20">추천</TableHead>
                      <TableHead className="w-20">조회수</TableHead>
                      <TableHead className="w-40">작성일</TableHead>
                      <TableHead className="w-32">액션</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>
                          <div>
                            <button 
                              onClick={() => handleViewUnpublished(post)}  
                              className="font-medium hover:text-primary transition-colors text-left"
                            >
                              {post.title}
                            </button>
                            {post.excerpt && (
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                                {post.excerpt}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={post.is_published ? "default" : "secondary"}>
                            {post.is_published ? "발행됨" : "미발행"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {post.is_featured && (
                            <Badge variant="outline" className="text-yellow-600">
                              <Star className="w-3 h-3 mr-1" />
                              추천
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3 text-muted-foreground" />
                            {post.views}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(post.published_at)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewUnpublished(post)}
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Link href={`/admin/board/edit/${post.id}`}>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-3 h-3" />
                              </Button>
                            </Link>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>게시글 삭제</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    '{post.title}' 게시글을 삭제하시겠습니까? 
                                    이 작업은 되돌릴 수 없습니다.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>취소</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDelete(post.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    삭제
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* 페이징 */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
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
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery ? '검색 결과가 없습니다.' : '게시글이 없습니다.'}
              </p>
              <Link href="/admin/board/create" className="mt-4 inline-block">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  첫 번째 게시글 작성하기
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 