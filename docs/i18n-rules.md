# 🌐 국제화(i18n) 작업 규칙 및 가이드

## 📋 목차
1. [현재 국제화 방식](#현재-국제화-방식)
2. [번역 파일 구조 규칙](#번역-파일-구조-규칙)
3. [번역 키 네이밍 규칙](#번역-키-네이밍-규칙)
4. [컴포넌트에서 번역 사용 방법](#컴포넌트에서-번역-사용-방법)
5. [새로운 페이지 추가 시 작업 절차](#새로운-페이지-추가-시-작업-절차)
6. [확장 및 유지보수 규칙](#확장-및-유지보수-규칙)

---

## 현재 국제화 방식

### 사용 기술 스택
- **라이브러리**: `next-intl` v4.1.0
- **지원 언어**: 한국어(ko), 영어(en), 일본어(ja)
- **기본 언어**: 한국어(ko)
- **라우팅 방식**: URL 경로 기반 (`/ko`, `/en`, `/ja`)

### 프로젝트 구조
```
labor-law-firm-website-fair/
├── app/
│   ├── [locale]/          # 동적 로케일 라우팅
│   │   ├── layout.tsx     # 로케일별 레이아웃
│   │   └── page.tsx       # 로케일별 페이지
│   └── providers.tsx      # I18nProvider 설정
├── i18n/
│   └── request.ts         # 번역 파일 로드 설정
├── messages/
│   ├── ko/
│   │   ├── common.json    # 공통 UI 요소
│   │   ├── home.json      # 메인 페이지
│   │   ├── about.json     # 회사소개 페이지
│   │   └── services.json  # 서비스 페이지
│   ├── en/
│   │   └── (동일 구조)
│   └── ja/
│       └── (동일 구조)
└── middleware.ts          # 로케일 감지 및 리다이렉트
```

### 핵심 설정 파일

#### 1. `i18n/request.ts`
```typescript
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['ko', 'en', 'ja'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: {
      ...(await import(`@/messages/${locale}/common.json`)).default,
      ...(await import(`@/messages/${locale}/home.json`)).default,
      ...(await import(`@/messages/${locale}/about.json`)).default,
      // 새 파일 추가 시 여기에 import 추가
    }
  };
});
```

#### 2. `middleware.ts`
```typescript
import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

export default createMiddleware({
  locales,
  defaultLocale: 'ko',
  localePrefix: 'always' // URL에 항상 로케일 표시
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
```

---

## 번역 파일 구조 규칙

### 1. 파일 분리 기준

#### 원칙
- **한 파일당 최대 600줄** 이하 유지
- **도메인별 분리**: 페이지 또는 기능 단위로 분리
- **공통 요소 분리**: 여러 페이지에서 사용하는 요소는 `common.json`에 배치

#### 현재 파일 구조
```
messages/
├── ko/
│   ├── common.json       # 버튼, 레이블, 에러 메시지 등 공통 UI
│   ├── home.json         # 메인 페이지 전용
│   ├── about.json        # 회사소개 관련 페이지 (greeting, profile, ethics, location)
│   └── services.json     # 서비스 페이지 전용
├── en/
│   └── (동일 구조)
└── ja/
    └── (동일 구조)
```

### 2. 파일별 책임 범위

#### `common.json` - 공통 UI 요소
```json
{
  "buttons": {
    "submit": "제출",
    "cancel": "취소",
    "confirm": "확인",
    "close": "닫기",
    "more": "더보기"
  },
  "labels": {
    "name": "이름",
    "email": "이메일",
    "phone": "전화번호"
  },
  "errors": {
    "required": "필수 입력 항목입니다",
    "invalidEmail": "올바른 이메일 형식이 아닙니다"
  },
  "navigation": {
    "home": "홈",
    "about": "회사소개",
    "services": "서비스"
  }
}
```

#### `about.json` - 회사소개 관련 페이지
```json
{
  "greeting": {
    "title": "인사말",
    "subtitle": "...",
    "content": { ... }
  },
  "profile": {
    "title": "대표 프로필",
    "sections": { ... }
  },
  "ethics": {
    "title": "윤리강령",
    "principles": [ ... ]
  },
  "location": {
    "title": "오시는 길",
    "address": { ... }
  }
}
```

### 3. 중첩 구조 규칙

#### 최대 깊이: 3단계
```json
{
  "level1": {              // 1단계: 페이지 또는 섹션
    "level2": {            // 2단계: 하위 섹션 또는 컴포넌트
      "level3": "값"       // 3단계: 실제 텍스트 값
    }
  }
}
```

#### 예시
```json
{
  "about": {                    // 1단계: 페이지
    "ethics": {                 // 2단계: 하위 페이지
      "title": "윤리강령",      // 3단계: 텍스트
      "principles": [ ... ]     // 3단계: 배열
    }
  }
}
```

---

## 번역 키 네이밍 규칙

### 1. 기본 원칙
- **camelCase 사용**: `myTranslationKey`
- **명확하고 설명적**: 키 이름만으로 용도 파악 가능
- **일관성 유지**: 같은 유형의 데이터는 같은 패턴 사용

### 2. 네이밍 패턴

#### 페이지 제목/부제목
```json
{
  "title": "페이지 제목",
  "subtitle": "페이지 부제목",
  "description": "페이지 설명"
}
```

#### 섹션
```json
{
  "sectionName": {
    "title": "섹션 제목",
    "content": "섹션 내용",
    "items": [ ... ]
  }
}
```

#### 폼 필드
```json
{
  "form": {
    "labels": {
      "name": "이름",
      "email": "이메일"
    },
    "placeholders": {
      "name": "이름을 입력하세요",
      "email": "이메일을 입력하세요"
    },
    "errors": {
      "nameRequired": "이름은 필수입니다",
      "emailInvalid": "올바른 이메일이 아닙니다"
    }
  }
}
```

#### 버튼/액션
```json
{
  "actions": {
    "submit": "제출하기",
    "cancel": "취소",
    "edit": "수정",
    "delete": "삭제"
  }
}
```

### 3. 특수 케이스

#### 배열 데이터
```json
{
  "items": [
    "항목 1",
    "항목 2",
    "항목 3"
  ]
}
```

#### 객체 배열
```json
{
  "services": [
    {
      "title": "서비스 1",
      "description": "설명 1"
    },
    {
      "title": "서비스 2",
      "description": "설명 2"
    }
  ]
}
```

---

## 컴포넌트에서 번역 사용 방법

### 1. 기본 사용법

#### Client Component
```tsx
"use client"

import { useTranslations } from 'next-intl'

export default function MyComponent() {
  const t = useTranslations('about.ethics')
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
    </div>
  )
}
```

#### Server Component
```tsx
import { useTranslations } from 'next-intl'

export default function MyServerComponent() {
  const t = useTranslations('about.ethics')
  
  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  )
}
```

### 2. 중첩 키 접근

#### 방법 1: 전체 경로 지정
```tsx
const t = useTranslations('about')

<h1>{t('ethics.title')}</h1>
<p>{t('ethics.subtitle')}</p>
```

#### 방법 2: 하위 네임스페이스 지정 (권장)
```tsx
const t = useTranslations('about.ethics')

<h1>{t('title')}</h1>
<p>{t('subtitle')}</p>
```

### 3. 배열 데이터 사용

```tsx
const t = useTranslations('about.ethics')
const principles = t.raw('principles') as string[]

return (
  <ul>
    {principles.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
)
```

### 4. 동적 값 삽입

```json
{
  "welcome": "안녕하세요, {name}님!"
}
```

```tsx
const t = useTranslations('common')

<p>{t('welcome', { name: '홍길동' })}</p>
// 결과: "안녕하세요, 홍길동님!"
```

### 5. 복수형 처리

```json
{
  "itemCount": "{count, plural, =0 {항목 없음} =1 {1개 항목} other {# 개 항목}}"
}
```

```tsx
<p>{t('itemCount', { count: 5 })}</p>
// 결과: "5 개 항목"
```

---

## 새로운 페이지 추가 시 작업 절차

### Step 1: 번역 파일 결정
1. 기존 파일에 추가할지, 새 파일을 만들지 결정
2. 새 파일 생성 시: `messages/ko/새파일.json` 생성

### Step 2: 번역 키 작성
1. 한국어 번역 파일 작성 (`messages/ko/`)
2. 영어 번역 파일 작성 (`messages/en/`)
3. 일본어 번역 파일 작성 (`messages/ja/`)

**중요**: 세 언어의 JSON 구조가 **완전히 동일**해야 함

### Step 3: `i18n/request.ts` 업데이트
```typescript
export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: {
      ...(await import(`@/messages/${locale}/common.json`)).default,
      ...(await import(`@/messages/${locale}/home.json`)).default,
      ...(await import(`@/messages/${locale}/about.json`)).default,
      ...(await import(`@/messages/${locale}/새파일.json`)).default, // 추가
    }
  };
});
```

### Step 4: 컴포넌트에서 사용
```tsx
"use client"

import { useTranslations } from 'next-intl'

export default function NewPage() {
  const t = useTranslations('새파일')
  
  return <h1>{t('title')}</h1>
}
```

### Step 5: 테스트
1. 세 언어 모두에서 페이지 확인
2. 누락된 번역 키 확인
3. 레이아웃 깨짐 확인

---

## 확장 및 유지보수 규칙

### 1. 번역 파일 추가 규칙

#### 언제 새 파일을 만들어야 하는가?
- 기존 파일이 **600줄 초과** 시
- 새로운 **도메인/기능** 추가 시
- **독립적인 페이지** 추가 시

#### 파일 분리 예시
```
# Before (800줄)
messages/ko/services.json

# After
messages/ko/services-consulting.json  (400줄)
messages/ko/services-legal.json       (400줄)
```

### 2. 번역 키 수정 규칙

#### 키 이름 변경 시
1. 모든 언어 파일에서 **동시에** 변경
2. 컴포넌트에서 사용하는 부분 **모두** 수정
3. 타입 에러 확인

#### 키 삭제 시
1. 어디에서도 사용하지 않는지 **검색** 후 삭제
2. 모든 언어 파일에서 **동시에** 삭제

### 3. 번역 품질 관리

#### 번역 작성 원칙
- **자연스러운 표현** 사용
- **전문 용어 일관성** 유지
- **문화적 맥락** 고려

#### 번역 검토 체크리스트
- [ ] 문법적으로 올바른가?
- [ ] 문맥에 맞는 번역인가?
- [ ] 전문 용어가 일관되게 사용되었는가?
- [ ] UI에 표시될 때 자연스러운가?

### 4. 성능 최적화

#### 코드 스플리팅
- 페이지별로 번역 파일 분리
- 필요한 번역만 동적 로드

#### 캐싱
- `next-intl`은 자동으로 번역 캐싱
- 빌드 시 번역 파일 최적화

---

## 🚨 주의사항 및 일반적인 실수

### 1. 번역 키 누락
```tsx
// ❌ 잘못된 예
const t = useTranslations('ethics')  // about.json 내부의 ethics

// ✅ 올바른 예
const t = useTranslations('about.ethics')
```

### 2. JSON 구조 불일치
```json
// ❌ ko.json
{
  "title": "제목",
  "content": { "text": "내용" }
}

// ❌ en.json
{
  "title": "Title"
  // content 누락!
}

// ✅ 구조가 동일해야 함
```

### 3. 타입 캐스팅 누락
```tsx
// ❌ 타입 에러 발생
const items = t.raw('items')
items.map(...)

// ✅ 타입 캐스팅
const items = t.raw('items') as string[]
items.map(...)
```

### 4. 하드코딩된 텍스트
```tsx
// ❌ 하드코딩
<button>제출</button>

// ✅ 번역 사용
<button>{t('buttons.submit')}</button>
```

---

## 📚 참고 자료

### 공식 문서
- [next-intl 공식 문서](https://next-intl-docs.vercel.app/)
- [Next.js i18n 가이드](https://nextjs.org/docs/app/building-your-application/routing/internationalization)

### 유용한 도구
- [i18n Ally (VS Code Extension)](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally)
- [JSON Formatter](https://jsonformatter.org/)

---

## 📋 체크리스트 템플릿

### 새 페이지 추가 시
- [ ] 한국어 번역 파일 작성
- [ ] 영어 번역 파일 작성
- [ ] 일본어 번역 파일 작성
- [ ] `i18n/request.ts`에 import 추가
- [ ] 컴포넌트에서 `useTranslations` 사용
- [ ] 세 언어 모두 테스트
- [ ] 레이아웃 확인
- [ ] 타입 에러 확인

### 번역 수정 시
- [ ] 모든 언어 파일 동시 수정
- [ ] JSON 구조 일치 확인
- [ ] 컴포넌트 사용 부분 확인
- [ ] 빌드 에러 확인
- [ ] 브라우저에서 확인

---

**최종 업데이트**: 2025-10-06  
**작성자**: AI Assistant  
**버전**: 1.0
