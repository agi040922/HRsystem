import { supabase } from './supabase'

export interface Newsletter {
  id: number
  title: string
  description: string | null
  cover_image_url: string | null
  file_url: string
  file_size: number | null
  language: 'ko' | 'en'
  published_date: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface NewsletterCreateData {
  title: string
  description?: string
  cover_image_url?: string
  file_url: string
  file_size?: number
  language: 'ko' | 'en'
  published_date: string
  is_active?: boolean
}

export interface NewsletterUpdateData {
  title?: string
  description?: string
  cover_image_url?: string
  file_url?: string
  file_size?: number
  language?: 'ko' | 'en'
  published_date?: string
  is_active?: boolean
}

// 활성화된 뉴스레터 목록 조회 (공개용)
export async function getActiveNewsletters(language?: 'ko' | 'en') {
  let query = supabase
    .from('newsletters')
    .select('*')
    .eq('is_active', true)
    .order('published_date', { ascending: false })

  if (language) {
    query = query.eq('language', language)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching newsletters:', error)
    return { newsletters: [], error }
  }

  return { newsletters: data as Newsletter[], error: null }
}

// 최신 뉴스레터 조회 (언어별)
export async function getLatestNewsletters(limit: number = 6) {
  const { data, error } = await supabase
    .from('newsletters')
    .select('*')
    .eq('is_active', true)
    .order('published_date', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching latest newsletters:', error)
    return { newsletters: [], error }
  }

  return { newsletters: data as Newsletter[], error: null }
}

// 관리자용 모든 뉴스레터 조회
export async function getAdminNewsletters(page: number = 1, limit: number = 10, searchQuery?: string) {
  const start = (page - 1) * limit
  const end = start + limit - 1

  let query = supabase
    .from('newsletters')
    .select('*', { count: 'exact' })
    .order('published_date', { ascending: false })
    .range(start, end)

  if (searchQuery) {
    query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
  }

  const { data, error, count } = await query

  if (error) {
    console.error('Error fetching admin newsletters:', error)
    return { newsletters: [], count: 0, error }
  }

  return { newsletters: data as Newsletter[], count: count || 0, error: null }
}

// 특정 뉴스레터 조회
export async function getNewsletterById(id: number) {
  const { data, error } = await supabase
    .from('newsletters')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching newsletter:', error)
    return { newsletter: null, error }
  }

  return { newsletter: data as Newsletter, error: null }
}

// 뉴스레터 생성
export async function createNewsletter(newsletterData: NewsletterCreateData) {
  const { data, error } = await supabase
    .from('newsletters')
    .insert([newsletterData])
    .select()
    .single()

  if (error) {
    console.error('Error creating newsletter:', error)
    return { newsletter: null, error }
  }

  return { newsletter: data as Newsletter, error: null }
}

// 뉴스레터 업데이트
export async function updateNewsletter(id: number, newsletterData: NewsletterUpdateData) {
  const { data, error } = await supabase
    .from('newsletters')
    .update(newsletterData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating newsletter:', error)
    return { newsletter: null, error }
  }

  return { newsletter: data as Newsletter, error: null }
}

// 뉴스레터 삭제
export async function deleteNewsletter(id: number) {
  const { error } = await supabase
    .from('newsletters')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting newsletter:', error)
    return { success: false, error }
  }

  return { success: true, error: null }
}

// 파일명을 안전한 형태로 변환하는 함수
function sanitizeFileName(fileName: string): string {
  // 1. 파일 확장자 분리
  const lastDotIndex = fileName.lastIndexOf('.')
  const name = lastDotIndex > 0 ? fileName.substring(0, lastDotIndex) : fileName
  const extension = lastDotIndex > 0 ? fileName.substring(lastDotIndex) : ''
  
  // 2. 파일명을 안전한 형태로 변환
  const sanitizedName = name
    .replace(/[^\w\s-]/g, '') // 영문, 숫자, 공백, 하이픈만 허용
    .replace(/\s+/g, '_') // 공백을 언더스코어로 변경
    .replace(/_+/g, '_') // 연속된 언더스코어를 하나로 통합
    .replace(/^_|_$/g, '') // 시작과 끝의 언더스코어 제거
    .toLowerCase() // 소문자로 변환
  
  // 3. 파일명이 비어있으면 기본명 사용
  const finalName = sanitizedName || 'file'
  
  return `${finalName}${extension.toLowerCase()}`
}

// 파일 업로드 (PDF)
export async function uploadNewsletterFile(file: File, fileName: string) {
  try {
    // 파일명을 안전한 형태로 변환
    const sanitizedFileName = sanitizeFileName(fileName)
    const uniqueFileName = `${Date.now()}_${sanitizedFileName}`
    
    console.log('Original filename:', fileName)
    console.log('Sanitized filename:', sanitizedFileName)
    console.log('Final filename:', uniqueFileName)
    
    const { data, error } = await supabase.storage
      .from('newsletters')
      .upload(uniqueFileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Error uploading file:', {
        message: error.message,
        error: error
      })
      return { filePath: null, publicUrl: null, error }
    }

    // 공개 URL 생성
    const { data: { publicUrl } } = supabase.storage
      .from('newsletters')
      .getPublicUrl(data.path)

    return { filePath: data.path, publicUrl, error: null }
  } catch (err) {
    console.error('Unexpected error in uploadNewsletterFile:', err)
    return { filePath: null, publicUrl: null, error: err }
  }
}

// 표지 이미지 업로드
export async function uploadCoverImage(file: File, fileName: string) {
  try {
    // 파일명을 안전한 형태로 변환
    const sanitizedFileName = sanitizeFileName(fileName)
    const uniqueFileName = `${Date.now()}_${sanitizedFileName}`
    
    console.log('Original cover filename:', fileName)
    console.log('Sanitized cover filename:', sanitizedFileName)
    console.log('Final cover filename:', uniqueFileName)
    
    const { data, error } = await supabase.storage
      .from('newsletter-covers')
      .upload(uniqueFileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Error uploading cover image:', {
        message: error.message,
        error: error
      })
      return { filePath: null, publicUrl: null, error }
    }

    // 공개 URL 생성
    const { data: { publicUrl } } = supabase.storage
      .from('newsletter-covers')
      .getPublicUrl(data.path)

    return { filePath: data.path, publicUrl, error: null }
  } catch (err) {
    console.error('Unexpected error in uploadCoverImage:', err)
    return { filePath: null, publicUrl: null, error: err }
  }
}

// 파일 삭제
export async function deleteNewsletterFile(filePath: string) {
  const { error } = await supabase.storage
    .from('newsletters')
    .remove([filePath])

  if (error) {
    console.error('Error deleting file:', error)
    return { success: false, error }
  }

  return { success: true, error: null }
}

// 표지 이미지 삭제
export async function deleteCoverImage(filePath: string) {
  const { error } = await supabase.storage
    .from('newsletter-covers')
    .remove([filePath])

  if (error) {
    console.error('Error deleting cover image:', error)
    return { success: false, error }
  }

  return { success: true, error: null }
}

// 파일 크기 포맷팅
export function formatFileSize(bytes: number | null): string {
  if (!bytes) return '크기 정보 없음'
  
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 날짜 포맷팅
export function formatNewsletterDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
} 

// 기본 표지 이미지 생성 함수
export function generateDefaultCoverImage(title: string, language: 'ko' | 'en'): string {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  if (!ctx) {
    return ''
  }
  
  // 캔버스 크기 설정 (4:3 비율)
  canvas.width = 800
  canvas.height = 600
  
  // 배경 그라데이션
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
  gradient.addColorStop(0, '#1e40af') // blue-700
  gradient.addColorStop(0.5, '#3b82f6') // blue-500
  gradient.addColorStop(1, '#1d4ed8') // blue-600
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // 패턴 추가
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const radius = Math.random() * 3 + 1
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fill()
  }
  
  // 제목 텍스트
  ctx.fillStyle = 'white'
  ctx.font = 'bold 48px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  
  // 제목을 여러 줄로 나누기
  const words = title.split(' ')
  const lines = []
  let currentLine = ''
  
  for (const word of words) {
    const testLine = currentLine + word + ' '
    const metrics = ctx.measureText(testLine)
    if (metrics.width > canvas.width - 80 && currentLine !== '') {
      lines.push(currentLine.trim())
      currentLine = word + ' '
    } else {
      currentLine = testLine
    }
  }
  lines.push(currentLine.trim())
  
  // 제목 텍스트 렌더링
  const startY = canvas.height / 2 - (lines.length - 1) * 30
  lines.forEach((line, index) => {
    ctx.fillText(line, canvas.width / 2, startY + index * 60)
  })
  
  // 언어 표시
  ctx.font = 'bold 24px Arial, sans-serif'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
  ctx.fillText(language === 'ko' ? '한국어판' : 'English Edition', canvas.width / 2, canvas.height - 50)
  
  // 아이콘 추가 (간단한 책 아이콘)
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.rect(canvas.width / 2 - 20, 80, 40, 50)
  ctx.stroke()
  
  // 책 페이지 선
  ctx.beginPath()
  ctx.moveTo(canvas.width / 2 - 15, 90)
  ctx.lineTo(canvas.width / 2 + 15, 90)
  ctx.moveTo(canvas.width / 2 - 15, 100)
  ctx.lineTo(canvas.width / 2 + 15, 100)
  ctx.moveTo(canvas.width / 2 - 15, 110)
  ctx.lineTo(canvas.width / 2 + 15, 110)
  ctx.stroke()
  
  return canvas.toDataURL('image/jpeg', 0.9)
}

// 기본 표지 이미지를 Blob으로 변환
export function dataURLtoBlob(dataURL: string): Blob {
  const arr = dataURL.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
} 

// Supabase 설정 확인 함수
export async function checkSupabaseSetup() {
  try {
    console.log('🔍 Supabase 설정 확인 중...')
    
    // 0. 환경 변수 확인
    console.log('🔧 환경 변수 확인:')
    console.log('- SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ 설정됨' : '❌ 누락')
    console.log('- SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ 설정됨' : '❌ 누락')
    console.log('- 전체 Project URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('- Anon Key 앞 20자:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...')
    
    // 프로젝트 ID 추출
    const projectId = process.env.NEXT_PUBLIC_SUPABASE_URL?.split('.')[0]?.split('://')[1]
    console.log('- 추출된 프로젝트 ID:', projectId)
    
    // 1. 데이터베이스 연결 확인
    console.log('\n📊 데이터베이스 연결 확인 중...')
    const { data: dbTest, error: dbError } = await supabase
      .from('newsletters')
      .select('count')
      .limit(1)
    
    if (dbError) {
      console.error('❌ 데이터베이스 연결 실패:', dbError.message)
      console.error('상세 오류:', dbError)
      return { success: false, error: `데이터베이스 연결 실패: ${dbError.message}` }
    }
    
    console.log('✅ 데이터베이스 연결 성공')
    
    // 2. 개별 버킷 접근을 통한 확인 (listBuckets 권한 문제 우회)
    console.log('\n📦 스토리지 버킷 확인 중...')
    console.log('💡 참고: listBuckets() 권한이 제한되어 개별 버킷 접근 방식을 사용합니다.')
    
    // 개별 버킷 접근 시도
    const newsletterTest = await supabase.storage.from('newsletters').list()
    const coverTest = await supabase.storage.from('newsletter-covers').list()
    
    console.log('🔄 개별 버킷 접근 결과:')
    console.log('- newsletters 버킷 접근:', newsletterTest.error ? '실패' : '성공')
    console.log('- newsletter-covers 버킷 접근:', coverTest.error ? '실패' : '성공')
    
    if (newsletterTest.error) {
      console.error('❌ newsletters 버킷 오류:', newsletterTest.error)
      console.error('💡 해결 방법: Supabase 대시보드 > Storage에서 "newsletters" 버킷을 생성하세요.')
      return { success: false, error: `newsletters 버킷 접근 실패: ${newsletterTest.error.message}` }
    }
    
    if (coverTest.error) {
      console.error('❌ newsletter-covers 버킷 오류:', coverTest.error)
      console.error('💡 해결 방법: Supabase 대시보드 > Storage에서 "newsletter-covers" 버킷을 생성하세요.')
      return { success: false, error: `newsletter-covers 버킷 접근 실패: ${coverTest.error.message}` }
    }
    
    console.log('✅ 필요한 스토리지 버킷이 모두 존재하고 접근 가능합니다.')
    console.log('- newsletters 버킷: 접근 가능')
    console.log('- newsletter-covers 버킷: 접근 가능')
    
    // 4. 테스트 파일 업로드 (RLS 제거로 anon 키 사용 가능)
    console.log('\n📤 테스트 파일 업로드 중...')
    console.log('💡 참고: RLS 정책이 제거되어 anon 키로 업로드가 가능합니다.')
    
    const testFile = new File(['test content'], 'test.txt', { type: 'text/plain' })
    const testFileName = `test_${Date.now()}.txt`
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('newsletters')
      .upload(testFileName, testFile, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (uploadError) {
      console.error('❌ 테스트 파일 업로드 실패:', uploadError.message)
      console.error('상세 오류:', uploadError)
      return { success: false, error: `파일 업로드 실패: ${uploadError.message}` }
    }
    
    console.log('✅ 테스트 파일 업로드 성공:', uploadData.path)
    
    // 5. 테스트 파일 삭제
    console.log('\n🗑️ 테스트 파일 삭제 중...')
    const { error: deleteError } = await supabase.storage
      .from('newsletters')
      .remove([uploadData.path])
    
    if (deleteError) {
      console.warn('⚠️ 테스트 파일 삭제 실패:', deleteError.message)
      console.warn('상세 오류:', deleteError)
    } else {
      console.log('✅ 테스트 파일 삭제 성공')
    }
    
    console.log('\n🎉 Supabase 설정이 모두 정상입니다!')
    return { success: true, error: null }
    
  } catch (err) {
    console.error('❌ Supabase 설정 확인 중 예기치 못한 오류 발생:', err)
    return { success: false, error: `설정 확인 중 오류 발생: ${err}` }
  }
} 