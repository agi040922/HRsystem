import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileX } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <FileX className="w-24 h-24 mx-auto text-muted-foreground/50" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">게시글을 찾을 수 없습니다</h1>
        
        <p className="text-muted-foreground mb-8 leading-relaxed">
          요청하신 게시글이 존재하지 않거나 삭제되었을 수 있습니다.<br />
          다른 게시글을 확인해보세요.
        </p>
        
        <div className="space-y-4">
          <Link href="/board">
            <Button className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              공지사항으로 돌아가기
            </Button>
          </Link>
          
          <Link href="/">
            <Button variant="outline" className="w-full">
              홈으로 가기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 