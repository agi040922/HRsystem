// 관리자 인증 유틸 (계정 시스템 없이 단일 시크릿 기반)
//
// 이 파일은 Edge 런타임(middleware)과 Node 런타임(API route) 양쪽에서 import 되므로
// Node 전용 API(crypto 모듈 등)를 쓰지 않고 Web Crypto(crypto.subtle)만 사용한다.
//
// 쿠키 토큰 형식: base64url(payloadJson).base64url(HMAC-SHA256)
//   payload = { exp: <unix seconds> }
//   서명 키 = ADMIN_SECRET
// 서버 액션/API 호출은 이 쿠키 또는 Authorization: Bearer <ADMIN_SECRET> 로 인증한다.

export const ADMIN_COOKIE = "fairhr_admin"
// 쿠키/토큰 기본 만료: 12시간
export const ADMIN_TOKEN_TTL_SECONDS = 60 * 60 * 12

const encoder = new TextEncoder()

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = ""
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function base64UrlDecode(value: string): Uint8Array {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/")
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

async function hmacSha256(secret: string, data: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data))
  return new Uint8Array(signature)
}

// 길이 노출은 감수하되 내용 비교는 상수시간으로 처리
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) result |= a[i] ^ b[i]
  return result === 0
}

// 두 문자열(시크릿)을 상수시간 비교
export function secretEquals(a: string, b: string): boolean {
  return timingSafeEqual(encoder.encode(a), encoder.encode(b))
}

// 로그인 성공 시 발급할 서명 토큰 생성
export async function signAdminToken(
  secret: string,
  ttlSeconds: number = ADMIN_TOKEN_TTL_SECONDS,
): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds
  const payload = base64UrlEncode(encoder.encode(JSON.stringify({ exp })))
  const signature = base64UrlEncode(await hmacSha256(secret, payload))
  return `${payload}.${signature}`
}

// 토큰 서명/만료 검증
export async function verifyAdminToken(
  secret: string | undefined | null,
  token: string | undefined | null,
): Promise<boolean> {
  if (!secret || !token) return false
  const parts = token.split(".")
  if (parts.length !== 2) return false
  const [payload, signature] = parts
  try {
    const expected = await hmacSha256(secret, payload)
    const received = base64UrlDecode(signature)
    if (!timingSafeEqual(expected, received)) return false
    const decoded = JSON.parse(new TextDecoder().decode(base64UrlDecode(payload))) as { exp?: unknown }
    if (typeof decoded.exp !== "number") return false
    if (decoded.exp < Math.floor(Date.now() / 1000)) return false
    return true
  } catch {
    return false
  }
}

// 최소 요청 형태(쿠키/헤더 접근)만 요구하는 타입 — Edge/Node 양쪽 NextRequest 호환
interface AuthorizableRequest {
  headers: { get(name: string): string | null }
  cookies: { get(name: string): { value: string } | undefined }
}

// 요청이 관리자 권한을 갖는지 검증.
//   1) Authorization: Bearer <ADMIN_SECRET>  (셀/스크립트 직접 호출용)
//   2) 로그인 쿠키의 서명 토큰               (관리자 UI 세션용)
// ADMIN_SECRET 미설정 시 항상 false = 전체 차단(안전 기본값).
export async function isAuthorizedRequest(request: AuthorizableRequest): Promise<boolean> {
  const secret = process.env.ADMIN_SECRET
  if (!secret) return false

  const authHeader = request.headers.get("authorization")
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const bearer = authHeader.slice("Bearer ".length).trim()
    if (bearer && secretEquals(bearer, secret)) return true
  }

  const cookie = request.cookies.get(ADMIN_COOKIE)?.value
  return verifyAdminToken(secret, cookie)
}
