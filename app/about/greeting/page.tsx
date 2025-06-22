"use client"

import Image from "next/image"
import { Building } from "lucide-react"
import PageBanner from "@/components/page-banner"
import { motion } from "framer-motion"

export default function GreetingPage() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* 페이지 배너 */}
      <PageBanner 
        title="인사말"
        subtitle="FAIR인사노무컨설팅의 철학과 비전을 소개합니다"
        backgroundImage="/FAIR000.png"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container-fluid max-w-7xl py-8 md:py-12 lg:py-16 xl:py-20"
      >
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid gap-6 md:gap-8 lg:grid-cols-2 items-center max-w-6xl mx-auto">
            <div className="px-4 md:px-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-primary flex items-center gap-2">
                <Building className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex-shrink-0" /> 대표 공인노무사 인사말
              </h2>
              <div className="mb-6">
                <Image
                  src="/언론1.png"
                  alt="대표 공인노무사 정광일 사진"
                  width={120}
                  height={120}
                  className="rounded-full float-left mr-4 mb-2 sm:w-[150px] sm:h-[150px] sm:mr-6"
                />
                <div className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  <p className="mb-4">
                    FAIR인사노무컨설팅은 2005년 설립된 이후, 기업자문에 컨설팅 개념을 도입하여 기업자문의 새로운 지평을 열었다는 평가를 받고 있습니다.
                    <br className="hidden sm:block" />
                    그 결과 현재 국내외 100여 업체의 기업고객에게 전문적인 자문서비스를 제공하고 있습니다.
                  </p>
                  <p className="mb-4">
                    또한 FAIR인사노무컨설팅은 대기업 및 외국계 기업에 대한 자문외에도 하나님의 공의와 사랑을 추구하는 선함 노동상담실과 도서출판 선함을 부설기관으로 운영하고 있습니다.
                  </p>
                  <p className="mb-4">
                    그 동안 200건이 넘는 노동관련 사건(노동위원회 사건, 행정심판 사건, 산재보험료율 변경청구 사건, 산재사건 등)에서 압도적인 승소율을 유지하고 있으며, 이는 치밀한 논리와 철저한 준비의 결과라는 점을 고객 모두는 잘 알고 있습니다.
                  </p>
                  <p className="mb-6">
                    법률지식을 넘어 문제를 해결할 수 있는 전략을 원한다면, FAIR인사노무컨설팅과 만나십시오.
                    귀하의 진정한 파트너가 되어 드리겠습니다.
                  </p>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-right">
                      <span className="font-medium text-foreground">대표 / 공인노무사 정광일</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 md:px-0">
              <Image
                src="https://imageoptimzer.acon3d.com/?image=https%3A%2F%2Fstorage.acon3d.com%2Fproduct%2FOKMrTcsXOsVkdxeUqxNpu&width=2600&quality=70&watermark=true"
                alt="FAIR인사노무컨설팅 사무실 이미지"
                width={500}
                height={400}
                className="rounded-lg object-cover w-full h-auto"
              />
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground italic">
                  "법률지식을 넘어 문제를 해결할 수 있는 전략을 제공합니다"
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
} 