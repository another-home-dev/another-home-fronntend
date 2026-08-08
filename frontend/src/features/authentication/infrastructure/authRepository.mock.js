import { AdminUser } from "@features/authentication/domain/AdminUser";

function deriveNameFromEmail(email) {
  const localPart = email.split("@")[0] ?? "Admin";
  return localPart
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

/** No backend yet — accepts any credentials so the admin console can be explored end-to-end. */
class MockAuthRepository {
  async login(email) {
    await new Promise((resolve) => setTimeout(resolve, 400));

    return {
      user: new AdminUser({
        id: "mock-admin-1",
        name: deriveNameFromEmail(email) || "Admin",
        email,
        role: "warden",
        avatarUrl: null,
        employeeId: "WRD-0012",
        contactNumber: "+94 71 234 5678",
        dateOfBirth: null,
        gender: null,
        assignedHostel: "Sunrise Block",
        hostelBlock: "Wing A",
        dateJoined: "2024-01-15",
        employmentStatus: "Active",
        username: email.split("@")[0] ?? "admin",
        lastLogin: new Date().toISOString(),
        accountStatus: "Active",
      }),
      token: "mock-dev-token",
    };
  }

  async requestPasswordReset(email) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { success: true, message: `A password reset link has been sent to ${email} (mock).` };
  }
}

export default new MockAuthRepository();
