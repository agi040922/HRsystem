import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ArrowLeft, Bot, Clock, Shield, Zap } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "AI 노무 상담 | FAIR인사노무컨설팅",
  description: "24시간 언제든지 AI 챗봇을 통해 노무 관련 질문에 대한 즉시 답변을 받을 수 있습니다. 26년차 전문가 지식 기반 AI 상담.",
  keywords: "AI상담, 노무상담, 챗봇, 24시간상담, 노동법, 인공지능, 즉시답변, FAIR인사노무컨설팅",
  openGraph: {
    title: "AI 노무 상담 - 24시간 즉시 답변",
    description: "전문가 수준의 AI가 노무 관련 궁금증을 즉시 해결해드립니다.",
    type: "website",
  },
}

export default function AIConsultationPage() {
  const features = [
    "24시간 즉시 답변",
    "전문가 수준 지식",
    "익명 상담 가능",
    "실시간 대화",
    "무료 이용"
  ]

  const capabilities = [
    {
      title: "즉시 답변",
      description: "언제든지 궁금한 노무 문제를 질문하고 즉시 답변을 받으세요.",
      icon: Zap,
      color: "text-yellow-600"
    },
    {
      title: "24시간 운영",
      description: "밤낮 상관없이 언제든지 상담 서비스를 이용할 수 있습니다.",
      icon: Clock,
      color: "text-blue-600"
    },
    {
      title: "보안 보장",
      description: "개인정보 보호와 상담 내용의 완전한 익명성을 보장합니다.",
      icon: Shield,
      color: "text-green-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            홈으로 돌아가기
          </Link>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
            <MessageSquare className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI 노무 상담
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            전문가 수준의 AI가 24시간 언제든지 노무 관련 질문에 대해 
            정확하고 신속한 답변을 제공합니다.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {capabilities.map((cap, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <cap.icon className={`w-8 h-8 mx-auto ${cap.color} mb-2`} />
                <CardTitle className="text-lg">{cap.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{cap.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
            AI 상담 시작하기
          </Button>
        </div>
      </div>
    </div>
  )
} 