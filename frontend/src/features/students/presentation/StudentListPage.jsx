import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import PageHeader from "@shared/components/PageHeader";
import { Card } from "@shared/components/Card";
import Table from "@shared/components/Table";
import Badge from "@shared/components/Badge";
import { getStudentsUseCase } from "@features/students/application/getStudentsUseCase";
import { PAYMENT_STATUS_TONE, PAYMENT_STATUS_LABEL } from "@shared/utils/paymentStatus";

export default function StudentListPage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getStudentsUseCase().then((data) => {
      setStudents(data);
      setIsLoading(false);
    });
  }, []);

  const filteredStudents = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return students;
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(term) ||
        student.email.toLowerCase().includes(term) ||
        student.studentCode.toLowerCase().includes(term)
    );
  }, [students, query]);

  const columns = [
    { key: "studentCode", header: "Student ID" },
    {
      key: "name",
      header: "Name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary-800 dark:bg-primary-500/15 dark:text-primary-300">
            {row.initials}
          </span>
          <span className="font-medium text-slate-800 dark:text-slate-200">{row.name}</span>
        </div>
      ),
    },
    { key: "email", header: "Email" },
    { key: "contact", header: "Contact" },
    {
      key: "room",
      header: "Assigned Room",
      render: (row) =>
        row.roomNumber ? (
          `${row.roomNumber} · ${row.buildingName}`
        ) : (
          <Badge tone="warning">Not assigned</Badge>
        ),
    },
    {
      key: "paymentStatus",
      header: "Payment Status",
      render: (row) => <Badge tone={PAYMENT_STATUS_TONE[row.paymentStatus]}>{PAYMENT_STATUS_LABEL[row.paymentStatus]}</Badge>,
    },
  ];

  return (
    <div>
      <PageHeader title="Students" subtitle="Manage hostel residents" />

      <Card>
        <div className="flex items-center gap-2 border-b border-slate-100 p-4 dark:border-slate-800">
          <div className="flex w-full max-w-sm items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 sm:w-72 dark:bg-slate-800">
            <FiSearch className="text-slate-400" size={16} />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, email or ID..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200"
            />
          </div>
        </div>

        <Table
          columns={columns}
          data={filteredStudents}
          loading={isLoading}
          keyField="id"
          emptyMessage="No students match your search"
          onRowClick={(row) => navigate(`/students/${row.id}`)}
        />
      </Card>
    </div>
  );
}
