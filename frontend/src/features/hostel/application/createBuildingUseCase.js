import hostelRepository from "@features/hostel/infrastructure/hostelRepository";

function validateBuildingInput({ name, address, floorCount }) {
  const errors = {};

  if (!name || !name.trim()) {
    errors.name = "Building name is required";
  }

  if (!address || !address.trim()) {
    errors.address = "Address is required";
  }

  if (!floorCount || Number(floorCount) < 1) {
    errors.floorCount = "Floor count must be at least 1";
  }

  return errors;
}

export async function createBuildingUseCase(payload) {
  const errors = validateBuildingInput(payload);
  if (Object.keys(errors).length > 0) {
    const error = new Error("Please correct the highlighted fields");
    error.fieldErrors = errors;
    throw error;
  }

  return hostelRepository.createBuilding(payload);
}
