import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useThemeStore } from "@shared/store/useThemeStore";
import { CHART_THEME } from "@features/dashboard/presentation/components/chartTheme";

const formatCurrency = (value) => `Rs. ${(value / 1000).toFixed(0)}k`;

export default function PaymentTrendChart({ data }) {
  const theme = useThemeStore((state) => state.theme);
  const t = CHART_THEME[theme];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="collectedFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1d4ed8" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="pendingFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} stroke={t.grid} />
        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: t.axisText, fontSize: 12 }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: t.axisText, fontSize: 12 }} tickFormatter={formatCurrency} width={56} />
        <Tooltip
          formatter={(value) => [`Rs. ${value.toLocaleString()}`, undefined]}
          contentStyle={{ borderRadius: 12, border: `1px solid ${t.tooltipBorder}`, fontSize: 13, background: t.tooltipBg, color: t.tooltipText }}
          labelStyle={{ color: t.tooltipText }}
        />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 13, color: t.legendText }} />

        <Area type="monotone" dataKey="collected" name="Collected" stroke="#1d4ed8" strokeWidth={2} fill="url(#collectedFill)" />
        <Area type="monotone" dataKey="pending" name="Pending" stroke="#f59e0b" strokeWidth={2} fill="url(#pendingFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
