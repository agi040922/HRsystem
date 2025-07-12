'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Settings, 
  FileText, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Shield,
  Bell,
  Calendar,
  BookOpen
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState('')

  const handleNavigate = async (path: string, feature: string) => {
    setIsLoading(feature)
    await router.push(path)
    setIsLoading('')
  }

  const adminFeatures = [
    {
      id: 'board',
      title: '게시판 관리',
      description: '공지사항, 뉴스, 칼럼 등 게시판 콘텐츠 관리',
      icon: FileText,
      path: '/admin/board',
      color: 'bg-blue-500',
      available: true,
      stats: '게시글 관리'
    },
    {
      id: 'newsletter',
      title: '주간지 관리',
      description: '노동법 주간지 업로드 및 관리',
      icon: BookOpen,
      path: '/admin/newsletter',
      color: 'bg-indigo-500',
      available: true,
      stats: '주간지 관리'
    },
    {
      id: 'contact',
      title: '문의 관리',
      description: '고객 문의 및 상담 요청 관리',
      icon: MessageSquare,
      path: '/admin/contact',
      color: 'bg-green-500',
      available: false,
      stats: '준비중'
    },
    {
      id: 'users',
      title: '사용자 관리',
      description: '회원 정보 및 권한 관리',
      icon: Users,
      path: '/admin/users',
      color: 'bg-purple-500',
      available: false,
      stats: '준비중'
    },
    {
      id: 'analytics',
      title: '통계 관리',
      description: '사이트 방문자 및 이용 통계',
      icon: BarChart3,
      path: '/admin/analytics',
      color: 'bg-orange-500',
      available: false,
      stats: '준비중'
    },
    {
      id: 'settings',
      title: '사이트 설정',
      description: '사이트 전체 설정 및 환경 관리',
      icon: Settings,
      path: '/admin/settings',
      color: 'bg-gray-500',
      available: false,
      stats: '준비중'
    },
    {
      id: 'notifications',
      title: '알림 관리',
      description: '시스템 알림 및 공지사항 관리',
      icon: Bell,
      path: '/admin/notifications',
      color: 'bg-red-500',
      available: false,
      stats: '준비중'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                온라인
              </Badge>
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
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">환영합니다!</h2>
          <p className="text-gray-600">
            공정한 노동법률사무소 관리자 페이지입니다. 아래에서 원하시는 관리 기능을 선택하세요.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">총 게시글</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
              <p className="text-xs text-gray-500">게시판 관리에서 확인</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">미처리 문의</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
              <p className="text-xs text-gray-500">문의 관리 준비중</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">이번 주 방문자</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
              <p className="text-xs text-gray-500">통계 관리 준비중</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">시스템 상태</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">정상</div>
              <p className="text-xs text-gray-500">모든 서비스 정상 운영</p>
            </CardContent>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminFeatures.map((feature) => {
            const Icon = feature.icon
            return (
              <Card 
                key={feature.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  feature.available ? 'hover:scale-105' : 'opacity-75'
                }`}
                onClick={() => feature.available && handleNavigate(feature.path, feature.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${feature.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge 
                      variant={feature.available ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {feature.available ? "이용 가능" : "준비중"}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{feature.stats}</span>
                    <Button
                      variant={feature.available ? "default" : "secondary"}
                      size="sm"
                      disabled={!feature.available || isLoading === feature.id}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (feature.available) {
                          handleNavigate(feature.path, feature.id)
                        }
                      }}
                    >
                      {isLoading === feature.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : feature.available ? (
                        '관리하기'
                      ) : (
                        '준비중'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              최근 활동
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">관리자 대시보드가 생성되었습니다.</span>
                <span className="text-gray-400">방금 전</span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">게시판 관리 기능이 활성화되었습니다.</span>
                <span className="text-gray-400">방금 전</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 