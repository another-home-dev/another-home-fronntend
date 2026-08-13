import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Camera,
  Mail,
  Phone,
  Calendar,
  IdCard,
  Building2,
  DoorOpen,
  CalendarCheck,
  BadgeCheck,
  Clock,
  KeyRound,
  ShieldCheck,
  Lock,
  Fingerprint,
  LogOut,
  CircleCheck,
} from "lucide-react";
import PageHeader from "@shared/components/PageHeader";
import { Card, CardHeader, CardBody } from "@shared/components/Card";
import Input from "@shared/components/Input";
import Select from "@shared/components/Select";
import Button from "@shared/components/Button";
import Badge from "@shared/components/Badge";
import ConfirmDialog from "@shared/components/ConfirmDialog";
import { useAuthStore } from "@features/authentication/application/useAuthStore";
import { updateWardenProfileUseCase } from "@features/profile/application/updateWardenProfileUseCase";
import InfoField from "@features/profile/presentation/components/InfoField";
import ChangePasswordModal from "@features/profile/presentation/components/ChangePasswordModal";

const STATUS_TONE = { Active: "success", "On Leave": "warning", Suspended: "danger" };

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function formatDateTime(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function WardenProfilePage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const clearSession = useAuthStore((state) => state.clearSession);

  const [successMessage, setSuccessMessage] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [confirmingLogoutAll, setConfirmingLogoutAll] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      contactNumber: user?.contactNumber ?? "",
      dateOfBirth: user?.dateOfBirth ?? "",
      gender: user?.gender ?? "",
      avatarUrl: user?.avatarUrl ?? "",
    },
  });

  const avatarPreview = watch("avatarUrl");

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setValue("avatarUrl", reader.result, { shouldDirty: true });
    reader.readAsDataURL(file);
  };

  const onSave = async (values) => {
    setSuccessMessage("");
    try {
      const updated = await updateWardenProfileUseCase(values);
      updateUser(updated);
      reset(values);
      setSuccessMessage("Profile updated successfully");
    } catch (error) {
      if (error.fieldErrors) {
        Object.entries(error.fieldErrors).forEach(([field, message]) => {
          setError(field, { type: "manual", message });
        });
      }
    }
  };

  const handleCancel = () => {
    setSuccessMessage("");
    reset();
  };

  const handleLogoutAllDevices = () => {
    clearSession();
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <PageHeader title="My Profile" subtitle="View and manage your personal, employment and account information" />

      <form onSubmit={handleSubmit(onSave)} noValidate>
        <Card className="mb-6 p-6">
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <div className="relative">
              {avatarPreview ? (
                <img src={avatarPreview} alt="" className="h-20 w-20 rounded-full object-cover" />
              ) : (
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-800 text-2xl font-bold text-white">
                  {(user?.name ?? "A").charAt(0).toUpperCase()}
                </span>
              )}
              <label className="absolute bottom-0 right-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white text-primary-800 shadow ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-primary-300 dark:ring-slate-700">
                <Camera size={13} />
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{user?.name ?? "Admin"}</h2>
              <p className="text-sm capitalize text-slate-500 dark:text-slate-400">{user?.role ?? "Warden"}</p>
              <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
                <Badge tone={STATUS_TONE[user?.employmentStatus] ?? "neutral"}>{user?.employmentStatus ?? "Active"}</Badge>
                <Badge tone={STATUS_TONE[user?.accountStatus] ?? "neutral"}>Account {user?.accountStatus ?? "Active"}</Badge>
              </div>
            </div>
          </div>
        </Card>

        {successMessage && (
          <div className="mb-6 flex items-center gap-2 rounded-xl bg-success-50 px-4 py-3 text-sm font-medium text-success-700 dark:bg-success-500/10 dark:text-success-400">
            <CircleCheck size={18} />
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader title="Personal Information" subtitle="Editable contact details" />
            <CardBody className="space-y-4">
              <Input
                label="Full name"
                icon={BadgeCheck}
                error={errors.name?.message}
                {...register("name", { required: "Full name is required" })}
              />
              <Input label="Employee ID" icon={IdCard} defaultValue={user?.employeeId ?? ""} disabled />
              <Input
                type="email"
                label="Email address"
                icon={Mail}
                error={errors.email?.message}
                {...register("email", { required: "Email is required" })}
              />
              <Input
                label="Contact number"
                icon={Phone}
                error={errors.contactNumber?.message}
                {...register("contactNumber", { required: "Contact number is required" })}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input type="date" label="Date of birth (optional)" icon={Calendar} {...register("dateOfBirth")} />
                <Select label="Gender (optional)" {...register("gender")}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </Select>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Employment Information" subtitle="Managed by the system administrator" />
            <CardBody className="space-y-4">
              <InfoField icon={BadgeCheck} label="Role" value={user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Warden"} />
              <InfoField icon={Building2} label="Assigned Hostel" value={user?.assignedHostel} />
              <InfoField icon={DoorOpen} label="Hostel Block" value={user?.hostelBlock} />
              <InfoField icon={CalendarCheck} label="Date Joined" value={formatDate(user?.dateJoined)} />
              <InfoField icon={ShieldCheck} label="Employment Status" value={user?.employmentStatus} />
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Account Information" />
            <CardBody className="space-y-4">
              <InfoField icon={KeyRound} label="Username" value={user?.username} />
              <InfoField icon={Mail} label="Registered Email" value={user?.email} />
              <InfoField icon={Clock} label="Last Login" value={formatDateTime(user?.lastLogin)} />
              <InfoField icon={ShieldCheck} label="Account Status" value={user?.accountStatus} />
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Security" subtitle="Manage how you sign in to Another Home" />
            <CardBody className="space-y-3">
              <Button type="button" variant="outline" icon={Lock} fullWidth onClick={() => setChangingPassword(true)}>
                Change Password
              </Button>
              <Button type="button" variant="outline" icon={Fingerprint} fullWidth disabled title="Coming soon">
                Two-Factor Authentication (Coming Soon)
              </Button>
              <Button type="button" variant="outline" icon={LogOut} fullWidth onClick={() => setConfirmingLogoutAll(true)}>
                Logout from All Devices
              </Button>
            </CardBody>
          </Card>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={handleCancel} disabled={!isDirty}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting} disabled={!isDirty}>
            Save Changes
          </Button>
        </div>
      </form>

      <ChangePasswordModal open={changingPassword} onClose={() => setChangingPassword(false)} />

      <ConfirmDialog
        open={confirmingLogoutAll}
        onClose={() => setConfirmingLogoutAll(false)}
        onConfirm={handleLogoutAllDevices}
        title="Logout from all devices"
        confirmLabel="Logout"
        description="This will end your session on this device and any other device signed in as you. You'll need to log in again."
      />
    </div>
  );
}
