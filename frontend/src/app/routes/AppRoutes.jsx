import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@features/authentication/presentation/LoginPage";
import ForgotPasswordPage from "@features/authentication/presentation/ForgotPasswordPage";
import DashboardPage from "@features/dashboard/presentation/DashboardPage";
import AdminLayout from "@app/layout/AdminLayout";
import ProtectedRoute from "@app/routes/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
