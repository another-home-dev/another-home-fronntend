import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@shared/components/Modal";
import Input from "@shared/components/Input";
import Select from "@shared/components/Select";
import Button from "@shared/components/Button";

export default function RoomFormModal({ open, onClose, onSubmit, room, defaultFloor, maxFloor }) {
  const [submitError, setSubmitError] = useState("");
  const isEditing = Boolean(room);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      roomNumber: room?.roomNumber ?? "",
      capacity: room?.capacity ?? 2,
      gender: room?.gender ?? "Male",
      airConditioning: room?.airConditioning ?? "Non-AC",
      rentPerMonth: room?.rentPerMonth ?? 5000,
      floor: defaultFloor ?? 1,
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
    <Modal open={open} onClose={onClose} title={isEditing ? "Edit Room" : "Add Room"}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>
        {submitError && <p className="text-sm font-medium text-danger-600">{submitError}</p>}

        <Input
          label="Room number"
          placeholder="e.g. 204"
          error={errors.roomNumber?.message}
          {...register("roomNumber", { required: "Room number is required" })}
        />

        {!isEditing && (
          <Input
            type="number"
            min={1}
            max={maxFloor}
            label="Floor number"
            error={errors.floor?.message}
            {...register("floor", {
              required: "Floor number is required",
              min: { value: 1, message: "Minimum floor is 1" },
              ...(maxFloor ? { max: { value: maxFloor, message: `This building only has ${maxFloor} floors` } } : {}),
            })}
          />
        )}

        <Input
          type="number"
          min={1}
          label="Capacity (beds)"
          error={errors.capacity?.message}
          {...register("capacity", { required: "Capacity is required", min: { value: 1, message: "Minimum capacity is 1" } })}
        />

        <Select label="Designation" {...register("gender", { required: true })}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Neutral">Neutral</option>
        </Select>

        <Select label="Air conditioning" {...register("airConditioning", { required: true })}>
          <option value="Non-AC">Non-AC</option>
          <option value="AC">AC</option>
        </Select>

        <Input
          type="number"
          min={0}
          label="Rent per month"
          error={errors.rentPerMonth?.message}
          {...register("rentPerMonth", { required: "Rent is required", min: { value: 0, message: "Rent cannot be negative" } })}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            {isEditing ? "Save changes" : "Add room"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
