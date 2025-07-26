"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import KakaoMap from "@/components/kakao-map"
import PageBanner from "@/components/page-banner"
import { motion } from "framer-motion"

export default function LocationPage() {
  // 위치 정보
  const locationInfo = {
    name: "FAIR인사노무컨설팅",
    address: "서울 은평구 진관 3로 22 파크앤타워 B동 412호",
    postalCode: "03280",
    phone: "02-387-9869",
    email: "fairhr@nate.com",
    businessHours: {
      weekdays: "10:00 ~ 20:00",
      saturday: "10:00 ~ 17:00",
      sunday: "휴무"
    },
    latitude: 37.6290,
    longitude: 126.9205
  }

  return (
    <div className="w-full overflow-x-hidden">
      {/* 페이지 배너 */}
      <PageBanner 
        title="오시는 길"
        subtitle="FAIR인사노무컨설팅 위치 안내"
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
                  <CardTitle className="text-xl">기본 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">{locationInfo.name}</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>
                        <span className="font-medium text-foreground">주소:</span> {locationInfo.address}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">전화:</span> <a href={`tel:${locationInfo.phone}`} className="text-primary hover:underline">{locationInfo.phone}</a>
                      </p>
                      <p>
                        <span className="font-medium text-foreground">이메일:</span> <a href={`mailto:${locationInfo.email}`} className="text-primary hover:underline">{locationInfo.email}</a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">운영시간</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">평일</span>
                      <span className="font-medium">{locationInfo.businessHours.weekdays}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">토요일</span>
                      <span className="font-medium">{locationInfo.businessHours.saturday}</span>
                    </div>
                    <div className="flex justify-between py-2">
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