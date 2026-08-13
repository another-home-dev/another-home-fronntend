export class AdminUser {
  constructor({
    id,
    name,
    email,
    role,
    avatarUrl,
    employeeId,
    contactNumber,
    dateOfBirth,
    gender,
    assignedHostel,
    hostelBlock,
    dateJoined,
    employmentStatus,
    username,
    lastLogin,
    accountStatus,
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.avatarUrl = avatarUrl ?? null;
    this.employeeId = employeeId ?? null;
    this.contactNumber = contactNumber ?? null;
    this.dateOfBirth = dateOfBirth ?? null;
    this.gender = gender ?? null;
    this.assignedHostel = assignedHostel ?? null;
    this.hostelBlock = hostelBlock ?? null;
    this.dateJoined = dateJoined ?? null;
    this.employmentStatus = employmentStatus ?? null;
    this.username = username ?? null;
    this.lastLogin = lastLogin ?? null;
    this.accountStatus = accountStatus ?? null;
  }

  static fromResponse(data) {
    return new AdminUser({
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      avatarUrl: data.avatar_url,
      employeeId: data.employee_id,
      contactNumber: data.contact_number,
      dateOfBirth: data.date_of_birth,
      gender: data.gender,
      assignedHostel: data.assigned_hostel,
      hostelBlock: data.hostel_block,
      dateJoined: data.date_joined,
      employmentStatus: data.employment_status,
      username: data.username,
      lastLogin: data.last_login,
      accountStatus: data.account_status,
    });
  }
}
