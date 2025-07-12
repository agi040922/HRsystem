"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Save, FileText, Image, Calendar, Download, Upload, BookOpen } from "lucide-react"
import Link from "next/link"
import { updateNewsletter, uploadNewsletterFile, uploadCoverImage, deleteNewsletterFile, deleteCoverImage, generateDefaultCoverImage, dataURLtoBlob } from "@/lib/newsletter"
import { Newsletter } from "@/lib/newsletter"

interface NewsletterEditFormProps {
  newsletter: Newsletter
}

export default function NewsletterEditForm({ newsletter }: NewsletterEditFormProps) {
  const router = useRouter()
  
  const [title, setTitle] = useState(newsletter.title)
  const [description, setDescription] = useState(newsletter.description || "")
  const [language, setLanguage] = useState(newsletter.language)
  const [publishedDate, setPublishedDate] = useState(newsletter.published_date)
  const [isActive, setIsActive] = useState(newsletter.is_active)
  
  const [newPdfFile, setNewPdfFile] = useState<File | null>(null)
  const [newCoverImageFile, setNewCoverImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // PDF 파일 변경 핸들러
  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type === 'application/pdf') {
        setNewPdfFile(file)
        setError(null)
      } else {
        setError('PDF 파일만 업로드할 수 있습니다.')
        setNewPdfFile(null)
      }
    }
  }

  // 표지 이미지 변경 핸들러
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp']
      if (validTypes.includes(file.type)) {
        setNewCoverImageFile(file)
        // 미리보기 생성
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreviewUrl(e.target?.result as string)
        }
        reader.readAsDataURL(file)
        setError(null)
      } else {
        setError('JPG, PNG, WebP 이미지만 업로드할 수 있습니다.')
        setNewCoverImageFile(null)
        setPreviewUrl(null)
      }
    }
  }

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (!title.trim()) {
        throw new Error('제목을 입력해주세요.')
      }

      let updatedData: any = {
        title: title.trim(),
        description: description.trim() || null,
        language,
        published_date: publishedDate,
        is_active: isActive,
      }

      // 새 PDF 파일이 있으면 업로드
      if (newPdfFile) {
        const { publicUrl: fileUrl, error: fileError } = await uploadNewsletterFile(newPdfFile, newPdfFile.name)
        if (fileError) {
          throw new Error('PDF 파일 업로드에 실패했습니다.')
        }
        updatedData.file_url = fileUrl
        updatedData.file_size = newPdfFile.size
      }

      // 새 표지 이미지가 있으면 업로드
      if (newCoverImageFile) {
        const { publicUrl: coverUrl, error: coverError } = await uploadCoverImage(newCoverImageFile, newCoverImageFile.name)
        if (coverError) {
          console.warn('표지 이미지 업로드에 실패했습니다:', coverError)
        } else {
          updatedData.cover_image_url = coverUrl
        }
      } else if (!newsletter.cover_image_url && title.trim()) {
        // 기존 표지 이미지가 없고 새로 업로드하지 않은 경우 기본 표지 생성
        try {
          const defaultCoverDataURL = generateDefaultCoverImage(title.trim(), language)
          if (defaultCoverDataURL) {
            const blob = dataURLtoBlob(defaultCoverDataURL)
            const file = new File([blob], `default-cover-${Date.now()}.jpg`, { type: 'image/jpeg' })
            const { publicUrl: defaultCoverUrl, error: defaultCoverError } = await uploadCoverImage(file, file.name)
            if (!defaultCoverError) {
              updatedData.cover_image_url = defaultCoverUrl
            }
          }
        } catch (error) {
          console.warn('기본 표지 이미지 생성에 실패했습니다:', error)
        }
      }

      // 주간지 업데이트
      const { error: updateError } = await updateNewsletter(newsletter.id, updatedData)
      if (updateError) {
        throw new Error('주간지 수정에 실패했습니다.')
      }

      setSuccess('주간지가 성공적으로 수정되었습니다!')
      setTimeout(() => {
        router.push('/admin/newsletter')
      }, 1500)

    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* 상단 액션 버튼 */}
      <div className="flex justify-between items-center">
        <Link href="/admin/newsletter">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            목록으로
          </Button>
        </Link>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => window.open(newsletter.file_url, '_blank')}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            현재 파일 다운로드
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isLoading ? "수정 중..." : "수정하기"}
          </Button>
        </div>
      </div>

      {/* 주간지 정보 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            주간지 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">생성일:</span>
              <span>{formatDate(newsletter.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">파일 크기:</span>
              <span>{newsletter.file_size ? `${Math.round(newsletter.file_size / 1024)}KB` : '정보 없음'}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant={newsletter.is_active ? "default" : "secondary"}>
              {newsletter.is_active ? "활성" : "비활성"}
            </Badge>
            <Badge variant={newsletter.language === 'ko' ? "default" : "outline"}>
              {newsletter.language === 'ko' ? '한국어' : 'English'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* 에러/성공 메시지 */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 text-green-800 bg-green-50">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* 기본 정보 수정 */}
      <Card>
        <CardHeader>
          <CardTitle>기본 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">제목 *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="주간지 제목을 입력하세요"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">언어 *</Label>
              <Select value={language} onValueChange={(value: 'ko' | 'en') => setLanguage(value)}>
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
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
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PDF 파일 교체 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            PDF 파일 교체
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-pdf-file">새 PDF 파일 (선택사항)</Label>
            <Input
              id="new-pdf-file"
              type="file"
              accept=".pdf"
              onChange={handlePdfFileChange}
            />
            {newPdfFile && (
              <div className="text-sm text-muted-foreground">
                새 파일: {newPdfFile.name} ({Math.round(newPdfFile.size / 1024)}KB)
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              파일을 선택하지 않으면 기존 파일을 유지합니다.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 표지 이미지 교체 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            표지 이미지 교체
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-cover-image">새 표지 이미지 (선택사항)</Label>
            <Input
              id="new-cover-image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleCoverImageChange}
            />
            <p className="text-sm text-muted-foreground">
              새 이미지를 업로드하지 않으면 기존 이미지를 유지합니다. 기존 이미지가 없으면 제목을 기반으로 기본 표지가 생성됩니다.
            </p>
            {newCoverImageFile && (
              <div className="text-sm text-muted-foreground">
                새 파일: {newCoverImageFile.name} ({Math.round(newCoverImageFile.size / 1024)}KB)
              </div>
            )}
          </div>

          {/* 현재 표지 이미지 및 새 이미지 미리보기 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 현재 표지 이미지 */}
            <div className="space-y-2">
              <Label>현재 표지 이미지</Label>
              <div className="aspect-[4/3] w-64 relative overflow-hidden rounded-lg border">
                {newsletter.cover_image_url ? (
                  <img
                    src={newsletter.cover_image_url}
                    alt="현재 표지 이미지"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">이미지 없음</span>
                  </div>
                )}
              </div>
            </div>

            {/* 새 표지 이미지 미리보기 */}
            {previewUrl && (
              <div className="space-y-2">
                <Label>새 표지 이미지 미리보기</Label>
                <div className="aspect-[4/3] w-64 relative overflow-hidden rounded-lg border">
                  <img
                    src={previewUrl}
                    alt="새 표지 이미지 미리보기"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 기본 표지 미리보기 */}
          {!newsletter.cover_image_url && !newCoverImageFile && title && (
            <div className="space-y-2">
              <Label>기본 표지 미리보기</Label>
              <div className="aspect-[4/3] w-64 relative overflow-hidden rounded-lg border bg-gradient-to-br from-blue-700 to-blue-600 flex items-center justify-center">
                <div className="text-center p-4">
                  <BookOpen className="w-8 h-8 text-white mx-auto mb-4" />
                  <div className="text-white font-bold text-sm line-clamp-3">
                    {title}
                  </div>
                  <div className="text-white/80 text-xs mt-2">
                    {language === 'ko' ? '한국어판' : 'English Edition'}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                기존 표지 이미지가 없으므로 이와 같은 기본 표지가 생성됩니다.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 