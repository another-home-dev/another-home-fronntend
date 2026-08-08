import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@shared/components/Modal";
import Button from "@shared/components/Button";

export default function AssignmentModal({ open, onClose, student, availableRooms, onSubmit }) {
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { roomId: "" } });

  const handleFormSubmit = async ({ roomId }) => {
    setSubmitError("");
    const room = availableRooms.find((item) => item.id === roomId);

    try {
      await onSubmit(room);
    } catch (error) {
      setSubmitError(error.message ?? "Unable to assign this room. Please try again.");
    }
  };

  if (!student) return null;

  return (
    <Modal open={open} onClose={onClose} title={`Assign a room · ${student.name}`}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>
        {submitError && <p className="text-sm font-medium text-danger-600 dark:text-danger-400">{submitError}</p>}

        {student.roomNumber && (
          <p className="rounded-xl bg-slate-50 px-4 py-2.5 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            Currently in <span className="font-semibold">{student.roomNumber} · {student.buildingName}</span>
          </p>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Select an available room</label>
          <select
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-primary-500/20"
            {...register("roomId", { required: "Please select a room" })}
          >
            <option value="">Choose a room…</option>
            {availableRooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.roomNumber} · {room.buildingName} · {room.occupiedBeds}/{room.capacity} beds
              </option>
            ))}
          </select>
          {errors.roomId && <p className="mt-1.5 text-xs font-medium text-danger-600 dark:text-danger-400">{errors.roomId.message}</p>}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Confirm assignment
          </Button>
        </div>
      </form>
    </Modal>
  );
}
