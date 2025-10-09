"use client";

import React, { useState } from 'react';
import PixelTrail from '@/components/PixelTrail';

export default function PixelTrailTestPage() {
  const [gridSize, setGridSize] = useState(50);
  const [trailSize, setTrailSize] = useState(0.1);
  const [maxAge, setMaxAge] = useState(250);
  const [interpolate, setInterpolate] = useState(5);
  const [color, setColor] = useState('#ffffff');
  const [gooeyStrength, setGooeyStrength] = useState(2);
  const [useGooeyFilter, setUseGooeyFilter] = useState(true);

  // 다양한 easing 함수들
  const easingFunctions = {
    linear: (x: number) => x,
    easeInQuad: (x: number) => x * x,
    easeOutQuad: (x: number) => 1 - (1 - x) * (1 - x),
    easeInOutQuad: (x: number) => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2,
    easeInCubic: (x: number) => x * x * x,
    easeOutCubic: (x: number) => 1 - Math.pow(1 - x, 3),
    easeInOutCubic: (x: number) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
  };

  const [selectedEasing, setSelectedEasing] = useState<keyof typeof easingFunctions>('linear');

  const presetColors = [
    { name: '화이트', value: '#ffffff' },
    { name: '블루', value: '#3b82f6' },
    { name: '그린', value: '#10b981' },
    { name: '퍼플', value: '#8b5cf6' },
    { name: '핑크', value: '#ec4899' },
    { name: '오렌지', value: '#f97316' },
    { name: '레드', value: '#ef4444' },
    { name: '시안', value: '#06b6d4' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 페이지 헤더 */}
      <div className="relative z-10 p-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            PixelTrail 컴포넌트 테스트
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Three.js와 React Three Fiber 기반의 픽셀 트레일 효과를 체험해보세요. 
            마우스를 움직여서 인터랙티브한 픽셀 애니메이션을 확인하세요!
          </p>
        </div>

        {/* 컨트롤 패널 */}
        <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-lg p-6 mb-12 max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">설정 컨트롤</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Grid Size */}
            <div>
              <label className="block text-sm font-medium mb-2">
                그리드 크기: {gridSize}
              </label>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={gridSize}
                onChange={(e) => setGridSize(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-xs text-gray-400 mt-1">픽셀 밀도 조절</div>
            </div>

            {/* Trail Size */}
            <div>
              <label className="block text-sm font-medium mb-2">
                트레일 크기: {trailSize.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.01"
                max="0.5"
                step="0.01"
                value={trailSize}
                onChange={(e) => setTrailSize(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-xs text-gray-400 mt-1">트레일 두께</div>
            </div>

            {/* Max Age */}
            <div>
              <label className="block text-sm font-medium mb-2">
                지속 시간: {maxAge}ms
              </label>
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={maxAge}
                onChange={(e) => setMaxAge(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-xs text-gray-400 mt-1">트레일 지속 시간</div>
            </div>

            {/* Interpolate */}
            <div>
              <label className="block text-sm font-medium mb-2">
                보간 강도: {interpolate}
              </label>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={interpolate}
                onChange={(e) => setInterpolate(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-xs text-gray-400 mt-1">부드러움 정도</div>
            </div>

            {/* Gooey Strength */}
            <div>
              <label className="block text-sm font-medium mb-2">
                구이 필터 강도: {gooeyStrength}
              </label>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={gooeyStrength}
                onChange={(e) => setGooeyStrength(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                disabled={!useGooeyFilter}
              />
              <div className="text-xs text-gray-400 mt-1">블러 효과 강도</div>
            </div>

            {/* Gooey Filter Toggle */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="gooeyFilter"
                checked={useGooeyFilter}
                onChange={(e) => setUseGooeyFilter(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded mr-3"
              />
              <label htmlFor="gooeyFilter" className="text-sm font-medium">
                구이 필터 사용
              </label>
            </div>
          </div>

          {/* Color Presets */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-3">색상 선택</label>
            <div className="flex flex-wrap gap-3">
              {presetColors.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setColor(preset.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    color === preset.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  style={{ 
                    borderLeft: `4px solid ${preset.value}`,
                  }}
                >
                  {preset.name}
                </button>
              ))}
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-12 h-10 rounded cursor-pointer bg-transparent"
              />
            </div>
          </div>

          {/* Easing Functions */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-3">이징 함수</label>
            <select
              value={selectedEasing}
              onChange={(e) => setSelectedEasing(e.target.value as keyof typeof easingFunctions)}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              {Object.keys(easingFunctions).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 메인 PixelTrail 데모 */}
      <div style={{ height: '600px', position: 'relative', overflow: 'hidden' }} className="border-t border-gray-800">
        <PixelTrail
          gridSize={gridSize}
          trailSize={trailSize}
          maxAge={maxAge}
          interpolate={interpolate}
          color={color}
          easingFunction={easingFunctions[selectedEasing]}
          gooeyFilter={useGooeyFilter ? { id: "main-goo-filter", strength: gooeyStrength } : undefined}
        />
        
        {/* 오버레이 텍스트 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-2 opacity-20">마우스를 움직여보세요</h3>
            <p className="text-lg opacity-15">인터랙티브 픽셀 트레일 효과</p>
          </div>
        </div>
      </div>

      {/* 다양한 프리셋 데모들 */}
      <div className="p-8">
        <h2 className="text-3xl font-semibold mb-8 text-center">다양한 프리셋 데모</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* 파인 그리드 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold">파인 그리드</h3>
              <p className="text-sm text-gray-400">높은 해상도, 세밀한 픽셀</p>
            </div>
            <div style={{ height: '300px', position: 'relative', overflow: 'hidden' }}>
              <PixelTrail
                gridSize={80}
                trailSize={0.05}
                maxAge={200}
                interpolate={3}
                color="#3b82f6"
                gooeyFilter={{ id: "fine-goo-filter", strength: 1 }}
              />
            </div>
          </div>

          {/* 큰 픽셀 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold">큰 픽셀</h3>
              <p className="text-sm text-gray-400">레트로 스타일, 굵은 트레일</p>
            </div>
            <div style={{ height: '300px', position: 'relative', overflow: 'hidden' }}>
              <PixelTrail
                gridSize={20}
                trailSize={0.3}
                maxAge={400}
                interpolate={8}
                color="#10b981"
                easingFunction={easingFunctions.easeOutCubic}
                gooeyFilter={{ id: "big-goo-filter", strength: 4 }}
              />
            </div>
          </div>

          {/* 빠른 페이드 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold">빠른 페이드</h3>
              <p className="text-sm text-gray-400">짧은 지속시간, 빠른 사라짐</p>
            </div>
            <div style={{ height: '300px', position: 'relative', overflow: 'hidden' }}>
              <PixelTrail
                gridSize={40}
                trailSize={0.15}
                maxAge={100}
                interpolate={15}
                color="#ec4899"
                easingFunction={easingFunctions.easeInOutQuad}
                gooeyFilter={{ id: "fast-goo-filter", strength: 3 }}
              />
            </div>
          </div>

          {/* 긴 트레일 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold">긴 트레일</h3>
              <p className="text-sm text-gray-400">오래 지속되는 트레일</p>
            </div>
            <div style={{ height: '300px', position: 'relative', overflow: 'hidden' }}>
              <PixelTrail
                gridSize={35}
                trailSize={0.2}
                maxAge={800}
                interpolate={2}
                color="#f97316"
                easingFunction={easingFunctions.easeOutQuad}
                gooeyFilter={{ id: "long-goo-filter", strength: 2.5 }}
              />
            </div>
          </div>

          {/* 노 필터 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold">필터 없음</h3>
              <p className="text-sm text-gray-400">순수한 픽셀 효과</p>
            </div>
            <div style={{ height: '300px', position: 'relative', overflow: 'hidden' }}>
              <PixelTrail
                gridSize={45}
                trailSize={0.12}
                maxAge={300}
                interpolate={6}
                color="#8b5cf6"
                easingFunction={easingFunctions.linear}
              />
            </div>
          </div>

          {/* 강한 구이 효과 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold">강한 구이 효과</h3>
              <p className="text-sm text-gray-400">높은 블러 강도</p>
            </div>
            <div style={{ height: '300px', position: 'relative', overflow: 'hidden' }}>
              <PixelTrail
                gridSize={30}
                trailSize={0.25}
                maxAge={350}
                interpolate={10}
                color="#06b6d4"
                easingFunction={easingFunctions.easeInOutCubic}
                gooeyFilter={{ id: "strong-goo-filter", strength: 8 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 사용법 가이드 */}
      <div className="p-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center">사용법 가이드</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-4">기본 사용법</h3>
              <div className="bg-black rounded p-4 text-sm">
                <pre className="text-green-400 overflow-x-auto">{`import PixelTrail from '@/components/PixelTrail';

export default function App() {
  return (
    <div style={{ 
      height: '500px', 
      position: 'relative', 
      overflow: 'hidden'
    }}>
      <PixelTrail
        gridSize={50}
        trailSize={0.1}
        maxAge={250}
        interpolate={5}
        color="#fff"
        gooeyFilter={{ 
          id: "custom-goo-filter", 
          strength: 2 
        }}
      />
    </div>
  );
}`}</pre>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-4">Props 설명</h3>
              <div className="space-y-3 text-sm">
                <div className="border-l-4 border-blue-500 pl-4">
                  <strong>gridSize</strong>: number (기본값: 40)<br/>
                  <span className="text-gray-300">픽셀 그리드의 밀도</span>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <strong>trailSize</strong>: number (기본값: 0.1)<br/>
                  <span className="text-gray-300">트레일의 두께</span>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <strong>maxAge</strong>: number (기본값: 250)<br/>
                  <span className="text-gray-300">트레일 지속 시간(ms)</span>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <strong>interpolate</strong>: number (기본값: 5)<br/>
                  <span className="text-gray-300">보간 강도 (부드러움)</span>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <strong>color</strong>: string (기본값: '#ffffff')<br/>
                  <span className="text-gray-300">픽셀 색상</span>
                </div>
                <div className="border-l-4 border-cyan-500 pl-4">
                  <strong>gooeyFilter</strong>: object (선택사항)<br/>
                  <span className="text-gray-300">구이 필터 설정</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-blue-900 bg-opacity-30 rounded-lg border border-blue-500">
            <h4 className="font-semibold mb-2">💡 사용 팁</h4>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>• 컨테이너에 <code className="bg-gray-700 px-2 py-1 rounded">position: relative</code>와 <code className="bg-gray-700 px-2 py-1 rounded">overflow: hidden</code> 설정 필요</li>
              <li>• Three.js와 React Three Fiber 기반으로 WebGL 지원 브라우저에서 작동</li>
              <li>• 구이 필터는 SVG 필터를 사용하여 부드러운 블러 효과 제공</li>
              <li>• 다양한 이징 함수로 트레일 애니메이션 커스터마이징 가능</li>
              <li>• 성능 최적화를 위해 <code className="bg-gray-700 px-2 py-1 rounded">powerPreference: 'high-performance'</code> 설정</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
