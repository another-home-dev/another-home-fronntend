import React, { useEffect } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@features/authentication/application/useAuthStore";
import AuthLayout from "@features/authentication/presentation/components/AuthLayout";
import LoginForm from "@features/authentication/presentation/LoginForm";

export default function LoginPage() {
  const { state, getBasicUserInfo, getAccessToken } = useAuthContext();
  const { setSession, clearSession } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const syncAsgardeoToZustand = async () => {
      if (state?.isAuthenticated) {
        try {
          const userInfo = await getBasicUserInfo();
          const token = await getAccessToken();

          setSession({
            user: {
              id: userInfo.sub,
              email: userInfo.email || userInfo.username,
              name: userInfo.givenName || userInfo.username,
              role: userInfo.groups?.[0] || "WARDEN",
            },
            token: token,
          });

          navigate("/dashboard", { replace: true });
        } catch (error) {
          console.error("Failed to sync Asgardeo session to store:", error);
        }
      } else if (!state?.isLoading && !state?.isAuthenticated) {
        clearSession();
      }
    };

    syncAsgardeoToZustand();
  }, [state?.isAuthenticated, state?.isLoading, getBasicUserInfo, getAccessToken, setSession, clearSession, navigate]);

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to manage your hostel operations">
      <LoginForm />
    </AuthLayout>
  );
}