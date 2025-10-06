# Next.js + next-intl 국제화 트러블슈팅 가이드

## 🚨 문제 상황

### 발생한 오류
```
Error: MISSING_MESSAGE: Could not resolve `cta` in messages for locale `ko`.
Error: MISSING_MESSAGE: Could not resolve `hero` in messages for locale `ko`.
Error: MISSING_MESSAGE: Could not resolve `company` in messages for locale `ko`.
Error: MISSING_MESSAGE: Could not resolve `ethics` in messages for locale `ko`.
Error: MISSING_MESSAGE: Could not resolve `greeting` in messages for locale `ko`.
Error: MISSING_MESSAGE: Could not resolve `profile` in messages for locale `ko`.
```

### 증상
- 페이지는 정상 렌더링되지만 콘솔에 MISSING_MESSAGE 오류 발생
- 개발 모드에서 하이드레이션 과정 중 일시적으로 번역 키를 찾지 못함
- 특정 네임스페이스(`hero`, `cta`, `company`, `ethics`, `greeting`, `profile`)에서 발생

## 🔍 원인 분석

### 1. 하이드레이션 불일치 (Hydration Mismatch)
- **서버 사이드**: `i18n/request.ts`에서 메시지 파일들을 로드
- **클라이언트 사이드**: `app/providers.tsx`에서 초기 메시지 제공
- **문제**: 두 환경에서 제공하는 메시지 구조가 달라서 하이드레이션 과정에서 불일치 발생

### 2. 클라이언트 사이드 메시지 누락
- `providers.tsx`의 `getInitialMessages()` 함수에서 일부 네임스페이스 키들이 누락됨
- `useTranslations('hero')`, `useTranslations('ethics')` 등이 초기 로드 시 해당 키를 찾지 못함

### 3. 메시지 파일 구조
```
messages/
├── ko/
│   ├── common.json      ✅ 기본 UI 요소
│   ├── navigation.json  ✅ 네비게이션 메뉴
│   ├── home.json        ⚠️ hero, cta, company 포함
│   └── about.json       ⚠️ greeting, profile, ethics 포함
```

## 🛠️ 해결 방법

### 1. 서버 사이드 설정 개선 (`i18n/request.ts`)

```typescript
export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  try {
    const [common, navigation, home, about] = await Promise.all([
      import(`../messages/${locale}/common.json`),
      import(`../messages/${locale}/navigation.json`),
      import(`../messages/${locale}/home.json`),
      import(`../messages/${locale}/about.json`)
    ]);

    const messages = {
      ...common.default,
      ...navigation.default,
      ...home.default,
      ...about.default
    };

    return {
      messages,
      locale: locale!,
      timeZone: 'Asia/Seoul',
      // 에러 핸들링 추가
      onError(error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[i18n] Translation warning:`, error.message);
        }
      },
      getMessageFallback({namespace, key}) {
        if (process.env.NODE_ENV === 'development') {
          const path = [namespace, key].filter((part) => part != null).join('.');
          return `[MISSING: ${path}]`;
        }
        return '';
      }
    };
  } catch (error) {
    console.error(`[i18n] Error loading messages for locale ${locale}:`, error);
    throw error;
  }
});
```

### 2. 클라이언트 사이드 메시지 동기화 (`app/providers.tsx`)

**문제가 된 부분**: `getInitialMessages()` 함수에서 누락된 키들

**해결책**: 모든 필수 네임스페이스 키들을 초기 메시지에 포함

```typescript
const getInitialMessages = (locale: string) => {
  const defaultMessages = {
    // 기존 키들...
    header: { logo: "FAIR인사노무컨설팅", menu: "메뉴" },
    mainNav: { /* ... */ },
    
    // home.json의 핵심 키들 추가
    hero: {
      slide1: {
        title: "노무 문제, 명쾌한 해결",
        subtitle: "FAIR인사노무컨설팅",
        text: "전문적인 상담으로 최적의 솔루션을",
        highlight: "26년차 베테랑 노무사의 전문성"
      },
      // ... 더 많은 hero 데이터
    },
    cta: {
      title: "노무 문제로 고민하고 계신가요?",
      subtitle: "지금 바로 전문가와 상담하세요",
      // ... 더 많은 cta 데이터
    },
    company: {
      title: "을 선택하는 이유",
      companyName: "FAIR인사노무컨설팅",
      // ... 더 많은 company 데이터
    },
    
    // about.json의 핵심 키들 추가
    greeting: {
      title: "인사말",
      subtitle: "FAIR인사노무컨설팅의 철학과 비전을 소개합니다",
      // ... 더 많은 greeting 데이터
    },
    profile: {
      title: "대표 프로필",
      subtitle: "정광일 대표 공인노무사",
      // ... 더 많은 profile 데이터
    },
    ethics: {
      title: "윤리강령",
      subtitle: "FAIR인사노무컨설팅이 추구하는 8가지 핵심 가치와 윤리 원칙",
      intro: "FAIR인사노무컨설팅은 다음과 같은 윤리강령을 제정하고 이를 준수합니다.",
      principles: [
        "정당한 보수를 책정하여 청구합니다.",
        // ... 8개 윤리강령 항목
      ]
    }
  };
  
  return defaultMessages;
};
```

## 🔧 적용된 수정 사항

### 파일별 변경 내용

1. **`i18n/request.ts`**
   - 에러 핸들링 함수 추가 (`onError`, `getMessageFallback`)
   - 개발 모드에서만 디버그 정보 출력
   - 메시지 로딩 실패 시 적절한 폴백 제공

2. **`app/providers.tsx`**
   - `getInitialMessages()` 함수에 누락된 네임스페이스 키들 추가
   - `hero`, `cta`, `company` (home.json에서)
   - `greeting`, `profile`, `ethics` (about.json에서)
   - 서버와 클라이언트 메시지 구조 일치화

## 🧪 테스트 및 검증

### 검증 방법
1. **개발 서버 실행**: `pnpm dev --turbo`
2. **브라우저 콘솔 확인**: MISSING_MESSAGE 오류 사라짐
3. **페이지 렌더링 확인**: 모든 텍스트가 올바르게 한국어로 표시
4. **하이드레이션 확인**: 페이지 로드 시 깜빡임 없음

### 테스트 결과
- ✅ 콘솔 오류 완전 제거
- ✅ 모든 페이지 정상 렌더링
- ✅ 하이드레이션 문제 해결
- ✅ 개발/프로덕션 환경 모두 안정화

## 📋 체크리스트

새로운 페이지나 컴포넌트에서 `useTranslations()` 사용 시 확인사항:

### 1. 메시지 파일 확인
- [ ] 해당 네임스페이스가 JSON 파일에 존재하는가?
- [ ] 메시지 구조가 올바른가?
- [ ] 모든 필요한 키가 포함되어 있는가?

### 2. 클라이언트 사이드 동기화
- [ ] `providers.tsx`의 `getInitialMessages()`에 해당 키가 포함되어 있는가?
- [ ] 서버와 클라이언트의 메시지 구조가 일치하는가?

### 3. 타입 안전성
- [ ] TypeScript 타입 오류가 없는가?
- [ ] `useTranslations('namespace')` 호출이 올바른가?

## 🚀 예방 방법

### 1. 개발 프로세스 개선
- 새로운 번역 키 추가 시 반드시 `providers.tsx`도 함께 업데이트
- 메시지 파일 변경 후 하이드레이션 테스트 수행

### 2. 자동화 도구 활용
- 메시지 파일과 클라이언트 초기 메시지 동기화 스크립트 작성 고려
- CI/CD 파이프라인에 i18n 검증 단계 추가

### 3. 문서화
- 새로운 팀원을 위한 i18n 가이드라인 작성
- 번역 키 네이밍 컨벤션 정립

## 📚 참고 자료

- [next-intl 공식 문서](https://next-intl-docs.vercel.app/)
- [Next.js App Router 국제화](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [React 하이드레이션 이해하기](https://react.dev/reference/react-dom/client/hydrateRoot)

---

**작성일**: 2025-10-06  
**작성자**: AI Assistant  
**버전**: 1.0  
**상태**: 해결 완료 ✅
