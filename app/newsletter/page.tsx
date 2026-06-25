"use client"

import BoardClientPage from "../board/BoardClientPage"
import { getBoardPosts } from "@/lib/board"
import { BoardPost } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

// 뉴스레터 게시판 — 공지사항(/board)과 동일한 UI, category='newsletter'로 데이터만 분리

export default function NewsletterPage() {
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<BoardPost[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const page = Number(searchParams.get('page')) || 1
  const search = searchParams.get('search') || ""

  useEffect(() => {
    async function loadPosts() {
      setLoading(true)
      const { posts, count, error } = await getBoardPosts(page, 9, search, 'newsletter')
      if (error) {
        console.error("Failed to fetch newsletter posts:", error)
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
      variant="newsletter"
    />
  )
}
