import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import PageHeader from "@shared/components/PageHeader";
import { Card } from "@shared/components/Card";
import Table from "@shared/components/Table";
import Badge from "@shared/components/Badge";
import Input from "@shared/components/Input";
import Select from "@shared/components/Select";
import Pagination from "@shared/components/Pagination";
import { getVisitorHistoryUseCase } from "@features/visitors/application/getVisitorHistoryUseCase";

const STATUS_TONE = { Approved: "success", Rejected: "danger" };
const PAGE_SIZE = 10;

export default function VisitorHistoryPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState({ currentPage: 1, totalPages: 1, totalRecords: 0, pageSize: PAGE_SIZE, data: [] });

  useEffect(() => {
    setIsLoading(true);
    getVisitorHistoryUseCase({ page, pageSize: PAGE_SIZE, search, status }).then((data) => {
      setResult(data);
      setIsLoading(false);
    });
  }, [page, search, status]);

  const handleSearchChange = (event) => {
    setPage(1);
    setSearch(event.target.value);
  };

  const handleStatusChange = (event) => {
    setPage(1);
    setStatus(event.target.value);
  };

  const columns = [
    { key: "studentName", header: "Student" },
    { key: "visitorName", header: "Visitor" },
    { key: "roomNumber", header: "Room" },
    { key: "date", header: "Date" },
    { key: "time", header: "Time" },
    { key: "purpose", header: "Purpose" },
    { key: "status", header: "Status", render: (row) => <Badge tone={STATUS_TONE[row.status]}>{row.status}</Badge> },
  ];

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate("/visitors")}
        className="mb-4 flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary-800 dark:text-slate-400 dark:hover:text-primary-400"
      >
        <ArrowLeft size={16} />
        Back to visitor requests
      </button>

      <PageHeader title="Visitor History" subtitle="Previously reviewed visitor requests" />

      <Card>
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center dark:border-slate-800">
          <Input
            containerClassName="sm:max-w-xs"
            icon={Search}
            placeholder="Search by student, visitor or room"
            value={search}
            onChange={handleSearchChange}
          />
          <Select containerClassName="sm:max-w-[180px]" value={status} onChange={handleStatusChange}>
            <option value="All">All statuses</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </Select>
        </div>

        <Table columns={columns} data={result.data} loading={isLoading} keyField="id" emptyMessage="No visitor history found" />

        <Pagination
          currentPage={result.currentPage}
          totalPages={result.totalPages}
          totalRecords={result.totalRecords}
          pageSize={result.pageSize}
          onPageChange={setPage}
          label="requests"
        />
      </Card>
    </div>
  );
}
