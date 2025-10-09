'use client';

import { useState, useEffect } from 'react';
import { NextIntlClientProvider } from 'next-intl';

interface ProvidersProps {
  children: React.ReactNode;
  initialLocale?: string;
}

// 초기 메시지를 동기적으로 로드
const getInitialMessages = (locale: string) => {
  // 기본 메시지 (한국어) - home.json의 주요 키들 포함
  const defaultMessages = {
    header: { logo: "FAIR인사노무컨설팅", menu: "메뉴" },
    mainNav: {
      home: "홈",
      about: "회사소개",
      services: "주요 서비스",
      board: "공지사항",
      qna: "Q&A",
      contact: "상담문의"
    },
    aboutMenu: {
      greeting: { title: "인사말", description: "FAIR인사노무컨설팅의 철학과 비전을 소개합니다" },
      profile: { title: "대표 프로필", description: "정광일 대표 공인노무사의 경력, 학력, 강의경력 및 저술활동" },
      ethics: { title: "윤리강령", description: "FAIR인사노무컨설팅이 추구하는 8가지 윤리강령" },
      location: { title: "오시는 길", description: "FAIR인사노무컨설팅 위치 안내 및 교통편" }
    },
    servicesMenu: {
      laborConsulting: { title: "노동법 자문", description: "기업 운영 전반의 노동법률 리스크 예방 및 대응" },
      payroll: { title: "급여 아웃소싱 및 4대보험", description: "정확하고 효율적인 급여 관리 및 4대보험 업무 대행" },
      hrConsulting: { title: "인사노무 컨설팅", description: "기업 맞춤형 인사제도 설계 및 운영 지원" },
      industrialAccident: { title: "산업재해", description: "산업재해 발생 시 신속한 대응 및 보상 절차 지원" },
      unfairDismissal: { title: "부당해고 및 징계", description: "부당해고, 부당징계 등 노동위원회 사건 대리" },
      workplaceHarassment: { title: "직장 내 괴롭힘 및 성희롱", description: "직장 내 괴롭힘 예방 및 발생 시 조사, 처리 지원" }
    },
    language: { label: "언어", korean: "한국어", english: "English", japanese: "日本語" },
    // home.json의 핵심 키들 추가
    hero: {
      slide1: {
        title: "노무 문제, 명쾌한 해결",
        subtitle: "FAIR인사노무컨설팅",
        text: "전문적인 상담으로 최적의 솔루션을",
        highlight: "26년차 베테랑 노무사의 전문성"
      },
      slide2: {
        title: "200건 이상 수행한 사건의 압도적 승소율",
        subtitle: "검증된 실력",
        text: "노동위원회, 행정심판에서",
        highlight: "뛰어난 성과 달성"
      },
      slide3: {
        title: "김&장 출신의 전문성",
        subtitle: "",
        text: "",
        highlight: "최고 수준의 전문성"
      },
      videoNotSupported: "영상을 지원하지 않는 브라우저입니다.",
      description: "FAIR인사노무컨설팅이 전문적인 상담으로 최적의 솔루션을 제공합니다.",
      partner: "당신의 든든한 파트너",
      quickConsultation: "빠른 상담 신청",
      browseServices: "서비스 둘러보기"
    },
    cta: {
      title: "노무 문제로 고민하고 계신가요?",
      subtitle: "지금 바로 전문가와 상담하세요",
      description: "FAIR인사노무컨설팅이 최적의 솔루션을 제공합니다",
      button: "무료 상담 신청",
      phone: "전화 상담",
      phoneNumber: "02-1234-5678",
      expertHelp: "전문가의 도움이 필요하신가요?",
      contactNow: "망설이지 말고 지금 바로 FAIR인사노무컨설팅에 문의하세요.",
      phoneConsultation: "전화 상담:",
      onlineConsultation: "온라인 상담 바로가기"
    },
    company: {
      title: "을 선택하는 이유",
      companyName: "FAIR인사노무컨설팅",
      subtitle: "치밀한 논리와 철저한 준비로 고객의 성공을 이끌어온 26년의 경험",
      cards: {
        winRate: {
          title: "200건+ 압도적 승소율",
          subtitle: "검증된 실력",
          description: "노동위원회, 행정심판, 산재사건 등에서 뛰어난 성과를 달성했습니다."
        },
        experience: {
          title: "2005년 설립, 26년차 경험",
          subtitle: "신뢰받는 파트너",
          description: "국내외 100여 업체의 신뢰받는 파트너로서 최적의 솔루션을 제공합니다."
        },
        expertise: {
          title: "김&장 출신 전문성",
          subtitle: "최고 수준의 노하우",
          description: "기업 자문 및 컨설팅 경험 20년 이상의 전문성을 바탕으로 합니다."
        }
      }
    },
    // about.json의 핵심 키들 추가
    greeting: {
      title: "인사말",
      subtitle: "FAIR인사노무컨설팅의 철학과 비전을 소개합니다",
      content: {
        paragraph1: "FAIR인사노무컨설팅은 2005년 설립된 이후, 기업자문에 컨설팅 개념을 도입하여 기업자문의 새로운 지평을 열었다는 평가를 받고 있습니다.",
        paragraph2: "또한 FAIR인사노무컨설팅은 대기업 및 외국계 기업에 대한 자문외에도 하나님의 공의와 사랑을 추구하는 선함 노동상담실과 도서출판 선함을 부설기관으로 운영하고 있습니다.",
        paragraph3: "그 동안 200건이 넘는 노동관련 사건에서 압도적인 승소율을 유지하고 있으며, 이는 치밀한 논리와 철저한 준비의 결과라는 점을 고객 모두는 잘 알고 있습니다.",
        paragraph4: "법률지식을 넘어 문제를 해결할 수 있는 전략을 원한다면, FAIR인사노무컨설팅과 만나십시오. 귀하의 진정한 파트너가 되어 드리겠습니다."
      },
      signature: "대표 / 공인노무사 정광일",
      quote: "법률지식을 넘어 문제를 해결할 수 있는 전략을 제공합니다"
    },
    profile: {
      title: "대표 프로필",
      subtitle: "정광일 대표 공인노무사",
      name: "정광일",
      position: "대표 공인노무사",
      introduction: "제8회 공인노무사 시험 합격(1999년)으로 25년간의 풍부한 실무 경험과 전문 지식을 바탕으로 고객에게 최고의 노무 서비스를 제공하고 있습니다.",
      licenses: [
        "공인노무사 (제8회, 1999년)",
        "성희롱예방교육 강사"
      ],
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
      lectures: [
        "서울상공회의소 채용부터 퇴직까지의 인사노무 관리 강의 (2006-2009)",
        "서울상공회의소 연봉제의 도입과 설계 / 사회보험 실무 강의",
        "서울상공회의소 징계권 행사 실무 / 비정규직 관리방안 강의"
      ],
      publications: [
        "『복수노조와 노사전략 컨설팅 프로세스』 (박영사, 2011)",
        "『회사의 속마음』 (랜덤하우스 코리아, 2011)",
        "월간 노동법률 - 근무성적 불량자의 관리방안"
      ],
      media: [
        "한국경제 TV 복수노조시대의 노사관계 토론회 패널 참여 (2008)",
        "한국경제 TV 기업의 인재육성 토론회 패널 참여 (2008)",
        "현재 한경닷컴 칼럼니스트로 활동 중"
      ],
      research: [
        "노사협력의 성공요인과 실패요인에 대한 분석 (2008, 석사논문)",
        "노조조직 형태의 다양화와 노동법의 과제 (노동연구원 프로젝트 참여)"
      ],
      lectureImages: [
        {
          src: "/언론1.png",
          title: "서울상공회의소 인사노무관리 강의",
          date: "2024.03.15",
          location: "서울상공회의소"
        }
      ],
      sections: {
        education: { title: "학력" },
        career: { title: "주요 경력" },
        lectures: { title: "주요 강의 경력" },
        publications: { title: "저술 및 출판" },
        media: { title: "언론 활동" },
        research: { title: "연구 실적" },
        lecturePhotos: { title: "강의 활동 사진" }
      }
    },
    ethics: {
      title: "윤리강령",
      subtitle: "FAIR인사노무컨설팅이 추구하는 8가지 핵심 가치와 윤리 원칙",
      intro: "FAIR인사노무컨설팅은 다음과 같은 윤리강령을 제정하고 이를 준수합니다.",
      principles: [
        "정당한 보수를 책정하여 청구합니다.",
        "고객의 모든 정보에 대한 철저한 비밀유지 의무를 이행합니다.",
        "정부지원 컨설팅 및 보조금을 적법하고 정당하게 활용합니다.",
        "법을 준수하고 원칙과 신의에 따라 위임된 업무를 성실하게 수행합니다.",
        "회사의 규모와 계약금액에 관계없이 수임한 모든 일을 성실하게 수행합니다.",
        "책임있는 상담을 위해 무료상담을 지양하며, 고객의 입장에서 최선을 기준으로 상담합니다.",
        "장애인, 기초생활수급자 등 사회적 약자와 지역사회 기여 기업에 대해서는 무료상담을 제공합니다.",
        "하나님의 공의와 사랑을 바탕으로 모든 업무를 수행합니다."
      ]
    },
    // home.json의 추가 키들
    homeServices: {
      items: {
        globalConsulting: {
          title: "글로벌 기업 자문",
          description: "다국적 기업의 국내 진출 및 운영에 필요한 종합 노무 자문 서비스"
        }
      }
    },
    clients: {
      title: "200여 외국계 기업이 선택한 전문가",
      subtitle: "2000년부터 26년간 글로벌 기업들의 신뢰받는 파트너",
      stats: {
        companies: {
          value: "200+",
          label: "외국계 기업"
        },
        experience: {
          value: "26년",
          label: "전문 경험"
        }
      },
      partnersTitle: "함께한 글로벌 기업들",
      partnersSubtitle: "신뢰받는 파트너로 함께 성장해온 기업들"
    },
    homeBoard: {
      title: "공지사항",
      moreLink: "더보기 →",
      noNotices: "등록된 공지사항이 없습니다."
    },
    newsletter: {
      fairNewsletter: "FAIR 뉴스레터",
      moreLink: "더보기 →"
    },
    footer: {
      companyName: "FAIR인사노무컨설팅",
      representative: "대표",
      representativeName: "정광일",
      address: "주소",
      addressDetail: "서울 은평구 진관 3로 22 파크앤타워 B동 412호",
      phone: "전화",
      phoneNumber: "02-387-9869",
      email: "이메일",
      emailAddress: "fairhr@nate.com",
      quickLinks: "바로가기",
      about: "회사소개",
      services: "주요 서비스",
      contact: "상담문의",
      policies: "정책",
      privacy: "개인정보처리방침",
      terms: "이용약관",
      allRightsReserved: "All rights reserved."
    },
    location: {
      title: "오시는 길",
      subtitle: "FAIR인사노무컨설팅 위치 안내",
      companyName: "FAIR인사노무컨설팅",
      address: "서울 은평구 진관 3로 22 파크앤타워 B동 412호",
      postalCode: "03280",
      phone: "02-387-9869",
      email: "fairhr@nate.com",
      basicInfo: "기본 정보",
      businessHours: "운영시간",
      weekdays: "평일",
      saturday: "토요일",
      sunday: "일요일/공휴일",
      weekdaysTime: "10:00 ~ 20:00",
      saturdayTime: "10:00 ~ 17:00",
      sundayTime: "휴무",
      addressLabel: "주소:",
      phoneLabel: "전화:",
      emailLabel: "이메일:"
    },
    // services.json 키들 추가
    services: {
      title: "주요 서비스",
      subtitle: "FAIR인사노무컨설팅이 제공하는 전문 서비스",
      viewDetails: "상세 내용 보기",
      items: {
        globalConsulting: {
          title: "글로벌 기업 자문",
          description: "다국적 기업의 한국 진출 및 현지 노무 관리 전문 컨설팅"
        },
        overseasDispatch: {
          title: "해외 인력 파견",
          description: "국제 기업의 인력 파견 및 주재원 노무 관리 전문 서비스"
        },
        internationalContracts: {
          title: "국제 계약 자문",
          description: "해외 진출 기업을 위한 현지 고용 계약 및 노무 규정 자문"
        }
      },
      services: [],
      whyChoose: {
        title: "FAIR를 선택하는 이유",
        subtitle: "26년간의 전문성과 신뢰로 검증된 파트너",
        reasons: []
      },
      cta: {
        title: "전문가와 상담하세요",
        description: "귀하의 기업에 최적화된 솔루션을 제안해드립니다.",
        button: "무료 상담 신청",
        phone: "02-387-9869"
      }
    },
    // board.json 키들 추가
    board: {
      title: "공지사항",
      subtitle: "FAIR인사노무컨설팅의 최신 소식과 공지사항",
      search: {
        placeholder: "제목으로 검색...",
        button: "검색",
        totalResults: "전체 게시글"
      },
      post: {
        views: "조회수",
        date: "작성일",
        important: "중요",
        readMore: "자세히 보기"
      },
      loading: "로딩 중...",
      moreLink: "더 많은 소식 보기"
    },
    // qna.json 키들 추가
    qna: {
      title: "Q&A",
      subtitle: "자주 묻는 질문과 문의하기",
      faq: {
        title: "자주 묻는 질문",
        questions: []
      },
      inquiry: {
        title: "문의하기",
        subtitle: "궁금한 점이 있으시면 언제든지 문의해주세요",
        form: {
          title: "직접 질문하기",
          fields: {
            name: { 
              label: "이름", 
              placeholder: "이름을 입력해주세요",
              error: "이름은 2자 이상 입력해주세요." 
            },
            contact: { 
              label: "연락처 (휴대폰)", 
              placeholder: "010-1234-5678",
              error: "올바른 휴대폰 번호를 입력해주세요." 
            },
            email: { 
              label: "이메일", 
              placeholder: "example@company.com",
              error: "올바른 이메일 주소를 입력해주세요." 
            },
            title: { 
              label: "제목", 
              placeholder: "문의 제목을 입력해주세요",
              error: "제목은 5자 이상 입력해주세요." 
            },
            content: { 
              label: "문의 내용", 
              placeholder: "궁금한 내용을 자세히 작성해주세요",
              error: "문의 내용은 10자 이상 입력해주세요." 
            },
            isPrivate: {
              label: "비밀글로 등록하기"
            },
            password: {
              label: "비밀번호 (4자리 이상)",
              placeholder: "비밀번호를 입력해주세요",
              show: "표시",
              hide: "숨김",
              error: "비공개 문의 시 비밀번호는 4자 이상 입력해주세요."
            }
          },
          submit: "문의 등록",
          submitting: "등록 중..."
        }
      }
    },
    // contact.json 키들 추가
    contact: {
      title: "상담문의",
      subtitle: "전문가와 직접 상담하세요",
      contactInfo: {
        title: "연락처 정보",
        phone: { label: "전화 문의 및 예약", value: "02-387-9869" },
        email: { label: "이메일 문의", value: "fairhr@nate.com" },
        address: { label: "방문 상담", value: "서울 은평구 진관 3로 22 파크앤타워 B동 412호", description: "(구파발역 1번 출구 도보 15분)" }
      },
      form: {
        title: "온라인 상담 신청",
        fields: {
          companyName: { label: "회사명", placeholder: "회사명을 입력해주세요", error: "회사명은 2자 이상 입력해주세요." },
          name: { label: "성함", placeholder: "성함을 입력해주세요", error: "성함은 2자 이상 입력해주세요." },
          contact: { label: "연락처 (휴대폰)", placeholder: "010-1234-5678", error: "올바른 휴대폰 번호를 입력해주세요." },
          email: { label: "이메일", placeholder: "example@company.com", error: "올바른 이메일 주소를 입력해주세요." },
          message: { label: "요청 내용", placeholder: "상담받고 싶은 내용을 자세히 작성해주세요", error: "요청 내용은 10자 이상 입력해주세요." },
          attachment: { label: "첨부파일 (선택, 5MB 이하)", supportedFormats: "지원 파일: PDF, JPG, PNG, DOC, DOCX" }
        },
        submit: "상담 신청하기",
        submitting: "전송 중...",
        serviceInfo: {
          title: "서비스 안내",
          item1: "모든 서비스는 기업 대상으로 제공됩니다.",
          item2: "상담은 예약제로 진행되며, 전화로 사전 예약해주세요.",
          item3: "기업 상담은 유료로 진행됩니다 (10만원, 부가세 별도).",
          item4: "요청 접수 후 영업일 기준 1~2일 이내에 연락드립니다."
        }
      },
      businessHours: {
        title: "상담 및 서비스 시간",
        weekdays: "평일",
        saturday: "토요일",
        sunday: "일요일 및 공휴일",
        weekdaysTime: "10:00 - 20:00",
        saturdayTime: "10:00 - 17:00",
        sundayTime: "휴무",
        note1: "* 상담은 예약제로 진행되며, 사전 예약 필수입니다.",
        note2: "* 기업 상담은 유료로 진행됩니다 (10만원, 부가세 별도).",
        note3: "* 강의 및 컨설팅 일정은 별도 협의 가능합니다."
      }
    }
  };
  
  return defaultMessages;
};

export function I18nProvider({ children, initialLocale = 'ko' }: ProvidersProps) {
  const [locale, setLocale] = useState(initialLocale);
  const [messages, setMessages] = useState<any>(getInitialMessages(initialLocale));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // 로컬 스토리지에서 저장된 언어 가져오기
    const savedLocale = localStorage.getItem('locale') || 'ko';
    setLocale(savedLocale);
    loadMessages(savedLocale);
  }, []);

  const loadMessages = async (newLocale: string) => {
    try {
      const [common, navigation, home, about, services, board, qna, contact] = await Promise.all([
        import(`../messages/${newLocale}/common.json`),
        import(`../messages/${newLocale}/navigation.json`),
        import(`../messages/${newLocale}/home.json`),
        import(`../messages/${newLocale}/about.json`),
        import(`../messages/${newLocale}/services.json`),
        import(`../messages/${newLocale}/board.json`),
        import(`../messages/${newLocale}/qna.json`),
        import(`../messages/${newLocale}/contact.json`)
      ]);

      setMessages({
        ...common.default,
        ...navigation.default,
        ...home.default,
        ...about.default,
        services: services.default,
        board: board.default,
        qna: qna.default,
        contact: contact.default
      });
    } catch (error) {
      console.error('Failed to load messages:', error);
      // 실패 시 기본 메시지 사용
      setMessages(getInitialMessages('ko'));
    }
  };

  // 언어 변경 이벤트 리스너
  useEffect(() => {
    if (!isClient) return;

    const handleLocaleChange = (event: CustomEvent) => {
      const newLocale = event.detail.locale;
      setLocale(newLocale);
      localStorage.setItem('locale', newLocale);
      loadMessages(newLocale);
    };

    window.addEventListener('localeChange' as any, handleLocaleChange);
    return () => {
      window.removeEventListener('localeChange' as any, handleLocaleChange);
    };
  }, [isClient]);

  return (
    <NextIntlClientProvider messages={messages} locale={locale} timeZone="Asia/Seoul">
      {children}
    </NextIntlClientProvider>
  );
}
