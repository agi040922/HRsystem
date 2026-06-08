"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { useTranslations } from "next-intl"

// 진단 → 근태관리 → 휴가관리 → 임금관리 → 성과관리 → 안전관리 (시계방향 순서대로)
const COLORS = ["#1d4ed8", "#2563eb", "#3b82f6", "#0ea5e9", "#6366f1", "#8b5cf6"]

const RADIAN = Math.PI / 180

// 각 조각 바깥쪽에 서비스 이름 표시
function renderLabel(props: any) {
  const { cx, cy, midAngle, outerRadius, name } = props
  const r = outerRadius + 22
  const x = cx + r * Math.cos(-midAngle * RADIAN)
  const y = cy + r * Math.sin(-midAngle * RADIAN)
  return (
    <text
      x={x}
      y={y}
      fill="#334155"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      style={{ fontSize: "13px", fontWeight: 600 }}
    >
      {name}
    </text>
  )
}

export default function CrmDonut() {
  const t = useTranslations("fairCrm")
  const items = t.raw("chart.items") as string[]
  const data = items.map((name, i) => ({
    name,
    value: 1,
    color: COLORS[i % COLORS.length],
  }))

  return (
    <div className="relative mx-auto w-[340px] sm:w-[400px] h-[280px] sm:h-[340px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="52%"
            outerRadius="74%"
            paddingAngle={2}
            startAngle={90}
            endAngle={-270}
            labelLine={false}
            label={renderLabel}
            stroke="#ffffff"
            strokeWidth={2}
          >
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* 가운데 중심 라벨 */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg sm:text-xl font-bold text-gray-900">{t("chart.center")}</span>
        <span className="text-[11px] sm:text-xs text-muted-foreground">{t("chart.centerSub")}</span>
      </div>
    </div>
  )
}
