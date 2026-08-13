import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function StatusDonutChart({ data, colors }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={2} cornerRadius={4}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={colors[entry.name] ?? "#94a3b8"} stroke="var(--color-surface)" strokeWidth={2} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid rgba(148,163,184,0.2)", fontSize: 13, background: "var(--color-surface)", color: "var(--color-text-primary)" }} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 13, color: "var(--color-text-secondary)" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
