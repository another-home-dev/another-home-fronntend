import { useEffect, useState } from "react";
import { Download, CircleCheck, Clock, TriangleAlert, Search } from "lucide-react";
import PageHeader from "@shared/components/PageHeader";
import StatCard from "@shared/components/StatCard";
import { Card } from "@shared/components/Card";
import Table from "@shared/components/Table";
import Button from "@shared/components/Button";
import Input from "@shared/components/Input";
import Pagination from "@shared/components/Pagination";
import { cn } from "@shared/utils/cn";
import { PAYMENT_STATUS_TONE, PAYMENT_STATUS_LABEL } from "@shared/utils/paymentStatus";
import Badge from "@shared/components/Badge";
import { usePaymentOverview } from "@features/payments/presentation/hooks/usePaymentOverview";
import { getPaymentsPageUseCase } from "@features/payments/application/getPaymentsPageUseCase";
import { generatePaymentReportUseCase } from "@features/payments/application/generatePaymentReportUseCase";

const FILTERS = ["All", "paid", "pending", "overdue"];
const FILTER_LABEL = { All: "All", paid: "Paid", pending: "Pending", overdue: "Overdue" };
const PAGE_SIZE = 10;

export default function PaymentManagementPage() {
  const { summary } = usePaymentOverview();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState({ currentPage: 1, totalPages: 1, totalRecords: 0, pageSize: PAGE_SIZE, data: [] });

  useEffect(() => {
    setIsLoading(true);
    getPaymentsPageUseCase({ page, pageSize: PAGE_SIZE, status: activeFilter, search }).then((data) => {
      setResult(data);
      setIsLoading(false);
    });
  }, [page, activeFilter, search]);

  const handleFilterChange = (filter) => {
    setPage(1);
    setActiveFilter(filter);
  };

  const handleSearchChange = (event) => {
    setPage(1);
    setSearch(event.target.value);
  };

  const columns = [
    { key: "studentName", header: "Student" },
    { key: "room", header: "Room", render: (row) => (row.roomNumber ? `${row.roomNumber} · ${row.buildingName}` : "Unassigned") },
    { key: "month", header: "Month" },
    { key: "amount", header: "Amount", render: (row) => `Rs. ${row.amount.toLocaleString()}` },
    { key: "status", header: "Status", render: (row) => <Badge tone={PAYMENT_STATUS_TONE[row.status]}>{PAYMENT_STATUS_LABEL[row.status]}</Badge> },
    { key: "paidOn", header: "Paid On", render: (row) => row.paidOn ?? "—" },
  ];

  return (
    <div>
      <PageHeader
        title="Payments"
        subtitle="Track hostel fee collection"
        action={
          <Button icon={Download} variant="outline" onClick={() => generatePaymentReportUseCase(activeFilter)}>
            Generate Report
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Collected"
          value={summary ? `Rs. ${summary.totalCollected.toLocaleString()}` : "—"}
          icon={CircleCheck}
          tone="success"
        />
        <StatCard
          label="Pending Payments"
          value={summary ? `Rs. ${summary.totalPending.toLocaleString()}` : "—"}
          icon={Clock}
          tone="warning"
        />
        <StatCard
          label="Overdue Payments"
          value={summary ? `Rs. ${summary.totalOverdue.toLocaleString()}` : "—"}
          icon={TriangleAlert}
          tone="danger"
        />
      </div>

      <Card>
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <Input
            containerClassName="sm:max-w-xs"
            icon={Search}
            placeholder="Search by student or room"
            value={search}
            onChange={handleSearchChange}
          />
          <div className="flex gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => handleFilterChange(filter)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                  activeFilter === filter
                    ? "bg-primary-800 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                )}
              >
                {FILTER_LABEL[filter]}
              </button>
            ))}
          </div>
        </div>

        <Table columns={columns} data={result.data} loading={isLoading} keyField="id" emptyMessage="No payment records" />

        <Pagination
          currentPage={result.currentPage}
          totalPages={result.totalPages}
          totalRecords={result.totalRecords}
          pageSize={result.pageSize}
          onPageChange={setPage}
          label="payments"
        />
      </Card>
    </div>
  );
}
