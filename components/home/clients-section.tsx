"use client"

import { motion } from "framer-motion"
import { useTranslations } from 'next-intl'

export default function ClientsSection() {
  const t = useTranslations()
  const tClients = useTranslations('clients')

  return (
    <section id="services-summary" className="w-full py-6 sm:py-8 md:py-12 bg-slate-50">
      <div className="container-fluid max-w-7xl px-4">
        {/* 메인 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
            {tClients('title')}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8">
            {tClients('subtitle')}
          </p>
        </motion.div>

        {/* 간단한 통계 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-8 mb-8"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">{tClients('stats.companies.value')}</div>
            <div className="text-sm text-gray-600">{tClients('stats.companies.label')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">{tClients('stats.experience.value')}</div>
            <div className="text-sm text-gray-600">{tClients('stats.experience.label')}</div>
          </div>
        </motion.div>

        {/* 기업 로고 슬라이더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {tClients('partnersTitle')}
            </h3>
            <p className="text-base text-gray-600">{tClients('partnersSubtitle')}</p>
          </div>
          
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 via-white to-blue-50 py-12 -mx-4 md:-mx-8 lg:-mx-16">
            {/* w-max 가 없으면 요소 폭이 부모(화면) 폭이 되어 translateX(-50%) 가
                한 세트가 아니라 화면 절반만 움직인다 — 로고 일부만 지나가고 되돌아간다.
                두 세트의 폭이 정확히 같아야 이어지므로 트랙 좌우 패딩은 두지 않고
                양쪽 세트에 같은 ml-16 을 준다. */}
            <div className="flex w-max animate-scroll">
              {/* 첫 번째 세트 */}
              <div className="flex space-x-16 min-w-max ml-16">
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img 
                    src="/로고/마이크로소프트.png" 
                    alt="Microsoft" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img 
                    src="/로고/GE.svg" 
                    alt="GE" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img
                    src="/로고/GSK.jpg"
                    alt="GSK" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img 
                    src="/로고/YAMAHA.jpeg" 
                    alt="YAMAHA" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img 
                    src="/로고/DHLEXPRESS.jpg" 
                    alt="DHL" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img 
                    src="/로고/J&J.png" 
                    alt="Johnson & Johnson" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img 
                    src="/로고/GUCCI.png" 
                    alt="GUCCI" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img
                    src="/로고/Kellogg.svg"
                    alt="Kellogg" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img
                    src="/로고/NHK 서울지국.png"
                    alt="NHK 서울지국"
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-32 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img
                    src="/로고/S-OIL-TotalEnergies.png"
                    alt="S-OIL·TotalEnergies"
                    className="w-28 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-32 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img
                    src="/로고/EWHA-Biomedics.png"
                    alt="EWHA Biomedics"
                    className="w-28 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-32 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img
                    src="/로고/ECO3.png"
                    alt="ECO3"
                    className="w-28 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-32 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img
                    src="/로고/SCREENKOREA.png"
                    alt="SCREENKOREA"
                    className="w-28 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-32 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img
                    src="/로고/AGFA.png"
                    alt="AGFA"
                    className="w-28 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-32 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img
                    src="/로고/FujiTV.png"
                    alt="Fuji Television"
                    className="w-28 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-32 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img
                    src="/로고/SERVIER.png"
                    alt="Servier"
                    className="w-28 h-16 object-contain"
                  />
                </div>
              </div>

              {/* 두 번째 세트 (무한 스크롤용) */}
              <div className="flex space-x-16 min-w-max ml-16">
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img 
                    src="/로고/마이크로소프트.png" 
                    alt="Microsoft" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img 
                    src="/로고/GE.svg" 
                    alt="GE" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img
                    src="/로고/GSK.jpg"
                    alt="GSK" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img 
                    src="/로고/YAMAHA.jpeg" 
                    alt="YAMAHA" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img 
                    src="/로고/DHLEXPRESS.jpg" 
                    alt="DHL" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img 
                    src="/로고/J&J.png" 
                    alt="Johnson & Johnson" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img 
                    src="/로고/GUCCI.png" 
                    alt="GUCCI" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img
                    src="/로고/Kellogg.svg"
                    alt="Kellogg"
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img
                    src="/로고/NHK 서울지국.png"
                    alt="NHK 서울지국"
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-32 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img
                    src="/로고/S-OIL-TotalEnergies.png"
                    alt="S-OIL·TotalEnergies"
                    className="w-28 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-32 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img
                    src="/로고/EWHA-Biomedics.png"
                    alt="EWHA Biomedics"
                    className="w-28 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-32 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img
                    src="/로고/ECO3.png"
                    alt="ECO3"
                    className="w-28 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-32 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img
                    src="/로고/SCREENKOREA.png"
                    alt="SCREENKOREA"
                    className="w-28 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-32 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img
                    src="/로고/AGFA.png"
                    alt="AGFA"
                    className="w-28 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-32 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img
                    src="/로고/FujiTV.png"
                    alt="Fuji Television"
                    className="w-28 h-16 object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-32 h-24 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <img
                    src="/로고/SERVIER.png"
                    alt="Servier"
                    className="w-28 h-16 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 이력 기준 고지 — 계약 종료 기업 포함 표시에 대한 오인 방지 */}
          <p className="mt-4 text-center text-xs text-gray-400">{tClients('partnersNote')}</p>
        </motion.div>
      </div>
    </section>
  )
}
