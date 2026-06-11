# FAIR HR 디자인 리팩토링 — Vercel 배포 가이드

현재 브랜치: `디자인-리팩토링-260417`
main은 건드리지 않고 **이 브랜치만 Preview URL로** 검증하는 흐름입니다.

---

## 1. 다른 Vercel 계정에 새 프로젝트로 연결하기

### A. 새 프로젝트 생성 (처음 1회)

1. 해당 Vercel 계정으로 로그인 → `Add New... → Project`
2. GitHub 저장소 목록에서 **이 리포지토리 선택** (같은 레포 여러 Vercel 프로젝트에 연결 가능)
3. Framework Preset: **Next.js** (자동 감지됨)
4. **Root Directory**: 기본값 (`./`)
5. **Build & Output Settings**: 기본값 (Next.js 기본)
6. **Environment Variables**: 기존 운영 프로젝트에서 쓰던 값이 있으면 그대로 복붙
   - 예: `OPENAI_API_KEY`, 이메일/DB 관련 키 등
7. **Deploy** 클릭

> 첫 배포가 main 기준으로 한 번 돌지만, 아래 2번에서 Production Branch를 바꿔주면 이후에는 이 리팩토링 브랜치만 Production으로 간주됩니다.

### B. 기존 Vercel 프로젝트에 그냥 Preview로 띄우기 (더 간단한 옵션)

운영 중인 프로젝트에 이 브랜치를 push만 해도 자동으로 **Preview URL**이 생성됩니다.

- `https://<프로젝트명>-git-디자인-리팩토링-260417-<팀슬러그>.vercel.app`
- main 브랜치 Production에는 영향 없음
- Vercel 대시보드 → Deployments 탭에서 해당 브랜치 배포 확인

**별도 Vercel 계정에 띄우고 싶은 이유**가 명확하지 않다면, 이 옵션이 가장 안전합니다.

---

## 2. Production Branch 설정 (별도 계정 사용 시만)

Vercel 프로젝트 → **Settings → Git**

- **Production Branch**를 `디자인-리팩토링-260417`로 변경
- 이렇게 하면 이 브랜치에 push할 때마다 Production 배포가 돌면서 고정 URL이 생김

---

## 3. 도메인 연결 (원하면)

- Settings → Domains → `Add`
- 예: `refactor.fairhr.net`, `preview.fairhr.net` 같은 서브도메인 추천
- DNS에 CNAME 레코드 추가 (`cname.vercel-dns.com`)

---

## 4. 배포 확인 체크리스트

배포 후 다음 페이지들이 정상 동작하는지 확인:

- [ ] `/` — 홈 (새 CRM 섹션, Process, CTA 보임)
- [ ] `/fair-crm` — 신규 FAIR CRM 상세 페이지
- [ ] `/contact` — 직원 수 select, 관심 서비스 checkbox, 개인정보 동의 체크박스
- [ ] `/about/*`, `/qna`, `/board` — 기존 페이지 정상
- [ ] 언어 스위처 (ko/en/ja) — 세 언어 모두 번역 정상 표시
- [ ] "CRM 로그인" 버튼 클릭 시 `https://efm.fairhr.net`으로 이동

---

## 5. 미디어 파일 업로드 (배포 전/후)

`public/MEDIA-NEEDED.md` 체크리스트 참고:

- e-fm-saechang 서버를 띄운 뒤 hero 영상/기능 스크린샷 캡처
- `public/media/` 경로에 업로드 후 커밋 → 자동 재배포

---

## 6. 롤백 / 되돌리기

- Vercel 대시보드 → Deployments → 이전 배포의 `⋯` → **Promote to Production**
- 또는 git에서 이 브랜치를 이전 커밋으로 reset 후 force push

---

## 7. main으로 최종 합치기 (리팩토링 확정 시)

운영에 올리기로 결정되면:

```bash
git checkout main
git pull origin main
git merge 디자인-리팩토링-260417
git push origin main
```

main이 Production인 원래 Vercel 프로젝트에서 자동 재배포됩니다.

---

## 요약

| 단계 | 작업 |
|---|---|
| 1 | Vercel 새 프로젝트 생성 또는 기존 프로젝트 Preview 사용 |
| 2 | 환경변수 세팅 |
| 3 | (별도 계정만) Production Branch = `디자인-리팩토링-260417` 지정 |
| 4 | 도메인 연결 (선택) |
| 5 | 배포 확인 체크리스트로 검증 |
| 6 | 미디어 파일 채워서 재배포 |
| 7 | 확정 시 main으로 머지 |
