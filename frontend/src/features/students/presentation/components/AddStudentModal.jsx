import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@shared/components/Modal";
import Button from "@shared/components/Button";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-primary-500/20";
const labelClass = "mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300";
const errorClass = "mt-1.5 text-xs font-medium text-danger-600 dark:text-danger-400";

export default function AddStudentModal({ open, onClose, onSubmit }) {
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      studentCode: "",
      name: "",
      email: "",
      contact: "",
      faculty: "",
      degreeProgram: "",
      academicYear: "",
      nic: "",
    },
  });

  const handleFormSubmit = async (values) => {
    setSubmitError("");
    try {
      await onSubmit(values);
      reset();
      onClose();
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      setSubmitError(
        Array.isArray(backendMessage)
          ? backendMessage.join(", ")
          : backendMessage ?? error.message ?? "Unable to register this student. Please try again."
      );
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Register a new student">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>
        {submitError && <p className="text-sm font-medium text-danger-600 dark:text-danger-400">{submitError}</p>}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Student ID</label>
            <input className={inputClass} placeholder="e.g. AH-1000" {...register("studentCode", { required: "Student ID is required" })} />
            {errors.studentCode && <p className={errorClass}>{errors.studentCode.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Full Name</label>
            <input className={inputClass} placeholder="e.g. Ishara Perera" {...register("name", { required: "Name is required" })} />
            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              className={inputClass}
              placeholder="student@university.lk"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Contact Number</label>
            <input className={inputClass} placeholder="+94 71 234 5678" {...register("contact", { required: "Contact number is required" })} />
            {errors.contact && <p className={errorClass}>{errors.contact.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Faculty</label>
            <input className={inputClass} placeholder="e.g. Engineering" {...register("faculty")} />
          </div>
          <div>
            <label className={labelClass}>Degree Program</label>
            <input className={inputClass} placeholder="e.g. BSc (Hons) Computer Science" {...register("degreeProgram")} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Academic Year</label>
            <input className={inputClass} placeholder="e.g. 3rd Year" {...register("academicYear")} />
          </div>
          <div>
            <label className={labelClass}>National ID (NIC)</label>
            <input className={inputClass} placeholder="e.g. 200012345678" {...register("nic")} />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Register student
          </Button>
        </div>
      </form>
    </Modal>
  );
}
