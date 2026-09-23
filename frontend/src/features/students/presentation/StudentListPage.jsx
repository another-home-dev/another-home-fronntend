import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search as FiSearch, Plus as FiPlus } from "lucide-react";
import PageHeader from "@shared/components/PageHeader";
import { Card } from "@shared/components/Card";
import Table from "@shared/components/Table";
import Badge from "@shared/components/Badge";
import Pagination from "@shared/components/Pagination";
import Button from "@shared/components/Button";
import { getStudentsPageUseCase } from "@features/students/application/getStudentsPageUseCase";
import { createStudentUseCase } from "@features/students/application/createStudentUseCase";
import AddStudentModal from "@features/students/presentation/components/AddStudentModal";
import { PAYMENT_STATUS_TONE, PAYMENT_STATUS_LABEL } from "@shared/utils/paymentStatus";

const PAGE_SIZE = 10;

export default function StudentListPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ currentPage: 1, totalPages: 1, totalRecords: 0, pageSize: PAGE_SIZE, data: [] });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const loadStudents = () => {
    setIsLoading(true);
    getStudentsPageUseCase({ page, pageSize: PAGE_SIZE, search: query }).then((data) => {
      setResult(data);
      setIsLoading(false);
    });
  };

  useEffect(loadStudents, [page, query]);

  const handleSearchChange = (event) => {
    setPage(1);
    setQuery(event.target.value);
  };

  const handleCreateStudent = async (payload) => {
    await createStudentUseCase(payload);
    loadStudents();
  };

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
      <PageHeader
        title="Students"
        subtitle="Manage hostel residents"
        action={
          <Button icon={FiPlus} onClick={() => setIsAddModalOpen(true)}>
            Add Student
          </Button>
        }
      />

      <AddStudentModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleCreateStudent} />

      <Card>
        <div className="flex items-center gap-2 border-b border-slate-100 p-4 dark:border-slate-800">
          <div className="flex w-full max-w-sm items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 sm:w-72 dark:bg-slate-800">
            <FiSearch className="text-slate-400" size={16} />
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              placeholder="Search by name, email or ID..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200"
            />
          </div>
        </div>

        <Table
          columns={columns}
          data={result.data}
          loading={isLoading}
          keyField="id"
          emptyMessage="No students match your search"
          onRowClick={(row) => navigate(`/students/${row.id}`)}
        />
        <Pagination
          currentPage={result.currentPage}
          totalPages={result.totalPages}
          totalRecords={result.totalRecords}
          pageSize={result.pageSize}
          onPageChange={setPage}
          label="students"
        />
      </Card>
    </div>
  );
}
