"use client"

import { useState } from "react"

// 통상임금·평균임금 간이 계산 (참고용). 저장 없음 — 클라이언트 계산만.
function won(n: number) {
  if (!isFinite(n)) return "-"
  return Math.round(n).toLocaleString("ko-KR") + "원"
}

export default function OrdinaryWageCalc() {
  const [monthlyOrdinary, setMonthlyOrdinary] = useState("") // 월 통상임금(기본급+통상임금 수당)
  const [monthlyHours, setMonthlyHours] = useState("209") // 월 소정근로시간
  const [dailyHours, setDailyHours] = useState("8") // 1일 소정근로시간
  const [threeMonthWage, setThreeMonthWage] = useState("") // 최근 3개월 임금총액
  const [threeMonthDays, setThreeMonthDays] = useState("91") // 3개월 총일수
  const [done, setDone] = useState(false)

  const mo = Number(monthlyOrdinary) || 0
  const mh = Number(monthlyHours) || 0
  const dh = Number(dailyHours) || 0
  const tmw = Number(threeMonthWage) || 0
  const tmd = Number(threeMonthDays) || 0

  const hourly = mh > 0 ? mo / mh : NaN // 통상시급
  const dailyOrdinary = hourly * dh // 통상일급(1일 소정근로시간분)
  const avgDaily = tmd > 0 ? tmw / tmd : NaN // 평균임금(1일)
  const higher = Math.max(dailyOrdinary || 0, avgDaily || 0)
  const canCalc = mo > 0 && mh > 0

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-gray-800">월 통상임금 (기본급 + 통상임금 수당)</span>
          <input
            type="number"
            inputMode="numeric"
            value={monthlyOrdinary}
            onChange={(e) => setMonthlyOrdinary(e.target.value)}
            placeholder="예: 2,300,000"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-800">월 소정근로시간</span>
          <input
            type="number"
            inputMode="numeric"
            value={monthlyHours}
            onChange={(e) => setMonthlyHours(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
          <span className="mt-1 block text-xs text-gray-400">주 40시간·유급주휴 포함 시 통상 209시간</span>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-800">1일 소정근로시간</span>
          <input
            type="number"
            inputMode="numeric"
            value={dailyHours}
            onChange={(e) => setDailyHours(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </label>
        <div className="hidden sm:block" />
        <label className="block">
          <span className="text-sm font-medium text-gray-800">최근 3개월 임금총액 (평균임금용)</span>
          <input
            type="number"
            inputMode="numeric"
            value={threeMonthWage}
            onChange={(e) => setThreeMonthWage(e.target.value)}
            placeholder="예: 8,400,000"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
          <span className="mt-1 block text-xs text-gray-400">상여·수당 포함(퇴직금 산정 대상 임금)</span>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-800">3개월 총일수</span>
          <input
            type="number"
            inputMode="numeric"
            value={threeMonthDays}
            onChange={(e) => setThreeMonthDays(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
          <span className="mt-1 block text-xs text-gray-400">사유 발생일 이전 3개월의 달력상 총일수(예: 89~92)</span>
        </label>
      </div>

      <button
        type="button"
        onClick={() => setDone(true)}
        disabled={!canCalc}
        className={`mt-5 w-full rounded-md px-5 py-3 text-sm font-bold transition-colors ${
          canCalc ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-gray-100 text-gray-400"
        }`}
      >
        간이 계산하기
      </button>

      {done && canCalc && (
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs text-gray-500">통상임금 시급</p>
            <p className="mt-1 text-lg font-bold text-gray-900">{won(hourly)}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs text-gray-500">통상임금 1일분 ({dh || 0}시간)</p>
            <p className="mt-1 text-lg font-bold text-gray-900">{won(dailyOrdinary)}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs text-gray-500">평균임금 (1일)</p>
            <p className="mt-1 text-lg font-bold text-gray-900">{tmd > 0 ? won(avgDaily) : "입력 필요"}</p>
          </div>
          {tmd > 0 && isFinite(avgDaily) && (
            <div className="sm:col-span-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm leading-relaxed text-gray-700">
              퇴직금·휴업수당 등은 <b>평균임금</b>과 <b>통상임금(1일분)</b> 중 <b>큰 금액</b>을 기준으로 산정합니다.
              현재 입력 기준으로는 <b>{avgDaily >= dailyOrdinary ? "평균임금" : "통상임금 1일분"}</b>({won(higher)})이 더 큽니다.
            </div>
          )}
        </div>
      )}

      <p className="mt-4 text-xs leading-relaxed text-gray-400">
        ※ 간이 참고용 계산입니다. 수당의 통상임금 포함 여부, 평균임금 산정 제외기간 등은 사안마다 달라
        실제와 차이가 있을 수 있습니다. 정확한 진단은 FAIR인사노무컨설팅에 문의해 주세요.
      </p>
    </div>
  )
}
