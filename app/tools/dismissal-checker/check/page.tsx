"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, 
  ArrowRight, 
  Scale, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  User,
  Building,
  HelpCircle,
  FileText,
  Lightbulb,
  Shield,
  TrendingUp,
  TrendingDown
} from "lucide-react"
import Link from "next/link"

// 질문 옵션 타입
interface QuestionOption {
  value: string
  label: string
  weight: number
}

// 질문 타입
interface Question {
  id: number
  question: string
  type: 'radio' | 'textarea'
  options?: QuestionOption[]
  help?: string
  placeholder?: string
  weight?: number
}

// 질문 세트 타입
type QuestionSet = {
  employer: Question[]
  employee?: Question[]
}

// 질문 데이터 타입
type QuestionsData = {
  disciplinary: QuestionSet
  economic: QuestionSet
  ordinary: QuestionSet
}

// 진단 유형
const dismissalTypes = {
  disciplinary: {
    name: "징계 해고",
    icon: "⚖️",
    description: "업무상 과실, 규정 위반 등으로 인한 해고",
    color: "bg-red-500"
  },
  economic: {
    name: "경영상 해고", 
    icon: "📊",
    description: "경영상 어려움으로 인한 구조조정",
    color: "bg-orange-500"
  },
  ordinary: {
    name: "통상 해고",
    icon: "📋",
    description: "업무능력 부족, 질병 등으로 인한 해고",
    color: "bg-purple-500"
  }
}

// 진단 대상
const userTypes = {
  employer: {
    name: "고용주",
    icon: Building,
    description: "해고를 고려중이거나 진행한 사업주"
  },
  employee: {
    name: "근로자",
    icon: User,
    description: "해고 통보를 받았거나 우려되는 근로자"
  }
}

// 질문 데이터
const questions: QuestionsData = {
  disciplinary: {
    employer: [
      {
        id: 1,
        question: "해고 사유는 무엇입니까?",
        type: "radio",
        options: [
          { value: "serious_fault", label: "업무상 중대한 과실", weight: 20 },
          { value: "negligence", label: "근무 태만 또는 무단결근", weight: 15 },
          { value: "misconduct", label: "직장 내 폭력, 성희롱 등", weight: 25 },
          { value: "confidential", label: "회사 기밀 유출", weight: 25 },
          { value: "minor", label: "경미한 규정 위반", weight: 5 }
        ],
        help: "근로기준법 제23조에 따라 정당한 이유가 있어야 해고가 가능합니다."
      },
      {
        id: 2,
        question: "해고 사유 발생 시 근로자에게 소명 기회를 제공하였습니까?",
        type: "radio",
        options: [
          { value: "yes_written", label: "서면으로 통지하고 충분한 소명 기회 제공", weight: 20 },
          { value: "yes_verbal", label: "구두로 설명 기회 제공", weight: 10 },
          { value: "no", label: "소명 기회를 제공하지 않음", weight: 0 }
        ],
        help: "정당한 해고를 위해서는 근로자에게 충분한 소명 기회를 제공해야 합니다."
      },
      {
        id: 3,
        question: "징계 절차를 준수하였습니까?",
        type: "radio",
        options: [
          { value: "full", label: "징계위원회 개최 및 모든 절차 준수", weight: 20 },
          { value: "partial", label: "일부 절차만 준수", weight: 10 },
          { value: "none", label: "특별한 절차 없이 해고", weight: 0 }
        ],
        help: "취업규칙이나 단체협약에 정한 징계 절차를 반드시 준수해야 합니다."
      },
      {
        id: 4,
        question: "동일한 사유로 다른 근로자에게도 동일한 징계를 적용했습니까?",
        type: "radio",
        options: [
          { value: "yes", label: "일관된 기준으로 징계 적용", weight: 15 },
          { value: "no_lighter", label: "다른 근로자는 더 가벼운 징계", weight: 0 },
          { value: "first_case", label: "이런 사례가 처음임", weight: 10 }
        ],
        help: "형평성의 원칙에 따라 동일한 사안에는 동일한 징계가 적용되어야 합니다."
      },
      {
        id: 5,
        question: "회사 규정에 해당 사유의 해고 조항이 명시되어 있습니까?",
        type: "radio",
        options: [
          { value: "yes_clear", label: "명확하게 명시되어 있음", weight: 15 },
          { value: "yes_vague", label: "유사한 내용이 있음", weight: 8 },
          { value: "no", label: "관련 조항이 없음", weight: 0 }
        ],
        help: "취업규칙이나 근로계약서에 해고 사유가 명시되어 있어야 합니다."
      },
      {
        id: 6,
        question: "추가 설명이 필요한 사항이 있다면 기재해주세요.",
        type: "textarea",
        placeholder: "해고와 관련된 특수한 상황이나 추가 정보를 입력하세요.",
        weight: 0
      }
    ],
    employee: []
  },
  economic: {
    employer: [
      {
        id: 1,
        question: "경영상 어려움의 구체적인 상황은?",
        type: "radio",
        options: [
          { value: "severe", label: "매출 급감, 적자 지속 등 심각한 경영난", weight: 25 },
          { value: "restructure", label: "사업 구조조정 또는 조직 개편", weight: 20 },
          { value: "tech", label: "기술 혁신으로 인한 인력 감축 필요", weight: 15 },
          { value: "mild", label: "일시적 어려움", weight: 5 }
        ],
        help: "근로기준법 제24조에 따른 긴박한 경영상 필요가 있어야 합니다."
      },
      {
        id: 2,
        question: "해고 회피 노력을 다했습니까?",
        type: "radio",
        options: [
          { value: "comprehensive", label: "희망퇴직, 무급휴직, 전환배치 등 모든 노력", weight: 25 },
          { value: "some", label: "일부 해고 회피 조치 시행", weight: 15 },
          { value: "minimal", label: "최소한의 노력", weight: 5 },
          { value: "none", label: "특별한 노력 없음", weight: 0 }
        ],
        help: "해고는 최후의 수단이어야 하며, 해고 회피를 위한 노력이 선행되어야 합니다."
      },
      {
        id: 3,
        question: "해고 대상자 선정 기준은?",
        type: "radio",
        options: [
          { value: "objective", label: "객관적이고 합리적인 기준 적용", weight: 20 },
          { value: "partial", label: "일부 주관적 요소 포함", weight: 10 },
          { value: "subjective", label: "명확한 기준 없이 선정", weight: 0 }
        ],
        help: "연령, 성별 등 차별적 기준이 아닌 객관적 기준이어야 합니다."
      },
      {
        id: 4,
        question: "근로자 대표와의 협의는?",
        type: "radio",
        options: [
          { value: "full", label: "50일 전 통보 및 성실한 협의", weight: 20 },
          { value: "partial", label: "통보는 했으나 형식적 협의", weight: 10 },
          { value: "late", label: "50일 미만 통보", weight: 5 },
          { value: "none", label: "협의하지 않음", weight: 0 }
        ],
        help: "해고 50일 전까지 근로자 대표에게 통보하고 협의해야 합니다."
      },
      {
        id: 5,
        question: "해고 시기와 관련하여",
        type: "radio", 
        options: [
          { value: "proper", label: "충분한 예고 기간 준수", weight: 10 },
          { value: "short", label: "예고 기간 미준수 (수당 지급)", weight: 5 },
          { value: "immediate", label: "즉시 해고", weight: 0 }
        ],
        help: "최소 30일 전 예고 또는 30일분 통상임금을 지급해야 합니다."
      }
    ]
  },
  ordinary: {
    employer: [
      {
        id: 1,
        question: "통상 해고의 주된 사유는?",
        type: "radio",
        options: [
          { value: "performance", label: "지속적인 업무 능력 부족", weight: 15 },
          { value: "illness", label: "질병으로 인한 업무 수행 불가", weight: 20 },
          { value: "attitude", label: "근무 태도 불량", weight: 10 },
          { value: "other", label: "기타 사유", weight: 5 }
        ],
        help: "통상 해고도 정당한 이유가 있어야 가능합니다."
      },
      {
        id: 2,
        question: "개선 기회를 제공했습니까?",
        type: "radio",
        options: [
          { value: "multiple", label: "여러 차례 경고 및 개선 기회 제공", weight: 25 },
          { value: "some", label: "1-2회 경고", weight: 15 },
          { value: "none", label: "개선 기회 없이 해고", weight: 0 }
        ],
        help: "해고 전 충분한 개선 기회를 제공해야 합니다."
      },
      {
        id: 3,
        question: "객관적 평가 자료가 있습니까?",
        type: "radio",
        options: [
          { value: "comprehensive", label: "상세한 평가 자료 및 기록 보유", weight: 20 },
          { value: "some", label: "일부 자료 보유", weight: 10 },
          { value: "none", label: "객관적 자료 없음", weight: 0 }
        ],
        help: "주관적 판단이 아닌 객관적 근거가 필요합니다."
      },
      {
        id: 4,
        question: "대체 업무 배치를 고려했습니까?",
        type: "radio",
        options: [
          { value: "yes", label: "다른 업무로 전환 배치 시도", weight: 20 },
          { value: "considered", label: "고려했으나 적합한 업무 없음", weight: 15 },
          { value: "no", label: "고려하지 않음", weight: 0 }
        ],
        help: "해고 전 다른 업무 배치 가능성을 검토해야 합니다."
      }
    ]
  }
}

export default function DismissalCheckPage() {
  const [step, setStep] = useState<'type' | 'user' | 'questions' | 'result'>('type')
  const [dismissalType, setDismissalType] = useState<string>('')
  const [userType, setUserType] = useState<string>('')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [showHelp, setShowHelp] = useState<number | null>(null)
  const [score, setScore] = useState(0)

  // 현재 질문 세트 가져오기
  const getCurrentQuestions = () => {
    if (!dismissalType || !userType) return []
    const questionSet = questions[dismissalType as keyof typeof questions]
    if (!questionSet) return []
    return questionSet[userType as keyof typeof questionSet] || []
  }

  const currentQuestions = getCurrentQuestions()
  const totalQuestions = currentQuestions.length

  // 답변 처리
  const handleAnswer = (value: any) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: value }))
  }

  // 다음 질문으로
  const nextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResult()
    }
  }

  // 이전 질문으로
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else if (step === 'questions') {
      setStep('user')
      setCurrentQuestion(0)
      setAnswers({})
    }
  }

  // 결과 계산
  const calculateResult = () => {
    let totalScore = 0
    currentQuestions.forEach((q: Question, index: number) => {
      const answer = answers[index]
      if (q.type === 'radio' && answer) {
        const option = q.options?.find((opt: QuestionOption) => opt.value === answer)
        if (option) {
          totalScore += option.weight
        }
      }
    })
    setScore(totalScore)
    setStep('result')
  }

  // 정당성 레벨 판단
  const getJustificationLevel = () => {
    if (score >= 80) return { level: '높음', color: 'text-green-600', bgColor: 'bg-green-50' }
    if (score >= 60) return { level: '보통', color: 'text-yellow-600', bgColor: 'bg-yellow-50' }
    if (score >= 40) return { level: '낮음', color: 'text-orange-600', bgColor: 'bg-orange-50' }
    return { level: '매우 낮음', color: 'text-red-600', bgColor: 'bg-red-50' }
  }

  // 진행률 계산
  const getProgress = () => {
    if (step === 'type') return 25
    if (step === 'user') return 50
    if (step === 'questions') return 50 + (currentQuestion / totalQuestions) * 40
    return 100
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#191970] via-[#4169E1] to-[#00BFFF]">
      {/* 배경 효과 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-8 max-w-5xl">
        {/* 헤더 */}
        <div className="mb-8 flex items-center justify-between">
          <Link 
            href="/tools/dismissal-checker" 
            className="inline-flex items-center text-sm text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            도구 소개로 돌아가기
          </Link>
          
          <div className="flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-[#00BFFF]" />
            <span className="text-2xl font-bold text-white">Blue Right</span>
            <span className="text-sm text-white/70">해고 정당성 진단</span>
          </div>
        </div>

        {/* 진행 상태 바 */}
        <div className="mb-8">
          <Progress value={getProgress()} className="h-2 bg-white/20" />
          <div className="flex justify-between mt-2 text-xs text-white/60">
            <span className={step === 'type' ? 'text-white' : ''}>해고 유형</span>
            <span className={step === 'user' ? 'text-white' : ''}>진단 대상</span>
            <span className={step === 'questions' ? 'text-white' : ''}>상세 진단</span>
            <span className={step === 'result' ? 'text-white' : ''}>결과</span>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <AnimatePresence mode="wait">
          {/* 해고 유형 선택 */}
          {step === 'type' && (
            <motion.div
              key="type"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Card className="bg-white/95 backdrop-blur border-0 shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-[#191970] mb-3">
                      해고 유형을 선택하세요
                    </h2>
                    <p className="text-gray-600">
                      해고 사유에 따라 적절한 진단을 진행합니다
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    {Object.entries(dismissalTypes).map(([key, type]) => (
                      <motion.div
                        key={key}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`cursor-pointer transition-all border-2 ${
                            dismissalType === key 
                              ? 'border-[#4169E1] shadow-lg bg-[#E6E6FA]' 
                              : 'border-gray-200 hover:border-[#87CEEB]'
                          }`}
                          onClick={() => setDismissalType(key)}
                        >
                          <CardContent className="p-6 text-center">
                            <div className="text-4xl mb-3">{type.icon}</div>
                            <h3 className="font-semibold text-lg mb-2 text-[#191970]">
                              {type.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {type.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-end">
                    <Button
                      onClick={() => setStep('user')}
                      disabled={!dismissalType}
                      className="bg-[#4169E1] hover:bg-[#191970] text-white px-6"
                    >
                      다음 단계로
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* 진단 대상 선택 */}
          {step === 'user' && (
            <motion.div
              key="user"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Card className="bg-white/95 backdrop-blur border-0 shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-[#191970] mb-3">
                      진단 대상을 선택하세요
                    </h2>
                    <p className="text-gray-600">
                      입장에 따라 맞춤형 진단을 제공합니다
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {Object.entries(userTypes).map(([key, type]) => (
                      <motion.div
                        key={key}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`cursor-pointer transition-all border-2 ${
                            userType === key 
                              ? 'border-[#4169E1] shadow-lg bg-[#E6E6FA]' 
                              : 'border-gray-200 hover:border-[#87CEEB]'
                          }`}
                          onClick={() => setUserType(key)}
                        >
                          <CardContent className="p-8 text-center">
                            <type.icon className="w-16 h-16 mx-auto mb-4 text-[#4169E1]" />
                            <h3 className="font-semibold text-xl mb-2 text-[#191970]">
                              {type.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {type.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setStep('type')
                        setUserType('')
                      }}
                      className="border-[#4169E1] text-[#4169E1] hover:bg-[#E6E6FA]"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      이전 단계
                    </Button>
                    <Button
                      onClick={() => setStep('questions')}
                      disabled={!userType}
                      className="bg-[#4169E1] hover:bg-[#191970] text-white px-6"
                    >
                      진단 시작하기
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* 질문 단계 */}
          {step === 'questions' && currentQuestions.length > 0 && (
            <motion.div
              key={`question-${currentQuestion}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card className="bg-white/95 backdrop-blur border-0 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-[#191970] to-[#4169E1] text-white">
                  <CardTitle className="flex items-center justify-between">
                    <span>질문 {currentQuestion + 1} / {totalQuestions}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                      onClick={() => setShowHelp(showHelp === currentQuestion ? null : currentQuestion)}
                    >
                      <HelpCircle className="w-5 h-5" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-[#191970]">
                      {currentQuestions[currentQuestion].question}
                    </h3>

                    {/* 도움말 */}
                    <AnimatePresence>
                      {showHelp === currentQuestion && currentQuestions[currentQuestion].help && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-[#E6E6FA] p-4 rounded-lg"
                        >
                          <p className="text-sm text-[#191970] flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            {currentQuestions[currentQuestion].help}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* 답변 옵션 */}
                    {currentQuestions[currentQuestion].type === 'radio' && (
                      <RadioGroup
                        value={answers[currentQuestion] || ''}
                        onValueChange={handleAnswer}
                      >
                        <div className="space-y-3">
                          {currentQuestions[currentQuestion].options?.map((option: QuestionOption) => (
                            <label
                              key={option.value}
                              className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                answers[currentQuestion] === option.value
                                  ? 'border-[#4169E1] bg-[#E6E6FA]'
                                  : 'border-gray-200 hover:border-[#87CEEB]'
                              }`}
                            >
                              <RadioGroupItem value={option.value} className="mr-3" />
                              <span className="text-gray-700">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </RadioGroup>
                    )}

                    {currentQuestions[currentQuestion].type === 'textarea' && (
                      <Textarea
                        value={answers[currentQuestion] || ''}
                        onChange={(e) => handleAnswer(e.target.value)}
                        placeholder={currentQuestions[currentQuestion].placeholder}
                        rows={4}
                        className="border-[#87CEEB] focus:border-[#4169E1]"
                      />
                    )}
                  </div>

                  <div className="mt-8 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={prevQuestion}
                      className="border-[#4169E1] text-[#4169E1] hover:bg-[#E6E6FA]"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      이전
                    </Button>
                    <Button
                      onClick={nextQuestion}
                      disabled={!answers[currentQuestion] && currentQuestions[currentQuestion].type !== 'textarea'}
                      className="bg-[#4169E1] hover:bg-[#191970] text-white px-6"
                    >
                      {currentQuestion < totalQuestions - 1 ? '다음' : '결과 보기'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* 결과 화면 */}
          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <Card className="bg-white/95 backdrop-blur border-0 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-[#191970] to-[#4169E1] text-white text-center py-8">
                  <CardTitle className="text-3xl">진단 결과</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {/* 점수 게이지 */}
                  <div className="text-center mb-8">
                    <div className="relative inline-flex items-center justify-center w-48 h-48">
                      <svg className="w-48 h-48 transform -rotate-90">
                        <circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="#E6E6FA"
                          strokeWidth="16"
                          fill="none"
                        />
                        <circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="url(#gradient)"
                          strokeWidth="16"
                          fill="none"
                          strokeDasharray={`${(score / 100) * 553} 553`}
                          className="transition-all duration-1000"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#191970" />
                            <stop offset="100%" stopColor="#00BFFF" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute text-center">
                        <div className="text-5xl font-bold text-[#191970]">{score}</div>
                        <div className="text-sm text-gray-600">/ 100</div>
                      </div>
                    </div>
                  </div>

                  {/* 정당성 판정 */}
                  <div className={`text-center p-6 rounded-lg ${getJustificationLevel().bgColor} mb-8`}>
                    <h3 className={`text-2xl font-bold ${getJustificationLevel().color} mb-2`}>
                      해고 정당성: {getJustificationLevel().level}
                    </h3>
                    <p className="text-gray-700">
                      {userType === 'employer' 
                        ? '귀하의 해고 조치는 법적 정당성이 '
                        : '귀하가 받은 해고 통보는 부당해고 가능성이 '}
                      <span className="font-semibold">{getJustificationLevel().level}</span>
                      {userType === 'employer' ? '습니다.' : '습니다.'}
                    </p>
                  </div>

                  {/* 강점과 약점 분석 */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card className="border-[#4169E1]">
                      <CardHeader className="bg-[#E6E6FA]">
                        <CardTitle className="flex items-center gap-2 text-[#191970]">
                          <TrendingUp className="w-5 h-5" />
                          강점 요소
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <ul className="space-y-2">
                          {score >= 60 && (
                            <>
                              <li className="flex items-start gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>정당한 해고 사유가 존재합니다</span>
                              </li>
                              <li className="flex items-start gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>적절한 절차를 준수했습니다</span>
                              </li>
                            </>
                          )}
                          {score >= 40 && (
                            <li className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <span>기본적인 요건은 충족했습니다</span>
                            </li>
                          )}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-[#FF6B6B]">
                      <CardHeader className="bg-[#FFE0E0]">
                        <CardTitle className="flex items-center gap-2 text-[#CC0000]">
                          <TrendingDown className="w-5 h-5" />
                          보완 필요사항
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <ul className="space-y-2">
                          {score < 80 && (
                            <li className="flex items-start gap-2 text-sm">
                              <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                              <span>추가적인 증빙 자료가 필요합니다</span>
                            </li>
                          )}
                          {score < 60 && (
                            <li className="flex items-start gap-2 text-sm">
                              <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                              <span>절차상 미흡한 부분이 있습니다</span>
                            </li>
                          )}
                          {score < 40 && (
                            <li className="flex items-start gap-2 text-sm">
                              <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                              <span>해고 사유의 정당성이 부족합니다</span>
                            </li>
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 예상 시나리오 */}
                  <Card className="mb-8 border-[#87CEEB]">
                    <CardHeader className="bg-gradient-to-r from-[#E6E6FA] to-[#87CEEB]">
                      <CardTitle className="text-[#191970]">예상 시나리오</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        {userType === 'employer' ? (
                          <>
                            <div className="flex items-start gap-3">
                              <Scale className="w-5 h-5 text-[#4169E1] flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-semibold mb-1">노동위원회 구제신청 시</h4>
                                <p className="text-sm text-gray-600">
                                  {score >= 60 
                                    ? '정당한 해고로 인정받을 가능성이 높습니다.'
                                    : '부당해고로 판정받을 위험이 있습니다.'}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <FileText className="w-5 h-5 text-[#4169E1] flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-semibold mb-1">권고사항</h4>
                                <p className="text-sm text-gray-600">
                                  {score >= 60
                                    ? '현재 상태로 진행 가능하나, 추가 보완을 권장합니다.'
                                    : '전문가 상담 후 보완 조치를 취하시기 바랍니다.'}
                                </p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-start gap-3">
                              <Shield className="w-5 h-5 text-[#4169E1] flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-semibold mb-1">구제 가능성</h4>
                                <p className="text-sm text-gray-600">
                                  {score < 40
                                    ? '부당해고 구제신청 시 승소 가능성이 높습니다.'
                                    : '구제신청 전 추가 검토가 필요합니다.'}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <FileText className="w-5 h-5 text-[#4169E1] flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-semibold mb-1">대응 방안</h4>
                                <p className="text-sm text-gray-600">
                                  {score < 40
                                    ? '즉시 전문가와 상담하여 구제신청을 준비하세요.'
                                    : '증거 자료를 수집하고 전문가 조언을 구하세요.'}
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* 행동 버튼 */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-[#4169E1] hover:bg-[#191970] text-white"
                      onClick={() => {
                        // 결과 다운로드 또는 저장 기능
                      }}
                    >
                      <FileText className="w-5 h-5 mr-2" />
                      상세 리포트 다운로드
                    </Button>
                    <Link href="/contact">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-[#4169E1] text-[#4169E1] hover:bg-[#E6E6FA]"
                      >
                        전문가 상담 신청
                      </Button>
                    </Link>
                  </div>

                  <div className="text-center mt-6">
                    <Button
                      variant="link"
                      onClick={() => {
                        setStep('type')
                        setDismissalType('')
                        setUserType('')
                        setCurrentQuestion(0)
                        setAnswers({})
                        setScore(0)
                      }}
                      className="text-[#4169E1]"
                    >
                      다시 진단하기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 