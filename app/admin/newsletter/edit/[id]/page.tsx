import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getNewsletterById } from "@/lib/newsletter"
import NewsletterEditForm from "./NewsletterEditForm"

export const metadata: Metadata = {
  title: "주간지 수정 | 어드민",
  description: "주간지를 수정합니다.",
  robots: "noindex, nofollow",
}

export default async function AdminNewsletterEditPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params
  const newsletterId = parseInt(resolvedParams.id)
  
  if (isNaN(newsletterId)) {
    notFound()
  }

  const { newsletter, error } = await getNewsletterById(newsletterId)

  if (error || !newsletter) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">주간지 수정</h1>
            <p className="text-muted-foreground">
              '{newsletter.title}' 주간지를 수정합니다.
            </p>
          </div>
          
          <NewsletterEditForm newsletter={newsletter} />
        </div>
      </div>
    </div>
  )
} 