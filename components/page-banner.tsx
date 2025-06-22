"use client"

import { motion } from "framer-motion"

interface PageBannerProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  className?: string
}

export default function PageBanner({ 
  title, 
  subtitle, 
  backgroundImage = "/FAIR000.png",
  className = ""
}: PageBannerProps) {
  return (
    <div className={`relative w-full h-[150px] md:h-[200px] lg:h-[250px] overflow-hidden ${className}`}>
      {/* 기본 배경색 (폴백용) */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-700" />
      
      {/* 배경 이미지 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      
      {/* 가벼운 오버레이 (텍스트 가독성을 위해) */}
      <div className="absolute inset-0 bg-black/10" />
      
      {/* 콘텐츠 */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container-fluid max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center text-white"
          >
            <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 tracking-tight drop-shadow-lg">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm md:text-base lg:text-lg text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
} 