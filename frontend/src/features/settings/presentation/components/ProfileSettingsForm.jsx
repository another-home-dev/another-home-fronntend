import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiUser, FiMail, FiCheckCircle } from "react-icons/fi";
import Input from "@shared/components/Input";
import Button from "@shared/components/Button";
import { useAuthStore } from "@features/authentication/application/useAuthStore";
import { updateProfileUseCase } from "@features/settings/application/updateProfileUseCase";

export default function ProfileSettingsForm() {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: user?.name ?? "", email: user?.email ?? "" } });

  const onSubmit = async (values) => {
    setSuccessMessage("");
    try {
      const updated = await updateProfileUseCase(values);
      updateUser(updated);
      setSuccessMessage("Profile updated successfully");
    } catch (error) {
      if (error.fieldErrors) {
        Object.entries(error.fieldErrors).forEach(([field, message]) => {
          setError(field, { type: "manual", message });
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="flex items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-800 text-xl font-bold text-white">
          {(user?.name ?? "A").charAt(0).toUpperCase()}
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{user?.name ?? "Admin"}</p>
          <p className="text-xs capitalize text-slate-500 dark:text-slate-400">{user?.role ?? "administrator"}</p>
        </div>
      </div>

      {successMessage && (
        <div className="flex items-center gap-2 rounded-xl bg-success-50 px-4 py-3 text-sm font-medium text-success-700 dark:bg-success-500/10 dark:text-success-400">
          <FiCheckCircle size={18} />
          {successMessage}
        </div>
      )}

      <Input
        label="Full name"
        icon={FiUser}
        error={errors.name?.message}
        {...register("name", { required: "Name is required" })}
      />

      <Input
        type="email"
        label="Email address"
        icon={FiMail}
        error={errors.email?.message}
        {...register("email", { required: "Email is required" })}
      />

      <div className="flex justify-end">
        <Button type="submit" loading={isSubmitting}>
          Save changes
        </Button>
      </div>
    </form>
  );
}
