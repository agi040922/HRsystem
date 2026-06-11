# 미디어 에셋 체크리스트 — FAIR CRM 소개용

e-fm-saechang(CRM) 로컬 서버를 띄우고 아래 화면을 녹화/캡처해 `public/crm/` 하위에 저장해주세요.
현재는 모두 플레이스홀더로 동작 중이며, 파일이 들어오면 해당 컴포넌트에서 src만 교체하면 됩니다.

## 영상 (landing hero / CRM intro)

- [ ] `public/crm/hero-intro.mp4`
  - 용도: 메인 페이지 히어로 영상(슬라이드1 배경)
  - 길이: 12~20초 루프
  - 내용: 대시보드 진입 → 자문 이력 리스트 스크롤 → 진단 리포트 미리보기
  - 해상도: 1920x1080, mp4 (H.264)

- [ ] `public/crm/features-demo.mp4` (선택)
  - 용도: FAIR CRM 상세 페이지 "기능 소개" 영역
  - 길이: 30~60초
  - 내용: 로그인 → 상담 등록 → 진단 결과 조회 → 산업안전 관리 탭 전환

## 스크린샷 (기능 카드 / 상세 페이지)

- [ ] `public/crm/advisory-history.png` — 자문 이력 리스트 화면
- [ ] `public/crm/diagnosis-report.png` — 인사노무 진단 보고서 예시 화면
- [ ] `public/crm/safety-dashboard.png` — 산업안전 관리 대시보드
- [ ] `public/crm/login.png` — efm.fairhr.net 로그인 화면 (CRM 로그인 버튼 위 썸네일용)
- [ ] `public/crm/dashboard-overview.png` — 메인 대시보드 전경

권장 해상도: 1600x900 이상 (Retina 대응), PNG / WebP

## 촬영 팁

- 개인정보/실명 마스킹 필수 (테스트 계정 사용 권장)
- 라이트 모드 기준으로 촬영 (홈페이지 톤 일치)
- 브라우저 확대 100%, 크롬 최신 버전 권장
- 녹화 도구: QuickTime (macOS) → mp4 변환, 또는 CleanShot X

## 사용 위치 (코드 기준)

| 파일 | 현재 상태 | 교체 대상 |
|------|-----------|-----------|
| `components/home/hero-section.tsx` | `/fair1.mp4` 사용 중 | `hero-intro.mp4`로 교체 고려 |
| `components/home/crm-services-section.tsx` | 이모지 플레이스홀더 | 카드별 스크린샷 삽입 가능 |
| `app/fair-crm/page.tsx` (예정) | 미작성 | features-demo 영상 + 스크린샷 섹션 |

파일을 올리고 알려주시면 해당 컴포넌트의 플레이스홀더를 실제 미디어로 교체하겠습니다.
