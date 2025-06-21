"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, ArrowLeft, Save, Eye } from "lucide-react"
import Link from "next/link"
import { createBoardPost } from "@/lib/board"

interface FormData {
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image: string
  meta_title: string
  meta_description: string
  is_featured: boolean
  is_published: boolean
}

export default function BoardCreateForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  const [formData, setFormData] = useState<FormData>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featured_image: "",
    meta_title: "",
    meta_description: "",
    is_featured: false,
    is_published: true,
  })

  // 제목에서 슬러그 자동 생성
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^가-힣a-z0-9\s-]/g, '') // 한글, 영문, 숫자, 공백, 하이픈만 허용
      .trim()
      .replace(/\s+/g, '-') // 공백을 하이픈으로 변경
      .replace(/-+/g, '-') // 중복 하이픈 제거
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
      meta_title: title.length > 60 ? title.substring(0, 57) + '...' : title
    }))
  }

  const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // 필수 필드 검증
      if (!formData.title.trim()) {
        throw new Error('제목을 입력해주세요.')
      }
      if (!formData.content.trim()) {
        throw new Error('내용을 입력해주세요.')
      }
      if (!formData.slug.trim()) {
        throw new Error('슬러그를 입력해주세요.')
      }

      const postData = {
        ...formData,
        is_published: isDraft ? false : formData.is_published,
        excerpt: formData.excerpt || formData.content.substring(0, 150) + '...'
      }

      const { post, error } = await createBoardPost(postData)

      if (error) {
        throw new Error('게시글 저장에 실패했습니다.')
      }

      setSuccess(true)
      
      // 성공 시 목록 페이지로 이동 (3초 후)
      setTimeout(() => {
        router.push('/board')
      }, 2000)

    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const previewUrl = formData.slug ? `/board/${formData.slug}` : '#'

  if (success) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Save className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-800">게시글이 성공적으로 저장되었습니다!</h3>
            <p className="text-muted-foreground">잠시 후 공지사항 페이지로 이동합니다.</p>
            <div className="flex gap-2 justify-center">
              <Link href="/board">
                <Button>공지사항 보기</Button>
              </Link>
              <Button variant="outline" onClick={() => window.location.reload()}>
                새 글 작성
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* 기본 정보 */}
      <Card>
        <CardHeader>
          <CardTitle>기본 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 제목 */}
          <div className="space-y-2">
            <Label htmlFor="title">제목 *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="게시글 제목을 입력하세요"
              maxLength={255}
              required
            />
            <p className="text-xs text-muted-foreground">
              {formData.title.length}/255자
            </p>
          </div>

          {/* 슬러그 */}
          <div className="space-y-2">
            <Label htmlFor="slug">슬러그 (URL) *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="url-slug"
              maxLength={255}
              required
            />
            <p className="text-xs text-muted-foreground">
              URL: /board/{formData.slug}
            </p>
          </div>

          {/* 요약 */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">요약</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="게시글 요약 (선택사항, 미입력시 자동 생성)"
              rows={3}
              maxLength={300}
            />
            <p className="text-xs text-muted-foreground">
              {formData.excerpt.length}/300자
            </p>
          </div>

          {/* 내용 */}
          <div className="space-y-2">
            <Label htmlFor="content">내용 *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="게시글 내용을 HTML 형식으로 입력하세요"
              rows={15}
              required
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              HTML 태그를 사용할 수 있습니다. (예: &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt; 등)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* SEO 및 미디어 */}
      <Card>
        <CardHeader>
          <CardTitle>SEO 및 미디어</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 대표 이미지 */}
          <div className="space-y-2">
            <Label htmlFor="featured_image">대표 이미지 URL</Label>
            <Input
              id="featured_image"
              type="url"
              value={formData.featured_image}
              onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* SEO 제목 */}
          <div className="space-y-2">
            <Label htmlFor="meta_title">SEO 제목</Label>
            <Input
              id="meta_title"
              value={formData.meta_title}
              onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
              placeholder="검색엔진에 표시될 제목"
              maxLength={60}
            />
            <p className="text-xs text-muted-foreground">
              {formData.meta_title.length}/60자 (권장: 50-60자)
            </p>
          </div>

          {/* SEO 설명 */}
          <div className="space-y-2">
            <Label htmlFor="meta_description">SEO 설명</Label>
            <Textarea
              id="meta_description"
              value={formData.meta_description}
              onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
              placeholder="검색엔진에 표시될 설명"
              rows={3}
              maxLength={160}
            />
            <p className="text-xs text-muted-foreground">
              {formData.meta_description.length}/160자 (권장: 150-160자)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 게시 설정 */}
      <Card>
        <CardHeader>
          <CardTitle>게시 설정</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="is_featured">추천 게시글</Label>
              <p className="text-sm text-muted-foreground">
                메인 페이지에 우선 표시됩니다
              </p>
            </div>
            <Switch
              id="is_featured"
              checked={formData.is_featured}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="is_published">즉시 게시</Label>
              <p className="text-sm text-muted-foreground">
                체크 해제 시 임시저장됩니다
              </p>
            </div>
            <Switch
              id="is_published"
              checked={formData.is_published}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* 액션 버튼 */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <div className="flex gap-2 flex-1">
          <Link href="/board" className="flex-1">
            <Button type="button" variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              취소
            </Button>
          </Link>
          
          <Button
            type="button"
            variant="outline"
            onClick={(e) => handleSubmit(e, true)}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            임시저장
          </Button>
        </div>

        <div className="flex gap-2 flex-1">
          {formData.slug && (
            <Link href={previewUrl} target="_blank" className="flex-1">
              <Button type="button" variant="secondary" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                미리보기
              </Button>
            </Link>
          )}
          
          <Button 
            type="submit" 
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            게시하기
          </Button>
        </div>
      </div>
    </form>
  )
} 