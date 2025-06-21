import QnaClientPage from "./QnaClientPage"

export const metadata = {
  // metadata는 서버 컴포넌트에서만 직접 사용 가능. 클라이언트 컴포넌트에서는 generateMetadata 사용.
  title: "Q&A | 노무법인 [법인명]",
  description: "자주 묻는 질문을 확인하고, 궁금한 점을 직접 문의하세요.",
}

export default function QnaPage() {
  return <QnaClientPage />
}
