"use client";

import React from 'react';
import LogoLoop, { LogoItem } from '@/components/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiVercel, SiSupabase, SiPrisma } from 'react-icons/si';

// 기술 스택 로고 (React Icons 사용) - LogoItem 타입 명시
const techLogos: LogoItem[] = [
  { node: <SiReact className="text-blue-500" />, title: "React", href: "https://react.dev", ariaLabel: "React 공식 사이트" },
  { node: <SiNextdotjs className="text-black" />, title: "Next.js", href: "https://nextjs.org", ariaLabel: "Next.js 공식 사이트" },
  { node: <SiTypescript className="text-blue-600" />, title: "TypeScript", href: "https://www.typescriptlang.org", ariaLabel: "TypeScript 공식 사이트" },
  { node: <SiTailwindcss className="text-cyan-500" />, title: "Tailwind CSS", href: "https://tailwindcss.com", ariaLabel: "Tailwind CSS 공식 사이트" },
  { node: <SiNodedotjs className="text-green-600" />, title: "Node.js", href: "https://nodejs.org", ariaLabel: "Node.js 공식 사이트" },
  { node: <SiVercel className="text-black" />, title: "Vercel", href: "https://vercel.com", ariaLabel: "Vercel 공식 사이트" },
  { node: <SiSupabase className="text-green-500" />, title: "Supabase", href: "https://supabase.com", ariaLabel: "Supabase 공식 사이트" },
  { node: <SiPrisma className="text-indigo-600" />, title: "Prisma", href: "https://prisma.io", ariaLabel: "Prisma 공식 사이트" },
];

// 이미지 로고 (기존 로고 파일 사용) - LogoItem 타입 명시
const imageLogos: LogoItem[] = [
  { 
    src: "/로고/DHLEXPRESS.jpg", 
    alt: "DHL Express", 
    href: "https://www.dhl.com",
    title: "DHL Express",
    width: 120,
    height: 40
  },
  { 
    src: "/로고/GE.svg", 
    alt: "General Electric", 
    href: "https://www.ge.com",
    title: "General Electric",
    width: 80,
    height: 40
  },
  { 
    src: "/로고/GSK.jpg", 
    alt: "GSK", 
    href: "https://www.gsk.com",
    title: "GSK",
    width: 100,
    height: 40
  },
  { 
    src: "/로고/GUCCI.png", 
    alt: "Gucci", 
    href: "https://www.gucci.com",
    title: "Gucci",
    width: 120,
    height: 40
  },
  { 
    src: "/로고/마이크로소프트.png", 
    alt: "Microsoft", 
    href: "https://www.microsoft.com",
    title: "Microsoft",
    width: 120,
    height: 40
  },
  { 
    src: "/로고/씨티뱅크.jpg", 
    alt: "씨티뱅크", 
    href: "https://www.citibank.co.kr",
    title: "씨티뱅크",
    width: 120,
    height: 40
  },
];

export default function LogoLoopTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 페이지 헤더 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            LogoLoop 컴포넌트 테스트
          </h1>
          <p className="text-xl text-gray-600">
            React Icons와 이미지를 활용한 로고 루프 애니메이션
          </p>
        </div>

        {/* 기술 스택 로고 루프 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">기술 스택 로고</h2>
          <div style={{ height: '120px', position: 'relative', overflow: 'hidden' }} className="bg-white rounded-lg shadow-sm">
            <LogoLoop
              logos={techLogos}
              speed={120}
              direction="left"
              logoHeight={48}
              gap={40}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#ffffff"
              ariaLabel="Technology partners"
            />
          </div>
        </section>

        {/* 회사 로고 루프 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">파트너사 로고</h2>
          <div style={{ height: '100px', position: 'relative', overflow: 'hidden' }} className="bg-white rounded-lg shadow-sm">
            <LogoLoop
              logos={imageLogos}
              speed={80}
              direction="right"
              logoHeight={40}
              gap={50}
              pauseOnHover
              fadeOut
              fadeOutColor="#ffffff"
              ariaLabel="Partner companies"
            />
          </div>
        </section>

        {/* 다크 테마 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">다크 테마</h2>
          <div style={{ height: '120px', position: 'relative', overflow: 'hidden' }} className="bg-gray-900 rounded-lg shadow-sm">
            <LogoLoop
              logos={techLogos.map(logo => {
                // node 타입인 경우에만 처리
                if ('node' in logo) {
                  return {
                    ...logo,
                    node: React.cloneElement(logo.node as React.ReactElement, {
                      className: "text-white"
                    })
                  };
                }
                return logo;
              })}
              speed={100}
              direction="left"
              logoHeight={48}
              gap={45}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#111827"
              ariaLabel="Technology stack (dark theme)"
            />
          </div>
        </section>

        {/* 빠른 속도 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">빠른 속도</h2>
          <div style={{ height: '100px', position: 'relative', overflow: 'hidden' }} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm">
            <LogoLoop
              logos={imageLogos}
              speed={200}
              direction="left"
              logoHeight={35}
              gap={35}
              pauseOnHover={false}
              scaleOnHover
              ariaLabel="Fast moving logos"
            />
          </div>
        </section>

        {/* 커스텀 스타일링 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">커스텀 스타일링</h2>
          <div style={{ height: '100px', position: 'relative', overflow: 'hidden' }} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg shadow-sm border-2 border-purple-200">
            <LogoLoop
              logos={imageLogos}
              speed={60}
              direction="right"
              logoHeight={32}
              gap={60}
              pauseOnHover
              scaleOnHover
              className="custom-logo-loop"
              style={{ padding: '20px 0' }}
              width="100%"
              ariaLabel="Styled partner logos"
            />
          </div>
        </section>

        {/* 모든 옵션 활용 */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">모든 옵션 활용</h2>
          <div style={{ height: '140px', position: 'relative', overflow: 'hidden' }} className="bg-white rounded-lg shadow-lg border">
            <LogoLoop
              logos={techLogos}
              speed={150}
              direction="left"
              logoHeight={56}
              gap={50}
              pauseOnHover={true}
              fadeOut={true}
              fadeOutColor="#ffffff"
              scaleOnHover={true}
              ariaLabel="Complete feature demonstration"
              className="border-t-4 border-blue-500"
              style={{ 
                background: 'linear-gradient(90deg, #f8fafc 0%, #e2e8f0 50%, #f8fafc 100%)',
                padding: '30px 0'
              }}
              width="100%"
            />
          </div>
        </section>

        {/* 사용법 가이드 */}
        <section className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">사용법 및 Props</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* 기본 사용법 */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">기본 사용법</h3>
              <div className="bg-gray-100 rounded-lg p-4">
                <pre className="text-sm text-gray-800 overflow-x-auto">
{`import LogoLoop, { LogoItem } from '@/components/LogoLoop';
import { SiReact, SiNextdotjs } from 'react-icons/si';

const techLogos: LogoItem[] = [
  { 
    node: <SiReact />, 
    title: "React", 
    href: "https://react.dev",
    ariaLabel: "React 공식 사이트"
  },
  { 
    node: <SiNextdotjs />, 
    title: "Next.js", 
    href: "https://nextjs.org" 
  },
];

function App() {
  return (
    <div style={{ 
      height: '200px', 
      position: 'relative', 
      overflow: 'hidden'
    }}>
      <LogoLoop
        logos={techLogos}
        speed={120}
        direction="left"
        logoHeight={48}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Technology partners"
      />
    </div>
  );
}`}
                </pre>
              </div>
            </div>

            {/* Props 설명 */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">주요 Props</h3>
              <div className="space-y-3 text-sm">
                <div className="border-l-4 border-blue-500 pl-4">
                  <strong>logos</strong>: LogoItem[] - 표시할 로고 배열
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <strong>speed</strong>: number (기본값: 120) - 애니메이션 속도
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <strong>direction</strong>: 'left' | 'right' (기본값: 'left') - 스크롤 방향
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <strong>logoHeight</strong>: number (기본값: 28) - 로고 높이 (px)
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <strong>gap</strong>: number (기본값: 32) - 로고 간 간격 (px)
                </div>
                <div className="border-l-4 border-cyan-500 pl-4">
                  <strong>pauseOnHover</strong>: boolean (기본값: true) - 호버 시 일시정지
                </div>
                <div className="border-l-4 border-pink-500 pl-4">
                  <strong>fadeOut</strong>: boolean (기본값: false) - 양쪽 끝 페이드 효과
                </div>
                <div className="border-l-4 border-indigo-500 pl-4">
                  <strong>scaleOnHover</strong>: boolean (기본값: false) - 호버 시 확대 효과
                </div>
              </div>
            </div>
          </div>

          {/* LogoItem 타입 설명 */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">LogoItem 타입</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-600 mb-2">React Node 타입</h4>
                <div className="bg-gray-100 rounded p-3 text-sm">
                  <pre>{`{
  node: React.ReactNode;
  href?: string;
  title?: string;
  ariaLabel?: string;
}`}</pre>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-600 mb-2">이미지 타입</h4>
                <div className="bg-gray-100 rounded p-3 text-sm">
                  <pre>{`{
  src: string;
  alt?: string;
  href?: string;
  title?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
}`}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
