import { supabase, BoardPost, BoardImage } from './supabase'

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