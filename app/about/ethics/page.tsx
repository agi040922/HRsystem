"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Heart, Scale, Users, BookOpen, Eye, Handshake, Award } from "lucide-react"
import PageBanner from "@/components/page-banner"
import { motion } from "framer-motion"

export default function EthicsPage() {
  // 간략화된 윤리강령 8개 항목
  const ethicsCode = [
    {
      id: 1,
      title: "정당한 보수 책정",
      icon: Scale,
      description: "정당한 보수를 책정하여 청구합니다."
    },
    {
      id: 2,
      title: "비밀유지 의무",
      icon: Eye,
      description: "고객의 모든 정보에 대한 철저한 비밀유지 의무를 이행합니다."
    },
    {
      id: 3,
      title: "정부지원사업 적법 활용",
      icon: Shield,
      description: "정부지원 컨설팅 및 보조금을 적법하고 정당하게 활용합니다."
    },
    {
      id: 4,
      title: "법령 준수와 성실한 업무수행",
      icon: BookOpen,
      description: "법을 준수하고 원칙과 신의에 따라 위임된 업무를 성실하게 수행합니다."
    },
    {
      id: 5,
      title: "성실한 업무 수행",
      icon: Heart,
      description: "회사의 규모와 계약금액에 관계없이 수임한 모든 일을 성실하게 수행합니다."
    },
    {
      id: 6,
      title: "책임있는 상담",
      icon: Handshake,
      description: "책임있는 상담을 위해 무료상담을 지양하며, 고객의 입장에서 최선을 기준으로 상담합니다."
    },
    {
      id: 7,
      title: "사회적 약자 보호",
      icon: Users,
      description: "장애인, 기초생활수급자 등 사회적 약자와 지역사회 기여 기업에 대해서는 무료상담을 제공합니다."
    },
    {
      id: 8,
      title: "하나님의 공의와 사랑 실천",
      icon: Award,
      description: "하나님의 공의와 사랑을 바탕으로 모든 업무를 수행합니다."
    }
  ]

  return (
    <div className="w-full overflow-x-hidden">
      {/* 페이지 배너 */}
      <PageBanner 
        title="윤리강령"
        subtitle="FAIR인사노무컨설팅이 추구하는 8가지 핵심 가치와 윤리 원칙"
        backgroundImage="/FAIR000.png"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container-fluid max-w-7xl py-8 md:py-12 lg:py-16 xl:py-20"
      >
        {/* 윤리강령 서문 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 md:mb-16"
        >
          <div className="max-w-4xl mx-auto px-4">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 md:p-8">
                <div className="text-center">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">윤리강령</h2>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    FAIR인사노무컨설팅은 다음과 같은 윤리강령을 제정하고 이를 준수합니다.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* 윤리강령 8개 항목 - 1줄 형태 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="px-4 md:px-0"
        >
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {ethicsCode.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-primary/70 text-sm font-medium whitespace-nowrap">제{item.id}조</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
} 