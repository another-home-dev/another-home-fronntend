export class AdminUser {
  constructor({ id, name, email, role, avatarUrl }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.avatarUrl = avatarUrl ?? null;
  }

  static fromResponse(data) {
    return new AdminUser({
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      avatarUrl: data.avatar_url,
    });
  }
}
