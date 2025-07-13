export const metadata = {
  title: "개인정보처리방침 | FAIR인사노무컨설팅",
  description: "FAIR인사노무컨설팅의 개인정보처리방침입니다. 개인정보 수집, 이용, 보관에 대한 정책을 안내합니다.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">개인정보처리방침</h1>
          <p className="mt-4 text-lg text-muted-foreground">최종 수정일: 2025년 5월 30일</p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-6">
          <p>
            노무법인 [법인명](이하 '법인')은 개인정보보호법 등 관련 법령상의 개인정보보호 규정을 준수하며, 관련 법령에
            의거한 개인정보처리방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다.
          </p>

          <h2 className="text-2xl font-semibold">제1조 (개인정보의 처리 목적)</h2>
          <p>
            법인은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
            이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한
            조치를 이행할 예정입니다.
          </p>
          <ol className="list-decimal pl-6">
            <li>
              상담 신청 접수 및 처리: 상담 신청자의 신원 확인, 상담 내용 확인, 연락 및 안내, 상담 결과 통보 등의
              목적으로 개인정보를 처리합니다.
            </li>
            <li>
              서비스 제공: 법률 자문, 컨설팅, 사건 대리 등 법인이 제공하는 서비스 이행을 위해 필요한 범위 내에서
              개인정보를 처리합니다.
            </li>
            <li>
              고객 관리: 고객 식별, 불만 처리 등 민원사무 처리, 고지사항 전달 등을 목적으로 개인정보를 처리합니다.
            </li>
          </ol>

          <h2 className="text-2xl font-semibold">제2조 (처리하는 개인정보 항목)</h2>
          <p>법인은 상담 신청 및 서비스 제공을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
          <ul className="list-disc pl-6">
            <li>필수항목: 성명, 연락처 (휴대폰 번호), 이메일 주소</li>
            <li>선택항목: 회사명, 직책, 문의 내용에 포함된 개인정보, 첨부파일에 포함된 개인정보 등</li>
            <li>자동수집항목: 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보 (웹사이트 이용 시)</li>
          </ul>

          <h2 className="text-2xl font-semibold">제3조 (개인정보의 처리 및 보유 기간)</h2>
          <p>
            법인은 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보
            보유·이용기간 내에서 개인정보를 처리·보유합니다. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
          </p>
          <ol className="list-decimal pl-6">
            <li>상담 관련 정보: 상담 종료 후 3년 (단, 분쟁 발생 시 해결 시점까지)</li>
            <li>
              서비스 제공 관련 정보: 서비스 제공 완료 및 요금결제·정산 완료 후 5년 (상법 등 관련 법령 규정에 따름)
            </li>
            <li>웹사이트 방문 기록: 3개월 (통신비밀보호법)</li>
          </ol>

          {/* 이하 개인정보처리방침의 나머지 조항들을 추가합니다. (예: 개인정보의 제3자 제공, 파기절차, 정보주체의 권리 등) */}
          <p className="mt-8">
            (이하 개인정보처리방침 전문은 실제 법인 정책에 맞게 상세히 작성되어야 합니다. 이는 예시이며, 법적 효력을
            갖는 완전한 내용이 아닙니다.)
          </p>
          <p>기타 개인정보 침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.</p>
          <ul className="list-disc pl-6">
            <li>개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)</li>
            <li>대검찰청 사이버수사과 (www.spo.go.kr / 국번없이 1301)</li>
            <li>경찰청 사이버안전국 (cyberbureau.police.go.kr / 국번없이 182)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
