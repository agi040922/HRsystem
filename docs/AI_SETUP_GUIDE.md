# AI 기반 게시글 작성 기능 설정 가이드

## 개요
이 기능은 사용자가 제목과 내용만 입력하면 AI(ChatGPT)가 자동으로 다음을 생성해주는 시스템입니다:
- HTML 형식으로 변환된 전문적인 컨텐츠
- SEO 최적화된 제목과 설명
- URL 슬러그와 요약문
- 검색엔진 최적화 메타데이터

## 필요한 설정

### 1. OpenAI API 키 설정

1. [OpenAI Platform](https://platform.openai.com)에 가입하고 로그인
2. API Keys 섹션에서 새 API 키 생성
3. 프로젝트 루트에 `.env.local` 파일 생성
4. 다음 내용을 추가:

```
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### 2. 기존 환경 변수 유지
기존에 Supabase 등의 환경 변수가 설정되어 있다면 함께 유지하세요:

```
# OpenAI API 설정
OPENAI_API_KEY=sk-your-actual-api-key-here

# 기존 Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## 사용법

### 1. 관리자 페이지 접속
- `/admin/board/create` 페이지로 이동

### 2. 간단한 정보 입력
- **제목**: 게시글 제목 입력
- **내용**: 일반 텍스트로 내용 작성 (HTML 불필요)

### 3. AI 생성
- "AI로 컨텐츠 생성하기" 버튼 클릭
- AI가 자동으로 전문적인 웹 컨텐츠로 변환

### 4. 미리보기 및 확인
- 생성된 결과를 미리보기로 확인
- 필요시 수정하기 버튼으로 다시 작성

### 5. 게시
- "게시하기" 버튼으로 최종 발행

## 기능 상세

### AI가 자동 생성하는 것들
1. **HTML 컨텐츠**: 적절한 태그 구조로 변환 (`<p>`, `<h3>`, `<ul>`, `<li>` 등)
2. **URL 슬러그**: 영문으로 SEO 친화적인 URL 생성
3. **요약문**: 150자 이내의 핵심 요약
4. **SEO 제목**: 검색엔진 최적화된 60자 이내 제목
5. **SEO 설명**: 검색 결과에 표시될 160자 이내 설명
6. **이미지 추천**: 게시글에 어울리는 이미지 설명

### 장점
- ✅ 비전공자도 쉽게 사용 가능
- ✅ 전문적인 웹 컨텐츠 자동 생성
- ✅ SEO 최적화 자동 처리
- ✅ 일관된 품질의 게시글 생성
- ✅ 시간 단축 (제목+내용 → 완성된 게시글)

## 문제 해결

### API 키 관련 오류
- OpenAI API 키가 올바르게 설정되었는지 확인
- API 키에 충분한 크레딧이 있는지 확인
- `.env.local` 파일이 프로젝트 루트에 있는지 확인

### AI 생성 실패
- 제목과 내용이 모두 입력되었는지 확인
- 네트워크 연결 상태 확인
- OpenAI 서비스 상태 확인

### 게시 실패
- Supabase 연결 상태 확인
- 데이터베이스 권한 확인

## 비용 안내
- OpenAI API는 사용량에 따라 과금됩니다
- 게시글 하나당 약 $0.01-0.05 정도 예상
- 월 사용량을 모니터링하고 적절한 한도를 설정하세요 