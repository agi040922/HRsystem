import { getRequestConfig } from 'next-intl/server';

// 지원하는 언어 목록
export const locales = ['ko', 'en', 'ja'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // 지원하지 않는 언어인 경우 기본 언어(ko)로 폴백
  const validLocale: string = locales.includes(locale as any) ? locale! : 'ko';

  try {
    // 모듈화된 번역 파일들을 동적으로 로드하고 통합
    const [common, navigation, home, about, services, board, qna, contact, fairCrm, ax] = await Promise.all([
      import(`../messages/${validLocale}/common.json`),
      import(`../messages/${validLocale}/navigation.json`),
      import(`../messages/${validLocale}/home.json`),
      import(`../messages/${validLocale}/about.json`),
      import(`../messages/${validLocale}/services.json`),
      import(`../messages/${validLocale}/board.json`),
      import(`../messages/${validLocale}/qna.json`),
      import(`../messages/${validLocale}/contact.json`),
      import(`../messages/${validLocale}/fairCrm.json`),
      import(`../messages/${validLocale}/ax.json`)
    ]);

    // MCP 문서에 따른 단순 스프레드 병합 사용
    // about처럼 중첩된 구조를 가진 파일들은 직접 병합
    // services, board, qna, contact는 네임스페이스로 감싸서 병합
    const messages = {
      ...common.default,
      ...navigation.default,
      ...home.default,
      ...about.default,  // about은 이미 greeting, profile, ethics를 포함
      services: services.default,  // services 네임스페이스로 감싸기
      board: board.default,        // board 네임스페이스로 감싸기
      qna: qna.default,           // qna 네임스페이스로 감싸기
      contact: contact.default,    // contact 네임스페이스로 감싸기
      fairCrm: fairCrm.default,    // fairCrm 네임스페이스로 감싸기
      ax: ax.default               // ax 네임스페이스로 감싸기
    };

    // 디버깅: 메시지 구조 확인
    if (process.env.NODE_ENV === 'development') {
      console.log(`[i18n] Loaded messages for ${validLocale}:`, {
        totalKeys: Object.keys(messages).length,
        hasHero: 'hero' in messages,
        hasCta: 'cta' in messages,
        hasCompany: 'company' in messages,
        homeKeys: Object.keys(home.default),
        allKeys: Object.keys(messages)
      });
    }

    return {
      messages,
      locale: validLocale,
      timeZone: 'Asia/Seoul',
      // 에러 핸들링 추가
      onError(error) {
        // 개발 모드에서만 로그 출력
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[i18n] Translation warning:`, error.message);
        }
      },
      getMessageFallback({namespace, key}) {
        // 키가 누락된 경우 기본값 반환 (개발 모드에서만 키 표시)
        if (process.env.NODE_ENV === 'development') {
          const path = [namespace, key].filter((part) => part != null).join('.');
          return `[MISSING: ${path}]`;
        }
        return '';
      }
    };
  } catch (error) {
    console.error(`[i18n] Error loading messages for locale ${validLocale}:`, error);
    throw error;
  }
});
