'use client';

import { useTranslations } from 'next-intl';

// 메시지 키 테스트 함수
function TestMessageKey({ keyPath, label }: { keyPath: string; label: string }) {
  const t = useTranslations();
  
  try {
    const value = t(keyPath);
    return (
      <div className="p-4 border rounded-lg bg-green-50 border-green-200">
        <div className="font-mono text-sm text-green-800">{keyPath}</div>
        <div className="text-gray-700">{label}</div>
        <div className="font-semibold text-green-900">{value}</div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4 border rounded-lg bg-red-50 border-red-200">
        <div className="font-mono text-sm text-red-800">{keyPath}</div>
        <div className="text-gray-700">{label}</div>
        <div className="font-semibold text-red-900">❌ 오류: {error instanceof Error ? error.message : '키를 찾을 수 없음'}</div>
      </div>
    );
  }
}

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">메시지 키 테스트 페이지</h1>
        
        <div className="grid gap-4 md:grid-cols-2">
          {/* Home 키들 테스트 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Home 메시지 키들</h2>
            <TestMessageKey keyPath="hero.slide1.title" label="히어로 슬라이드 1 제목" />
            <TestMessageKey keyPath="cta.title" label="CTA 제목" />
            <TestMessageKey keyPath="company.title" label="회사 제목" />
            <TestMessageKey keyPath="services.title" label="서비스 제목" />
          </div>

          {/* About 키들 테스트 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">About 메시지 키들</h2>
            <TestMessageKey keyPath="greeting.title" label="인사말 제목" />
            <TestMessageKey keyPath="ethics.title" label="윤리강령 제목" />
            <TestMessageKey keyPath="profile.title" label="프로필 제목" />
            <TestMessageKey keyPath="location.title" label="위치 제목" />
          </div>

          {/* 네임스페이스 테스트 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">네임스페이스 테스트</h2>
            <TestMessageKey keyPath="about.greeting.title" label="about.greeting.title" />
            <TestMessageKey keyPath="about.ethics.title" label="about.ethics.title" />
            <TestMessageKey keyPath="about.profile.title" label="about.profile.title" />
            <TestMessageKey keyPath="about.location.title" label="about.location.title" />
          </div>

          {/* 공통 키들 테스트 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">공통 메시지 키들</h2>
            <TestMessageKey keyPath="common.loading" label="로딩 메시지" />
            <TestMessageKey keyPath="navigation.home" label="네비게이션 홈" />
            <TestMessageKey keyPath="navigation.about" label="네비게이션 소개" />
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">테스트 결과 해석</h3>
          <ul className="text-blue-800 space-y-1">
            <li>• 🟢 초록색: 키가 정상적으로 작동함</li>
            <li>• 🔴 빨간색: 키를 찾을 수 없음 (MISSING_MESSAGE 오류)</li>
            <li>• 이 결과를 통해 어떤 키 구조가 실제로 작동하는지 확인할 수 있습니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
