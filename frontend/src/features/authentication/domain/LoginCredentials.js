const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class LoginCredentials {
  constructor(email, password) {
    this.email = email?.trim() ?? "";
    this.password = password ?? "";
  }

  validate() {
    const errors = {};

    if (!this.email) {
      errors.email = "Email is required";
    } else if (!EMAIL_PATTERN.test(this.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!this.password) {
      errors.password = "Password is required";
    } else if (this.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  }

  isValid() {
    return Object.keys(this.validate()).length === 0;
  }
}
