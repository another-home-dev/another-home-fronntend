import { Routes, Route, Navigate, useParams } from "react-router-dom";
import LoginPage from "@features/authentication/presentation/LoginPage";
import ForgotPasswordPage from "@features/authentication/presentation/ForgotPasswordPage";
import DashboardPage from "@features/dashboard/presentation/DashboardPage";
import HostelManagementPage from "@features/hostel/presentation/HostelManagementPage";
import StudentListPage from "@features/students/presentation/StudentListPage";
import StudentProfilePage from "@features/students/presentation/StudentProfilePage";
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
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/hostel" element={<HostelManagementPage />} />
          <Route path="/students" element={<StudentListPage />} />
          <Route path="/students/:id" element={<StudentProfileRoute />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
