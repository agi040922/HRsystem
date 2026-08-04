import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, verifyAdminToken } from '@/lib/adminAuth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 테스트 페이지는 미들웨어를 거치지 않고 바로 통과
  if (pathname === '/test') {
    return NextResponse.next();
  }

  // /admin/* 전체를 관리자 인증으로 보호
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    // 로그인 페이지 자체는 열려 있어야 함(리다이렉트 루프 방지)
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    const secret = process.env.ADMIN_SECRET;
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    // ADMIN_SECRET 미설정 시 secret이 없어 항상 검증 실패 = 전체 차단(안전 기본값)
    const authorized = secret ? await verifyAdminToken(secret, token) : false;

    if (!authorized) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      loginUrl.search = '';
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 서버 렌더 시 언어를 경로로 판단할 수 있도록 경로를 헤더에 실어 보낸다.
  // i18n/request.ts 가 이 값을 읽어 /en/* 은 영어로 렌더한다.
  // (헤더가 없으면 기존대로 ko 로 폴백하므로 이 변경은 한국어 화면에 영향이 없다.)
  const headers = new Headers(request.headers);
  headers.set('x-fair-pathname', pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  // API 라우트, _next/static, _next/image, favicon.ico, test 페이지는 제외
  // ingest: PostHog 리버스 프록시(next.config.mjs rewrites). 페이지뷰·클릭마다 요청이 발생하는데
  //         미들웨어가 할 일이 없으므로 제외한다(불필요한 미들웨어 호출 비용·지연 제거).
  matcher: ['/((?!api|ingest|_next/static|_next/image|favicon.ico|test).*)']
};
