"use client"

import { useState, useEffect, useRef } from "react"
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
import { Progress } from "@/components/ui/progress"
import { Save, ArrowLeft, Eye, Calendar, FileText, Image, Upload, Copy, X, Settings, Edit3 } from "lucide-react"
import { updateBoardPost, uploadBoardImageFile, checkBoardImagesBucketSetup } from "@/lib/board"
import { BoardPost } from "@/lib/supabase"
import RichTextEditor, { RichTextEditorRef } from "@/components/ui/rich-text-editor"

interface BoardEditFormProps {
  post: BoardPost
}

interface UploadedImage {
  id: string
  name: string
  url: string
  size: number
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

  // Rich Text Editor ref
  const editorRef = useRef<RichTextEditorRef>(null)

  // 이미지 업로드 관련 state
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [isUploadingImages, setIsUploadingImages] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showImageManager, setShowImageManager] = useState(false)
  const [setupCheck, setSetupCheck] = useState<{success: boolean, error: string | null} | null>(null)

  // Supabase 설정 확인 함수
  const handleCheckSetup = async () => {
    setIsLoading(true)
    const result = await checkBoardImagesBucketSetup()
    setSetupCheck(result)
    setIsLoading(false)
  }

  // 이미지 업로드 핸들러
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // 이미지 파일 검증
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    const invalidFiles = files.filter(file => !validImageTypes.includes(file.type))
    
    if (invalidFiles.length > 0) {
      setError(`지원하지 않는 파일 형식이 있습니다: ${invalidFiles.map(f => f.name).join(', ')}`)
      return
    }

    // 파일 크기 검증 (각각 10MB 제한)
    const maxSize = 10 * 1024 * 1024 // 10MB
    const oversizedFiles = files.filter(file => file.size > maxSize)
    
    if (oversizedFiles.length > 0) {
      setError(`파일 크기가 너무 큽니다 (최대 10MB): ${oversizedFiles.map(f => f.name).join(', ')}`)
      return
    }

    setIsUploadingImages(true)
    setError(null)
    setUploadProgress(0)

    try {
      const uploadPromises = files.map(async (file, index) => {
        const { publicUrl, error } = await uploadBoardImageFile(file, file.name)
        
        // 업로드 진행률 업데이트
        setUploadProgress(((index + 1) / files.length) * 100)
        
        if (error || !publicUrl) {
          const errorMessage = error && typeof error === 'object' && 'message' in error 
            ? (error as any).message 
            : '알 수 없는 오류'
          throw new Error(`${file.name} 업로드 실패: ${errorMessage}`)
        }

        return {
          id: Date.now().toString() + index,
          name: file.name,
          url: publicUrl,
          size: file.size
        }
      })

      const results = await Promise.all(uploadPromises)
      setUploadedImages(prev => [...prev, ...results])
      setShowImageManager(true)

    } catch (err) {
      setError(err instanceof Error ? err.message : '이미지 업로드 중 오류가 발생했습니다.')
    } finally {
      setIsUploadingImages(false)
      setUploadProgress(0)
      // 파일 input 초기화
      if (e.target) {
        e.target.value = ''
      }
    }
  }

  // 이미지 URL 클립보드 복사
  const copyImageUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      // 성공 피드백 (간단한 알림)
      const button = document.activeElement as HTMLButtonElement
      if (button) {
        const originalText = button.textContent
        button.textContent = '복사됨!'
        setTimeout(() => {
          button.textContent = originalText
        }, 1000)
      }
    } catch (err) {
      setError('클립보드 복사에 실패했습니다.')
    }
  }

  // 이미지 삭제
  const removeImage = (id: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id))
  }

  // 이미지를 에디터에 삽입
  const insertImageToEditor = (url: string, altText: string) => {
    editorRef.current?.insertImage(url, altText)
  }

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

      {/* 이미지 업로드 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            이미지 업로드
            {uploadedImages.length > 0 && (
              <Badge variant="outline">{uploadedImages.length}개</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 설정 확인 */}
          <div className="flex gap-4 items-center">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCheckSetup}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? <Settings className="w-3 h-3 animate-spin" /> : <Settings className="w-3 h-3" />}
              설정 확인
            </Button>
            {setupCheck && (
              <div className={`flex items-center gap-2 text-sm ${setupCheck.success ? 'text-green-600' : 'text-red-600'}`}>
                {setupCheck.success ? '✅ 준비됨' : '❌ 설정 오류'}
              </div>
            )}
          </div>

          {setupCheck && !setupCheck.success && (
            <Alert variant="destructive">
              <AlertDescription className="text-sm">
                {setupCheck.error}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="image-upload">이미지 파일</Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleImageUpload}
              disabled={isUploadingImages}
              multiple
            />
            <p className="text-sm text-muted-foreground">
              최대 파일 크기: 10MB | 지원 형식: JPG, PNG, WebP, GIF
            </p>
          </div>

          {/* 업로드 진행률 */}
          {isUploadingImages && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>업로드 진행률</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}

          {/* 업로드된 이미지 목록 */}
          {uploadedImages.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>업로드된 이미지</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowImageManager(!showImageManager)}
                >
                  {showImageManager ? '숨기기' : '관리하기'}
                </Button>
              </div>
              
              {showImageManager && (
                <div className="border rounded-lg p-4 bg-muted/30">
                  <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                    {uploadedImages.map((image) => (
                      <div key={image.id} className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                        <img 
                          src={image.url} 
                          alt={image.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{image.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {Math.round(image.size / 1024)}KB
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyImageUrl(image.url)}
                            title="URL 복사"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => insertImageToEditor(image.url, image.name)}
                            title="에디터에 삽입"
                          >
                            <Edit3 className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeImage(image.id)}
                            title="삭제"
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    💡 팁: "에디터에 삽입" 버튼을 클릭하면 이미지 HTML 코드가 자동으로 본문에 추가됩니다.
                  </p>
                </div>
              )}
            </div>
          )}
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
            <RichTextEditor
              ref={editorRef}
              content={content}
              onChange={setContent}
              placeholder="게시글 내용을 입력하세요. 위에서 이미지를 업로드한 후 '에디터에 삽입' 버튼으로 쉽게 추가할 수 있습니다."
            />
            <p className="text-xs text-muted-foreground">
              워드프로세서처럼 직관적으로 편집하세요. 이미지는 위에서 업로드 후 삽입할 수 있습니다.
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