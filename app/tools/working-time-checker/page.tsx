import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Scale, ArrowLeft, Clock, AlertTriangle, CheckCircle, Calendar } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "근로시간 진단 툴 | FAIR인사노무컨설팅",
  description: "주52시간 근무제 준수 여부와 근로시간 관리 현황을 진단하는 전문가 도구입니다.",
  keywords: "근로시간, 주52시간, 근로기준법, 시간외근무, 휴게시간, 노동법, 진단도구, FAIR인사노무컨설팅",
  openGraph: {
    title: "근로시간 진단 툴 - 근로기준법 준수 진단",
    description: "우리 회사의 근로시간 관리가 법적 기준에 맞는지 확인해보세요.",
    type: "website",
  },
}

export default function WorkingTimeCheckerPage() {
  const features = [
    "주52시간 준수 진단",
    "휴게시간 적정성 검토",
    "연장근로 한도 확인",
    "휴일근로 규정 점검",
    "개선방안 제시"
  ]

  const timeRegulations = [
    {
      title: "법정근로시간",
      content: "주 40시간 (1일 8시간)",
      icon: Clock,
      color: "text-blue-600"
    },
    {
      title: "연장근로한도",
      content: "주 12시간 (총 52시간)",
      icon: AlertTriangle,
      color: "text-orange-600"
    },
    {
      title: "휴게시간",
      content: "4시간 근무 시 30분, 8시간 근무 시 1시간",
      icon: Calendar,
      color: "text-green-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            홈으로 돌아가기
          </Link>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
            <Scale className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            근로시간 진단 툴
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            우리 회사의 근로시간 관리가 근로기준법을 준수하고 있는지 진단하고, 
            개선이 필요한 부분을 찾아 해결방안을 제시합니다.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {timeRegulations.map((reg, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <reg.icon className={`w-8 h-8 mx-auto ${reg.color} mb-2`} />
                <CardTitle className="text-lg">{reg.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-gray-700">{reg.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
            근로시간 진단 시작하기
          </Button>
        </div>
      </div>
    </div>
  )
} 