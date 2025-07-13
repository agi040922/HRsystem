import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ClipboardCheck, ArrowLeft, Download, FileText, AlertCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "근로계약서 작성 툴 | FAIR인사노무컨설팅",
  description: "법적 요건을 완벽히 만족하는 근로계약서를 쉽고 빠르게 작성할 수 있는 전문가 도구입니다. 무료로 사용해보세요.",
  keywords: "근로계약서, 계약서작성, 노동법, 근로기준법, 고용계약, 노무도구, FAIR인사노무컨설팅",
  openGraph: {
    title: "근로계약서 작성 툴 - 전문가가 만든 무료 도구",
    description: "법적 요건을 만족하는 근로계약서를 몇 분만에 작성하세요.",
    type: "website",
  },
}

export default function ContractGeneratorPage() {
  const features = [
    "최신 근로기준법 반영",
    "다양한 고용 형태 지원",
    "자동 법적 검토 기능", 
    "PDF 다운로드 제공",
    "실시간 미리보기"
  ]

  const steps = [
    { number: 1, title: "기본 정보 입력", description: "회사 정보와 근로자 정보를 입력합니다." },
    { number: 2, title: "근로 조건 설정", description: "급여, 근무시간, 휴가 등 근로 조건을 설정합니다." },
    { number: 3, title: "자동 검토", description: "시스템이 법적 요건 충족 여부를 자동으로 검토합니다." },
    { number: 4, title: "계약서 생성", description: "완성된 근로계약서를 PDF로 다운로드합니다." }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <ClipboardCheck className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            근로계약서 작성 툴
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            복잡한 법적 요건을 모두 충족하는 근로계약서를 몇 분만에 완성하세요. 
            전문가가 개발한 도구로 실수 없는 계약서를 만들 수 있습니다.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* 주요 기능 카드 */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                스마트 작성 기능
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 업종별 맞춤 템플릿 제공</li>
                <li>• 필수 조항 자동 포함</li>
                <li>• 법률 용어 쉬운 설명</li>
                <li>• 실시간 오류 검사</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-green-600" />
                편리한 출력 기능
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 고품질 PDF 생성</li>
                <li>• 전자서명 가능한 형태</li>
                <li>• 보관용 파일 제공</li>
                <li>• 언제든 재편집 가능</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* 작성 단계 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>간단한 4단계로 완성</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div key={step.number} className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    {step.number}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 주의사항 */}
        <Card className="bg-amber-50 border-amber-200 mb-12">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-800 mb-2">사용 전 유의사항</h3>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• 본 도구는 일반적인 근로계약서 작성을 돕는 보조 도구입니다.</li>
                  <li>• 특수한 상황이나 복잡한 조건의 경우 전문가 상담을 권장합니다.</li>
                  <li>• 지역별 조례나 특별법 적용 사항은 별도 확인이 필요할 수 있습니다.</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA 버튼 */}
        <div className="text-center">
          <Link href="/tools/contract-generator/create">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              근로계약서 작성 시작하기
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            무료로 사용할 수 있으며, 회원가입이 필요하지 않습니다.
          </p>
        </div>

        {/* 전문가 상담 CTA */}
        <Card className="mt-12 bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">복잡한 상황이신가요?</h3>
            <p className="text-gray-600 mb-6">
              특수한 고용 형태나 복잡한 근로 조건의 경우, 
              전문가의 직접적인 도움을 받으시는 것이 좋습니다.
            </p>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                전문가 상담 신청하기
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 