import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiAlertCircle } from "react-icons/fi";
import Input from "@shared/components/Input";
import Button from "@shared/components/Button";
import { loginUseCase } from "@features/authentication/application/loginUseCase";
import { useAuthStore } from "@features/authentication/application/useAuthStore";

export default function LoginForm() {
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: "", password: "", rememberMe: true } });

  const onSubmit = async ({ email, password }) => {
    setSubmitError("");

    try {
      const { user, token } = await loginUseCase(email, password);
      setSession({ user, token });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      if (error.fieldErrors) {
        Object.entries(error.fieldErrors).forEach(([field, message]) => {
          setError(field, { type: "manual", message });
        });
        return;
      }
      setSubmitError(error.response?.data?.message ?? error.message ?? "Unable to sign in. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {submitError && (
        <div className="flex items-center gap-2 rounded-xl bg-danger-50 px-4 py-3 text-sm font-medium text-danger-600 dark:bg-danger-500/10 dark:text-danger-400">
          <FiAlertCircle size={18} className="shrink-0" />
          {submitError}
        </div>
      )}

      <Input
        type="email"
        label="Email address"
        placeholder="you@anotherhome.com"
        icon={FiMail}
        error={errors.email?.message}
        {...register("email", { required: "Email is required" })}
      />

      <Input
        type="password"
        label="Password"
        placeholder="Enter your password"
        icon={FiLock}
        error={errors.password?.message}
        {...register("password", { required: "Password is required" })}
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-primary-700 focus:ring-primary-400 dark:border-slate-600 dark:bg-slate-800"
            {...register("rememberMe")}
          />
          Remember me
        </label>

        <Link to="/forgot-password" className="font-medium text-primary-700 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" fullWidth loading={isSubmitting}>
        Sign in
      </Button>
    </form>
  );
}
