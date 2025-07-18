import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/*',     // 관리자 페이지 크롤링 방지
        '/api/*',       // API 엔드포인트 크롤링 방지
        '/testpage/*',  // 테스트 페이지 크롤링 방지
      ],
    },
    sitemap: 'https://www.fairhr.net', // 실제 도메인으로 변경 필요
  }
} 