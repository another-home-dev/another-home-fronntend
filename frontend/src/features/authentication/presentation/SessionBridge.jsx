import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { useAuthStore } from "@features/authentication/application/useAuthStore";
import Spinner from "@shared/components/Spinner";

const ALLOWED_WEB_ROLES = ["warden", "super-admin"];

// Captured at module load, before the SDK gets a chance to strip the query string,
// so we can still tell whether this page load began as an OIDC callback.
const INITIAL_SEARCH = typeof window !== "undefined" ? window.location.search : "";
const ARRIVED_WITH_CODE = /[?&]code=[^&]+/.test(INITIAL_SEARCH);

function readStorageKeys(store) {
  try {
    return Object.keys(store);
  } catch (e) {
    return [`<unreadable: ${e?.message ?? "blocked"}>`];
  }
}

function buildCallbackDiagnostics(state, error) {
  return {
    arrivedWithCode: ARRIVED_WITH_CODE,
    urlNow: typeof window !== "undefined" ? window.location.href : "",
    sdkState: state ?? null,
    sdkError: error
      ? { name: error.name, code: error.code, message: error.message, detail: error.detail }
      : null,
    localStorageKeys: readStorageKeys(window.localStorage),
    sessionStorageKeys: readStorageKeys(window.sessionStorage),
  };
}

// Asgardeo puts role/group membership under different claims depending on whether
// the role's audience is the application or the organization, and on how the app's
// attribute mapping is configured. Check all of them rather than assuming one.
const ROLE_CLAIMS = [
  "roles",
  "groups",
  "application_roles",
  "http://wso2.org/claims/roles",
  "http://wso2.org/claims/role",
  "http://wso2.org/claims/groups",
];

function collectRoleCandidates(...sources) {
  const out = [];
  for (const src of sources) {
    if (!src || typeof src !== "object") continue;
    for (const claim of ROLE_CLAIMS) {
      const value = src[claim];
      if (!value) continue;
      if (Array.isArray(value)) out.push(...value);
      else out.push(...String(value).split(","));
    }
  }
  return out;
}

function normalizeRole(candidates) {
  for (const raw of candidates) {
    if (!raw) continue;
    // Role names arrive as "warden", "Internal/warden" or "DEFAULT/warden".
    const normalized = String(raw).split("/").pop().trim().toLowerCase();
    if (ALLOWED_WEB_ROLES.includes(normalized)) return normalized;
  }
  return null;
}

/**
 * Mirrors the Asgardeo SDK session into the Zustand store for the whole app.
 *
 * This has to live above the router. The SDK restores its session (and exchanges
 * the `?code=` on the callback) asynchronously on every full page load, so for the
 * first few renders "not authenticated" means "not known yet", not "logged out".
 * While that is unresolved we render a loader rather than routes, because any guard
 * running in that window sees a false `isAuthenticated` and bounces a valid session
 * back to /login.
 */
export default function SessionBridge({ children }) {
  const { state, error, getBasicUserInfo, getAccessToken, getDecodedIDToken } = useAuthContext();
  const setSession = useAuthStore((s) => s.setSession);
  const clearSession = useAuthStore((s) => s.clearSession);
  const setAuthError = useAuthStore((s) => s.setAuthError);

  const [resolved, setResolved] = useState(false);
  const syncing = useRef(false);

  useEffect(() => {
    // Still restoring the session / exchanging the authorization code.
    if (state?.isLoading) return;

    let cancelled = false;

    const sync = async () => {
      if (!state?.isAuthenticated) {
        clearSession();

        // We came back from Asgardeo with an authorization code but the SDK never
        // reached an authenticated state, so the token exchange failed. The SDK
        // swallows most of these, so log everything that could explain it - but
        // keep the on-page message short, this is a production login screen.
        if (ARRIVED_WITH_CODE) {
          console.error("[auth] callback did not produce a session:", buildCallbackDiagnostics(state, error));
          setAuthError("Sign-in could not be completed. Please try again.");
        }

        if (!cancelled) setResolved(true);
        return;
      }

      if (syncing.current) return;
      syncing.current = true;

      try {
        const [userInfo, token] = await Promise.all([getBasicUserInfo(), getAccessToken()]);

        let idToken = null;
        try {
          idToken = await getDecodedIDToken();
        } catch {
          // Not fatal - we can still fall back to the userinfo claims below.
        }

        const candidates = collectRoleCandidates(userInfo, idToken);
        const role = normalizeRole(candidates);

        // Surfaced so a role-mapping problem is diagnosable from the browser
        // console instead of looking like a silent redirect.
        console.info("[auth] role claims seen:", candidates, "-> resolved:", role);

        if (!role) {
          setAuthError(
            `Signed in as ${userInfo?.username ?? "this account"}, but no warden or super-admin ` +
              `role came back from Asgardeo. Roles received: ${
                candidates.length ? candidates.join(", ") : "(none)"
              }.`
          );
          // Deliberately NOT calling signOut() here: it triggers a full page
          // redirect that discards this message before it can be read.
          clearSession();
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
        setAuthError(null);
      } catch (err) {
        console.error("[auth] failed to sync Asgardeo session to store:", err);
        setAuthError(`Sign-in could not be completed: ${err?.message ?? "unknown error"}`);
        clearSession();
      } finally {
        syncing.current = false;
        if (!cancelled) setResolved(true);
      }
    };

    sync();

    return () => {
      cancelled = true;
    };
    // The SDK's callbacks are new references on every render, so depending on them
    // would re-run this effect in a loop. The two flags are the real triggers.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.isLoading, state?.isAuthenticated, error]);

  if (state?.isLoading || !resolved) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Spinner size={32} />
      </div>
    );
  }

  return children;
}
