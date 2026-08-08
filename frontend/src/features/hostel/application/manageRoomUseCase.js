import hostelRepository from "@features/hostel/infrastructure/hostelRepository";

function validateRoomInput({ roomNumber, capacity }) {
  const errors = {};

  if (!roomNumber || !roomNumber.trim()) {
    errors.roomNumber = "Room number is required";
  }

  if (!capacity || Number(capacity) < 1) {
    errors.capacity = "Capacity must be at least 1";
  }

  return errors;
}

export async function createRoomUseCase(payload) {
  const errors = validateRoomInput(payload);
  if (Object.keys(errors).length > 0) {
    const error = new Error("Please correct the highlighted fields");
    error.fieldErrors = errors;
    throw error;
  }

  return hostelRepository.createRoom({ ...payload, capacity: Number(payload.capacity) });
}

export async function updateRoomUseCase(roomId, payload) {
  const errors = validateRoomInput(payload);
  if (Object.keys(errors).length > 0) {
    const error = new Error("Please correct the highlighted fields");
    error.fieldErrors = errors;
    throw error;
  }

  return hostelRepository.updateRoom(roomId, { ...payload, capacity: Number(payload.capacity) });
}

export async function deleteRoomUseCase(roomId) {
  return hostelRepository.deleteRoom(roomId);
}
