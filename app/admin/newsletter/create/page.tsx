import { Metadata } from "next"
import NewsletterCreateForm from "./NewsletterCreateForm"

export const metadata: Metadata = {
  title: "주간지 업로드 | 어드민",
  description: "새로운 주간지를 업로드합니다.",
  robots: "noindex, nofollow",
}

export default function AdminNewsletterCreatePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">주간지 업로드</h1>
            <p className="text-muted-foreground">새로운 노동법 주간지를 업로드하고 관리합니다.</p>
          </div>
          
          <NewsletterCreateForm />
        </div>
      </div>
    </div>
  )
} 