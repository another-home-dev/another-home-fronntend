import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const formatCurrency = (value) => `Rs. ${(value / 1000).toFixed(0)}k`;

export default function RevenueTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="reportsCollected" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1d4ed8" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} stroke="var(--color-text-secondary)" strokeOpacity={0.15} />
        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }} tickFormatter={formatCurrency} width={56} />
        <Tooltip
          formatter={(value) => [`Rs. ${value.toLocaleString()}`, undefined]}
          contentStyle={{ borderRadius: 12, border: "1px solid rgba(148,163,184,0.2)", fontSize: 13, background: "var(--color-surface)", color: "var(--color-text-primary)" }}
        />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 13, color: "var(--color-text-secondary)" }} />

        <Area type="monotone" dataKey="collected" name="Collected" stroke="#1d4ed8" strokeWidth={2} fill="url(#reportsCollected)" />
        <Area type="monotone" dataKey="pending" name="Pending" stroke="#f59e0b" strokeWidth={2} fill="none" />
        <Area type="monotone" dataKey="overdue" name="Overdue" stroke="#ef4444" strokeWidth={2} fill="none" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
