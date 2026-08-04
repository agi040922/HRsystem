// 자회사 플러스 티 에이아이(PlusTAI) 소개 페이지 데이터 단일 출처.
//
// ⚠️ **공개 서비스만 싣는다.** 괴롭힘 백신·모의판정 백신·도급백신은 내부검토용이므로
//    외부에 공개된 페이지에 올리지 말 것. 공개 전환은 CEO 판단 사항이다.
// ⚠️ 각 제품 설명은 해당 사이트가 스스로 밝힌 소개문을 따른다. 임의로 부풀리지 않는다.
// ⚠️ PlusTAI 는 **독립 자회사**다. FAIR 의 서비스인 것처럼 쓰지 말 것.

export type PlustaiProduct = {
  name: string
  url: string
  tagline: string
  desc: string
  points: string[]
}

export const PLUSTAI_PORTAL = "https://plustai.com"

export const PLUSTAI_PRODUCTS: PlustaiProduct[] = [
  {
    name: "프리랜서 백신",
    url: "https://freelancer.plustai.com",
    tagline: "3.3 프리랜서 근로자성 진단",
    desc: "발주사가 프리랜서 관계의 근로자성 위험을 스스로 진단하고, 결과에 맞는 계약서를 만들고, 준비서류까지 점검하는 컴플라이언스 서비스입니다.",
    points: [
      "예/아니오 문항으로 근로자성 위험을 자가진단",
      "진단 결과에 따라 위탁계약서·근로계약서를 가이드된 방식으로 생성",
      "판례와 고용노동부 유권해석을 함께 제공",
    ],
  },
  {
    name: "산업안전 백신",
    url: "https://safety.plustai.com",
    tagline: "산업안전보건 자가진단·이행점검",
    desc: "사업주가 산업안전보건 위험을 자가진단하고, 예방·점검 절차와 서류를 체계적으로 관리하는 컴플라이언스 도구입니다.",
    points: [
      "위험성평가 등 안전보건 항목의 자가진단",
      "경영책임자 9대 이행점검과 증빙 관리",
      "AI 감독관이 진단 결과의 근거와 신뢰도를 함께 제시",
    ],
  },
]
