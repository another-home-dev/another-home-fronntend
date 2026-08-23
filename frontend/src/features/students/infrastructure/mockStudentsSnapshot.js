import { buildRoomShells } from "@features/hostel/domain/roomInventory";

/**
 * Synchronous fake student roster kept only for the still-mock visitors/maintenance
 * features (no backend exists for either yet). The real student directory now lives
 * in studentRepository.js, backed by GET /accommodation/students.
 */

const FIRST_NAMES = ["Ishara", "Nadeesha", "Kasun", "Dilani", "Tharindu", "Chamodi", "Sanduni", "Ruwan", "Hasini", "Lahiru", "Piyumi", "Ashen", "Nimesha", "Sachini", "Kavindu", "Oshadi", "Dinuka", "Yasoda", "Chanaka", "Iresha", "Buddhika", "Malsha", "Roshan", "Anjali"];
const LAST_NAMES = ["Perera", "Silva", "Fernando", "Jayasuriya", "Rathnayake", "Wickramasinghe", "Gunawardena", "Bandara", "Karunaratne", "Senanayake", "Dissanayake", "Weerasinghe", "Abeysekara", "Mendis", "Rajapaksha", "Herath", "Amarasinghe", "Pathirana"];
const UNALLOCATED_COUNT = 6;

const ROOM_SHELLS = buildRoomShells();

function buildOccupiedSlots() {
  const slots = [];
  ROOM_SHELLS.forEach((room, roomIndex) => {
    const fillRatio = 0.65 + ((roomIndex * 7) % 4) * 0.1;
    const bedsToFill = Math.min(room.capacity, Math.max(1, Math.round(room.capacity * fillRatio)));
    for (let bed = 0; bed < bedsToFill; bed += 1) {
      slots.push(room);
    }
  });
  return slots;
}

const OCCUPIED_SLOTS = buildOccupiedSlots();
const TOTAL_STUDENTS = OCCUPIED_SLOTS.length + UNALLOCATED_COUNT;

function buildStudents() {
  return Array.from({ length: TOTAL_STUDENTS }, (_, index) => {
    const firstName = FIRST_NAMES[index % FIRST_NAMES.length];
    const lastName = LAST_NAMES[(index * 3) % LAST_NAMES.length];
    const isUnallocated = index >= OCCUPIED_SLOTS.length;
    const assignedRoom = isUnallocated ? null : OCCUPIED_SLOTS[index];

    return {
      id: `st${index + 1}`,
      studentCode: `AH-${String(1000 + index)}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@student.anotherhome.com`,
      contact: `+94 7${(index % 9) + 1} ${100 + index * 7} ${2000 + index}`,
      roomNumber: isUnallocated ? null : assignedRoom.roomNumber,
      buildingName: isUnallocated ? null : assignedRoom.buildingName,
    };
  });
}

const students = buildStudents();

export function getStudentsSnapshot() {
  return students;
}
