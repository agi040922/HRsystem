"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Car, Train, Bus, Phone } from "lucide-react"
import KakaoMap from "@/components/kakao-map"
import PageBanner from "@/components/page-banner"
import { motion } from "framer-motion"

export default function LocationPage() {
  // 위치 정보 (수정 가능)
  const locationInfo = {
    name: "FAIR인사노무컨설팅",
    address: "서울특별시 강남구 테헤란로 123, 4층",
    postalCode: "06123",
    phone: "02-1234-5678",
    fax: "02-1234-5679",
    email: "info@fair-hr.co.kr",
    businessHours: {
      weekdays: "09:00 ~ 18:00",
      saturday: "09:00 ~ 13:00 (예약제)",
      sunday: "휴무"
    },
    parking: "건물 내 주차 가능 (방문 시 주차 등록 필요)",
    latitude: 37.5012743,
    longitude: 127.039585
  }

  const transportInfo = [
    {
      type: "지하철",
      icon: Train,
      routes: [
        "지하철 2호선 역삼역 5번 출구, 도보 5분",
        "지하철 9호선 봉은사역 1번 출구, 도보 10분",
        "지하철 3호선 압구정역 6번 출구, 도보 15분"
      ]
    },
    {
      type: "버스",
      icon: Bus,
      routes: [
        "강남파이낸스센터 정류장: 146, 341, 360, 740번",
        "역삼역 정류장: 142, 240, 401, 472번",
        "테헤란로 정류장: 500, 501, 502번"
      ]
    },
    {
      type: "자가용",
      icon: Car,
      routes: [
        "강남대로 → 테헤란로 → 목적지 도착",
        "올림픽대로 → 잠실대교 → 테헤란로",
        "한남대교 → 강남대로 → 테헤란로"
      ]
    }
  ]

  const nearbyLandmarks = [
    { name: "강남파이낸스센터", distance: "도보 2분" },
    { name: "코엑스몰", distance: "도보 8분" },
    { name: "봉은사", distance: "도보 12분" },
    { name: "선릉역", distance: "도보 7분" },
    { name: "삼성역", distance: "지하철 1정거장" },
    { name: "역삼역", distance: "도보 5분" }
  ]

  return (
    <div className="w-full overflow-x-hidden">
      {/* 페이지 배너 */}
      <PageBanner 
        title="오시는 길"
        subtitle="노무법인 [법인명] 위치 안내 및 교통편"
        backgroundImage="/FAIR000.png"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container-fluid max-w-7xl py-8 md:py-12 lg:py-16 xl:py-20"
      >
        {/* 지도 및 기본 정보 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 md:mb-16 px-4 md:px-0"
        >
          <div className="grid gap-6 md:gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
            {/* 지도 */}
            <div>
              <Card>
                <CardContent className="p-0">
                  <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden">
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
            </div>

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
                      팩스: {locationInfo.fax}
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
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-muted-foreground">
                      ※ 긴급 상담은 사전 예약 시 휴일에도 가능합니다.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>

        {/* 교통편 안내 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 md:mb-16 px-4 md:px-0"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-center text-primary">
            교통편 안내
          </h2>
          <div className="grid gap-6 md:gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
            {transportInfo.map((transport, index) => (
              <motion.div
                key={transport.type}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <transport.icon className="w-6 h-6 text-primary" />
                      {transport.type}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {transport.routes.map((route, routeIndex) => (
                        <li key={routeIndex} className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-3">
                          {route}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 주차 안내 및 주변 시설 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="px-4 md:px-0"
        >
          <div className="grid gap-6 md:gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
            {/* 주차 안내 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Car className="w-6 h-6 text-primary" />
                  주차 안내
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {locationInfo.parking}
                  </p>
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">주차 이용 안내</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• 1층 안내데스크에서 주차 등록 필수</li>
                      <li>• 무료 주차 시간: 2시간</li>
                      <li>• 초과 시 시간당 2,000원</li>
                      <li>• 발레파킹 서비스 이용 가능</li>
                    </ul>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium">인근 공영주차장</p>
                    <p>• 강남구청 공영주차장 (도보 5분)</p>
                    <p>• 코엑스 주차장 (도보 8분)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 주변 시설 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MapPin className="w-6 h-6 text-primary" />
                  주변 주요 시설
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {nearbyLandmarks.map((landmark, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-foreground">{landmark.name}</span>
                      <span className="text-xs text-primary">{landmark.distance}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-muted-foreground">
                    ※ 상담 후 식사나 커피 등을 즐길 수 있는 다양한 시설이 인근에 위치해 있습니다.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* 방문 시 유의사항 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 md:mt-16 px-4"
        >
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-semibold mb-4 text-primary text-center">방문 시 유의사항</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">예약 안내</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 상담은 예약제로 운영됩니다</li>
                      <li>• 전화 또는 온라인으로 예약 가능</li>
                      <li>• 긴급 상담은 당일 예약도 가능</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">준비 서류</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 신분증 지참 필수</li>
                      <li>• 관련 서류 사전 준비</li>
                      <li>• 문의사항 미리 정리</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
} 