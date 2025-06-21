"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Save, ArrowLeft, Eye, Calendar, FileText, Image } from "lucide-react"
import { updateBoardPost } from "@/lib/board"
import { BoardPost } from "@/lib/supabase"

interface BoardEditFormProps {
  post: BoardPost
}

export default function BoardEditForm({ post }: BoardEditFormProps) {
  const router = useRouter()
  
  const [title, setTitle] = useState(post.title)
  const [slug, setSlug] = useState(post.slug)
  const [content, setContent] = useState(post.content)
  const [excerpt, setExcerpt] = useState(post.excerpt || "")
  const [featuredImage, setFeaturedImage] = useState(post.featured_image || "")
  const [metaTitle, setMetaTitle] = useState(post.meta_title || "")
  const [metaDescription, setMetaDescription] = useState(post.meta_description || "")
  const [authorName, setAuthorName] = useState(post.author_name || "관리자")
  const [isPublished, setIsPublished] = useState(post.is_published)
  const [isFeatured, setIsFeatured] = useState(post.is_featured)
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // 제목에서 슬러그 생성
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, (match) => {
        // 한글을 영문으로 변환하는 간단한 매핑
        const koreanToEnglish: { [key: string]: string } = {
          '가': 'ga', '나': 'na', '다': 'da', '라': 'ra', '마': 'ma',
          '바': 'ba', '사': 'sa', '아': 'a', '자': 'ja', '차': 'cha',
          '카': 'ka', '타': 'ta', '파': 'pa', '하': 'ha'
        }
        return koreanToEnglish[match] || match
      })
      .replace(/[^a-z0-9가-힣]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50)
  }

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle)
    if (!slug || slug === generateSlug(post.title)) {
      setSlug(generateSlug(newTitle))
    }
  }

  const handleSubmit = async (isDraft: boolean = false) => {
    if (!title.trim() || !content.trim()) {
      setError("제목과 내용을 입력해주세요.")
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    const formData = {
      title: title.trim(),
      slug: slug.trim(),
      content: content.trim(),
      excerpt: excerpt.trim() || null,
      featured_image: featuredImage.trim() || null,
      meta_title: metaTitle.trim() || null,
      meta_description: metaDescription.trim() || null,
      author_name: authorName.trim(),
      is_published: isDraft ? false : isPublished,
      is_featured: isFeatured,
    }

    const { error } = await updateBoardPost(post.id, formData)

    if (error) {
      setError("게시글 수정에 실패했습니다: " + error.message)
    } else {
      setSuccess("게시글이 성공적으로 수정되었습니다!")
      setTimeout(() => {
        router.push("/admin/board")
      }, 1500)
    }

    setIsLoading(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* 상단 액션 버튼 */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          뒤로가기
        </Button>
        
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSubmit(true)}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            임시저장
          </Button>
          <Button
            type="button"
            onClick={() => handleSubmit(false)}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isLoading ? "수정 중..." : "수정하기"}
          </Button>
        </div>
      </div>

      {/* 게시글 정보 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            게시글 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">작성일:</span>
              <span>{formatDate(post.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">조회수:</span>
              <span>{post.views.toLocaleString()}회</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant={post.is_published ? "default" : "secondary"}>
              {post.is_published ? "발행됨" : "비발행"}
            </Badge>
            {post.is_featured && (
              <Badge variant="outline">추천</Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 에러/성공 메시지 */}
      {error && (
        <Alert className="border-red-200 text-red-800 bg-red-50">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 text-green-800 bg-green-50">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* 기본 정보 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle>기본 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">제목 *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="게시글 제목을 입력하세요"
              className="font-medium"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">URL 슬러그 *</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="url-slug-example"
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              URL에 사용될 슬러그입니다. 영문, 숫자, 하이픈(-), 한글만 사용 가능합니다.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">요약 (선택사항)</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="게시글의 간단한 요약을 입력하세요"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">작성자</Label>
            <Input
              id="author"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="작성자 이름"
            />
          </div>
        </CardContent>
      </Card>

      {/* 내용 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle>게시글 내용</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="content">내용 *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="게시글 내용을 입력하세요 (HTML 태그 사용 가능)"
              rows={15}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              HTML 태그를 사용할 수 있습니다. 이미지는 &lt;img&gt; 태그로 삽입해주세요.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 이미지 및 미디어 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            이미지 및 미디어
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="featuredImage">대표 이미지 URL (선택사항)</Label>
            <Input
              id="featuredImage"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              type="url"
            />
            <p className="text-xs text-muted-foreground">
              게시글 목록에서 보여질 대표 이미지의 URL을 입력하세요.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* SEO 설정 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle>SEO 설정</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="metaTitle">메타 제목 (선택사항)</Label>
            <Input
              id="metaTitle"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="검색엔진에 표시될 제목 (60자 이내 권장)"
              maxLength={60}
            />
            <p className="text-xs text-muted-foreground">
              {metaTitle.length}/60자
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="metaDescription">메타 설명 (선택사항)</Label>
            <Textarea
              id="metaDescription"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="검색엔진에 표시될 설명 (160자 이내 권장)"
              rows={3}
              maxLength={160}
            />
            <p className="text-xs text-muted-foreground">
              {metaDescription.length}/160자
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 발행 설정 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle>발행 설정</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>게시글 발행</Label>
              <p className="text-sm text-muted-foreground">
                발행하면 사용자가 볼 수 있습니다
              </p>
            </div>
            <Switch
              checked={isPublished}
              onCheckedChange={setIsPublished}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>추천 게시글</Label>
              <p className="text-sm text-muted-foreground">
                중요한 게시글을 상단에 고정합니다
              </p>
            </div>
            <Switch
              checked={isFeatured}
              onCheckedChange={setIsFeatured}
            />
          </div>
        </CardContent>
      </Card>

      {/* 하단 액션 버튼 */}
      <div className="flex justify-end gap-2 pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          취소
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSubmit(true)}
          disabled={isLoading}
        >
          임시저장
        </Button>
        <Button
          type="button"
          onClick={() => handleSubmit(false)}
          disabled={isLoading}
        >
          {isLoading ? "수정 중..." : "수정하기"}
        </Button>
      </div>
    </div>
  )
} 