import { Metadata } from "next"
import BoardCreateForm from "./BoardCreateForm"

export const metadata: Metadata = {
  title: "공지사항 작성 | 어드민",
  description: "새로운 공지사항을 작성합니다.",
  robots: "noindex, nofollow", // 검색엔진에서 제외
}

export default function AdminBoardCreatePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">공지사항 작성</h1>
            <p className="text-muted-foreground">새로운 공지사항을 작성하고 게시합니다.</p>
          </div>
          
          <BoardCreateForm />
        </div>
      </div>
    </div>
  )
} 