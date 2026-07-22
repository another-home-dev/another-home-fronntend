import { buildRoomShells } from "@features/hostel/domain/roomInventory";

const FIRST_NAMES = ["Ishara", "Nadeesha", "Kasun", "Dilani", "Tharindu", "Chamodi", "Sanduni", "Ruwan", "Hasini", "Lahiru", "Piyumi", "Ashen", "Nimesha", "Sachini", "Kavindu", "Oshadi", "Dinuka", "Yasoda", "Chanaka", "Iresha", "Buddhika", "Malsha", "Roshan", "Anjali"];
const LAST_NAMES = ["Perera", "Silva", "Fernando", "Jayasuriya", "Rathnayake", "Wickramasinghe", "Gunawardena", "Bandara", "Karunaratne", "Senanayake", "Dissanayake", "Weerasinghe", "Abeysekara", "Mendis", "Rajapaksha", "Herath", "Amarasinghe", "Pathirana"];
const PAYMENT_STATUSES = ["paid", "pending", "overdue"];
const MONTHS = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const UNALLOCATED_COUNT = 6;

const ROOM_SHELLS = buildRoomShells();

/** Every room gets filled to a deterministic ~65-95% of capacity, spread across ALL buildings/floors — not just the first N rooms — so occupancy is realistic everywhere. */
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
    const name = `${firstName} ${lastName}`;
    const paymentStatus = PAYMENT_STATUSES[index % PAYMENT_STATUSES.length];
    const isUnallocated = index >= OCCUPIED_SLOTS.length;
    const assignedRoom = isUnallocated ? null : OCCUPIED_SLOTS[index];

    const payments = MONTHS.map((month, monthIndex) => ({
      id: `${index}-${month}`,
      month,
      amount: 15000,
      status: monthIndex === MONTHS.length - 1 ? paymentStatus : "paid",
      paidOn: monthIndex === MONTHS.length - 1 && paymentStatus !== "paid" ? null : `${month} ${5 + (index % 20)}, 2026`,
    }));

    const complaints =
      index % 9 === 0
        ? [{ id: `${index}-c1`, title: "Leaking tap in bathroom", category: "Plumbing", status: "In Progress", date: "Jul 8, 2026" }]
        : index % 13 === 0
          ? [{ id: `${index}-c2`, title: "Broken study chair", category: "Furniture", status: "Completed", date: "Jun 21, 2026" }]
          : [];

    return {
      id: `st${index + 1}`,
      studentCode: `AH-${String(1000 + index)}`,
      name,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@student.anotherhome.com`,
      contact: `+94 7${(index % 9) + 1} ${100 + index * 7} ${2000 + index}`,
      roomNumber: isUnallocated ? null : assignedRoom.roomNumber,
      buildingName: isUnallocated ? null : assignedRoom.buildingName,
      paymentStatus: isUnallocated ? "pending" : paymentStatus,
      joinedDate: `Jan ${10 + (index % 15)}, 2026`,
      guardianName: `${LAST_NAMES[(index + 2) % LAST_NAMES.length]} Family`,
      guardianContact: `+94 7${(index % 9) + 2} ${200 + index * 3} ${3000 + index}`,
      address: `No. ${12 + index}, Galle Road, Colombo`,
      payments: isUnallocated ? [] : payments,
      complaints,
    };
  });
}

let students = buildStudents();

/** Synchronous, same-process read used by the hostel repository to derive room occupancy. */
export function getStudentsSnapshot() {
  return students;
}

class StudentRepository {
  async fetchAll() {
    return students;
  }

  async fetchById(id) {
    return students.find((student) => student.id === id) ?? null;
  }

  async fetchUnallocated() {
    return students.filter((student) => !student.roomNumber);
  }

  async assignRoom(studentId, { roomNumber, buildingName }) {
    students = students.map((student) =>
      student.id === studentId ? { ...student, roomNumber, buildingName } : student
    );
    return students.find((student) => student.id === studentId);
  }

  async unassignRoom(studentId) {
    students = students.map((student) =>
      student.id === studentId ? { ...student, roomNumber: null, buildingName: null } : student
    );
    return students.find((student) => student.id === studentId);
  }
}

export default new StudentRepository();
