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
            <div className="rounded-lg bg-primary-50 p-4 border border-primary-100 text-xs text-primary-800 text-center dark:bg-primary-500/10 dark:border-primary-500/20 dark:text-primary-200">
                Authentication is securely managed via WSO2 Asgardeo Identity Provider.
            </div>

            <button
                type="submit"
                disabled={state?.isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-700 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-600 dark:hover:bg-primary-700 transition-colors disabled:opacity-50 cursor-pointer"
            >
                {state?.isLoading ? "Connecting to Asgardeo..." : "Sign In with Asgardeo"}
            </button>
        </form>
    );
}