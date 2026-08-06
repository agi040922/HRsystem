// FAIR AI 사용 가이드라인의 절 목록 — **화면과 상단 메뉴가 이 한 곳을 공유한다.**
// ⚠️ 여기서 id 를 바꾸면 메뉴의 앵커 링크가 깨진다. 제목만 고칠 때도 id 는 그대로 둘 것.
//
// ⚠️ 「인공지능 기본법」 제34조(고영향 인공지능 사업자 책무) 5개 항목이 각각 대응한다.
//    1호 위험관리방안 → risk / 2호 설명 방안·3호 이용자 보호 → explain
//    4호 사람의 관리·감독 → supervision(책임자 성명·연락처 포함) / 5호 문서 작성·보관 → data
//    절을 없애기 전에 그 항목이 다른 곳에 남아 있는지 확인할 것.

export type GuidelineSection = {
  id: string
  title: string
  /** 상단 메뉴에 함께 보여 줄 한 줄 설명 */
  menuDesc: string
}

export const GUIDELINE_SECTIONS: GuidelineSection[] = [
  {
    id: "rules",
    title: "판정은 규칙이, 설명은 AI가",
    menuDesc: "결과를 정하는 것은 AI가 아니라 노무사가 설계한 규칙입니다",
  },
  {
    id: "learning",
    title: "모델을 우리 데이터로 학습시키지 않습니다",
    menuDesc: "찾아 읽고 근거를 붙이는 방식 — 고객 자료는 학습에 들어가지 않습니다",
  },
  {
    id: "supervision",
    title: "사람이 관리·감독합니다",
    menuDesc: "AI 에이전트 조직도와 관리·감독 책임자",
  },
  {
    id: "risk",
    title: "위험을 어떻게 관리하는가",
    menuDesc: "단정 표현 차단·근거 없는 지적 폐기 등 코드에 둔 장치",
  },
  {
    id: "explain",
    title: "결과 설명과 이용자 보호",
    menuDesc: "판정 기준 공개, 참고용 안내, 이의제기",
  },
  {
    id: "data",
    title: "고객 자료와 기록",
    menuDesc: "비저장·자동삭제·마스킹, 위탁 고지, 설계·검수 기록 보관",
  },
  {
    id: "limits",
    title: "AI를 쓰지 않는 곳과 하지 않는 일",
    menuDesc: "생성형 AI를 쓰지 않는 서비스, 우리가 하지 않는 다섯 가지",
  },
]
