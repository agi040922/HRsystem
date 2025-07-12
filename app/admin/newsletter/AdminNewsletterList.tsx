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
import { Search, Edit, Trash2, Download, Calendar, Globe, FileText, Plus, AlertCircle } from "lucide-react"
import { getAdminNewsletters, deleteNewsletter } from "@/lib/newsletter"
import { Newsletter } from "@/lib/newsletter"

interface AdminNewsletterListProps {
  currentPage: number
  searchQuery: string
}

export default function AdminNewsletterList({ currentPage, searchQuery }: AdminNewsletterListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [newsletters, setNewsletters] = useState<Newsletter[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(searchQuery)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  // 데이터 로드
  const loadNewsletters = async () => {
    setIsLoading(true)
    try {
      const { newsletters, count } = await getAdminNewsletters(currentPage, 10, searchQuery)
      setNewsletters(newsletters)
      setTotalCount(count)
    } catch (error) {
      console.error('Failed to load newsletters:', error)
      setError('주간지 목록을 불러오는데 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadNewsletters()
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
    router.push(`/admin/newsletter?${params.toString()}`)
  }

  // 페이지 변경
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    if (page > 1) {
      params.set('page', page.toString())
    } else {
      params.delete('page')
    }
    router.push(`/admin/newsletter?${params.toString()}`)
  }

  // 주간지 삭제
  const handleDelete = async (id: number) => {
    try {
      const { success } = await deleteNewsletter(id)
      if (success) {
        await loadNewsletters() // 목록 새로고침
        setDeleteId(null)
        setError(null)
      } else {
        setError('삭제에 실패했습니다.')
      }
    } catch (error) {
      console.error('Delete error:', error)
      setError('삭제 중 오류가 발생했습니다.')
    }
  }

  // 다운로드 처리
  const handleDownload = (newsletter: Newsletter) => {
    window.open(newsletter.file_url, '_blank')
  }

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  const totalPages = Math.ceil(totalCount / 10)

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">주간지를 불러오는 중...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* 에러 메시지 */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* 검색 */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="search"
              placeholder="제목, 설명으로 검색..."
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
              <FileText className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">전체 주간지</p>
                <p className="text-2xl font-bold">{totalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">한글판</p>
                <p className="text-2xl font-bold">
                  {newsletters.filter(n => n.language === 'ko').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">영문판</p>
                <p className="text-2xl font-bold">
                  {newsletters.filter(n => n.language === 'en').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 주간지 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>주간지 목록</CardTitle>
        </CardHeader>
        <CardContent>
          {newsletters.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>제목</TableHead>
                      <TableHead className="w-20">언어</TableHead>
                      <TableHead className="w-20">상태</TableHead>
                      <TableHead className="w-32">발행일</TableHead>
                      <TableHead className="w-32">액션</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {newsletters.map((newsletter) => (
                      <TableRow key={newsletter.id}>
                        <TableCell>
                          <div>
                            <button 
                              onClick={() => handleDownload(newsletter)}
                              className="font-medium hover:text-primary transition-colors text-left"
                            >
                              {newsletter.title}
                            </button>
                            {newsletter.description && (
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {newsletter.description}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={newsletter.language === 'ko' ? 'default' : 'secondary'}>
                            {newsletter.language === 'ko' ? '한글' : 'English'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={newsletter.is_active ? "default" : "secondary"}>
                            {newsletter.is_active ? "활성" : "비활성"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(newsletter.published_date)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDownload(newsletter)}
                            >
                              <Download className="w-3 h-3" />
                            </Button>
                            <Link href={`/admin/newsletter/edit/${newsletter.id}`}>
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
                                  <AlertDialogTitle>주간지 삭제</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    '{newsletter.title}' 주간지를 삭제하시겠습니까? 
                                    이 작업은 되돌릴 수 없습니다.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>취소</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDelete(newsletter.id)}
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
                {searchQuery ? '검색 결과가 없습니다.' : '주간지가 없습니다.'}
              </p>
              <Link href="/admin/newsletter/create" className="mt-4 inline-block">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  첫 번째 주간지 업로드하기
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 