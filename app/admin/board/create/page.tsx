import { Metadata } from "next"
import BoardCreateForm from "./BoardCreateForm"

export const metadata: Metadata = {
  title: "AI 공지사항 작성 | 어드민",
  description: "AI 기반으로 간편하게 공지사항을 작성합니다.",
  robots: "noindex, nofollow", // 검색엔진에서 제외
}

export default function AdminBoardCreatePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">AI 공지사항 작성</h1>
            <p className="text-muted-foreground">제목과 내용만 입력하면 AI가 전문적인 게시글로 자동 변환해드립니다.</p>
          </div>
          
          <BoardCreateForm />
        </div>
      </div>
    </div>
  )
} 