"use client"

import BoardClientPage from "./BoardClientPage"
import { getBoardPosts } from "@/lib/board"
import { BoardPost } from "@/lib/supabase"
import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

// Note: metadata는 서버 컴포넌트에서만 사용 가능

export default function BoardPage() {
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<BoardPost[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  
  const page = Number(searchParams.get('page')) || 1
  const search = searchParams.get('search') || ""
  
  useEffect(() => {
    async function loadPosts() {
      setLoading(true)
      const { posts, count, error } = await getBoardPosts(page, 9, search)
      if (error) {
        console.error("Failed to fetch board posts:", error)
      }
      setPosts(posts)
      setTotalCount(count)
      setLoading(false)
    }
    loadPosts()
  }, [page, search])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <BoardClientPage 
      initialPosts={posts} 
      totalCount={totalCount} 
      currentPage={page}
      searchQuery={search}
    />
  )
}
