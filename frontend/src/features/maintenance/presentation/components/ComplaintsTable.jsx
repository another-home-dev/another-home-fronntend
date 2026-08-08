import Table from "@shared/components/Table";
import StatusBadge from "@features/maintenance/presentation/components/StatusBadge";
import PriorityBadge from "@features/maintenance/presentation/components/PriorityBadge";
import RowActions from "@features/maintenance/presentation/components/RowActions";

export default function ComplaintsTable({ complaints, onView }) {
  const columns = [
    { key: "id", header: "Complaint ID", render: (row) => <span className="font-semibold text-slate-900 dark:text-slate-100">{row.id}</span> },
    { key: "studentName", header: "Student" },
    { key: "roomNumber", header: "Room" },
    { key: "category", header: "Category" },
    { key: "priority", header: "Priority", render: (row) => <PriorityBadge priority={row.priority} /> },
    { key: "submittedDate", header: "Date Submitted" },
    { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
    { key: "assignedStaff", header: "Assigned Staff" },
    { key: "actions", header: "Action", render: (row) => <RowActions onView={() => onView(row)} /> },
  ];

  return <Table columns={columns} data={complaints} onRowClick={onView} />;
}
