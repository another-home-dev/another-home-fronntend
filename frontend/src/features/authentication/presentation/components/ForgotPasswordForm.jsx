import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiMail, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import Input from "@shared/components/Input";
import Button from "@shared/components/Button";
import { forgotPasswordUseCase } from "@features/authentication/application/forgotPasswordUseCase";

export default function ForgotPasswordForm() {
  const [submitError, setSubmitError] = useState("");
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: "" } });

  const onSubmit = async ({ email }) => {
    setSubmitError("");

    try {
      await forgotPasswordUseCase(email);
      setIsSent(true);
    } catch (error) {
      setSubmitError(error.response?.data?.message ?? error.message ?? "Unable to send reset link. Please try again.");
    }
  };

  if (isSent) {
    return (
      <div className="space-y-5">
        <div className="flex items-start gap-3 rounded-xl bg-success-50 px-4 py-3 text-sm font-medium text-success-700 dark:bg-success-500/10 dark:text-success-400">
          <FiCheckCircle size={18} className="mt-0.5 shrink-0" />
          <span>A password reset link has been sent to your email. Please check your inbox.</span>
        </div>
        <Link to="/login" className="block text-center text-sm font-medium text-primary-700 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300">
          Back to sign in
        </Link>
      </div>
    );
  }

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

      <Button type="submit" fullWidth loading={isSubmitting}>
        Send reset link
      </Button>

      <Link to="/login" className="block text-center text-sm font-medium text-primary-700 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300">
        Back to sign in
      </Link>
    </form>
  );
}
