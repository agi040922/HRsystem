"use client";

import React, { useState } from 'react';
import TargetCursor from '@/components/TargetCursor';

export default function TargetCursorDemo() {
  const [spinDuration, setSpinDuration] = useState(2);
  const [hideDefaultCursor, setHideDefaultCursor] = useState(true);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <TargetCursor 
        spinDuration={spinDuration}
        hideDefaultCursor={hideDefaultCursor}
        targetSelector=".cursor-target"
      />
      
      {/* 페이지 헤더 */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 cursor-target">
          TargetCursor 컴포넌트 테스트
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          GSAP 기반의 인터랙티브 커서 효과를 체험해보세요. 
          <span className="cursor-target text-blue-400 font-semibold">hover 가능한 요소들</span>에 
          마우스를 올려보세요!
        </p>
      </div>

      {/* 컨트롤 패널 */}
      <div className="bg-gray-800 rounded-lg p-6 mb-12 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 cursor-target">설정 컨트롤</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              회전 속도: {spinDuration}초
            </label>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.1"
              value={spinDuration}
              onChange={(e) => setSpinDuration(parseFloat(e.target.value))}
              className="cursor-target w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hideDefault"
              checked={hideDefaultCursor}
              onChange={(e) => setHideDefaultCursor(e.target.checked)}
              className="cursor-target w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
            />
            <label htmlFor="hideDefault" className="ml-2 text-sm font-medium cursor-target">
              기본 커서 숨기기
            </label>
          </div>
        </div>
      </div>

      {/* 다양한 타겟 요소들 */}
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* 버튼 섹션 */}
        <section>
          <h2 className="text-3xl font-semibold mb-8 cursor-target">버튼 요소들</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <button className="cursor-target bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold transition-colors">
              Primary Button
            </button>
            <button className="cursor-target bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg font-semibold transition-colors">
              Success Button
            </button>
            <button className="cursor-target bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg font-semibold transition-colors">
              Danger Button
            </button>
          </div>
        </section>

        {/* 카드 섹션 */}
        <section>
          <h2 className="text-3xl font-semibold mb-8 cursor-target">카드 요소들</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="cursor-target bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                <h3 className="text-xl font-semibold mb-3">카드 {num}</h3>
                <p className="text-gray-300 mb-4">
                  이 카드에 마우스를 올려보세요. 커서가 카드 경계에 맞춰 변형됩니다.
                </p>
                <span className="cursor-target inline-block bg-purple-600 px-4 py-2 rounded text-sm font-medium">
                  중첩된 타겟
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 텍스트 섹션 */}
        <section>
          <h2 className="text-3xl font-semibold mb-8 cursor-target">텍스트 요소들</h2>
          <div className="space-y-6">
            <p className="cursor-target text-lg leading-relaxed bg-gray-800 p-6 rounded-lg">
              이것은 <span className="cursor-target text-yellow-400 font-semibold">중첩된 타겟이 있는</span> 
              긴 텍스트 단락입니다. 전체 단락과 하이라이트된 부분 모두 커서 타겟입니다.
            </p>
            
            <blockquote className="cursor-target border-l-4 border-blue-500 pl-6 py-4 bg-gray-800 rounded-r-lg">
              <p className="text-lg italic">
                "훌륭한 디자인은 보이지 않는다. 그것은 단지 작동할 뿐이다."
              </p>
              <cite className="cursor-target block mt-2 text-blue-400 font-medium">- 디터 람스</cite>
            </blockquote>
          </div>
        </section>

        {/* 이미지/미디어 섹션 */}
        <section>
          <h2 className="text-3xl font-semibold mb-8 cursor-target">이미지 및 미디어</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="cursor-target bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-8 text-center">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">그래디언트 카드</h3>
              <p className="text-gray-200">아름다운 그래디언트 배경</p>
            </div>
            
            <div className="cursor-target bg-gray-800 rounded-lg p-8 text-center border-2 border-dashed border-gray-600">
              <div className="w-32 h-32 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">📷</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">이미지 플레이스홀더</h3>
              <p className="text-gray-300">이미지가 들어갈 자리</p>
            </div>
          </div>
        </section>

        {/* 폼 요소들 */}
        <section>
          <h2 className="text-3xl font-semibold mb-8 cursor-target">폼 요소들</h2>
          <div className="bg-gray-800 rounded-lg p-8 max-w-2xl mx-auto">
            <div className="space-y-6">
              <div>
                <label className="cursor-target block text-sm font-medium mb-2">이름</label>
                <input 
                  type="text" 
                  className="cursor-target w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="이름을 입력하세요"
                />
              </div>
              
              <div>
                <label className="cursor-target block text-sm font-medium mb-2">메시지</label>
                <textarea 
                  className="cursor-target w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none h-32 resize-none"
                  placeholder="메시지를 입력하세요"
                ></textarea>
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="cursor-target flex items-center">
                  <input type="checkbox" className="cursor-target mr-2" />
                  동의합니다
                </label>
                
                <label className="cursor-target flex items-center">
                  <input type="radio" name="option" className="cursor-target mr-2" />
                  옵션 1
                </label>
                
                <label className="cursor-target flex items-center">
                  <input type="radio" name="option" className="cursor-target mr-2" />
                  옵션 2
                </label>
              </div>
              
              <button className="cursor-target w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                제출하기
              </button>
            </div>
          </div>
        </section>

        {/* 사용법 가이드 */}
        <section className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-6 cursor-target">사용법 가이드</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-4 cursor-target">기본 사용법</h3>
              <div className="bg-gray-900 rounded p-4 text-sm">
                <pre className="text-green-400 overflow-x-auto">{`import TargetCursor from '@/components/TargetCursor';

export default function App() {
  return (
    <div>
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
        targetSelector=".cursor-target"
      />
      
      <h1 className="cursor-target">제목</h1>
      <button className="cursor-target">버튼</button>
    </div>
  );
}`}</pre>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-4 cursor-target">Props 설명</h3>
              <div className="space-y-3 text-sm">
                <div className="border-l-4 border-blue-500 pl-4">
                  <strong>targetSelector</strong>: string (기본값: '.cursor-target')<br/>
                  <span className="text-gray-300">타겟 요소를 선택하는 CSS 셀렉터</span>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <strong>spinDuration</strong>: number (기본값: 2)<br/>
                  <span className="text-gray-300">커서 회전 애니메이션 지속시간(초)</span>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <strong>hideDefaultCursor</strong>: boolean (기본값: true)<br/>
                  <span className="text-gray-300">기본 브라우저 커서 숨김 여부</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-blue-900 bg-opacity-30 rounded-lg border border-blue-500">
            <h4 className="font-semibold mb-2 cursor-target">💡 사용 팁</h4>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>• 타겟 요소에 <code className="cursor-target bg-gray-700 px-2 py-1 rounded">cursor-target</code> 클래스를 추가하세요</li>
              <li>• 중첩된 타겟 요소들도 지원됩니다</li>
              <li>• 스크롤 시에도 정확한 타겟 감지가 가능합니다</li>
              <li>• 마우스 클릭 시 커서 크기가 변화합니다</li>
              <li>• <code className="cursor-target bg-gray-700 px-2 py-1 rounded">mix-blend-difference</code>로 다양한 배경에서 시각적 효과</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
