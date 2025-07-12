"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Phone } from "lucide-react"
import KakaoMap from "@/components/kakao-map"
import PageBanner from "@/components/page-banner"
import { motion } from "framer-motion"

export default function LocationPage() {
  // 위치 정보
  const locationInfo = {
    name: "FAIR인사노무컨설팅",
    address: "서울특별시 강남구 테헤란로 123, 4층",
    postalCode: "06123",
    phone: "02-1234-5678",
    email: "info@fair-hr.co.kr",
    businessHours: {
      weekdays: "09:00 ~ 18:00",
      saturday: "09:00 ~ 13:00 (예약제)",
      sunday: "휴무"
    },
    latitude: 37.5012743,
    longitude: 127.039585
  }

  return (
    <div className="w-full overflow-x-hidden">
      {/* 페이지 배너 */}
      <PageBanner 
        title="오시는 길"
        subtitle="노무법인 [법인명] 위치 안내"
        backgroundImage="/FAIR000.png"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container-fluid max-w-6xl py-8 md:py-12 lg:py-16"
      >
        {/* 지도 및 기본 정보 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="px-4 md:px-0"
        >
          <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
            {/* 지도 */}
            <Card>
              <CardContent className="p-0">
                <div className="w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden">
                  <KakaoMap
                    latitude={locationInfo.latitude}
                    longitude={locationInfo.longitude}
                    level={3}
                    markerText={locationInfo.name}
                    className="w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* 기본 정보 */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <MapPin className="w-6 h-6 text-primary" />
                    기본 정보
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{locationInfo.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      주소: {locationInfo.address}<br />
                      우편번호: {locationInfo.postalCode}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <Phone className="w-4 h-4 inline mr-2" />
                      전화: <a href={`tel:${locationInfo.phone}`} className="text-primary hover:underline">{locationInfo.phone}</a>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      이메일: <a href={`mailto:${locationInfo.email}`} className="text-primary hover:underline">{locationInfo.email}</a>
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Clock className="w-6 h-6 text-primary" />
                    운영시간
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">평일</span>
                      <span className="font-medium">{locationInfo.businessHours.weekdays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">토요일</span>
                      <span className="font-medium">{locationInfo.businessHours.saturday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">일요일/공휴일</span>
                      <span className="font-medium text-red-500">{locationInfo.businessHours.sunday}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
} 