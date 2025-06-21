import { Button } from "@/components/ui/button"
import { ArrowLeft, CalendarDays, Eye, User } from "lucide-react"
import Link from "next/link"
import PageBanner from "@/components/page-banner"
import { getBoardPost, incrementViews } from "@/lib/board"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const { post } = await getBoardPost(resolvedParams.id)
  
  if (!post) {
    return {
      title: "게시글을 찾을 수 없습니다 | 노무법인 [법인명]",
      description: "요청하신 게시글을 찾을 수 없습니다.",
    }
  }

  return {
    title: post.meta_title || `${post.title} | 공지사항 | 노무법인 [법인명]`,
    description: post.meta_description || post.excerpt || post.title,
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || post.title,
      images: post.featured_image ? [post.featured_image] : [],
    },
  }
}

export default async function BoardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const { post, error } = await getBoardPost(resolvedParams.id)

  if (error || !post) {
    notFound()
  }

  // 조회수 증가 (서버 액션으로 처리)
  await incrementViews(resolvedParams.id)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  return (
    <div className="w-full overflow-x-hidden">
      {/* 페이지 배너 */}
      <PageBanner 
        title="공지사항"
        subtitle="노무법인 [법인명] 공지사항"
        backgroundImage="public\FAIR000.png"
      />

      <div className="container-fluid max-w-7xl py-8 md:py-12 lg:py-16 xl:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-0">
          <div className="mb-8">
            <Link href="/board">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                목록으로
              </Button>
            </Link>
          </div>

          <article className="prose dark:prose-invert max-w-none">
            {/* 게시글 제목 */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {post.title}
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6 pb-4 border-b">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>{post.author_name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4" />
                <span>{formatDate(post.published_at)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                <span>조회수 {post.views}</span>
              </div>
            </div>

            {/* 대표 이미지 */}
            {post.featured_image && (
              <div className="mb-6">
                <img 
                  src={post.featured_image} 
                  alt={post.title}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}

            {/* 게시글 내용 */}
            <div 
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />

            {/* 추가 이미지들 */}
            {post.board_images && post.board_images.length > 0 && (
              <div className="mt-8 space-y-4">
                {post.board_images
                  .sort((a: any, b: any) => a.display_order - b.display_order)
                  .map((image: any) => (
                    <div key={image.id} className="text-center">
                      <img 
                        src={image.image_url} 
                        alt={image.alt_text || post.title}
                        className="w-full h-auto rounded-lg mx-auto"
                      />
                      {image.alt_text && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {image.alt_text}
                        </p>
                      )}
                    </div>
                  ))
                }
              </div>
            )}
          </article>

          {/* 댓글 기능 (선택 사항, 구현 필요) */}
          {/* <section className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-semibold mb-6">댓글</h2>
            <p className="text-muted-foreground">댓글 기능은 현재 준비 중입니다.</p>
          </section> */}
        </div>
      </div>
    </div>
  )
}
