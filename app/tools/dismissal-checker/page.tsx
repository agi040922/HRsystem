import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ArrowLeft, CheckCircle, XCircle, AlertCircle, Scale } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "해고 가능성 진단 툴 | FAIR인사노무컨설팅",
  description: "해고의 정당성과 절차적 적법성을 사전에 진단하는 전문가 도구입니다. 법적 리스크를 미리 파악하세요.",
  keywords: "해고진단, 부당해고, 정당한해고, 노동법, 해고절차, 노무도구, 해고사유, FAIR인사노무컨설팅",
  openGraph: {
    title: "해고 가능성 진단 툴 - 법적 리스크 사전 진단",
    description: "해고의 타당성과 절차를 전문가 기준으로 진단해드립니다.",
    type: "website",
  },
}

export default function DismissalCheckerPage() {
  const checkPoints = [
    "해고 사유의 정당성",
    "해고 절차의 적법성", 
    "예고 기간 준수 여부",
    "서면 통지 요건",
    "경고 및 개선 기회 제공"
  ]

  const riskLevels = [
    {
      level: "낮음",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: CheckCircle,
      description: "해고 절차가 적법하고 사유가 정당합니다."
    },
    {
      level: "보통",
      color: "text-yellow-600", 
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      icon: AlertCircle,
      description: "일부 보완이 필요하거나 주의가 요구됩니다."
    },
    {
      level: "높음",
      color: "text-red-600",
      bgColor: "bg-red-50", 
      borderColor: "border-red-200",
      icon: XCircle,
      description: "부당해고 소지가 있어 전문가 상담이 필요합니다."
    }
  ]

  const checklist = [
    {
      category: "해고 사유",
      items: [
        "근로자의 귀책사유가 명확한가?",
        "업무상 과실이 반복적이고 중대한가?",
        "회사 규정 위반이 확실한가?",
        "개선 기회를 충분히 제공했는가?"
      ]
    },
    {
      category: "절차적 요건",
      items: [
        "해고 30일 전 예고를 했는가?",
        "서면으로 해고 사유를 통지했는가?",
        "취업규칙에 따른 절차를 준수했는가?",
        "노동조합이 있다면 협의했는가?"
      ]
    },
    {
      category: "특별 고려사항",
      items: [
        "임신, 출산, 육아휴직 중이 아닌가?",
        "업무상 재해로 인한 휴업 중이 아닌가?",
        "노동조합 활동과 관련이 없는가?",
        "차별적 요소가 없는가?"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            해고 가능성 진단 툴
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            해고의 정당성과 절차적 적법성을 사전에 진단하여 법적 리스크를 최소화하세요. 
            전문가의 경험을 바탕으로 정확한 진단을 제공합니다.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {checkPoints.map((point, index) => (
              <Badge key={index} variant="secondary" className="bg-red-100 text-red-800">
                {point}
              </Badge>
            ))}
          </div>
        </div>

        {/* 위험도 레벨 설명 */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {riskLevels.map((risk, index) => (
            <Card key={index} className={`${risk.bgColor} ${risk.borderColor} border-2`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${risk.color}`}>
                  <risk.icon className="w-5 h-5" />
                  위험도: {risk.level}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{risk.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 진단 체크리스트 */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {checklist.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{section.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm">
                      <Scale className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 주요 주의사항 */}
        <Card className="bg-amber-50 border-amber-200 mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <AlertCircle className="w-5 h-5" />
              해고 시 반드시 확인해야 할 사항
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-amber-800 mb-3">금지되는 해고</h4>
                <ul className="space-y-1 text-sm text-amber-700">
                  <li>• 임신, 출산, 육아휴직 중인 근로자</li>
                  <li>• 업무상 재해로 휴업 중인 근로자</li>
                  <li>• 노동조합 활동을 이유로 한 해고</li>
                  <li>• 성별, 종교 등을 이유로 한 차별</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-amber-800 mb-3">필수 절차</h4>
                <ul className="space-y-1 text-sm text-amber-700">
                  <li>• 30일 전 서면 예고 (또는 30일분 통상임금)</li>
                  <li>• 해고 사유와 시기 명시</li>
                  <li>• 취업규칙 상 징계절차 준수</li>
                  <li>• 개선 기회 제공 및 기록 보관</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA 버튼 */}
        <div className="mt-12 text-center">
          <Link href="/tools/dismissal-checker/check">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Scale className="w-6 h-6 mr-2" />
              무료 진단 시작하기
            </Button>
          </Link>
        </div>

        {/* 전문가 상담 CTA */}
        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">복잡한 상황이거나 위험도가 높다면?</h3>
            <p className="text-gray-600 mb-6">
              해고는 매우 신중하게 접근해야 하는 문제입니다. 
              법적 분쟁을 예방하기 위해 전문가의 조언을 받으시기 바랍니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  긴급 상담 신청
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg">
                  노무 컨설팅 문의
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 