"use client"

import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Building, Users, Award, BookOpen, FileText, Newspaper, GraduationCap, Briefcase, Calendar } from "lucide-react"
import KakaoMap from "@/components/kakao-map"
import PageBanner from "@/components/page-banner"
import { motion } from "framer-motion"

export default function AboutClientPage() {
  // 대표 정보 데이터 (실제 정광일 대표 정보)
  const representativeInfo = {
    name: "정광일",
    position: "대표 공인노무사",
    image: "/placeholder.svg?width=300&height=300",
    introduction: "안녕하십니까. FAIR인사노무컨설팅 대표 공인노무사 정광일입니다. 저희 FAIR인사노무컨설팅은 2005년 설립된 이후, 기업자문에 컨설팅 개념을 도입하여 기업자문의 새로운 지평을 열었다는 평가를 받고 있습니다.",
    education: [
      "연세대학교 경영대학원(MBA) 석사",
      "한양대학교 법과대학 학사", 
      "노동연구원 노사관계 고위지도자과정 수료",
      "노동교육원 분쟁조정 전문가 과정 수료",
      "성희롱예방교육 강사과정 수료"
    ],
    career: [
      "現 FAIR인사노무컨설팅 / 선함 노동상담실 대표 공인노무사",
      "現 도서출판 선함 대표",
      "現 한양대학교 창업지원단 맨토스온콜 멘토",
      "現 서울기업지원센터 전문위원",
      "現 경기도 경제과학진흥원 프로보노 위원",
      "現 한국산업기술 평가관리원 평가위원",
      "現 한경닷컴 칼럼니스트",
      "前 김&장 법률사무소 공인노무사",
      "前 서울상공회의소(은평구/마포구) 경영상담역",
      "前 중소벤처기업부 비즈니스지원단 전문위원",
      "前 근로복지공단 서울지역본부 고객권익보호 담당관",
      "前 한국전력기술 인사위원회 외부위원"
    ],
    lectures: [
      "서울상공회의소 채용부터 퇴직까지의 인사노무 관리 강의 (2006-2009)",
      "주한외국기업인사관리협회 인사노무관리 전문 강의 (2005-2011)", 
      "생산성 본부 집단적 노사관계 실무 강의 (2011-2012)",
      "중앙경제교육원 연차휴가 운영 실무 강의 (2012)",
      "사학진흥재단 대학의 인사노무 전략 강의 (2014)",
      "삼성전자, 삼성생명, 롯데알미늄 등 대기업 노무관리 강의",
      "석세스 TV 프로직장인 교육 강의",
      "각종 성희롱예방교육 전문 강사"
    ],
    publications: [
      "『복수노조와 노사전략 컨설팅 프로세스』 (박영사, 2011)",
      "『회사의 속마음』 (랜덤하우스 코리아, 2011)", 
      "월간 노동법률 다수 기고 (근무성적 불량자의 관리방안 등)",
      "월간 조세 중소기업의 평가보상 체계 연재",
      "월간 인사관리 채용과 관련된 법적 쟁점 기고",
      "노동연구원 프로젝트 다수 참여"
    ],
    media: [
      "한국경제 TV 복수노조시대의 노사관계 토론회 패널 (2008)",
      "한국경제 TV 기업의 인재육성 토론회 패널 (2008)",
      "KBS 성기영의 경제투데이 인터뷰 (2011)",
      "월간 HRD, 코스모폴리탄, 한경비즈니스, 슈어 등 다수 인터뷰",
      "현재 한경닷컴 칼럼니스트로 활동 중"
    ],
    lectureImages: [
      {
        src: "/placeholder.svg?width=400&height=300",
        title: "서울상공회의소 인사노무관리 세미나",
        date: "2024.03.15"
      },
      {
        src: "/placeholder.svg?width=400&height=300", 
        title: "주한외국기업인사관리협회 특강",
        date: "2024.02.20"
      },
      {
        src: "/placeholder.svg?width=400&height=300",
        title: "대기업 노무관리 교육",
        date: "2024.01.30"
      }
    ]
  }

  const teamMembers = [
    {
      name: "정광일",
      position: "대표 공인노무사", 
      image: "/placeholder.svg?width=100&height=100",
      bio: "제8회 공인노무사 시험 합격(1999), 연세대 MBA, 김&장 법률사무소 출신",
    },
    {
      name: "선함 노동상담실",
      position: "부설기관",
      image: "/placeholder.svg?width=100&height=100",
      bio: "하나님의 공의와 사랑을 추구하는 노동상담 전문기관",
    },
    {
      name: "도서출판 선함",
      position: "부설기관",
      image: "/placeholder.svg?width=100&height=100",
      bio: "노동법 전문 도서 출판 및 교육 자료 제작",
    },
  ]

  return (
    <div className="w-full overflow-x-hidden">
      {/* 페이지 배너 */}
      <PageBanner 
        title="FAIR인사노무컨설팅 소개"
        subtitle="신뢰와 전문성을 바탕으로 고객과 함께 성장합니다"
        backgroundImage="/placeholder.svg?width=1920&height=450"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container-fluid max-w-7xl py-8 md:py-12 lg:py-16 xl:py-20"
      >
        {/* 인사말 섹션 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 md:mb-16"
        >
          <div className="grid gap-6 md:gap-8 lg:grid-cols-2 items-center max-w-6xl mx-auto">
            <div className="px-4 md:px-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-primary flex items-center gap-2">
                <Building className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex-shrink-0" /> 인사말
              </h2>
              <div className="mb-6">
                <Image
                  src={representativeInfo.image}
                  alt="대표 공인노무사 사진"
                  width={120}
                  height={120}
                  className="rounded-full float-left mr-4 mb-2 sm:w-[150px] sm:h-[150px] sm:mr-6"
                />
                <div className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  <p className="mb-4">
                    {representativeInfo.introduction}
                    <br className="hidden sm:block" />
                    그 결과 현재 국내외 100여 업체의 기업고객에게 전문적인 자문서비스를 제공하고 있습니다.
                  </p>
                  <p className="mb-4">
                    저희는 대기업 및 외국계 기업에 대한 자문외에도 하나님의 공의와 사랑을 추구하는 선함 노동상담실과 
                    도서출판 선함을 부설기관으로 운영하고 있습니다.
                  </p>
                  <p>
                    법률지식을 넘어 문제를 해결할 수 있는 전략을 원한다면, FAIR인사노무컨설팅과 만나십시오. 
                    귀하의 진정한 파트너가 되어 드리겠습니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="px-4 md:px-0">
              <Image
                src="/placeholder.svg?width=500&height=350"
                alt="사무실 이미지 또는 관련 이미지"
                width={500}
                height={350}
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
          </div>
        </motion.section>

        {/* 대표 프로필 상세 섹션 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 md:mb-16 px-4 md:px-0"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-center text-primary flex items-center justify-center gap-2">
            <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex-shrink-0" /> 대표 프로필
          </h2>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-6 md:gap-8 lg:grid-cols-3 mb-8">
              {/* 학력 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <GraduationCap className="w-5 h-5" />
                    학력
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {representativeInfo.education.map((edu, index) => (
                      <li key={index} className="text-sm text-muted-foreground">{edu}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* 주요 경력 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="w-5 h-5" />
                    주요 경력
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {representativeInfo.career.slice(0, 7).map((career, index) => (
                      <li key={index} className="text-sm text-muted-foreground">{career}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* 강의 경력 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="w-5 h-5" />
                    주요 강의 경력
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {representativeInfo.lectures.map((lecture, index) => (
                      <li key={index} className="text-sm text-muted-foreground">{lecture}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* 강의 사진 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                강의 활동 사진
              </h3>
              <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {representativeInfo.lectureImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="relative group"
                  >
                    <Image
                      src={image.src}
                      alt={image.title}
                      width={400}
                      height={300}
                      className="rounded-lg object-cover w-full h-48"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end">
                      <div className="p-4 text-white">
                        <h4 className="font-medium text-sm">{image.title}</h4>
                        <p className="text-xs text-gray-300">{image.date}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
              {/* 저술 및 출판 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BookOpen className="w-5 h-5" />
                    저술 및 출판
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {representativeInfo.publications.map((pub, index) => (
                      <li key={index} className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-3">
                        {pub}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* 언론 활동 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Newspaper className="w-5 h-5" />
                    언론 활동
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {representativeInfo.media.map((media, index) => (
                      <li key={index} className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-3">
                        {media}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>

        {/* 조직 구성 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 md:mb-16 px-4 md:px-0"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-center text-primary flex items-center justify-center gap-2">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex-shrink-0" /> 조직 구성
          </h2>
          <div className="grid gap-4 md:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.name} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-4 md:p-6 border rounded-lg bg-card text-card-foreground hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <Avatar className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
                    <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>{member.name.substring(0, 1)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <h3 className="text-lg md:text-xl font-semibold truncate">{member.name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{member.position}</p>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 연혁 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 md:mb-16 px-4 md:px-0"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-center text-primary flex items-center justify-center gap-2">
            <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex-shrink-0" /> 연혁
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="relative pl-6 after:absolute after:inset-y-0 after:w-px after:bg-muted-foreground/20 after:left-0">
              <div className="grid gap-6 md:gap-8">
                {[
                  { year: "2005", event: "FAIR인사노무컨설팅 설립" },
                  { year: "2011", event: "선함 노동상담실 및 도서출판 선함 설립" },
                  { year: "2024", event: "국내외 100여 기업 자문 서비스 제공 중" },
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="grid gap-1 text-sm sm:text-base relative"
                  >
                    <div className="aspect-square w-3 bg-primary rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
                    <div className="font-medium text-foreground">{item.year}</div>
                    <div className="text-muted-foreground leading-relaxed">{item.event}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* 오시는 길 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="px-4 md:px-0"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-center text-primary flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex-shrink-0" /> 오시는 길
          </h2>
          <div className="grid gap-6 md:gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
            <div>
              <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-4">
                <KakaoMap
                  latitude={37.5012743}
                  longitude={127.039585}
                  level={3}
                  markerText="FAIR인사노무컨설팅"
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-lg md:text-xl font-semibold mb-3">FAIR인사노무컨설팅</h3>
              <div className="space-y-2 text-sm sm:text-base text-muted-foreground mb-6">
                <p>주소: 서울특별시 강남구 테헤란로 123, 4층 (우편번호: 06123)</p>
                <p>전화: <a href="tel:02-1234-5678" className="text-primary hover:underline">02-1234-5678</a></p>
                <p>팩스: 02-1234-5679</p>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">대중교통</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>- 지하철 2호선 역삼역 5번 출구, 도보 5분</p>
                    <p>- 버스: 강남파이낸스센터 정류장 (146, 341, 360, 740번)</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">주차 안내</h4>
                  <p className="text-sm text-muted-foreground">건물 내 주차 가능 (방문 시 주차 등록 필요)</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
}
