import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@features/authentication/application/useAuthStore";
import AuthLayout from "@features/authentication/presentation/components/AuthLayout";
import LoginForm from "@features/authentication/presentation/LoginForm";

export default function LoginPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const authError = useAuthStore((s) => s.authError);
  const location = useLocation();
  const navigate = useNavigate();

  // SessionBridge has already resolved the Asgardeo session by the time this
  // renders, so a truthy flag here is final - go straight to the app. This also
  // strips the `?code=...` left over from the OIDC callback.
  useEffect(() => {
    if (isAuthenticated && window.location.search) {
      navigate(location.pathname, { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  if (isAuthenticated) {
    const target = location.state?.from?.pathname ?? "/dashboard";
    return <Navigate to={target} replace />;
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to manage your hostel operations">
      {authError && (
        <p className="mb-4 max-h-64 overflow-auto whitespace-pre-wrap break-all rounded-lg bg-danger-500/10 p-3 text-xs text-danger-600 border border-danger-500/20">
          {authError}
        </p>
      )}
      <LoginForm />
    </AuthLayout>
  );
}
