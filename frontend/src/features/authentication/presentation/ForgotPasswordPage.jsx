import AuthLayout from "@features/authentication/presentation/components/AuthLayout";
import ForgotPasswordForm from "@features/authentication/presentation/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout title="Reset your password" subtitle="Enter your email and we'll send you a reset link">
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
