import QnaClientPage from "./QnaClientPage"

export const metadata = {
  // metadata는 서버 컴포넌트에서만 직접 사용 가능. 클라이언트 컴포넌트에서는 generateMetadata 사용.
  title: "Q&A | FAIR인사노무컨설팅",
  description: "자주 묻는 질문을 확인하고, 궁금한 점을 직접 문의하세요. 노동법 관련 궁금증을 전문가가 답변해드립니다.",
}

export default function QnaPage() {
  return <QnaClientPage />
}
