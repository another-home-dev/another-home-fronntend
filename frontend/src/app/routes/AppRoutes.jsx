import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import AdminLayout from "@app/layout/AdminLayout";
import ProtectedRoute from "@app/routes/ProtectedRoute";

// Route-level code splitting: each page ships as its own chunk and loads on
// navigation, so the initial download is just the shell + the first route
// instead of every page's code at once.
const LoginPage = lazy(() => import("@features/authentication/presentation/LoginPage"));
const DashboardPage = lazy(() => import("@features/dashboard/presentation/DashboardPage"));
const HostelManagementPage = lazy(() => import("@features/hostel/presentation/HostelManagementPage"));
const StudentListPage = lazy(() => import("@features/students/presentation/StudentListPage"));
const StudentProfilePage = lazy(() => import("@features/students/presentation/StudentProfilePage"));
const MaintenancePage = lazy(() => import("@features/maintenance/presentation/MaintenancePage"));
const VisitorManagementPage = lazy(() => import("@features/visitors/presentation/VisitorManagementPage"));
const VisitorHistoryPage = lazy(() => import("@features/visitors/presentation/VisitorHistoryPage"));
const PaymentManagementPage = lazy(() => import("@features/payments/presentation/PaymentManagementPage"));
const RoomAllocationPage = lazy(() => import("@features/room-allocation/presentation/RoomAllocationPage"));
const CafeteriaPage = lazy(() => import("@features/cafeteria/presentation/CafeteriaPage"));
const ReportsPage = lazy(() => import("@features/reports/presentation/ReportsPage"));
const AnnouncementManagementPage = lazy(() => import("@features/announcements/presentation/AnnouncementManagementPage"));
const NotificationsPage = lazy(() => import("@features/notifications/presentation/NotificationsPage"));
const SettingsPage = lazy(() => import("@features/settings/presentation/SettingsPage"));
const WardenProfilePage = lazy(() => import("@features/profile/presentation/WardenProfilePage"));
const WardenManagementPage = lazy(() => import("@features/admin/presentation/WardenManagementPage"));

function StudentProfileRoute() {
  const { id } = useParams();
  return <StudentProfilePage key={id} />;
}

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
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

            <Route element={<ProtectedRoute allowedRoles={["super-admin"]} />}>
              <Route path="/admin/wardens" element={<WardenManagementPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}
