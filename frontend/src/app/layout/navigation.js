import {
  FiGrid,
  FiHome,
  FiUsers,
  FiKey,
  FiTool,
  FiUserCheck,
  FiCreditCard,
  FiVolume2,
  FiCoffee,
  FiBarChart2,
  FiBell,
  FiSettings,
} from "react-icons/fi";

export const NAV_ITEMS = [
  { label: "Dashboard", path: "/dashboard", icon: FiGrid },
  { label: "Hostel Management", path: "/hostel", icon: FiHome },
  { label: "Students", path: "/students", icon: FiUsers },
  { label: "Room Allocation", path: "/room-allocation", icon: FiKey },
  { label: "Maintenance", path: "/maintenance", icon: FiTool },
  { label: "Visitors", path: "/visitors", icon: FiUserCheck },
  { label: "Payments", path: "/payments", icon: FiCreditCard },
  { label: "Cafeteria", path: "/cafeteria", icon: FiCoffee },
  { label: "Reports & Analytics", path: "/reports", icon: FiBarChart2 },
  { label: "Announcements", path: "/announcements", icon: FiVolume2 },
  { label: "Notifications", path: "/notifications", icon: FiBell, badgeKey: "notifications" },
  { label: "Settings", path: "/settings", icon: FiSettings },
];
