import { type NextRequest, NextResponse } from "next/server"
import { isAuthorizedRequest } from "@/lib/adminAuth"
import { createBoardPost, updateBoardPost, deleteBoardPost } from "@/lib/board"

export const runtime = "nodejs"

// 공지(게시판) 서버측 관리 API.
// 인증: 로그인 쿠키(관리자 UI 세션) 또는 Authorization: Bearer <ADMIN_SECRET>(셀/스크립트).
// UI를 거치지 않는 직접 호출도 여기서 반드시 인증을 검증한다.

function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || `post-${Date.now()}`
  )
}

async function requireAuth(request: NextRequest): Promise<NextResponse | null> {
  const ok = await isAuthorizedRequest(request)
  if (!ok) {
    return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 })
  }
  return null
}

// 공지 생성 (셀 게시 경로)
export async function POST(request: NextRequest) {
  const denied = await requireAuth(request)
  if (denied) return denied

  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: "요청 형식이 올바르지 않습니다." }, { status: 400 })
  }

  const title = typeof body?.title === "string" ? body.title.trim() : ""
  const content = typeof body?.content === "string" ? body.content : ""
  if (!title || !content) {
    return NextResponse.json({ message: "title과 content는 필수입니다." }, { status: 400 })
  }

  const postData = {
    title,
    slug: typeof body?.slug === "string" && body.slug.trim() ? slugify(body.slug) : slugify(title),
    content,
    excerpt: typeof body?.excerpt === "string" ? body.excerpt : undefined,
    featured_image: typeof body?.featured_image === "string" ? body.featured_image : undefined,
    meta_title: typeof body?.meta_title === "string" ? body.meta_title : undefined,
    meta_description: typeof body?.meta_description === "string" ? body.meta_description : undefined,
    is_featured: typeof body?.is_featured === "boolean" ? body.is_featured : undefined,
  }

  const { post, error } = await createBoardPost(postData)
  if (error || !post) {
    return NextResponse.json({ message: "게시글 생성에 실패했습니다." }, { status: 502 })
  }
  return NextResponse.json({ ok: true, post }, { status: 201 })
}

// 공지 수정
export async function PUT(request: NextRequest) {
  const denied = await requireAuth(request)
  if (denied) return denied

  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: "요청 형식이 올바르지 않습니다." }, { status: 400 })
  }

  const id = Number(body?.id)
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ message: "유효한 id가 필요합니다." }, { status: 400 })
  }

  const { id: _omit, ...updates } = body
  const { error } = await updateBoardPost(id, updates)
  if (error) {
    return NextResponse.json({ message: "게시글 수정에 실패했습니다." }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}

// 공지 삭제
export async function DELETE(request: NextRequest) {
  const denied = await requireAuth(request)
  if (denied) return denied

  const url = new URL(request.url)
  let id = Number(url.searchParams.get("id"))
  if (!Number.isInteger(id) || id <= 0) {
    try {
      const body = await request.json()
      id = Number(body?.id)
    } catch {
      // ignore
    }
  }
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ message: "유효한 id가 필요합니다." }, { status: 400 })
  }

  const { success, error } = await deleteBoardPost(id)
  if (!success || error) {
    return NextResponse.json({ message: "게시글 삭제에 실패했습니다." }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
