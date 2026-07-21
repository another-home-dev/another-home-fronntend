import AuthLayout from "@features/authentication/presentation/components/AuthLayout";
import LoginForm from "@features/authentication/presentation/components/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to manage your hostel operations">
      <LoginForm />
    </AuthLayout>
  );
}
