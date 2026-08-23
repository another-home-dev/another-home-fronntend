import { getStudentsSnapshot } from "@features/students/infrastructure/mockStudentsSnapshot";

const CATEGORY_ISSUES = {
  Electrical: ["Broken ceiling fan", "Light bulb replacement", "Power socket not working", "Flickering tube light", "Short circuit near study desk"],
  Plumbing: ["Water leakage", "Blocked sink", "Low water pressure", "Leaking tap", "Toilet flush not working"],
  Furniture: ["Door lock damaged", "Broken study chair", "Wardrobe door hinge broken", "Study table wobbling", "Bed frame cracked"],
  Cleaning: ["Room not cleaned properly", "Corridor needs cleaning", "Bathroom drainage smell", "Garbage not collected", "Dust accumulation in vents"],
  Internet: ["WiFi not working", "Slow internet connection", "Router not responding", "Ethernet port not working", "Frequent WiFi disconnection"],
  "Air Conditioning": ["Air conditioner malfunction", "AC not cooling properly", "AC making loud noise", "AC remote not working", "AC water leakage"],
  Other: ["Window glass cracked", "Pest control needed", "Curtain rod broken", "Ceiling paint peeling off", "Noise complaint from neighboring room"],
};

const CATEGORIES = Object.keys(CATEGORY_ISSUES);
const PRIORITIES = ["High", "Medium", "Low"];
const STATUSES = ["Pending", "In Progress", "Resolved"];
const STAFF_POOL = ["Mr. Sunil Bandara", "Mr. Ruwan Jayasuriya", "Ms. Chamari Wickramasinghe", "Mr. Nimal Rathnayake", "Unassigned"];

const TOTAL_COMPLAINTS = 48;
const TODAY = new Date(2026, 6, 31);

function formatDate(date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function buildDescription(issue, category, roomNumber) {
  return `${issue} reported in Room ${roomNumber}. The issue has been logged under the ${category} category and is awaiting attention from the maintenance team.`;
}

function buildTimeline(status, submittedDate, assignedStaff) {
  const timeline = [{ label: "Complaint submitted", date: formatDate(submittedDate) }];

  if (status === "In Progress" || status === "Resolved") {
    timeline.push({ label: `Assigned to ${assignedStaff}`, date: formatDate(addDays(submittedDate, 1)) });
  }
  if (status === "Resolved") {
    timeline.push({ label: "Marked as resolved", date: formatDate(addDays(submittedDate, 3)) });
  }

  return timeline;
}

function buildComplaints() {
  const allocatedStudents = getStudentsSnapshot().filter((student) => student.roomNumber);

  return Array.from({ length: TOTAL_COMPLAINTS }, (_, index) => {
    const student = allocatedStudents[index % allocatedStudents.length];
    const category = CATEGORIES[index % CATEGORIES.length];
    const issues = CATEGORY_ISSUES[category];
    const title = issues[index % issues.length];
    const priority = PRIORITIES[index % PRIORITIES.length];
    const status = STATUSES[index % STATUSES.length];
    const assignedStaff = status === "Pending" ? "Unassigned" : STAFF_POOL[index % (STAFF_POOL.length - 1)];
    const submittedDate = addDays(TODAY, -((index * 3) % 45));

    return {
      id: `MC-${1001 + index}`,
      studentName: student.name,
      roomNumber: student.roomNumber,
      buildingName: student.buildingName,
      category,
      title,
      description: buildDescription(title, category, student.roomNumber),
      priority,
      status,
      assignedStaff,
      submittedDate: submittedDate.toISOString().slice(0, 10),
      createdDate: submittedDate.toISOString().slice(0, 10),
      images: [],
      timeline: buildTimeline(status, submittedDate, assignedStaff),
    };
  }).sort((a, b) => (a.submittedDate < b.submittedDate ? 1 : -1));
}

export { CATEGORIES, PRIORITIES, STATUSES };
export default buildComplaints();
