import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@shared/components/Modal";
import Input from "@shared/components/Input";
import Button from "@shared/components/Button";

export default function MenuItemFormModal({ open, onClose, onSubmit, day, mealSlot, item }) {
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: item?.name ?? "", description: item?.description ?? "" } });

  const handleFormSubmit = async (values) => {
    setSubmitError("");
    try {
      await onSubmit(values);
    } catch (error) {
      if (error.fieldErrors) {
        Object.entries(error.fieldErrors).forEach(([field, message]) => {
          setError(field, { type: "manual", message });
        });
        return;
      }
      setSubmitError(error.message ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={`${mealSlot} · ${day}`}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>
        {submitError && <p className="text-sm font-medium text-danger-600 dark:text-danger-400">{submitError}</p>}

        <Input
          label="Dish name"
          placeholder="e.g. Rice & Chicken Curry"
          error={errors.name?.message}
          {...register("name", { required: "Dish name is required" })}
        />

        <Input
          label="Description"
          placeholder="e.g. With mixed vegetables"
          error={errors.description?.message}
          {...register("description")}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}
