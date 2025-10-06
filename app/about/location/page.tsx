"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import KakaoMap from "@/components/kakao-map"
import PageBanner from "@/components/page-banner"
import { motion } from "framer-motion"
import { useTranslations } from 'next-intl'

export default function LocationPage() {
  const t = useTranslations('location')
  // 위치 정보
  const locationInfo = {
    name: t('companyName'),
    address: t('address'),
    postalCode: t('postalCode'),
    phone: t('phone'),
    email: t('email'),
    businessHours: {
      weekdays: t('weekdaysTime'),
      saturday: t('saturdayTime'),
      sunday: t('sundayTime')
    },
    latitude: 37.6290,
    longitude: 126.9205
  }

  return (
    <div className="w-full overflow-x-hidden">
      {/* 페이지 배너 */}
      <PageBanner 
        title={t('title')}
        subtitle={t('subtitle')}
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
                  <CardTitle className="text-xl">{t('basicInfo')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">{locationInfo.name}</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>
                        <span className="font-medium text-foreground">{t('addressLabel')}</span> {locationInfo.address}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">{t('phoneLabel')}</span> <a href={`tel:${locationInfo.phone}`} className="text-primary hover:underline">{locationInfo.phone}</a>
                      </p>
                      <p>
                        <span className="font-medium text-foreground">{t('emailLabel')}</span> <a href={`mailto:${locationInfo.email}`} className="text-primary hover:underline">{locationInfo.email}</a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{t('businessHours')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">{t('weekdays')}</span>
                      <span className="font-medium">{locationInfo.businessHours.weekdays}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-muted-foreground">{t('saturday')}</span>
                      <span className="font-medium">{locationInfo.businessHours.saturday}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">{t('sunday')}</span>
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