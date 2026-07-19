import { NextResponse } from "next/server"
import { ADMIN_COOKIE } from "@/lib/adminAuth"

export const runtime = "nodejs"

// 로그인 쿠키 제거
export async function POST() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  })
  return response
}
