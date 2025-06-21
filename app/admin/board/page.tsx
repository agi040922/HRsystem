import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Settings } from "lucide-react"
import AdminBoardList from "./AdminBoardList"

export const metadata: Metadata = {
  title: "공지사항 관리 | 어드민",
  description: "공지사항을 관리합니다.",
  robots: "noindex, nofollow",
}

export default async function AdminBoardPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>
}) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const search = params.search || ""

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* 헤더 */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">공지사항 관리</h1>
              <p className="text-muted-foreground">공지사항을 작성하고 관리합니다.</p>
            </div>
            
            <div className="flex gap-2 mt-4 sm:mt-0">
              <Link href="/admin/board/create">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  새 글 작성
                </Button>
              </Link>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                설정
              </Button>
            </div>
          </div>

          {/* 게시글 목록 */}
          <AdminBoardList currentPage={page} searchQuery={search} />
        </div>
      </div>
    </div>
  )
} 