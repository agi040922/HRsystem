import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40 w-full overflow-x-hidden">
      <div className="container-fluid max-w-7xl py-6 md:py-8 text-center md:text-left">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="px-4 md:px-0">
            <h3 className="font-semibold mb-3 text-base md:text-lg">FAIR인사노무컨설팅</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              대표: 정광일
              <br />
              주소: 서울특별시 강남구 테헤란로 123, 4층
              <br />
              전화: <a href="tel:02-1234-5678" className="hover:text-primary">02-1234-5678</a>
              <br />
              이메일: <a href="mailto:info@fair-hr.co.kr" className="hover:text-primary">info@fair-hr.co.kr</a>
            </p>
          </div>
          <div className="px-4 md:px-0">
            <h3 className="font-semibold mb-3 text-base md:text-lg">바로가기</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  회사소개
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  주요 서비스
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  상담문의
                </Link>
              </li>
            </ul>
          </div>
          <div className="px-4 md:px-0 sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold mb-3 text-base md:text-lg">정책</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  이용약관
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t text-xs sm:text-sm text-muted-foreground text-center px-4 md:px-0">
          &copy; {new Date().getFullYear()} FAIR인사노무컨설팅. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
