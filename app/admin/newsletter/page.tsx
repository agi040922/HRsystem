import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, BookOpen } from "lucide-react"
import AdminNewsletterList from "./AdminNewsletterList"

export const metadata: Metadata = {
  title: "주간지 관리 | 어드민",
  description: "노동법 주간지를 관리합니다.",
  robots: "noindex, nofollow",
}

export default async function AdminNewsletterPage({
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
              <h1 className="text-3xl font-bold mb-2 flex items-center">
                <BookOpen className="w-8 h-8 mr-3 text-primary" />
                주간지 관리
              </h1>
              <p className="text-muted-foreground">노동법 주간지를 업로드하고 관리합니다.</p>
            </div>
            
            <div className="flex gap-2 mt-4 sm:mt-0">
              <Link href="/admin/newsletter/create">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  새 주간지 업로드
                </Button>
              </Link>
              <Link href="/admin">
                <Button variant="outline">
                  관리자 대시보드
                </Button>
              </Link>
            </div>
          </div>

          {/* 주간지 목록 */}
          <AdminNewsletterList currentPage={page} searchQuery={search} />
        </div>
      </div>
    </div>
  )
} 