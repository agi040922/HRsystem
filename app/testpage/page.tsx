'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, XCircle, Upload } from 'lucide-react'

export default function TestPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
    url?: string
  } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResult(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setResult({
        success: false,
        message: '파일을 선택해주세요.'
      })
      return
    }

    setUploading(true)
    setResult(null)

    try {
      // 파일명 생성 (타임스탬프 + 원본 파일명)
      const timestamp = Date.now()
      const fileName = `test_${timestamp}_${file.name}`
      
      console.log('업로드 시작:', {
        fileName,
        fileSize: file.size,
        fileType: file.type
      })

      // Supabase 스토리지에 업로드
      const { data, error } = await supabase.storage
        .from('newsletter-covers')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('업로드 실패:', error)
        setResult({
          success: false,
          message: `업로드 실패: ${error.message}`
        })
        return
      }

      console.log('업로드 성공:', data)

      // 업로드 성공 시 공개 URL 생성
      const { data: publicUrlData } = supabase.storage
        .from('newsletter-covers')
        .getPublicUrl(fileName)

      setResult({
        success: true,
        message: '파일 업로드 성공!',
        url: publicUrlData.publicUrl
      })

    } catch (error) {
      console.error('예상치 못한 오류:', error)
      setResult({
        success: false,
        message: `예상치 못한 오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}`
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📤 Supabase 스토리지 테스트
          </h1>
          <p className="text-gray-600">
            파일 업로드 기능을 테스트하는 페이지입니다.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              파일 업로드 테스트
            </CardTitle>
            <CardDescription>
              newsletter-covers 버킷에 파일을 업로드합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 파일 선택 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                파일 선택
              </label>
              <Input
                type="file"
                onChange={handleFileChange}
                accept="image/*,application/pdf,.txt,.doc,.docx"
                className="cursor-pointer"
              />
              {file && (
                <p className="text-sm text-gray-500">
                  선택된 파일: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            {/* 업로드 버튼 */}
            <Button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="w-full"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  업로드 중...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  파일 업로드
                </>
              )}
            </Button>

            {/* 결과 표시 */}
            {result && (
              <Alert className={result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                <div className="flex items-center gap-2">
                  {result.success ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600" />
                  )}
                  <AlertDescription className={result.success ? 'text-green-800' : 'text-red-800'}>
                    {result.message}
                  </AlertDescription>
                </div>
                {result.success && result.url && (
                  <div className="mt-2 pt-2 border-t border-green-200">
                    <p className="text-sm text-green-700 font-medium">공개 URL:</p>
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 underline break-all"
                    >
                      {result.url}
                    </a>
                  </div>
                )}
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* 디버깅 정보 */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm">🔍 디버깅 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Project URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL}
              </p>
              <p>
                <strong>스토리지 버킷:</strong> newsletter-covers
              </p>
              <p>
                <strong>업로드 경로:</strong> /storage/v1/object/newsletter-covers/[파일명]
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 