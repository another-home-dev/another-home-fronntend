import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@shared/components/Modal";
import Input from "@shared/components/Input";
import Button from "@shared/components/Button";

export default function WardenFormModal({ open, onClose, onSubmit }) {
  const [submitError, setSubmitError] = useState("");
  const [createdWarden, setCreatedWarden] = useState(null);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: "", email: "", contact: "" } });

  const handleFormSubmit = async (values) => {
    setSubmitError("");
    try {
      const warden = await onSubmit(values);
      setCreatedWarden(warden);
      reset();
    } catch (error) {
      if (error.fieldErrors) {
        Object.entries(error.fieldErrors).forEach(([field, message]) => {
          setError(field, { type: "manual", message });
        });
        return;
      }
      setSubmitError(error.response?.data?.message ?? error.message ?? "Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    setCreatedWarden(null);
    setSubmitError("");
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Add Warden">
      {createdWarden ? (
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Warden account created. Share this temporary password with them securely — it won't be shown again.
          </p>
          <div className="rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-800">
            <p><span className="font-semibold">Email:</span> {createdWarden.email}</p>
            <p className="mt-1"><span className="font-semibold">Temporary password:</span> {createdWarden.temporaryPassword}</p>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleClose}>Done</Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>
          {submitError && <p className="text-sm font-medium text-danger-600">{submitError}</p>}

          <Input
            label="Full name"
            placeholder="e.g. Nimal Perera"
            error={errors.name?.message}
            {...register("name", { required: "Name is required" })}
          />

          <Input
            type="email"
            label="Email"
            placeholder="warden@example.com"
            error={errors.email?.message}
            {...register("email", { required: "Email is required" })}
          />

          <Input
            label="Contact number"
            placeholder="+94 71 234 5678"
            error={errors.contact?.message}
            {...register("contact", { required: "Contact number is required" })}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Add warden
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
