import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@shared/components/Modal";
import Input from "@shared/components/Input";
import Button from "@shared/components/Button";
import { ANNOUNCEMENT_CATEGORIES } from "@features/announcements/domain/Announcement";

export default function AnnouncementFormModal({ open, onClose, onSubmit, announcement }) {
  const [submitError, setSubmitError] = useState("");
  const isEditing = Boolean(announcement);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: announcement?.title ?? "",
      category: announcement?.category ?? "General",
      message: announcement?.message ?? "",
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
    <Modal open={open} onClose={onClose} title={isEditing ? "Edit Announcement" : "New Announcement"}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>
        {submitError && <p className="text-sm font-medium text-danger-600 dark:text-danger-400">{submitError}</p>}

        <Input
          label="Title"
          placeholder="e.g. Water supply maintenance"
          error={errors.title?.message}
          {...register("title", { required: "Title is required" })}
        />

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
          <select
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            {...register("category")}
          >
            {ANNOUNCEMENT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
          <textarea
            rows={4}
            placeholder="Write the announcement details..."
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            {...register("message", { required: "Message is required" })}
          />
          {errors.message && <p className="mt-1.5 text-xs font-medium text-danger-600 dark:text-danger-400">{errors.message.message}</p>}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            {isEditing ? "Save changes" : "Publish announcement"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
