import React from "react";
import { useAuthContext } from "@asgardeo/auth-react";

export default function LoginForm() {
    const { signIn, state } = useAuthContext();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signIn();
        } catch (error) {
            console.error("Asgardeo sign in failed:", error);
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-6">
            <div className="rounded-lg bg-blue-500/10 p-4 border border-blue-500/20 text-xs text-blue-200 text-center">
                Authentication is securely managed via WSO2 Asgardeo Identity Provider.
            </div>

            <button
                type="submit"
                disabled={state?.isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 cursor-pointer"
            >
                {state?.isLoading ? "Connecting to Asgardeo..." : "Sign In with Asgardeo"}
            </button>
        </form>
    );
}