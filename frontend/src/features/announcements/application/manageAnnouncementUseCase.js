import announcementRepository from "@features/announcements/infrastructure/announcementRepository";

function validateAnnouncement({ title, message }) {
  const errors = {};
  if (!title || !title.trim()) errors.title = "Title is required";
  if (!message || !message.trim()) errors.message = "Message is required";
  return errors;
}

export async function createAnnouncementUseCase(payload) {
  const errors = validateAnnouncement(payload);
  if (Object.keys(errors).length > 0) {
    const error = new Error("Please correct the highlighted fields");
    error.fieldErrors = errors;
    throw error;
  }
  return announcementRepository.create(payload);
}

export async function updateAnnouncementUseCase(id, payload) {
  const errors = validateAnnouncement(payload);
  if (Object.keys(errors).length > 0) {
    const error = new Error("Please correct the highlighted fields");
    error.fieldErrors = errors;
    throw error;
  }
  return announcementRepository.update(id, payload);
}

export async function deleteAnnouncementUseCase(id) {
  return announcementRepository.remove(id);
}
