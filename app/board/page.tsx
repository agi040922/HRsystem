import BoardClientPage from "./BoardClientPage"
import { getBoardPosts } from "@/lib/board"
import { Suspense } from "react"

export const metadata = {
  title: "공지사항 | FAIR인사노무컨설팅",
  description: "FAIR인사노무컨설팅의 최신 소식과 공지사항을 확인하세요. 노동법 관련 최신 정보와 법률 변경 사항을 알려드립니다.",
}

export default async function BoardPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>
}) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const search = params.search || ""
  
  const { posts, count, error } = await getBoardPosts(page, 9, search)

  if (error) {
    console.error("Failed to fetch board posts:", error)
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BoardClientPage 
        initialPosts={posts} 
        totalCount={count} 
        currentPage={page}
        searchQuery={search}
      />
    </Suspense>
  )
}
