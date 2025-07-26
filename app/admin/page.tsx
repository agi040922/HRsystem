'use client'

import { Button } from "@/components/ui/button"
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
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">관리자 대시보드</h1>
              <p className="mt-2 text-gray-600">FAIR인사노무컨설팅 관리 시스템</p>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              className="text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              사이트로 돌아가기
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">관리 메뉴</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            웹사이트의 콘텐츠와 설정을 관리할 수 있는 통합 관리 시스템입니다.<br />
            원하시는 관리 기능을 선택해주세요.
          </p>
        </div>

        {/* 이용 가능한 기능들 */}
        <div className="mb-16">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">이용 가능한 기능</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {adminFeatures.filter(feature => feature.available).map((feature, index) => (
              <div 
                key={feature.id} 
                className="group bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button
                      onClick={() => router.push(feature.path)}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3"
                    >
                      관리하기
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 준비 중인 기능들 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">준비 중인 기능</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminFeatures.filter(feature => !feature.available).map((feature, index) => (
              <div 
                key={feature.id} 
                className="bg-white rounded-lg border border-gray-200 opacity-60"
              >
                <div className="p-6">
                  <h4 className="text-lg font-medium text-gray-700 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
                    {feature.description}
                  </p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    준비중
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 안내 문구 */}
        <div className="mt-16 text-center">
          <div className="bg-blue-50 rounded-lg px-8 py-6 max-w-3xl mx-auto border border-blue-100">
            <p className="text-blue-800 text-sm leading-relaxed">
              <span className="font-medium">도움이 필요하신가요?</span><br />
              시스템 사용 중 문의사항이 있으시면 개발팀에 문의해주세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 