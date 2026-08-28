import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@shared/components/Modal";
import Input from "@shared/components/Input";
import Button from "@shared/components/Button";

export default function BuildingFormModal({ open, onClose, onSubmit }) {
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      floorCount: 4,
    },
  });

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
    <Modal open={open} onClose={onClose} title="Add Building">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>
        {submitError && <p className="text-sm font-medium text-danger-600">{submitError}</p>}

        <Input
          label="Building name"
          placeholder="e.g. Sunrise Block"
          error={errors.name?.message}
          {...register("name", { required: "Building name is required" })}
        />

        <Input
          label="Address"
          placeholder="e.g. 12 Lake Road, Colombo"
          error={errors.address?.message}
          {...register("address", { required: "Address is required" })}
        />

        <Input
          type="number"
          min={1}
          label="Number of floors"
          error={errors.floorCount?.message}
          {...register("floorCount", { required: "Floor count is required", min: { value: 1, message: "Minimum 1 floor" } })}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Add building
          </Button>
        </div>
      </form>
    </Modal>
  );
}
