import profileRepository from "@features/profile/infrastructure/profileRepository";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function updateWardenProfileUseCase({ name, email, contactNumber, avatarUrl, dateOfBirth, gender }) {
  const errors = {};
  if (!name || !name.trim()) errors.name = "Full name is required";
  if (!email || !EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address";
  if (!contactNumber || !contactNumber.trim()) errors.contactNumber = "Contact number is required";

  if (Object.keys(errors).length > 0) {
    const error = new Error("Please correct the highlighted fields");
    error.fieldErrors = errors;
    throw error;
  }

  return profileRepository.updateProfile({
    name: name.trim(),
    email: email.trim(),
    contactNumber: contactNumber.trim(),
    avatarUrl: avatarUrl ?? null,
    dateOfBirth: dateOfBirth || null,
    gender: gender || null,
  });
}
