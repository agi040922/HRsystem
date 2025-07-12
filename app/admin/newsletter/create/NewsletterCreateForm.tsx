"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Loader2, ArrowLeft, Save, Upload, FileText, Image, Calendar, Globe, BookOpen, Settings } from "lucide-react"
import Link from "next/link"
import { createNewsletter, uploadNewsletterFile, uploadCoverImage, generateDefaultCoverImage, dataURLtoBlob, checkSupabaseSetup } from "@/lib/newsletter"

interface FormData {
  title: string
  description: string
  language: 'ko' | 'en'
  published_date: string
  is_active: boolean
}

export default function NewsletterCreateForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [setupCheck, setSetupCheck] = useState<{success: boolean, error: string | null} | null>(null)
  
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    language: 'ko',
    published_date: new Date().toISOString().split('T')[0],
    is_active: true,
  })

  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Supabase 설정 확인 함수
  const handleCheckSetup = async () => {
    setIsLoading(true)
    const result = await checkSupabaseSetup()
    setSetupCheck(result)
    setIsLoading(false)
  }

  // PDF 파일 선택 핸들러
  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type === 'application/pdf') {
        setPdfFile(file)
        setError(null)
      } else {
        setError('PDF 파일만 업로드할 수 있습니다.')
        setPdfFile(null)
      }
    }
  }

  // 표지 이미지 파일 선택 핸들러
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp']
      if (validTypes.includes(file.type)) {
        setCoverImageFile(file)
        // 미리보기 생성
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreviewUrl(e.target?.result as string)
        }
        reader.readAsDataURL(file)
        setError(null)
      } else {
        setError('JPG, PNG, WebP 이미지만 업로드할 수 있습니다.')
        setCoverImageFile(null)
        setPreviewUrl(null)
      }
    }
  }

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setUploadProgress(0)

    try {
      // 필수 필드 검증
      if (!formData.title.trim()) {
        throw new Error('제목을 입력해주세요.')
      }
      if (!pdfFile) {
        throw new Error('PDF 파일을 선택해주세요.')
      }

      // 파일 업로드 전 설정 확인
      console.log('📋 파일 업로드 시작...')
      setUploadProgress(10)
      
      const { publicUrl: fileUrl, error: fileError } = await uploadNewsletterFile(pdfFile, pdfFile.name)
      if (fileError) {
        console.error('파일 업로드 실패:', fileError)
        const errorMessage = fileError && typeof fileError === 'object' && 'message' in fileError 
          ? (fileError as any).message 
          : '알 수 없는 오류'
        throw new Error(`PDF 파일 업로드에 실패했습니다: ${errorMessage}`)
      }

      // 표지 이미지 업로드 (선택사항)
      let coverImageUrl = null
      if (coverImageFile) {
        setUploadProgress(50)
        const { publicUrl: coverUrl, error: coverError } = await uploadCoverImage(coverImageFile, coverImageFile.name)
        if (coverError) {
          console.warn('표지 이미지 업로드에 실패했습니다:', coverError)
        } else {
          coverImageUrl = coverUrl
        }
      } else {
        // 표지 이미지가 없는 경우 기본 표지 생성
        try {
          setUploadProgress(50)
          const defaultCoverDataURL = generateDefaultCoverImage(formData.title, formData.language)
          if (defaultCoverDataURL) {
            const blob = dataURLtoBlob(defaultCoverDataURL)
            const file = new File([blob], `default-cover-${Date.now()}.jpg`, { type: 'image/jpeg' })
            const { publicUrl: defaultCoverUrl, error: defaultCoverError } = await uploadCoverImage(file, file.name)
            if (!defaultCoverError) {
              coverImageUrl = defaultCoverUrl
            }
          }
        } catch (error) {
          console.warn('기본 표지 이미지 생성에 실패했습니다:', error)
        }
      }

      // 주간지 생성
      setUploadProgress(75)
      const newsletterData = {
        ...formData,
        file_url: fileUrl!,
        cover_image_url: coverImageUrl || undefined,
        file_size: pdfFile.size,
      }

      const { newsletter, error: createError } = await createNewsletter(newsletterData)
      if (createError) {
        throw new Error('주간지 생성에 실패했습니다.')
      }

      setUploadProgress(100)
      setSuccess(true)
      
      // 성공 시 목록 페이지로 이동
      setTimeout(() => {
        router.push('/admin/newsletter')
      }, 2000)

    } catch (err) {
      console.error('주간지 업로드 오류:', err)
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Save className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-800">주간지가 성공적으로 업로드되었습니다!</h3>
            <p className="text-muted-foreground">잠시 후 주간지 관리 페이지로 이동합니다.</p>
            <div className="flex gap-2 justify-center">
              <Link href="/admin/newsletter">
                <Button>주간지 관리</Button>
              </Link>
              <Button variant="outline" onClick={() => window.location.reload()}>
                새 주간지 업로드
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Supabase 설정 확인 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Supabase 설정 확인
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-center">
            <Button
              type="button"
              variant="outline"
              onClick={handleCheckSetup}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
              설정 확인
            </Button>
            {setupCheck && (
              <div className={`flex items-center gap-2 ${setupCheck.success ? 'text-green-600' : 'text-red-600'}`}>
                {setupCheck.success ? '✅ 설정 정상' : '❌ 설정 오류'}
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
                2. 'newsletters'와 'newsletter-covers' 버킷 생성
                <br />
                3. 각 버킷에 대해 공개 정책 설정 확인
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* 업로드 진행률 */}
      {isLoading && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>업로드 진행률</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* 기본 정보 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            기본 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">제목 *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="주간지 제목을 입력하세요"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">언어 *</Label>
              <Select value={formData.language} onValueChange={(value: 'ko' | 'en') => setFormData(prev => ({ ...prev, language: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ko">한국어</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="주간지에 대한 간단한 설명을 입력하세요"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="published_date">발행일 *</Label>
              <Input
                id="published_date"
                type="date"
                value={formData.published_date}
                onChange={(e) => setFormData(prev => ({ ...prev, published_date: e.target.value }))}
                required
              />
            </div>

            <div className="flex items-center justify-between pt-8">
              <div className="space-y-0.5">
                <Label>활성 상태</Label>
                <p className="text-sm text-muted-foreground">
                  비활성화 시 사용자에게 보이지 않습니다
                </p>
              </div>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PDF 파일 업로드 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            PDF 파일 업로드
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pdf-file">PDF 파일 *</Label>
            <Input
              id="pdf-file"
              type="file"
              accept=".pdf"
              onChange={handlePdfFileChange}
              required
            />
            {pdfFile && (
              <div className="text-sm text-muted-foreground">
                선택된 파일: {pdfFile.name} ({Math.round(pdfFile.size / 1024)}KB)
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 표지 이미지 업로드 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            표지 이미지 업로드 (선택사항)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cover-image">표지 이미지</Label>
            <Input
              id="cover-image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleCoverImageChange}
            />
            <p className="text-sm text-muted-foreground">
              표지 이미지를 업로드하지 않으면 제목을 기반으로 기본 표지가 자동 생성됩니다.
            </p>
            {coverImageFile && (
              <div className="text-sm text-muted-foreground">
                선택된 파일: {coverImageFile.name} ({Math.round(coverImageFile.size / 1024)}KB)
              </div>
            )}
          </div>

          {previewUrl && (
            <div className="space-y-2">
              <Label>미리보기</Label>
              <div className="aspect-[4/3] w-64 relative overflow-hidden rounded-lg border">
                <img
                  src={previewUrl}
                  alt="표지 이미지 미리보기"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* 기본 표지 미리보기 */}
          {!coverImageFile && formData.title && (
            <div className="space-y-2">
              <Label>기본 표지 미리보기</Label>
              <div className="aspect-[4/3] w-64 relative overflow-hidden rounded-lg border bg-gradient-to-br from-blue-700 to-blue-600 flex items-center justify-center">
                <div className="text-center p-4">
                  <BookOpen className="w-8 h-8 text-white mx-auto mb-4" />
                  <div className="text-white font-bold text-sm line-clamp-3">
                    {formData.title}
                  </div>
                  <div className="text-white/80 text-xs mt-2">
                    {formData.language === 'ko' ? '한국어판' : 'English Edition'}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                표지 이미지를 업로드하지 않으면 이와 같은 기본 표지가 생성됩니다.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 액션 버튼 */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Link href="/admin/newsletter" className="flex-1">
          <Button type="button" variant="outline" className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            취소
          </Button>
        </Link>
        
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
          {isLoading ? '업로드 중...' : '주간지 업로드'}
        </Button>
      </div>
    </form>
  )
} 