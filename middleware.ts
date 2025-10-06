import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // 테스트 페이지는 미들웨어를 거치지 않고 바로 통과
  if (request.nextUrl.pathname === '/test') {
    return NextResponse.next();
  }
  
  // 다른 경로들은 기본 동작
  return NextResponse.next();
}

export const config = {
  // API 라우트, _next/static, _next/image, favicon.ico, test 페이지는 제외
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|test).*)']
};
