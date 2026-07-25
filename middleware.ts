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

  // 다른 경로들은 기본 동작
  return NextResponse.next();
}

export const config = {
  // API 라우트, _next/static, _next/image, favicon.ico, test 페이지는 제외
  // ingest: PostHog 리버스 프록시(next.config.mjs rewrites). 페이지뷰·클릭마다 요청이 발생하는데
  //         미들웨어가 할 일이 없으므로 제외한다(불필요한 미들웨어 호출 비용·지연 제거).
  matcher: ['/((?!api|ingest|_next/static|_next/image|favicon.ico|test).*)']
};
