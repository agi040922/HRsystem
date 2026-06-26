import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 타입 정의
export interface BoardPost {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string | null
  featured_image: string | null
  meta_title: string | null
  meta_description: string | null
  author_name: string
  views: number
  is_published: boolean
  is_featured: boolean
  published_at: string
  created_at: string
  updated_at: string
}

export interface BoardImage {
  id: number
  post_id: number
  image_url: string
  alt_text: string | null
  display_order: number
  created_at: string
} 