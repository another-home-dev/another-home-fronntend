import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useThemeStore } from "@shared/store/useThemeStore";
import { CHART_THEME } from "@features/dashboard/presentation/components/chartTheme";

const COLORS = {
  Occupied: "#1d4ed8",
  Available: "#10b981",
  "Under Maintenance": "#f59e0b",
};

export default function OccupancyChart({ data }) {
  const theme = useThemeStore((state) => state.theme);
  const t = CHART_THEME[theme];

  return (
    <ResponsiveContainer width="100%" height={280} minWidth={0}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="45%"
          innerRadius="55%"
          outerRadius="80%"
          paddingAngle={2}
          cornerRadius={4}
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={COLORS[entry.name] ?? "#94a3b8"} stroke={t.cellStroke} strokeWidth={2} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [`${value} beds`, name]}
          contentStyle={{ borderRadius: 12, border: `1px solid ${t.tooltipBorder}`, fontSize: 13, background: t.tooltipBg, color: t.tooltipText }}
          labelStyle={{ color: t.tooltipText }}
        />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 13, color: t.legendText }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
