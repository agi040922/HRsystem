<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the FAIR HR consulting website (Next.js 15.5 App Router). PostHog is initialised in `instrumentation-client.ts` using the Next.js 15.3+ recommended pattern. A reverse proxy is wired through `next.config.mjs` rewrites so ad-blockers cannot suppress client-side events. A server-side singleton (`lib/posthog-server.ts`) is used for all API routes and Server Actions, with `await posthog.flush()` called before every response to prevent event loss in short-lived serverless handlers.

Nine events are instrumented, covering the visitor journey from browsing and tool usage through to lead submission.

| Event | Description | File |
|---|---|---|
| `contact_form_submitted` | User successfully submits the HR consultation contact form | `app/contact/ContactPageClient.tsx` |
| `contact_form_error` | An error occurs when submitting the contact form | `app/contact/ContactPageClient.tsx` |
| `contract_template_selected` | User selects an employment contract template type | `app/tools/contract-generator/create/page.tsx` |
| `contract_generate_clicked` | User clicks the generate contract button | `app/tools/contract-generator/create/page.tsx` |
| `crm_video_opened` | User opens the FAIR CRM proposal video modal | `app/fair-crm/FairCrmClientPage.tsx` |
| `crm_proposal_downloaded` | User clicks to download the FAIR CRM proposal PDF | `app/fair-crm/FairCrmClientPage.tsx` |
| `crm_login_clicked` | User clicks the FAIR CRM login button | `app/fair-crm/FairCrmClientPage.tsx` |
| `dismissal_check_started` | User starts the dismissal risk assessment diagnostic | `app/tools/dismissal-checker/check/page.tsx` |
| `sales_consultation_completed` | User completes the AI sales consultation and receives a service recommendation | `app/sales/actions.ts` |

## 위저드 실행 후 직접 수정한 내용 (2026-07-25)

위저드가 생성한 코드를 검토하면서 아래를 고쳤다. 이 문서는 수정 후 상태 기준이다.

- **서버 이벤트의 distinctId 연결.** 위저드는 서버 이벤트에 `"anonymous"`/`"admin"` 상수를 넣어서 모든
  서버 이벤트가 한 사람으로 뭉쳤다. `consultSummary` 는 브라우저의 `posthog.get_distinct_id()` 를 받아
  쓰도록 바꿨고, id 가 없으면 잘못 귀속시키지 않고 이벤트를 보내지 않는다.
- **상담폼 이벤트 중복 제거.** 클라이언트 `contact_form_submitted` 와 서버 `contact_submitted` 가 한 번의
  제출에 둘 다 발생했다. 서버 쪽을 삭제하고 클라이언트 하나만 남겼다.
- **`contract_generated` → `contract_generate_clicked`.** 해당 "계약서 생성" 버튼은 아직 실제 생성 동작이
  없다. "생성됨"으로 집계하면 전환율이 부풀려지므로 클릭까지만 기록한다. PostHog 인사이트
  "HR tools usage trend (wizard)" 도 새 이름으로 갱신했다.
- **관리자 로그인 계측 제거.** 계획에 없던 추가분이었고, 실패 응답(401)에서도 `await flush()` 로 지연이
  붙었다.
- **AI 상담 이벤트에서 응답 내용 제외.** 개인정보처리방침이 "선택 항목 자체는 저장하지 않는다"고
  고지하므로, 규모·업종·고민·현황은 보내지 않고 추천 결과와 요약 출처만 기록한다.
- **미들웨어에서 `/ingest` 제외.** matcher 가 분석 요청까지 잡아서 페이지뷰·클릭마다 미들웨어가 실행됐다.
- **`.gitignore` 중복 제거.** 위저드가 추가한 `.env.local` 은 기존 `.env*` 로 이미 커버된다.
- **`skipTrailingSlashRedirect: true` 는 유지.** PostHog 리버스 프록시가 트레일링 슬래시 API 요청을
  쓰기 때문에 필요하다. 다만 사이트 전역에서 트레일링 슬래시 정규화 리다이렉트가 사라지는 부수효과가
  있으므로, 중복 URL 이 문제되면 페이지별 canonical 을 점검할 것.
- **개인정보처리방침 갱신.** `app/privacy/page.tsx` 제2조 자동수집항목과 제4조 위탁·국외이전에
  PostHog Inc.(미국)를 추가했다.

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics (wizard)](https://us.posthog.com/project/527696/dashboard/1903854)
- **Insight 1**: [Contact form conversion funnel](https://us.posthog.com/project/527696/insights/ZLLF1NQ7) — measures how many visitors complete the primary lead-generation action
- **Insight 2**: [Contact form submissions over time](https://us.posthog.com/project/527696/insights/OXEOPnYL) — daily bar chart of form submissions vs. errors
- **Insight 3**: [FAIR CRM product engagement](https://us.posthog.com/project/527696/insights/HM5q3qO9) — line chart of video views, proposal downloads, and CRM login clicks
- **Insight 4**: [HR tools usage trend](https://us.posthog.com/project/527696/insights/BL4WHAtz) — tracks which self-service tools (contract generator, dismissal checker, AI consultation) are used most
- **Insight 5**: [Contract template selection breakdown](https://us.posthog.com/project/527696/insights/pnYJbZRD) — breakdown by template type (regular, contract, part-time, daily)

## Verify before merging

- [x] Run a full production build (`pnpm build`) — 통과 확인 (2026-07-25).
- [ ] **실제 이벤트 수신 확인** — 아직 미검증이다. 배포 후 PostHog 프로젝트에 이벤트가 들어오는지 확인할 것
      (현재 프로젝트는 `ingested_event: false`).
- [x] Vercel 환경변수 등록 — `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`, `NEXT_PUBLIC_POSTHOG_HOST` 가
      Production / Development 에 등록돼 있다. 단 Production 쪽은 sensitive 타입이라 값을 읽어
      대조할 수 없으므로, **실제 값이 맞는지는 배포 후 이벤트 수신으로 확인해야 한다.**
      Preview 환경에는 등록돼 있지 않다(프리뷰 트래픽은 집계되지 않음).
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any monorepo/bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify in PostHog Error Tracking.
- [ ] This project uses Supabase, Resend, and OpenAI. Run `npx @posthog/wizard warehouse` to connect these data sources to PostHog's data warehouse so you can query CRM and email data alongside your analytics.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
