import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useThemeStore } from "@shared/store/useThemeStore";
import { CHART_THEME } from "@features/dashboard/presentation/components/chartTheme";

export default function MaintenanceChart({ data }) {
  const theme = useThemeStore((state) => state.theme);
  const t = CHART_THEME[theme];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }} barGap={2}>
        <CartesianGrid vertical={false} stroke={t.grid} />
        <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fill: t.axisText, fontSize: 12 }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: t.axisText, fontSize: 12 }} width={32} allowDecimals={false} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: `1px solid ${t.tooltipBorder}`, fontSize: 13, background: t.tooltipBg, color: t.tooltipText }}
          labelStyle={{ color: t.tooltipText }}
        />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 13, color: t.legendText }} />

        <Bar dataKey="pending" name="Pending" stackId="status" fill="#f59e0b" radius={[0, 0, 0, 0]} />
        <Bar dataKey="inProgress" name="In Progress" stackId="status" fill="#0ea5e9" radius={[0, 0, 0, 0]} />
        <Bar dataKey="completed" name="Completed" stackId="status" fill="#10b981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
