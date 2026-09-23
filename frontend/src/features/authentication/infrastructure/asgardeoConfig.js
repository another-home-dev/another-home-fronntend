const appBaseUrl = import.meta.env.VITE_APP_BASE_URL ?? "http://localhost:5173";

// The OIDC callback must land on a route that waits for the SDK to process
// `?code=...`. It must NOT be the bare root "/", because AppRoutes redirects "/"
// straight to "/dashboard", which discards the code before it can be exchanged
// and bounces the user back to /login in a loop.
const callbackUrl = `${appBaseUrl}/login`;

export const asgardeoConfig = {
    clientID: "vMSyX0p1dSRABiF9unxHmKCz44Qa",
    baseUrl: "https://api.asgardeo.io/t/hiru616",
    signInRedirectURL: callbackUrl,
    signOutRedirectURL: callbackUrl,
    scope: ["openid", "profile", "groups", "roles"],
    // The SDK stores the PKCE code_verifier in sessionStorage by default. Browsers
    // with strict cross-site protections (Brave Shields, Safari ITP) can clear that
    // across the round trip to the IdP, which makes the token exchange fail silently.
    storage: "localStorage",
    // Both of these use a hidden iframe against accounts.asgardeo.io to check the IdP
    // session, which those same browsers block. They already match the SDK defaults;
    // set explicitly so the intent survives an SDK upgrade.
    disableTrySignInSilently: true,
    enableOIDCSessionManagement: false
};
