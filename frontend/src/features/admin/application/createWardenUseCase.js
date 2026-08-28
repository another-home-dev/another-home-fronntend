import wardenRepository from "@features/admin/infrastructure/wardenRepository";

function validateWardenInput({ name, email, contact }) {
  const errors = {};
  if (!name || !name.trim()) errors.name = "Name is required";
  if (!email || !email.trim()) errors.email = "Email is required";
  if (!contact || !contact.trim()) errors.contact = "Contact number is required";
  return errors;
}

export async function createWardenUseCase(payload) {
  const errors = validateWardenInput(payload);
  if (Object.keys(errors).length > 0) {
    const error = new Error("Please correct the highlighted fields");
    error.fieldErrors = errors;
    throw error;
  }

  return wardenRepository.create(payload);
}
