import { Button } from "@/components/ui/button"
import { ArrowLeft, CalendarDays, Eye, User } from "lucide-react"
import Link from "next/link"
import PageBanner from "@/components/page-banner"
import { getBoardPost, incrementViews } from "@/lib/board"
import { notFound } from "next/navigation"
import { BoardImage } from "@/lib/supabase"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const { post } = await getBoardPost(resolvedParams.id)
  
  if (!post) {
    return {
      title: "게시글을 찾을 수 없습니다 | FAIR인사노무컨설팅",
      description: "요청하신 게시글을 찾을 수 없습니다.",
    }
  }

  return {
    title: post.meta_title || `${post.title} | 공지사항 | FAIR인사노무컨설팅`,
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

  // board_images 테이블의 이미지들이 있는지 확인
  const hasLegacyImages = post.board_images && post.board_images.length > 0
  // content에 이미지 태그가 있는지 확인 (새로운 방식)
  const hasContentImages = post.content.includes('<img')

  return (
    <div className="w-full overflow-x-hidden">
      {/* 페이지 배너 */}
      <PageBanner 
        title="공지사항"
        subtitle="FAIR인사노무컨설팅의 소식을 전해드립니다"
        backgroundImage="/FAIR000.png"
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
            
            {/* 게시글 메타 정보 */}
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
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
            )}

            {/* 게시글 내용 */}
            <div 
              className="prose dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-6
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-5
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-4
                prose-p:leading-relaxed prose-p:mb-4 prose-p:text-gray-700 dark:prose-p:text-gray-300
                prose-strong:font-bold prose-strong:text-gray-900 dark:prose-strong:text-white
                prose-em:italic prose-em:text-gray-700 dark:prose-em:text-gray-300
                prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
                prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
                prose-li:my-1 prose-li:text-gray-700 dark:prose-li:text-gray-300
                prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600
                prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
                prose-img:rounded-lg prose-img:shadow-sm prose-img:mx-auto prose-img:block
                prose-img:max-w-full prose-img:h-auto prose-img:my-6
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded-lg"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />

            {/* 레거시 이미지들 (기존 board_images 테이블 방식) */}
            {/* content에 이미지가 없고 레거시 이미지만 있는 경우에만 표시 */}
            {!hasContentImages && hasLegacyImages && (
              <div className="mt-8 border-t pt-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  첨부 이미지
                </h3>
                <div className="space-y-6">
                  {(post.board_images as BoardImage[])
                    .sort((a, b) => a.display_order - b.display_order)
                    .map((image) => (
                      <div key={image.id} className="text-center">
                        <img 
                          src={image.image_url} 
                          alt={image.alt_text || post.title}
                          className="w-full h-auto rounded-lg shadow-sm mx-auto"
                          loading="lazy"
                        />
                        {image.alt_text && (
                          <p className="text-sm text-muted-foreground mt-2 italic">
                            {image.alt_text}
                          </p>
                        )}
                      </div>
                    ))
                  }
                </div>
              </div>
            )}
          </article>

          {/* 하단 네비게이션 */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex justify-center">
              <Link href="/board">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  목록으로 돌아가기
                </Button>
              </Link>
            </div>
          </div>

          {/* 댓글 기능 (향후 구현 예정) */}
          {/* <section className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-semibold mb-6">댓글</h2>
            <p className="text-muted-foreground">댓글 기능은 현재 준비 중입니다.</p>
          </section> */}
        </div>
      </div>
    </div>
  )
}
