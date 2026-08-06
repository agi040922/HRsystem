// FAIR AI 사용 가이드라인의 절 목록 — **화면과 상단 메뉴가 이 한 곳을 공유한다.**
// ⚠️ 여기서 id 를 바꾸면 메뉴의 앵커 링크가 깨진다. 제목만 고칠 때도 id 는 그대로 둘 것.
//
// ⚠️ 「인공지능 기본법」 제34조(고영향 인공지능 사업자 책무) 5개 항목이 흩어져 대응한다.
//    1호 위험관리방안 → supervision(코드에 둔 장치)
//    2호 설명 방안·3호 이용자 보호 → notice
//    4호 사람의 관리·감독 → supervision(책임자 성명·연락처 포함, 시행령 제27조①4호)
//    5호 문서 작성·보관 → data
//    절을 합치거나 없애기 전에 그 항목이 다른 곳에 남아 있는지 확인할 것.

export type GuidelineSection = {
  id: string
  title: string
  /** 상단 메뉴에 함께 보여 줄 한 줄 설명 */
  menuDesc: string
}

export const GUIDELINE_SECTIONS: GuidelineSection[] = [
  {
    id: "what",
    title: "FAIR AI란 무엇인가",
    menuDesc: "판정은 규칙이, 설명은 AI가 — 27년의 판단 기준이 코드에 들어가 있습니다",
  },
  {
    id: "where",
    title: "어디에 쓰고, 어디에 쓰지 않는가",
    menuDesc: "AI가 하는 일과 하지 않는 일, AI를 쓰지 않는 서비스",
  },
  {
    id: "supervision",
    title: "사람이 어떻게 관리·감독하는가",
    menuDesc: "AI 에이전트 조직도, 코드에 둔 장치, 관리·감독 책임자",
  },
  {
    id: "data",
    title: "고객 자료를 어떻게 다루는가",
    menuDesc: "비저장·자동삭제·마스킹, 위탁 고지, 설계·검수 기록 보관",
  },
  {
    id: "notice",
    title: "AI를 쓴다는 사실을 알립니다",
    menuDesc: "사전 고지와 생성물 표시, 판정 기준 공개, 이의제기",
  },
  {
    id: "not-doing",
    title: "우리가 하지 않는 것",
    menuDesc: "다섯 가지 — 법적 판단 대행, 모델 학습, 미확인 인용, 단정, 무검수 발신",
  },
  {
    id: "contact",
    title: "문의",
    menuDesc: "AI 활용에 관한 문의와 이의제기 창구",
  },
]
