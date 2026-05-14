# 통합 테스트 전략 (integration-strategy)

> 이 파일은 글로벌 스킬 `integration-tests`가 첫 invoke 시 프로젝트 기준을 고정하기 위해 생성한 룰이다.

## 0. 메타

- **프로젝트**: HRsystem
- **작성일**: 2026-05-14
- **러너**: 현재 전용 테스트 러너 없음. API route는 로컬 Next 서버 + 실제 외부 API 호출로 검증한다.
- **위치**: 필요 시 `tests/integration/`
- **파일 패턴**: `*.integration.test.ts`

## 1. 외부 의존성 범위

| 의존성 | 정책 | 비고 |
|---|---|---|
| DB | 실제 dev/staging 호출 | 운영 DB 쓰기 금지 |
| Storage | 실제 호출은 별도 승인 후 | 첨부파일은 현재 Resend 메일 첨부로만 검증 |
| 이메일 발송 | 실제 발송 | Resend, 수신자 `fairhr@nate.com` |
| 외부 API | 실제 호출 | 비용/쿼터가 있으면 단건 수동 실행 |

## 2. 환경과 secret

- `.env.local`의 로컬 개발 값을 사용한다.
- 운영 URL/키로 판별되는 환경에서는 쓰기성 통합 테스트를 실행하지 않는다.
- 외부 API 키는 로그와 리포트에 노출하지 않는다.

## 3. 테스트 데이터 네이밍

- 접두사: `INT_`
- 포맷: `INT_{도메인}_{timestamp}_{random}`
- 시드 또는 실제 고객 데이터는 수정/삭제하지 않는다.

## 4. cleanup 전략

- 생성한 외부 데이터가 있으면 테스트 내부에서 ID를 기록하고 즉시 정리한다.
- Resend 실제 발송처럼 정리할 수 없는 외부 효과는 단건 수동 검증으로 제한하고, 실행 결과 ID만 보고한다.

## 5. 실행 명령

```bash
# 빌드/타입 경계 확인
pnpm exec tsc --noEmit

# 실제 API route 검증
pnpm dev
curl -i -X POST http://localhost:3000/api/contact -F ...
```

## 6. 새 통합 테스트 추가 시 체크리스트

- [ ] 실제 외부 호출 여부와 비용/부작용 확인
- [ ] 운영 환경 가드 확인
- [ ] secret 로그 출력 금지
- [ ] 생성 데이터 cleanup 확인
- [ ] 실행 결과와 known gap 기록
