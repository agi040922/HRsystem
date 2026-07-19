# 관리자(/admin) 인증

`/admin/*` 화면과 관리자 서버 API를 단일 시크릿(`ADMIN_SECRET`)으로 보호한다.
사용자 계정 시스템은 없다.

## 동작
- **middleware** (`middleware.ts`): `/admin/*` 요청마다 로그인 쿠키 `fairhr_admin`(HMAC-SHA256 서명,
  12시간 만료)을 검증한다. 유효하지 않으면 `/admin/login?next=...` 으로 리다이렉트한다.
  `/admin/login` 은 예외로 열려 있다.
- **로그인** (`app/api/admin/login`): 입력한 키를 `ADMIN_SECRET`과 상수시간 비교 →
  일치 시 서명 쿠키(httpOnly, SameSite=Lax, 프로덕션 Secure) 발급.
- **로그아웃** (`app/api/admin/logout`): 쿠키 제거.
- **관리자 API** (`app/api/admin/board`, 공지 생성 POST / 수정 PUT / 삭제 DELETE):
  로그인 쿠키 **또는** `Authorization: Bearer <ADMIN_SECRET>` 를 검증한다. UI를 거치지 않는 직접 호출도 차단된다.
- 공통 로직: `lib/adminAuth.ts` (Edge/Node 공용, Web Crypto만 사용).

## 안전 기본값
`ADMIN_SECRET` 미설정 시 middleware·로그인·API 모두 실패 → **관리자 전체 차단**.
공개 페이지(`/board`, `/newsletter` 등)에는 영향이 없다.

## 필요한 환경변수 (Vercel — Production)
| 이름 | 값 | 넣는 곳 |
|------|-----|---------|
| `ADMIN_SECRET` | 강한 랜덤 문자열(32바이트 base64 권장) | Vercel 프로젝트 → Settings → Environment Variables → Production |

설정 후 재배포(Redeploy)해야 적용된다. 값 미설정 시 관리자 화면은 로그인해도 열리지 않는다(안전 기본값).

## 셀(AI) 게시 경로
쿠키 로그인 없이 `Authorization: Bearer <ADMIN_SECRET>` 헤더로 `/api/admin/board` 를 호출해
공지 생성·수정·삭제가 가능하다. 운영 절차는 로컬 `company/.secrets/fairhr-admin-README.md` 참고
(키 값은 로컬 전용).

## 범위 밖(별도 설계)
기존 관리자 폼은 브라우저에서 Supabase anon 키로 직접 쓰기 때문에, RLS가 꺼진 상태에서는
anon 키 직접 호출까지는 이 게이트로 막지 못한다. Supabase RLS 활성화는 별도 과제.
