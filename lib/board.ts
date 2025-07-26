import { supabase, BoardPost, BoardImage } from './supabase'

// 파일명을 안전한 형태로 변환하는 함수
function sanitizeFileName(fileName: string): string {
  // 1. 파일 확장자 분리
  const lastDotIndex = fileName.lastIndexOf('.')
  const name = lastDotIndex > 0 ? fileName.substring(0, lastDotIndex) : fileName
  const extension = lastDotIndex > 0 ? fileName.substring(lastDotIndex) : ''
  
  // 2. 파일명을 안전한 형태로 변환
  const sanitizedName = name
    .replace(/[^\w\s-]/g, '') // 영문, 숫자, 공백, 하이픈만 허용 (한글 제거)
    .replace(/\s+/g, '_') // 공백을 언더스코어로 변경
    .replace(/_+/g, '_') // 연속된 언더스코어를 하나로 통합
    .replace(/^_|_$/g, '') // 시작과 끝의 언더스코어 제거
    .toLowerCase() // 소문자로 변환
  
  // 3. 파일명이 비어있으면 기본명 사용
  const finalName = sanitizedName || 'image'
  
  return `${finalName}${extension.toLowerCase()}`
}

// 이미지 파일 업로드 (Supabase Storage)
export async function uploadBoardImageFile(file: File, fileName: string) {
  try {
    // 파일명을 안전한 형태로 변환
    const sanitizedFileName = sanitizeFileName(fileName)
    const uniqueFileName = `${Date.now()}_${sanitizedFileName}`
    
    console.log('Original image filename:', fileName)
    console.log('Sanitized image filename:', sanitizedFileName)
    console.log('Final image filename:', uniqueFileName)
    
    const { data, error } = await supabase.storage
      .from('board-images')
      .upload(uniqueFileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Error uploading board image file:', {
        message: error.message,
        error: error
      })
      return { filePath: null, publicUrl: null, error }
    }

    // 공개 URL 생성
    const { data: { publicUrl } } = supabase.storage
      .from('board-images')
      .getPublicUrl(data.path)

    return { filePath: data.path, publicUrl, error: null }
  } catch (err) {
    console.error('Unexpected error in uploadBoardImageFile:', err)
    return { filePath: null, publicUrl: null, error: err }
  }
}

// 다중 이미지 업로드
export async function uploadMultipleBoardImages(files: File[], postId?: number) {
  const uploadPromises = files.map(async (file, index) => {
    const { publicUrl, error } = await uploadBoardImageFile(file, file.name)
    
    if (error || !publicUrl) {
      return { success: false, file: file.name, error }
    }

    // 게시글 ID가 있으면 DB에도 저장
    if (postId) {
      const { image, error: dbError } = await uploadBoardImage(postId, {
        image_url: publicUrl,
        alt_text: file.name.split('.').slice(0, -1).join('.'), // 확장자 제거하고 alt_text로 사용
        display_order: index
      })
      
      if (dbError) {
        return { success: false, file: file.name, error: dbError }
      }
      
      return { success: true, file: file.name, publicUrl, imageId: image?.id }
    }

    return { success: true, file: file.name, publicUrl }
  })

  const results = await Promise.all(uploadPromises)
  return results
}

// board-images 버킷 설정 확인
export async function checkBoardImagesBucketSetup() {
  try {
    console.log('\n🔍 Board Images 버킷 설정 확인 중...')
    console.log('💡 참고: listBuckets() 권한이 제한되어 개별 버킷 접근 방식을 사용합니다.')
    
    // 개별 버킷 접근 시도 (listBuckets 권한 문제 우회)
    const boardImagesTest = await supabase.storage
      .from('board-images')
      .list('', { limit: 1 })
    
    console.log('🔄 board-images 버킷 접근 결과:')
    console.log('- board-images 버킷 접근:', boardImagesTest.error ? '실패' : '성공')
    
    if (boardImagesTest.error) {
      console.error('❌ board-images 버킷 오류:', boardImagesTest.error)
      console.error('💡 해결 방법: Supabase 대시보드 > Storage에서 "board-images" 버킷을 생성하세요.')
      return { 
        success: false, 
        error: `board-images 버킷 접근 실패: ${boardImagesTest.error.message}` 
      }
    }
    
    console.log('✅ board-images 버킷이 정상적으로 설정되었습니다.')
    console.log('- board-images 버킷: 접근 가능')
    
    // 테스트 파일 업로드로 쓰기 권한 확인
    console.log('\n📤 테스트 파일 업로드 중...')
    const testFile = new File(['test image content'], 'test-image.txt', { type: 'text/plain' })
    const testFileName = `test_image_${Date.now()}.txt`
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('board-images')
      .upload(testFileName, testFile, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (uploadError) {
      console.error('❌ 테스트 파일 업로드 실패:', uploadError.message)
      console.error('상세 오류:', uploadError)
      return { 
        success: false, 
        error: `파일 업로드 실패: ${uploadError.message}` 
      }
    }
    
    console.log('✅ 테스트 파일 업로드 성공:', uploadData.path)
    
    // 테스트 파일 삭제
    console.log('\n🗑️ 테스트 파일 삭제 중...')
    const { error: deleteError } = await supabase.storage
      .from('board-images')
      .remove([uploadData.path])
    
    if (deleteError) {
      console.warn('⚠️ 테스트 파일 삭제 실패:', deleteError.message)
      console.warn('상세 오류:', deleteError)
    } else {
      console.log('✅ 테스트 파일 삭제 성공')
    }
    
    console.log('\n🎉 board-images 버킷 설정이 정상입니다!')
    return { success: true, error: null }
    
  } catch (err) {
    console.error('Unexpected error in checkBoardImagesBucketSetup:', err)
    return { 
      success: false, 
      error: err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.' 
    }
  }
}

// 이미지 파일 삭제
export async function deleteBoardImageFile(filePath: string) {
  try {
    const { error } = await supabase.storage
      .from('board-images')
      .remove([filePath])

    if (error) {
      console.error('Error deleting board image file:', error)
      return { success: false, error }
    }

    return { success: true, error: null }
  } catch (err) {
    console.error('Unexpected error in deleteBoardImageFile:', err)
    return { success: false, error: err }
  }
}

// 게시글 목록 가져오기
export async function getBoardPosts(page: number = 1, limit: number = 10, search?: string) {
  let query = supabase
    .from('board_posts')
    .select('*')
    .eq('is_published', true)
    .order('is_featured', { ascending: false })
    .order('published_at', { ascending: false })

  // 검색 기능
  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`)
  }

  // 페이지네이션
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error, count } = await query
    .range(from, to)
    .limit(limit)

  if (error) {
    console.error('Error fetching board posts:', error)
    return { posts: [], count: 0, error }
  }

  return { posts: data as BoardPost[], count: count || 0, error: null }
}

// 어드민용 게시글 목록 가져오기 (모든 게시글 포함)
export async function getAdminBoardPosts(page: number = 1, limit: number = 10, search?: string) {
  let query = supabase
    .from('board_posts')
    .select('*', { count: 'exact' })
    .order('is_featured', { ascending: false })
    .order('published_at', { ascending: false })

  // 검색 기능
  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`)
  }

  // 페이지네이션
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error, count } = await query
    .range(from, to)
    .limit(limit)

  if (error) {
    console.error('Error fetching admin board posts:', error)
    return { posts: [], count: 0, error }
  }

  return { posts: data as BoardPost[], count: count || 0, error: null }
}

// 특정 게시글 상세 정보 가져오기
export async function getBoardPost(slug: string) {
  const { data, error } = await supabase
    .from('board_posts')
    .select(`
      *,
      board_images (
        id,
        image_url,
        alt_text,
        display_order
      )
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error) {
    // PGRST116은 결과가 없을 때 발생하는 정상적인 에러이므로 로그 출력하지 않음
    if (error.code !== 'PGRST116') {
      console.error('Error fetching board post:', error)
    }
    return { post: null, error }
  }

  return { post: data, error: null }
}

// 어드민용 게시글 상세 정보 가져오기 (발행 상태 무관)
export async function getAdminBoardPost(id: number) {
  const { data, error } = await supabase
    .from('board_posts')
    .select(`
      *,
      board_images (
        id,
        image_url,
        alt_text,
        display_order
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching admin board post:', error)
    return { post: null, error }
  }

  return { post: data, error: null }
}

// 조회수 증가
export async function incrementViews(slug: string) {
  // 먼저 현재 조회수를 가져온 후 1 증가
  const { data: currentPost, error: fetchError } = await supabase
    .from('board_posts')
    .select('views')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  // 게시글이 없는 경우는 정상적인 상황이므로 에러 로그 출력하지 않음
  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error fetching post for view increment:', fetchError)
    return
  }

  if (currentPost) {
    const { error } = await supabase
      .from('board_posts')
      .update({ views: currentPost.views + 1 })
      .eq('slug', slug)
      .eq('is_published', true)

    if (error) {
      console.error('Error incrementing views:', error)
    }
  }
}

// 인기 게시글 가져오기
export async function getFeaturedPosts(limit: number = 5) {
  const { data, error } = await supabase
    .from('board_posts')
    .select('id, title, slug, excerpt, published_at, views')
    .eq('is_published', true)
    .eq('is_featured', true)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured posts:', error)
    return { posts: [], error }
  }

  return { posts: data as BoardPost[], error: null }
}

// 최신 게시글 가져오기
export async function getRecentPosts(limit: number = 5) {
  const { data, error } = await supabase
    .from('board_posts')
    .select('id, title, slug, excerpt, published_at, views')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent posts:', error)
    return { posts: [], error }
  }

  return { posts: data as BoardPost[], error: null }
}

// 게시글 생성 (어드민용)
export async function createBoardPost(postData: {
  title: string
  slug: string
  content: string
  excerpt?: string
  featured_image?: string
  meta_title?: string
  meta_description?: string
  is_featured?: boolean
}) {
  const { data, error } = await supabase
    .from('board_posts')
    .insert([postData])
    .select()
    .single()

  if (error) {
    console.error('Error creating board post:', error)
    return { post: null, error }
  }

  return { post: data as BoardPost, error: null }
}



// 게시글 삭제 (어드민용)
export async function deleteBoardPost(id: number) {
  const { error } = await supabase
    .from('board_posts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting board post:', error)
    return { success: false, error }
  }

  return { success: true, error: null }
}

// 게시글 수정 (어드민용)
export async function updateBoardPost(id: number, postData: Partial<BoardPost>) {
  const { error } = await supabase
    .from('board_posts')
    .update({
      ...postData,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)

  if (error) {
    console.error('Error updating board post:', error)
    return { error }
  }

  return { error: null }
}

// 이미지 업로드 (어드민용)
export async function uploadBoardImage(postId: number, imageData: {
  image_url: string
  alt_text?: string
  display_order?: number
}) {
  const { data, error } = await supabase
    .from('board_images')
    .insert([{ post_id: postId, ...imageData }])
    .select()
    .single()

  if (error) {
    console.error('Error uploading board image:', error)
    return { image: null, error }
  }

  return { image: data as BoardImage, error: null }
}