import { Users, Building2, KeyRound, PieChart, Wrench, UserCheck, AlertCircle } from "lucide-react";
import StatCard from "@shared/components/StatCard";

export default function SummaryCardsGrid({ metrics }) {
  const cards = [
    { label: "Total Students", value: metrics.totalStudents, icon: Users, tone: "primary", trend: { value: "+12", direction: "up" } },
    { label: "Total Rooms", value: metrics.totalRooms, icon: Building2, tone: "primary" },
    { label: "Available Beds", value: metrics.availableBeds, icon: KeyRound, tone: "success" },
    { label: "Occupancy Rate", value: `${metrics.occupancyRate}%`, icon: PieChart, tone: "info", trend: { value: "+5%", direction: "up" } },
    { label: "Pending Maintenance", value: metrics.pendingMaintenance, icon: Wrench, tone: "warning", trend: { value: "-3", direction: "down" } },
    { label: "Pending Visitor Requests", value: metrics.pendingVisitors, icon: UserCheck, tone: "info" },
    {
      label: "Unpaid Fees",
      value: `Rs. ${metrics.unpaidFeesAmount.toLocaleString()}`,
      icon: AlertCircle,
      tone: "danger",
      trend: { value: "+18%", direction: "up" },
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}
