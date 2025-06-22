"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Heart, Scale, Users, BookOpen, Eye, Handshake, Award } from "lucide-react"
import PageBanner from "@/components/page-banner"
import { motion } from "framer-motion"

export default function EthicsPage() {
  // 실제 윤리강령 8개 항목
  const ethicsCode = [
    {
      id: 1,
      title: "정당한 보수 책정",
      icon: Scale,
      description: "고객의 법지식이 부족함을 이용한 과다한 수임료 청구를 금지하며, 정당한 보수를 책정하여 청구합니다.",
      details: [
        "고객의 법지식 부족을 이용하지 않음",
        "정당하고 합리적인 수임료 책정",
        "투명한 비용 산정 기준 적용",
        "사전에 명확한 비용 안내"
      ]
    },
    {
      id: 2,
      title: "비밀유지 의무",
      icon: Eye,
      description: "업무수행 중 인지한 고객의 모든 정보에 대한 철저한 비밀유지 의무를 이행합니다.",
      details: [
        "고객 정보의 완전한 기밀 보장",
        "업무 수행 중 취득한 모든 정보 보호",
        "업무 종료 시 관련 자료 완전 폐기",
        "제3자에 대한 정보 유출 금지"
      ]
    },
    {
      id: 3,
      title: "정부지원사업 적법 활용",
      icon: Shield,
      description: "정부지원 컨설팅 및 보조금을 적법하고 정당하게 활용합니다.",
      details: [
        "정부지원사업의 올바른 활용",
        "보조금 관련 법규 준수",
        "투명한 사업 수행",
        "부정한 방법으로 지원금 수령 금지"
      ]
    },
    {
      id: 4,
      title: "법령 준수와 성실한 업무수행",
      icon: BookOpen,
      description: "법을 준수하고 원칙과 신의에 따라 위임된 업무를 성실하게 수행하며, 부당한 이익을 추구하지 않습니다.",
      details: [
        "모든 관련 법령의 철저한 준수",
        "원칙과 신의에 따른 업무 수행",
        "공무원 접대 등 부정한 방법 금지",
        "공익에 반하는 행위 금지"
      ]
    },
    {
      id: 5,
      title: "성실한 업무 수행",
      icon: Heart,
      description: "회사의 규모와 계약금액에 관계없이 수임한 모든 일을 성실하게 수행합니다.",
      details: [
        "기업 규모에 따른 차별 금지",
        "계약 금액과 무관한 동일한 서비스 품질",
        "모든 고객에게 최선의 노력",
        "책임감 있는 업무 완수"
      ]
    },
    {
      id: 6,
      title: "책임있는 상담",
      icon: Handshake,
      description: "책임있는 상담을 위해 무료상담을 지양하며, 고객의 입장에서 최선을 기준으로 상담합니다.",
      details: [
        "무료상담 지양을 통한 책임있는 상담",
        "수임 유도를 위한 상담 금지",
        "고객 최우선 이익을 위한 조언",
        "객관적이고 전문적인 상담 제공"
      ]
    },
    {
      id: 7,
      title: "사회적 약자 보호",
      icon: Users,
      description: "장애인, 기초생활수급자 등 사회적 약자와 지역사회 기여 기업에 대해서는 무료상담을 제공합니다.",
      details: [
        "사회적 약자를 위한 무료 상담",
        "장애인 및 기초생활수급자 지원",
        "사회적 기업에 대한 특별 배려",
        "지역사회 발전을 위한 기여"
      ]
    },
    {
      id: 8,
      title: "하나님의 공의와 사랑 실천",
      icon: Award,
      description: "하나님의 공의와 사랑을 바탕으로 모든 업무를 수행합니다.",
      details: [
        "기독교적 가치관을 바탕으로 한 업무 수행",
        "공의로운 판단과 결정",
        "사랑과 배려가 담긴 서비스",
        "도덕적이고 윤리적인 경영"
      ]
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
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">윤리강령 서문</h2>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    FAIR인사노무컨설팅은 고객과 사회에 대한 책임감을 가지고, 전문성과 윤리성을 바탕으로 
                    최고 수준의 노무 서비스를 제공하기 위해 다음과 같은 윤리강령을 제정하고 이를 준수할 것을 다짐합니다.
                    <br /><br />
                    우리는 이 윤리강령을 통해 건전한 노사관계 문화 조성에 기여하고, 
                    고객과 함께 성장하는 신뢰받는 노무법인이 되겠습니다.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* 윤리강령 8개 항목 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="px-4 md:px-0"
        >
          <div className="grid gap-6 md:gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
            {ethicsCode.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-primary">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg md:text-xl">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <span className="text-primary/70 text-sm font-medium">제{item.id}조</span>
                        <h3 className="text-foreground">{item.title}</h3>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-foreground mb-2">세부 실천 사항:</h4>
                      <ul className="space-y-2">
                        {item.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 마무리 섹션 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 md:mt-16 px-4"
        >
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-6 md:p-8 text-center">
                <h3 className="text-lg md:text-xl font-semibold mb-4 text-primary">윤리강령 이행 다짐</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                  FAIR인사노무컨설팅의 모든 구성원은 위 윤리강령을 성실히 준수하여, 
                  고객과 사회로부터 신뢰받는 노무법인이 되기 위해 최선을 다할 것을 약속드립니다.
                </p>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium">FAIR인사노무컨설팅 일동</p>
                  <p className="mt-2">※ 본 윤리강령은 정기적으로 검토하여 개선해 나가겠습니다.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
} 