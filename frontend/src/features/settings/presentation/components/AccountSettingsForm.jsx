import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLock, FiCheckCircle } from "react-icons/fi";
import Input from "@shared/components/Input";
import Button from "@shared/components/Button";
import { changePasswordUseCase } from "@features/settings/application/changePasswordUseCase";

export default function AccountSettingsForm() {
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" } });

  const onSubmit = async (values) => {
    setSuccessMessage("");
    try {
      await changePasswordUseCase(values);
      reset();
      setSuccessMessage("Password changed successfully");
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
      {successMessage && (
        <div className="flex items-center gap-2 rounded-xl bg-success-50 px-4 py-3 text-sm font-medium text-success-700 dark:bg-success-500/10 dark:text-success-400">
          <FiCheckCircle size={18} />
          {successMessage}
        </div>
      )}

      <Input
        type="password"
        label="Current password"
        icon={FiLock}
        error={errors.currentPassword?.message}
        {...register("currentPassword", { required: "Current password is required" })}
      />

      <Input
        type="password"
        label="New password"
        icon={FiLock}
        error={errors.newPassword?.message}
        {...register("newPassword", { required: "New password is required" })}
      />

      <Input
        type="password"
        label="Confirm new password"
        icon={FiLock}
        error={errors.confirmPassword?.message}
        {...register("confirmPassword", { required: "Please confirm your new password" })}
      />

      <div className="flex justify-end">
        <Button type="submit" loading={isSubmitting}>
          Update password
        </Button>
      </div>
    </form>
  );
}
