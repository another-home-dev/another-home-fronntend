import { FiUsers, FiHome, FiKey, FiPieChart, FiTool, FiUserCheck, FiAlertCircle } from "react-icons/fi";
import StatCard from "@shared/components/StatCard";

export default function SummaryCardsGrid({ metrics }) {
  const cards = [
    { label: "Total Students", value: metrics.totalStudents, icon: FiUsers, tone: "primary", trend: { value: "+12", direction: "up" } },
    { label: "Total Rooms", value: metrics.totalRooms, icon: FiHome, tone: "primary" },
    { label: "Available Beds", value: metrics.availableBeds, icon: FiKey, tone: "success" },
    { label: "Occupancy Rate", value: `${metrics.occupancyRate}%`, icon: FiPieChart, tone: "info", trend: { value: "+5%", direction: "up" } },
    { label: "Pending Maintenance", value: metrics.pendingMaintenance, icon: FiTool, tone: "warning", trend: { value: "-3", direction: "down" } },
    { label: "Pending Visitor Requests", value: metrics.pendingVisitors, icon: FiUserCheck, tone: "info" },
    {
      label: "Unpaid Fees",
      value: `Rs. ${metrics.unpaidFeesAmount.toLocaleString()}`,
      icon: FiAlertCircle,
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
