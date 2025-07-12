import { Metadata } from "next"
import PageBanner from "@/components/page-banner"

export const metadata: Metadata = {
  title: "이용약관 - FAIR인사노무컨설팅",
  description: "FAIR인사노무컨설팅 웹사이트 이용약관을 확인하세요.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <PageBanner title="이용약관" subtitle="웹사이트 이용약관" />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">제1조 (목적)</h2>
              <p className="text-muted-foreground leading-relaxed">
                이 약관은 FAIR인사노무컨설팅(이하 "회사"라 함)이 제공하는 웹사이트 및 관련 서비스(이하 "서비스"라 함)의 이용에 관한 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">제2조 (용어의 정의)</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>1. "회사"라 함은 FAIR인사노무컨설팅을 말합니다.</li>
                <li>2. "이용자"라 함은 회사의 서비스를 이용하는 개인 또는 법인을 말합니다.</li>
                <li>3. "서비스"라 함은 회사가 제공하는 모든 인사노무 컨설팅 서비스 및 관련 정보를 말합니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">제3조 (약관의 효력 및 변경)</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                1. 이 약관은 웹사이트에 게시됨으로써 효력을 발생합니다.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                2. 회사는 필요한 경우 이 약관을 변경할 수 있으며, 변경된 약관은 웹사이트에 공지함으로써 효력을 발생합니다.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                3. 이용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단할 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">제4조 (서비스의 제공)</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                회사는 다음과 같은 서비스를 제공합니다:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>1. 인사노무 컨설팅 서비스</li>
                <li>2. 근로계약서 작성 도구</li>
                <li>3. 해고정당성 검토 서비스</li>
                <li>4. 퇴직금 계산 서비스</li>
                <li>5. 기타 노무 관련 정보 제공</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">제5조 (이용자의 의무)</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                이용자는 다음 행위를 하여서는 안 됩니다:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>1. 타인의 개인정보를 도용하거나 허위 정보를 제공하는 행위</li>
                <li>2. 회사의 서비스를 이용하여 얻은 정보를 무단으로 복제, 배포, 상업적으로 이용하는 행위</li>
                <li>3. 회사의 서비스 운영을 방해하거나 시스템에 무리를 주는 행위</li>
                <li>4. 법령이나 이 약관에 위반되는 행위</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">제6조 (서비스 이용 제한)</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                회사는 이용자가 다음 각 호에 해당하는 행위를 하였을 때 서비스 이용을 제한할 수 있습니다:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>1. 이 약관을 위반한 경우</li>
                <li>2. 서비스의 정상적인 운영을 방해한 경우</li>
                <li>3. 관련 법령에 위반되는 행위를 한 경우</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">제7조 (면책조항)</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                1. 회사는 천재지변, 전쟁, 기타 불가항력적 사유로 서비스를 제공할 수 없는 경우 책임을 지지 않습니다.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                2. 회사는 이용자의 부주의로 인한 손해에 대하여 책임을 지지 않습니다.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                3. 회사는 이용자가 서비스를 이용하여 기대하는 수익을 얻지 못한 것에 대하여 책임을 지지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">제8조 (준거법 및 관할법원)</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                1. 이 약관의 해석 및 회사와 이용자 간의 분쟁에 대하여는 대한민국 법을 적용합니다.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                2. 회사와 이용자 간의 분쟁에 관한 소송은 회사의 본점 소재지를 관할하는 법원에 제기합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">제9조 (기타)</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                1. 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 관련 법령 또는 관례에 따릅니다.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                2. 회사는 필요시 별도의 개별약관이나 운영정책을 둘 수 있습니다.
              </p>
            </section>

            <div className="mt-8 pt-8 border-t">
              <p className="text-sm text-muted-foreground">
                <strong>시행일:</strong> 2025년 1월 1일
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>문의사항:</strong> 이용약관에 대한 문의는 <a href="mailto:info@fair-hr.co.kr" className="text-primary hover:underline">info@fair-hr.co.kr</a>로 연락주시기 바랍니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 