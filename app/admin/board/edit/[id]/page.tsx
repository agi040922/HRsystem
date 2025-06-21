import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAdminBoardPost } from "@/lib/board"
import BoardEditForm from "./BoardEditForm"

export const metadata: Metadata = {
  title: "공지사항 수정 | 어드민",
  description: "공지사항을 수정합니다.",
  robots: "noindex, nofollow",
}

export default async function AdminBoardEditPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params
  const postId = parseInt(resolvedParams.id)
  
  if (isNaN(postId)) {
    notFound()
  }

  const { post, error } = await getAdminBoardPost(postId)

  if (error || !post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">공지사항 수정</h1>
            <p className="text-muted-foreground">
              '{post.title}' 게시글을 수정합니다.
            </p>
          </div>
          
          <BoardEditForm post={post} />
        </div>
      </div>
    </div>
  )
} 