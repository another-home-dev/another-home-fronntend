import { Routes, Route, Navigate, useParams } from "react-router-dom";
import LoginPage from "@features/authentication/presentation/LoginPage";
import DashboardPage from "@features/dashboard/presentation/DashboardPage";
import HostelManagementPage from "@features/hostel/presentation/HostelManagementPage";
import StudentListPage from "@features/students/presentation/StudentListPage";
import StudentProfilePage from "@features/students/presentation/StudentProfilePage";
import MaintenancePage from "@features/maintenance/presentation/MaintenancePage";
import VisitorManagementPage from "@features/visitors/presentation/VisitorManagementPage";
import VisitorHistoryPage from "@features/visitors/presentation/VisitorHistoryPage";
import PaymentManagementPage from "@features/payments/presentation/PaymentManagementPage";
import RoomAllocationPage from "@features/room-allocation/presentation/RoomAllocationPage";
import CafeteriaPage from "@features/cafeteria/presentation/CafeteriaPage";
import ReportsPage from "@features/reports/presentation/ReportsPage";
import AnnouncementManagementPage from "@features/announcements/presentation/AnnouncementManagementPage";
import NotificationsPage from "@features/notifications/presentation/NotificationsPage";
import SettingsPage from "@features/settings/presentation/SettingsPage";
import WardenProfilePage from "@features/profile/presentation/WardenProfilePage";
import AdminLayout from "@app/layout/AdminLayout";
import ProtectedRoute from "@app/routes/ProtectedRoute";

function StudentProfileRoute() {
  const { id } = useParams();
  return <StudentProfilePage key={id} />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/hostel" element={<HostelManagementPage />} />
          <Route path="/students" element={<StudentListPage />} />
          <Route path="/students/:id" element={<StudentProfileRoute />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/visitors" element={<VisitorManagementPage />} />
          <Route path="/visitors/history" element={<VisitorHistoryPage />} />
          <Route path="/payments" element={<PaymentManagementPage />} />
          <Route path="/room-allocation" element={<RoomAllocationPage />} />
          <Route path="/cafeteria" element={<CafeteriaPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/announcements" element={<AnnouncementManagementPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<WardenProfilePage />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
