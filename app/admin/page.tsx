'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const router = useRouter()

  const adminFeatures = [
    {
      id: 'board',
      title: '게시판 관리',
      description: '공지사항, 뉴스, 칼럼 등 게시판 콘텐츠 관리',
      path: '/admin/board',
      available: true,
    },
    {
      id: 'newsletter',
      title: '주간지 관리', 
      description: '노동법 주간지 업로드 및 관리',
      path: '/admin/newsletter',
      available: true,
    },
    {
      id: 'contact',
      title: '문의 관리',
      description: '고객 문의 및 상담 요청 관리',
      path: '/admin/contact',
      available: false,
    },
    {
      id: 'users',
      title: '사용자 관리',
      description: '회원 정보 및 권한 관리',
      path: '/admin/users',
      available: false,
    },
    {
      id: 'analytics',
      title: '통계 관리',
      description: '사이트 방문자 및 이용 통계',
      path: '/admin/analytics',
      available: false,
    },
    {
      id: 'settings',
      title: '사이트 설정',
      description: '사이트 전체 설정 및 환경 관리',
      path: '/admin/settings',
      available: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/')}
            >
              사이트로 돌아가기
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">관리 메뉴</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            공정한 노동법률사무소 관리자 페이지입니다. 원하시는 관리 기능을 선택하세요.
          </p>
        </div>

        {/* Menu List */}
        <div className="bg-white rounded-lg shadow-sm border divide-y">
          {adminFeatures.map((feature, index) => (
            <div key={feature.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <Badge 
                      variant={feature.available ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {feature.available ? "이용 가능" : "준비중"}
                    </Badge>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
                <div className="ml-6">
                  <Button
                    variant={feature.available ? "default" : "secondary"}
                    disabled={!feature.available}
                    onClick={() => feature.available && router.push(feature.path)}
                  >
                    {feature.available ? '관리하기' : '준비중'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 