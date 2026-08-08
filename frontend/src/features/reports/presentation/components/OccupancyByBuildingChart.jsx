import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#1d4ed8", "#0ea5e9", "#10b981", "#8b5cf6"];

export default function OccupancyByBuildingChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--color-text-secondary)" strokeOpacity={0.15} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }} />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
          width={36}
          domain={[0, 100]}
          ticks={[0, 25, 50, 75, 100]}
          unit="%"
        />
        <Tooltip
          formatter={(value) => [`${value}%`, "Occupancy"]}
          contentStyle={{ borderRadius: 12, border: "1px solid rgba(148,163,184,0.2)", fontSize: 13, background: "var(--color-surface)", color: "var(--color-text-primary)" }}
        />
        <Bar dataKey="occupancyRate" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
