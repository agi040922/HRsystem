"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Loader2, ArrowLeft, Save, Wand2, Eye, Check, Edit3, Image, FileText, Upload, Copy, X, Settings } from "lucide-react"
import Link from "next/link"
import { createBoardPost, uploadBoardImageFile, uploadMultipleBoardImages, checkBoardImagesBucketSetup } from "@/lib/board"
import RichTextEditor, { RichTextEditorRef } from "@/components/ui/rich-text-editor"

interface SimpleFormData {
  title: string
  content: string
}

interface GeneratedData {
  htmlContent: string
  slug: string
  excerpt: string
  metaTitle: string
  metaDescription: string
  suggestedFeaturedImage: string
}

interface FinalFormData {
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

interface UploadedImage {
  id: string
  name: string
  url: string
  size: number
}

type Step = 'input' | 'preview' | 'success'

export default function BoardCreateForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('input')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [setupCheck, setSetupCheck] = useState<{success: boolean, error: string | null} | null>(null)
  
  // Rich Text Editor refs
  const inputEditorRef = useRef<RichTextEditorRef>(null)
  const previewEditorRef = useRef<RichTextEditorRef>(null)
  
  const [simpleForm, setSimpleForm] = useState<SimpleFormData>({
    title: "",
    content: "",
  })

  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null)
  const [finalForm, setFinalForm] = useState<FinalFormData | null>(null)

  // 이미지 업로드 관련 state
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [isUploadingImages, setIsUploadingImages] = useState(false)
  const [showImageManager, setShowImageManager] = useState(false)

  // Supabase 설정 확인 함수
  const handleCheckSetup = async () => {
    setIsGenerating(true)
    const result = await checkBoardImagesBucketSetup()
    setSetupCheck(result)
    setIsGenerating(false)
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
    if (currentStep === 'input') {
      // 입력 단계에서는 inputEditorRef를 통해 직접 삽입
      inputEditorRef.current?.insertImage(url, altText)
    } else if (currentStep === 'preview') {
      // 미리보기 단계에서는 previewEditorRef를 통해 직접 삽입
      previewEditorRef.current?.insertImage(url, altText)
    }
  }

  // AI로 컨텐츠 생성
  const handleGenerate = async () => {
    if (!simpleForm.title.trim() || !simpleForm.content.trim()) {
      setError('제목과 내용을 모두 입력해주세요.')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/ai/generate-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: simpleForm.title,
          content: simpleForm.content,
        }),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'AI 생성에 실패했습니다.')
      }

      setGeneratedData(result.data)
      setFinalForm({
        title: simpleForm.title,
        slug: result.data.slug,
        content: result.data.htmlContent,
        excerpt: result.data.excerpt,
        featured_image: '',
        meta_title: result.data.metaTitle,
        meta_description: result.data.metaDescription,
        is_featured: false,
        is_published: true,
      })
      setCurrentStep('preview')

    } catch (err) {
      setError(err instanceof Error ? err.message : 'AI 생성 중 오류가 발생했습니다.')
    } finally {
      setIsGenerating(false)
    }
  }

  // 최종 게시
  const handlePublish = async (isDraft = false) => {
    if (!finalForm) return

    // 필수 필드 검증
    if (!finalForm.title.trim() || !finalForm.content.trim() || !finalForm.slug.trim()) {
      setError('제목, 내용, 슬러그를 모두 입력해주세요.')
      return
    }

    setIsPublishing(true)
    setError(null)

    try {
      const postData = {
        ...finalForm,
        is_published: isDraft ? false : finalForm.is_published,
        excerpt: finalForm.excerpt || finalForm.content.substring(0, 150) + '...'
      }

      const { post, error } = await createBoardPost(postData)

      if (error) {
        throw new Error('게시글 저장에 실패했습니다.')
      }

      setCurrentStep('success')

    } catch (err) {
      setError(err instanceof Error ? err.message : '게시 중 오류가 발생했습니다.')
    } finally {
      setIsPublishing(false)
    }
  }

  // 수정하기 (1단계로 돌아가기)
  const handleEdit = () => {
    setCurrentStep('input')
    setGeneratedData(null)
    setFinalForm(null)
    setError(null)
  }

  // 성공 화면
  if (currentStep === 'success') {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-800">게시글이 성공적으로 발행되었습니다!</h3>
            <p className="text-muted-foreground">AI가 생성한 컨텐츠로 전문적인 게시글이 완성되었습니다.</p>
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

  // 미리보기 & 편집 단계
  if (currentStep === 'preview' && finalForm && generatedData) {
    return (
      <div className="space-y-6">
        {/* 상단 액션 버튼 */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handleEdit}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            다시 작성
          </Button>
          
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handlePublish(true)}
              disabled={isPublishing}
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              임시저장
            </Button>
            <Button
              type="button"
              onClick={() => handlePublish(false)}
              disabled={isPublishing}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isPublishing ? "게시 중..." : "게시하기"}
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* AI 생성 안내 */}
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Wand2 className="w-6 h-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-semibold text-purple-900 mb-2">AI가 생성한 컨텐츠</h3>
                <p className="text-purple-800 text-sm">
                  AI가 자동으로 생성한 컨텐츠입니다. 필요에 따라 수정하신 후 게시하세요.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

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
                value={finalForm.title}
                onChange={(e) => setFinalForm(prev => prev ? { ...prev, title: e.target.value } : null)}
                placeholder="게시글 제목을 입력하세요"
                className="font-medium"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL 슬러그 *</Label>
              <Input
                id="slug"
                value={finalForm.slug}
                onChange={(e) => setFinalForm(prev => prev ? { ...prev, slug: e.target.value } : null)}
                placeholder="url-slug-example"
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                URL: /board/{finalForm.slug}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">요약</Label>
              <Textarea
                id="excerpt"
                value={finalForm.excerpt}
                onChange={(e) => setFinalForm(prev => prev ? { ...prev, excerpt: e.target.value } : null)}
                placeholder="게시글의 간단한 요약"
                rows={3}
                maxLength={300}
              />
              <p className="text-xs text-muted-foreground">
                {finalForm.excerpt.length}/300자
              </p>
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
              <RichTextEditor
                ref={previewEditorRef}
                content={finalForm.content}
                onChange={(content) => setFinalForm(prev => prev ? { ...prev, content } : null)}
                placeholder="게시글 내용을 편집하세요"
              />
              <p className="text-xs text-muted-foreground">
                AI가 생성한 내용을 워드프로세서처럼 편집할 수 있습니다. 필요에 따라 수정하세요.
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
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="featuredImage">대표 이미지 URL (선택사항)</Label>
              <Input
                id="featuredImage"
                value={finalForm.featured_image}
                onChange={(e) => setFinalForm(prev => prev ? { ...prev, featured_image: e.target.value } : null)}
                placeholder="https://example.com/image.jpg"
                type="url"
              />
              <p className="text-xs text-muted-foreground">
                게시글 목록에서 보여질 대표 이미지의 URL을 입력하세요.
              </p>
            </div>

            {/* AI 추천 이미지 정보 */}
            {generatedData.suggestedFeaturedImage && (
              <div className="p-3 bg-muted rounded-md">
                <Label className="text-sm font-medium text-muted-foreground">AI 추천 이미지</Label>
                <p className="text-sm mt-1">{generatedData.suggestedFeaturedImage}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* SEO 설정 섹션 */}
        <Card>
          <CardHeader>
            <CardTitle>SEO 설정</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">SEO 제목</Label>
              <Input
                id="metaTitle"
                value={finalForm.meta_title}
                onChange={(e) => setFinalForm(prev => prev ? { ...prev, meta_title: e.target.value } : null)}
                placeholder="검색엔진에 표시될 제목 (30자 이내 권장)"
                maxLength={60}
              />
              <p className="text-xs text-muted-foreground">
                {finalForm.meta_title.length}/60자
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaDescription">SEO 설명</Label>
              <Textarea
                id="metaDescription"
                value={finalForm.meta_description}
                onChange={(e) => setFinalForm(prev => prev ? { ...prev, meta_description: e.target.value } : null)}
                placeholder="검색엔진에 표시될 설명 (100자 이내 권장)"
                rows={3}
                maxLength={160}
              />
              <p className="text-xs text-muted-foreground">
                {finalForm.meta_description.length}/160자
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
                <Label>즉시 게시</Label>
                <p className="text-sm text-muted-foreground">
                  체크 해제 시 임시저장됩니다
                </p>
              </div>
              <Switch
                checked={finalForm.is_published}
                onCheckedChange={(checked) => setFinalForm(prev => prev ? { ...prev, is_published: checked } : null)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>추천 게시글</Label>
                <p className="text-sm text-muted-foreground">
                  메인 페이지에 우선 표시됩니다
                </p>
              </div>
              <Switch
                checked={finalForm.is_featured}
                onCheckedChange={(checked) => setFinalForm(prev => prev ? { ...prev, is_featured: checked } : null)}
              />
            </div>
          </CardContent>
        </Card>

        {/* 하단 액션 버튼 */}
        <div className="flex justify-end gap-2 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleEdit}
          >
            다시 작성
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handlePublish(true)}
            disabled={isPublishing}
          >
            임시저장
          </Button>
          <Button
            type="button"
            onClick={() => handlePublish(false)}
            disabled={isPublishing}
          >
            {isPublishing ? "게시 중..." : "게시하기"}
          </Button>
        </div>
      </div>
    )
  }

  // 입력 단계 (기본)
  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Supabase 설정 확인 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            이미지 업로드 설정 확인
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-center">
            <Button
              type="button"
              variant="outline"
              onClick={handleCheckSetup}
              disabled={isGenerating}
              className="flex items-center gap-2"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Settings className="w-4 h-4" />}
              설정 확인
            </Button>
            {setupCheck && (
              <div className={`flex items-center gap-2 ${setupCheck.success ? 'text-green-600' : 'text-red-600'}`}>
                {setupCheck.success ? '✅ 이미지 업로드 준비됨' : '❌ 설정 오류'}
              </div>
            )}
          </div>
          {setupCheck && !setupCheck.success && (
            <Alert variant="destructive">
              <AlertDescription>
                {setupCheck.error}
                <br />
                <strong>해결방법:</strong>
                <br />
                1. Supabase 대시보드에서 Storage 탭으로 이동
                <br />
                2. 'board-images' 버킷 생성
                <br />
                3. 버킷에 대해 공개 정책 설정 확인
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* 이미지 업로드 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            이미지 업로드
            {uploadedImages.length > 0 && (
              <Badge variant="outline">{uploadedImages.length}개</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
              최대 파일 크기: 10MB | 지원 형식: JPG, PNG, WebP, GIF<br/>
              여러 개의 이미지를 한 번에 선택할 수 있습니다.
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

      {/* 안내 메시지 */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Wand2 className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">AI 기반 간편 작성</h3>
              <p className="text-blue-800 text-sm">
                제목과 내용만 입력하면 AI가 자동으로 다음을 생성합니다:
              </p>
              <ul className="text-blue-800 text-sm mt-2 space-y-1 list-disc list-inside ml-4">
                <li>HTML 형식으로 변환된 전문적인 컨텐츠</li>
                <li>SEO 최적화된 제목과 설명</li>
                <li>URL 슬러그와 요약문</li>
                <li>검색엔진 최적화 메타데이터</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 간단한 입력 폼 */}
      <Card>
        <CardHeader>
          <CardTitle>1단계: 기본 정보 입력</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">제목 *</Label>
            <Input
              id="title"
              value={simpleForm.title}
              onChange={(e) => setSimpleForm(prev => ({ ...prev, title: e.target.value }))}
              placeholder="게시글 제목을 입력하세요"
              maxLength={255}
              required
            />
            <p className="text-xs text-muted-foreground">
              {simpleForm.title.length}/255자
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">내용 *</Label>
            <RichTextEditor
              ref={inputEditorRef}
              content={simpleForm.content}
              onChange={(content) => setSimpleForm(prev => ({ ...prev, content }))}
              placeholder="게시글 내용을 자유롭게 작성하세요. 이미지를 업로드한 후 '에디터에 삽입' 버튼으로 쉽게 추가할 수 있습니다."
            />
            <p className="text-xs text-muted-foreground">
              워드프로세서처럼 직관적으로 작성하세요. 툴바 버튼으로 텍스트 서식을 쉽게 적용할 수 있습니다.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 액션 버튼 */}
      <div className="flex gap-4">
        <Link href="/board" className="flex-1">
          <Button type="button" variant="outline" className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            취소
          </Button>
        </Link>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !simpleForm.title.trim() || !simpleForm.content.trim()}
          className="flex-1"
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Wand2 className="w-4 h-4 mr-2" />
          )}
          AI로 컨텐츠 생성하기
        </Button>
      </div>
    </div>
  )
} 