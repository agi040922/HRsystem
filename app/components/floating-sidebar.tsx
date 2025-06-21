"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  X,
  ChevronRight,
  FileText,
  AlertTriangle,
  Calculator,
  Clock,
  MessageCircle,
  Menu
} from "lucide-react"

const tools = [
  {
    icon: FileText,
    title: "근로계약서 작성 툴",
    description: "맞춤형 근로계약서 자동 생성",
    href: "/tools/contract-generator/create",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: AlertTriangle,
    title: "해고 가능성 진단",
    description: "부당해고 위험도 무료 체크",
    href: "/tools/dismissal-checker/check",
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  {
    icon: Calculator,
    title: "퇴직금 계산기",
    description: "정확한 퇴직금 자동 계산",
    href: "/tools/severance-calculator",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: Clock,
    title: "근로시간 진단",
    description: "초과근무 및 수당 체크",
    href: "/tools/working-hours",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: MessageCircle,
    title: "AI 노무 상담",
    description: "24시간 무료 법률 상담",
    href: "/tools/ai-consultation",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50"
  }
]

export default function FloatingSidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* 토글 버튼 */}
      <motion.button
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsOpen(true)}
        className={`fixed right-4 top-1/2 -translate-y-1/2 z-40 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-l-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex items-center gap-2">
          <Menu className="w-5 h-5" />
          <span className="text-sm font-medium">노무 도구</span>
        </div>
      </motion.button>

      {/* 사이드바 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 배경 오버레이 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            />

            {/* 사이드바 컨텐츠 */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* 헤더 */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">노무 도구 모음</h2>
                    <p className="text-sm text-gray-600 mt-1">필요한 도구를 선택하세요</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* 도구 목록 */}
                <div className="space-y-3">
                  {tools.map((tool, index) => (
                    <motion.div
                      key={tool.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={tool.href}
                        onClick={() => setIsOpen(false)}
                        className={`block p-4 rounded-xl ${tool.bgColor} hover:shadow-md transition-all duration-300 group`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-lg bg-white/80 ${tool.color}`}>
                              <tool.icon className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">
                                {tool.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {tool.description}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* 하단 CTA */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white">
                  <h3 className="font-bold text-lg mb-2">전문가 상담이 필요하신가요?</h3>
                  <p className="text-sm mb-4 text-blue-100">
                    복잡한 노무 문제는 전문 노무사와 상담하세요
                  </p>
                  <Link href="/contact">
                    <Button
                      variant="secondary"
                      className="w-full bg-white text-blue-600 hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      무료 상담 신청하기
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
} 