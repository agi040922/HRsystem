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
  backgroundImage = "public/FAIR000.png",
  className = ""
}: PageBannerProps) {
  return (
    <div className={`relative w-full h-[150px] md:h-[200px] lg:h-[250px] overflow-hidden ${className}`}>
      {/* 배경 이미지 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60" />
      
      {/* 콘텐츠 */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container-fluid max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center text-white"
          >
            <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm md:text-base lg:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* 하단 파도 효과 */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          className="relative block w-full h-8 md:h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-background"
          />
        </svg>
      </div>
    </div>
  )
} 