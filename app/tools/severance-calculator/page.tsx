import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calculator, ArrowLeft, DollarSign, Calendar, PieChart, AlertCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "퇴직금 계산기 | FAIR인사노무컨설팅",
  description: "정확한 퇴직금과 각종 수당을 자동으로 계산해주는 전문가 도구입니다. 무료로 사용해보세요.",
  keywords: "퇴직금계산, 퇴직금산정, 평균임금, 퇴직급여, 노동법, 계산기, 노무도구, FAIR인사노무컨설팅",
  openGraph: {
    title: "퇴직금 계산기 - 정확한 퇴직급여 산정",
    description: "복잡한 퇴직금 계산을 간단하게! 법적 기준에 맞는 정확한 계산을 제공합니다.",
    type: "website",
  },
}

export default function SeveranceCalculatorPage() {
  const features = [
    "평균임금 자동 계산",
    "근속년수별 차등 적용",
    "각종 수당 포함 여부 판단",
    "세금 공제 내역 제공",
    "상세 계산 과정 표시"
  ]

  const calculationTypes = [
    {
      title: "일반 퇴직금",
      description: "근로기준법에 따른 기본 퇴직금",
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "평균임금 산정",
      description: "최근 3개월 평균임금 계산",
      icon: PieChart,
      color: "text-green-600", 
      bgColor: "bg-green-50"
    },
    {
      title: "근속연수 계산",
      description: "정확한 근무기간 및 연차 산정",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ]

  const includedItems = [
    "기본급",
    "정기상여금", 
    "각종 수당 (고정급 성격)",
    "연장근로수당",
    "휴일근로수당"
  ]

  const excludedItems = [
    "임시상여금",
    "일시적 수당",
    "실비변상 성격의 지급품",
    "복리후생비",
    "기타 비정기적 지급품목"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 네비게이션 */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            홈으로 돌아가기
          </Link>
        </div>

        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <Calculator className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            퇴직금 계산기
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            복잡한 퇴직금 계산을 정확하고 간단하게! 근로기준법에 따른 정확한 산정으로 
            정당한 퇴직급여를 확인하세요.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* 계산 유형 */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {calculationTypes.map((type, index) => (
            <Card key={index} className={`${type.bgColor} border-2`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${type.color}`}>
                  <type.icon className="w-5 h-5" />
                  {type.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{type.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 계산 기준 설명 */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="text-green-700">평균임금 포함 항목</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {includedItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="text-red-700">평균임금 제외 항목</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {excludedItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* 계산 공식 설명 */}
        <Card className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-center text-blue-800">퇴직금 계산 공식</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="bg-white rounded-lg p-6 inline-block">
              <div className="text-2xl font-bold text-gray-800 mb-4">
                퇴직금 = 평균임금 × 30일 × 근속년수
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>평균임금 = 최근 3개월간 임금총액 ÷ 근무일수</p>
                <p>근속년수 = 전체 근무기간 (1년 미만 단수 처리)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 주의사항 */}
        <Card className="bg-amber-50 border-amber-200 mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <AlertCircle className="w-5 h-5" />
              계산 시 주의사항
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-amber-800 mb-3">평균임금 계산</h4>
                <ul className="space-y-1 text-sm text-amber-700">
                  <li>• 퇴직일 이전 3개월간의 임금</li>
                  <li>• 총 근무일수로 나누어 일 평균 산출</li>
                  <li>• 휴업기간이 있다면 제외하고 계산</li>
                  <li>• 상여금은 정기상여만 포함</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-amber-800 mb-3">근속연수 계산</h4>
                <ul className="space-y-1 text-sm text-amber-700">
                  <li>• 입사일부터 퇴사일까지 전체 기간</li>
                  <li>• 1년 미만은 월할 계산하지 않음</li>
                  <li>• 휴직기간도 근속기간에 포함</li>
                  <li>• 수습기간도 근속기간에 산입</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA 버튼 */}
        <div className="text-center">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 mb-4">
            퇴직금 계산 시작하기
          </Button>
          <p className="text-sm text-gray-500">
            간단한 정보 입력만으로 정확한 퇴직금을 계산할 수 있습니다.
          </p>
        </div>

        {/* 전문가 상담 CTA */}
        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">복잡한 급여 체계이신가요?</h3>
            <p className="text-gray-600 mb-6">
              성과급, 인센티브, 스톡옵션 등 복합적인 급여 구조의 경우 
              전문가의 정확한 계산이 필요할 수 있습니다.
            </p>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                정확한 퇴직금 산정 문의
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 