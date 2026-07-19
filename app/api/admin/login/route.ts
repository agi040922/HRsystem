import { type NextRequest, NextResponse } from "next/server"
import {
  ADMIN_COOKIE,
  ADMIN_TOKEN_TTL_SECONDS,
  secretEquals,
  signAdminToken,
} from "@/lib/adminAuth"

export const runtime = "nodejs"

// 관리자 키 검증 → 성공 시 서명된 httpOnly 쿠키 발급
export async function POST(request: NextRequest) {
  const secret = process.env.ADMIN_SECRET
  if (!secret) {
    // env 미설정 = 전체 차단(안전 기본값). 로그인 자체가 불가능함을 명확히 알림.
    return NextResponse.json(
      { message: "서버에 관리자 시크릿(ADMIN_SECRET)이 설정되지 않았습니다. 관리자에게 문의하세요." },
      { status: 503 },
    )
  }

  let key: unknown
  try {
    const body = await request.json()
    key = body?.key
  } catch {
    return NextResponse.json({ message: "요청 형식이 올바르지 않습니다." }, { status: 400 })
  }

  if (typeof key !== "string" || !key || !secretEquals(key, secret)) {
    return NextResponse.json({ message: "관리자 키가 올바르지 않습니다." }, { status: 401 })
  }

  const token = await signAdminToken(secret)
  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_TOKEN_TTL_SECONDS,
  })
  return response
}
