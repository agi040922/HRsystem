"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, BookOpen, Newspaper, GraduationCap, Calendar, Award, User } from "lucide-react"
import PageBanner from "@/components/page-banner"
import { motion } from "framer-motion"

export default function ProfilePage() {
  // 실제 정광일 대표 정보 데이터
  const representativeInfo = {
    name: "정광일",
    position: "대표 공인노무사",
    image: "/강의1.png",
    introduction: "제8회 공인노무사 시험 합격(1999년)으로 25년간의 풍부한 실무 경험과 전문 지식을 바탕으로 고객에게 최고의 노무 서비스를 제공하고 있습니다.",
    
    // 학력 정보
    education: [
      "연세대학교 경영대학원(MBA) 석사",
      "한양대학교 법과대학 학사",
      "노동연구원 노사관계 고위지도자과정 수료",
      "노동교육원 분쟁조정 전문가 과정 수료",
      "성희롱예방교육 강사과정 수료"
    ],
    
    // 경력 정보
    career: [
      "現 FAIR인사노무컨설팅 / 선함 노동상담실 대표 공인노무사",
      "現 도서출판 선함 대표",
      "前 김&장 법률사무소 공인노무사",
      "前 서울상공회의소(은평구/마포구) 경영상담역",
      "前 중소벤처기업부 비즈니스지원단 전문위원",
      "前 근로복지공단 서울지역본부 고객권익보호 담당관",
      "前 한국전력기술 인사위원회 외부위원",
      "現 한양대학교 창업지원단 맨토스온콜 멘토",
      "現 서울기업지원센터 전문위원",
      "現 경기도 경제과학진흥원 프로보노 위원",
      "現 한국산업기술 평가관리원 평가위원",
      "現 한경닷컴 칼럼니스트"
    ],
    
    // 자격 및 면허
    licenses: [
      "공인노무사 (제8회, 1999년)",
      "성희롱예방교육 강사"
    ],
    
    // 강의 경력
    lectures: [
      "서울상공회의소 채용부터 퇴직까지의 인사노무 관리 강의 (2006-2009)",
      "서울상공회의소 연봉제의 도입과 설계 / 사회보험 실무 강의",
      "서울상공회의소 징계권 행사 실무 / 비정규직 관리방안 강의",
      "주한외국기업인사관리협회 채용부터 퇴직까지의 인사노무관리 강의 (2005-2011)",
      "주한외국기업인사관리협회 징계권 행사 실무 / 복수노조와 노사전략 강의",
      "생산성 본부 집단적 노사관계 실무 강의 (2011-2012)",
      "중앙경제교육원 연차휴가 운영 실무 강의 (2012)",
      "사학진흥재단 대학의 인사노무 전략 강의 (2014)",
      "삼성전자 주 40시간 근로시간제 도입에 따른 법적 쟁점 강의 (2004)",
      "삼성생명 산재보험법의 법적 체계 강의 (2004)",
      "롯데알미늄 주40시간 근로시간제의 법적쟁점 강의 (2004)",
      "한국예술종합학교 대학의 인사노무관리 및 도급운영 강의 (2013)",
      "한국전력/ 한전 KPS 집단적 노사관계법과 관리자의 역할 강의 (2004)",
      "석세스 TV 프로직장인 교육 강의 (2011)",
      "한국HRD협회 핵심인재의 조건 강의 (2011)",
      "성희롱예방교육 전문 강사 (중앙일보, 맥그로힐코리아, Standards & Poors 등)"
    ],
    
    // 저술 및 출판
    publications: [
      "『복수노조와 노사전략 컨설팅 프로세스』 (박영사, 2011)",
      "『회사의 속마음』 (랜덤하우스 코리아, 2011)",
      "월간 노동법률 - 근무성적 불량자의 관리방안",
      "월간 노동법률 - 영업비밀 어떻게 보호할 것인가?",
      "월간 노동법률 - 성과급 혹은 상여금 지급제한 규정에 대한 해석론",
      "월간 노동법률 - 집단성과급과 개인성과급의 설계",
      "월간 노동법률 - 기업내 통신시설 이용제한의 전제조건",
      "월간 노동법률 - 직무발명 보상제도의 설계",
      "월간 노동법률 - 비정규직 입법예고(안)의 주요내용에 대한 평가",
      "월간 노동법률 - 연봉제 전환시 동의주체에 대한 해석론",
      "월간 조세 - 중소기업의 평가보상 체계",
      "월간 조세 - 경영자와 인사담당자를 위한 협상전략 1.2.3.",
      "월간 인사관리 - 채용과 관련된 법적 쟁점"
    ],
    
    // 언론 활동
    media: [
      "한국경제 TV 복수노조시대의 노사관계 토론회 패널 참여 (2008)",
      "한국경제 TV 기업의 인재육성 토론회 패널 참여 (2008)",
      "월간 HRD 인터뷰 - 직장인의 자세 (2011)",
      "월간 코스모폴리탄 인터뷰 - 직장인이 궁금해 하는 사항 (2011)",
      "한경비즈니스 인터뷰 - 회사와 직장인의 관계 (2011)",
      "KBS 성기영의 경제투데이 인터뷰 - 회사를 알아야 직장에서 성공할 수 있다 (2011)",
      "월간 슈어 인터뷰 - 성공적인 직장생활의 전제조건 (2011)",
      "현재 한경닷컴 칼럼니스트로 활동 중"
    ],
    
    // 연구 실적
    research: [
      "노사협력의 성공요인과 실패요인에 대한 분석 (2008, 석사논문)",
      "노조조직 형태의 다양화와 노동법의 과제 (노동연구원 프로젝트 참여)",
      "복수노조하에서의 단체교섭 단일화 방안 (노동연구원 수료논문)",
      "대학의 인사노무관리 100문 100답 (대학강의 교재 제작)"
    ],
    
    // 강의 사진
    lectureImages: [
      {
        src: "/언론1.png",
        title: "서울상공회의소 인사노무관리 강의",
        date: "2024.03.15",
        location: "서울상공회의소"
      },
      {
        src: "/언론2.png", 
        title: "주한외국기업인사관리협회 특강",
        date: "2024.02.20",
        location: "주한외국기업인사관리협회"
      },
      {
        src: "/강의2.png",
        title: "대기업 노무관리 교육",
        date: "2024.01.30",
        location: "삼성전자"
      },
      {
        src: "/강의3.png",
        title: "석세스 TV 프로직장인 교육",
        date: "2023.12.10",
        location: "석세스 TV"
      }
    ]
  }

  return (
    <div className="w-full overflow-x-hidden">
      {/* 페이지 배너 */}
      <PageBanner 
        title="대표 프로필"
        subtitle="정광일 대표 공인노무사의 경력, 학력, 강의경력 및 저술활동"
        backgroundImage="/FAIR000.png"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container-fluid max-w-7xl py-8 md:py-12 lg:py-16 xl:py-20"
      >
        {/* 프로필 헤더 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 md:mb-16"
        >
          {/* 기본 정보 */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 max-w-4xl mx-auto mb-12 px-4">
            <div className="flex-shrink-0">
              <Image
                src={representativeInfo.image}
                alt={representativeInfo.name}
                width={200}
                height={200}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{representativeInfo.name}</h2>
              <p className="text-lg text-primary font-medium mb-4">{representativeInfo.position}</p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {representativeInfo.introduction}
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {representativeInfo.licenses.map((license, index) => (
                  <Badge key={index} variant="secondary">{license}</Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* 학력 및 경력 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 md:mb-16 px-4 md:px-0"
        >
          <div className="grid gap-6 md:gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
            {/* 학력 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <GraduationCap className="w-6 h-6" />
                  학력
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {representativeInfo.education.map((edu, index) => (
                    <li key={index} className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-3">
                      {edu}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* 주요 경력 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Calendar className="w-6 h-6" />
                  주요 경력
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {representativeInfo.career.map((career, index) => (
                    <li key={index} className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-3">
                      {career}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* 강의 경력 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 md:mb-16 px-4 md:px-0"
        >
          <Card className="max-w-6xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <User className="w-6 h-6" />
                주요 강의 경력
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {representativeInfo.lectures.map((lecture, index) => (
                  <div key={index} className="text-sm text-muted-foreground border-l-2 border-primary/30 pl-3">
                    {lecture}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* 강의 활동 사진 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 md:mb-16 px-4 md:px-0"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-center text-primary flex items-center justify-center gap-2">
            <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex-shrink-0" /> 강의 활동 사진
          </h2>
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
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
                    <h4 className="font-medium text-sm mb-1">{image.title}</h4>
                    <p className="text-xs text-gray-300">{image.date}</p>
                    <p className="text-xs text-gray-400">{image.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 저술 및 언론 활동 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 md:mb-16 px-4 md:px-0"
        >
          <div className="grid gap-6 md:gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
            {/* 저술 및 출판 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <BookOpen className="w-6 h-6" />
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
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Newspaper className="w-6 h-6" />
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
        </motion.section>

        {/* 연구 실적 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="px-4 md:px-0"
        >
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl justify-center">
                <Award className="w-6 h-6" />
                연구 실적
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {representativeInfo.research.map((research, index) => (
                  <div key={index} className="text-center md:text-left p-3 bg-primary/5 rounded-lg">
                    <span className="text-sm font-medium text-foreground">{research}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </motion.div>
    </div>
  )
} 