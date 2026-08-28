import React, { useEffect, useState } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@features/authentication/application/useAuthStore";
import AuthLayout from "@features/authentication/presentation/components/AuthLayout";
import LoginForm from "@features/authentication/presentation/LoginForm";

const ALLOWED_WEB_ROLES = ["warden", "super-admin"];

function normalizeRole(roles) {
  const roleList = Array.isArray(roles) ? roles : [roles];
  for (const raw of roleList) {
    if (!raw) continue;
    // Asgardeo role names can come through as e.g. "Internal/warden" depending on config.
    const normalized = String(raw).split("/").pop().trim().toLowerCase();
    if (normalized && normalized !== "everyone") {
      return normalized;
    }
  }
  return null;
}

export default function LoginPage() {
  const { state, getBasicUserInfo, getAccessToken, signOut } = useAuthContext();
  const { setSession, clearSession } = useAuthStore();
  const navigate = useNavigate();
  const [accessError, setAccessError] = useState("");

  useEffect(() => {
    const syncAsgardeoToZustand = async () => {
      if (state?.isAuthenticated) {
        try {
          const userInfo = await getBasicUserInfo();
          const token = await getAccessToken();
          const role = normalizeRole(userInfo.roles);

          if (!role || !ALLOWED_WEB_ROLES.includes(role)) {
            setAccessError(
              "This account isn't authorized for the admin console. Please sign in with a warden or super admin account."
            );
            clearSession();
            await signOut();
            return;
          }

          setSession({
            user: {
              id: userInfo.sub,
              email: userInfo.email || userInfo.username,
              name: userInfo.givenName || userInfo.username,
              role,
            },
            token,
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
  }, [state?.isAuthenticated, state?.isLoading, getBasicUserInfo, getAccessToken, setSession, clearSession, signOut, navigate]);

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to manage your hostel operations">
      {accessError && (
        <p className="mb-4 rounded-lg bg-danger-500/10 p-3 text-sm text-danger-600 border border-danger-500/20">
          {accessError}
        </p>
      )}
      <LoginForm />
    </AuthLayout>
  );
}
