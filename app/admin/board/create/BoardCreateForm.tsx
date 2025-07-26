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
import { Separator } from "@/components/ui/separator"
import { Loader2, ArrowLeft, Save, Wand2, Eye, Check, Edit3, Image, FileText } from "lucide-react"
import Link from "next/link"
import { createBoardPost } from "@/lib/board"

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

type Step = 'input' | 'preview' | 'success'

export default function BoardCreateForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('input')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [simpleForm, setSimpleForm] = useState<SimpleFormData>({
    title: "",
    content: "",
  })

  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null)
  const [finalForm, setFinalForm] = useState<FinalFormData | null>(null)

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
              <Textarea
                id="content"
                value={finalForm.content}
                onChange={(e) => setFinalForm(prev => prev ? { ...prev, content: e.target.value } : null)}
                placeholder="게시글 내용 (HTML 태그 사용 가능)"
                rows={15}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                HTML 태그를 사용할 수 있습니다. 필요에 따라 수정하세요.
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
            <Textarea
              id="content"
              value={simpleForm.content}
              onChange={(e) => setSimpleForm(prev => ({ ...prev, content: e.target.value }))}
              placeholder="게시글 내용을 자유롭게 작성하세요. AI가 HTML 형식으로 변환해드립니다."
              rows={12}
              required
            />
            <p className="text-xs text-muted-foreground">
              일반 텍스트로 작성하세요. AI가 자동으로 웹에 적합한 HTML 형식으로 변환합니다.
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